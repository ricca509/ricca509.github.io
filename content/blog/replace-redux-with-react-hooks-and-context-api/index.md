---
title: "Replace Redux with React Hooks and the Context API: how to and code"
date: "2020-03-13T10:30:00Z"
description: "Is it possible to use the new React Context API and hooks to completely replace Redux? Is it worth it? Does it yield the same results and is the solution as easy to use as Redux + React-redux?"
publication_status: published
---

_Is it possible to use the new React Context API and hooks to completely replace Redux? Is it worth it? Does it yield the same results and is the solution as easy to use as Redux + React-redux?_

With the advent of the new [React Context API](https://reactjs.org/docs/context.html), passing data deep down in an application became easier and with the new [hooks](https://reactjs.org/docs/hooks-intro.html) I started to see a lot of posts advertising that replacing Redux was possible. I wanted to find out for myself, so I started looking closer at the React docs and try to build my own Redux.

The following is what I found out and what I came up with.

## Context API

One of the challenges of React is how to pass props to components deep down the tree; props that are "global" to the application, that many components may want to use and usually represent configuration, UI theme, translations.

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

### How to use it

To start building a Redux-like library, I want to make available a `state` object and a `dispatch` function to the whole application, so let's build an example that takes advantage of the Context API and does just that:

```jsx
import React from "react";

// Create a context with a default value
const StateContext = React.createContext({
  state: {},
  dispatch: () => {},
});

const ComponentUsingContext = () => {
  return (
    // Wrap the component using the value with the context consumer
    <StateContext.Consumer>
      {({ state }) => <div>App state: {JSON.stringify(state)}</div>}
    </StateContext.Consumer>
  );
};

// Wrap your component with the provider and pass a value if you don't want to use the default
const App = () => {
  return (
    <StateContext.Provider
      value={{
        state: {
          counter: 1,
        },
        dispatch: () => console.log("dispatch"),
      }}
    >
      <ComponentUsingContext />
    </StateContext.Provider>
  );
};
```

The above is a quick look at how you can use the Context to send data down the components' tree, and it doesn't look very different from the React Redux Provider that you use to wrap your app with.

**Note how you create a `Context` first, then use the `Context.Provider` to send data down into the tree and `Context.Consumer` to use that data at any nesting level.**

The part using the `Context.Consumer` looks a bit more complex than I'd like, but there is a hook that makes it look at lot cleaner (more on this in a sec).

Now that we have a way to "inject" data into an app, let's see how we can leverage hooks to build the additional features required to replace Redux.

## Hooks

Hooks were introduced in React 16.8.0 to tackle different classes of problems:

- Making it easier to reuse stateful logic between components
- Move away from classes, their inherent verbosity and the use of `this`
- Making more use of [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) to create optimised code (and classes can encourage patterns that make it difficult)
- Probably other reasons, which I am not aware of 😇

Among all the [hooks](https://reactjs.org/docs/hooks-overview.html) that come with React, [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) and [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) are the ones that can help build a Redux-like library in React.

**useContext**

`const value = useContext(MyContext);`

Example usage for useContext

It is an alternative to using the `Context.Consumer` pattern (and makes the code looks more readable in my opinion).

Let's see it applied to the previous Context example:

```jsx
import React, { useContext } from "react";

const StateContext = React.createContext({
  state: {},
  dispatch: () => {},
});

const ComponentUsingContext = () => {
  const { state } = useContext(StateContext); // <---
  return <div>App state: {JSON.stringify(state)}</div>;
};

const App = () => {
  return (
    <StateContext.Provider
      value={{
        state: {
          counter: 1,
        },
        dispatch: () => console.log("dispatch"),
      }}
    >
      <ComponentUsingContext />
    </StateContext.Provider>
  );
};
```

You still have to use the `Context.Provider`, but retrieving the values from the context looks a lot better now.

**useReducer**

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

Example usage for useReducer

The `useReducer` hook accepts a reducer (same as you'd write for Redux) and an initial state and return the new state with a dispatch method.

`state` and `dispatch` are exactly what I need to pass down the application through the `React.Context`.

## Trying to put things together

The API of my Redux-like library should include:

- a `Provider` to wrap the app and inject the state and dispatch method
- a `useStore` method to create a store (containing the state and dispatch method) to pass to the Provider
- a `connect` method to hook a component to the state

**Provider**

The provider would simply be a `Context.Provider`:

```jsx
const Context = React.createContext(); // No default needed here

export const Provider = Context.Provider;
```

**connect**

A very basic `connect` would accept a `Component`, then make use of the `useContext` to get the state and dispatch and then pass them to the component.

```jsx
export const connect = (Component = () => {
  const { state, dispatch } = useContext(Context);

  const props = { state, dispatch };

  return React.createElement(Component, props, null);
});
```

This is of course a very basic version, that passes the whole state to the component: not exactly what I want.

**Introducing `mapStateToProps` and `mapDispatchToProps`**

The Redux `connect` method makes use of `mapStateToProps` to map the whole state to the props that the component needs.

It also uses `mapDispatchToProps` to pass actions wrapped by the dispatch method as props to the component.

I wanted to support those methods too, so this is an improved version, that also support the component's own props:

```javascript
export const connect =
  (mapStateToProps = () => ({}), mapDispatchToProps = () => ({})) =>
  (Component) =>
  (ownProps) => {
    const { getState, dispatch } = useContext(Context);
    const stateProps = mapStateToProps(getState(), ownProps);
    const dispatchProps = mapDispatchToProps(dispatch, ownProps);
    const props = { ...ownProps, ...stateProps, ...dispatchProps, dispatch };

    return createElement(Component, props, null);
  };
```

So here I added support for `mapStateToProps` and `mapDispatchToProps`, providing a default value that returns an empty object in case those arguments are not provided. I then added the `dispatch` method so that the component can use it to dispatch actions.

**useStore**

This is just a utility hook that uses `useReducer` to create a store and returns it, pretty much like `[createStore](https://redux.js.org/api/createstore/)` in Redux. It also creates a `getState` function that returns the state.

```jsx
export const useStore = (reducer, initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getState = () => state;

  return { getState, dispatch };
};
```

The following code puts it all together in the same file to make it easier to read and understand:

## A working example

Here's your usual counter example using the code I just discussed (notice my CSS skills):

And a GitHub repo: [https://github.com/ricca509/redux-no-redux](https://github.com/ricca509/redux-no-redux)

## An important note about re-renders

You may wonder how the application re-renders, since I am never using `setState`, which is a requirement to trigger a re-render in React.

In Redux, the `connect` method triggers a `[forceUpdate](https://reactjs.org/docs/react-component.html#forceupdate)` when the store changes, but here?

The solution lies in how the `useContext` hook works:

> A component calling `useContext` will always re-render when the context value changes.

More on this in the [React docs](https://reactjs.org/docs/hooks-reference.html#usecontext).

## Where to now?

Of course this example is not nearly as powerful as Redux is, but it proves that Redux can be replaced by Context + Hooks.

Is it the right thing to do, though? Is it the right pattern to package these new React features into a Redux-like library?

I believe that these new tools give us an opportunity to find new patterns and leverage the reusability provided by hooks to find better ways to share and access application state at any nesting level. We'll find it iteration after iteration, in true agile spirit.
