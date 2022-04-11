---
title: "Use proxyquire to mock your React components"
date: "2016-07-18T20:35:00.000Z"
description: "Use proxyquire to mock your React components"
publication_status: published
---

Testing React components has become trivial as more and more of them are now [stateless functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).

The _new_ [shallow renderer](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) and tools like [Enzyme](http://airbnb.io/enzyme) make it possible to render a component "one level deep" when testing, without even rendering it in [some sort of DOM](https://github.com/asbjornenge/testdom), while still having a [great api](http://airbnb.io/enzyme/docs/api/shallow.html) to traverse the components' output and assert facts on its behaviour.

Given all these great tools that we have, **what happens when we have a _container_ component that renders _sub-components_ (child components) based on some sort of rule/logic?**  
How do we handle those dependencies to keep our unit tests free from dependencies?

## A HomePage component example

The example renders `Header`, `Footer` and `Sidebar` if there is no error, `Oops` otherwise.

### Testing the HomePage component

When testing the `HomePage` component, we'll probably shallow render it and check that it renders the right components based on its props.

Why shallow render is a good thing?  
From the [Enzyme docs](http://airbnb.io/enzyme/docs/api/shallow.html):

> Shallow rendering is useful to constrain yourself to testing a component as a unit, and to ensure that your tests aren't indirectly asserting on behavior of child components.

The code:

```javascript
import React from "react";
import { shallow } from "enzyme";
import HomePage from "../components/HomePage";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Oops } from "../components/Oops";

describe("The HomePage component", function () {
  describe("when there is no error", function () {
    it("should render the page", function () {
      const props = {
        data: {
          links: "",
        },
      };
      const output = shallow(<HomePage {...props} />);

      expect(output.find(Header)).to.have.lengthOf(1);
      expect(output.find(Sidebar)).to.have.lengthOf(1);
      expect(output.find(Footer)).to.have.lengthOf(1);
      expect(output.find(Oops)).to.have.lengthOf(0);
    });
  });

  describe("when there is an error", function () {
    it("should render the Oops", function () {
      const props = {
        error: {
          message: "blown up",
        },
      };
      const output = shallow(<HomePage {...props} />);

      expect(output.find(Header)).to.have.lengthOf(0);
      expect(output.find(Sidebar)).to.have.lengthOf(0);
      expect(output.find(Footer)).to.have.lengthOf(0);
      expect(output.find(Oops)).to.have.lengthOf(1);
    });
  });
});
```

This test is importing the real `Header`, `Footer`, `Sidebar` and `Oops` components, creating a dependency when it should just _assume_ that they are behaving the way they are supposed to, so that if tomorrow the `Header` component blows up, the `HomePage` tests won't be affected (the `Header` tests will, though!).

## Introducing proxyquire

[Proxyquire](https://github.com/thlorenz/proxyquire)

> Proxies nodejs's require in order to make overriding dependencies during testing easy while staying totally unobstrusive.

This is how it comes to our rescue:

**Code analysis:**

- On line 5:

> By default proxyquire calls the function defined on the original dependency whenever it is not found on the stub.

We don't want to call any function not defined in our component, so we define a more strict behaviour.

- Lines 7-10: We define our mock components as simple stateless functions. We are not interested in what the component behaviour is, we just want to test that it receives the right props (that is being rendered correctly by the component under test).
- Lines 12-17: It is here that we pass our mocks to the `HomePage` component. We are not importing it at the top of the file, we are instead requiring it through proxyquire, passing it a set of dependencies that we want to mock.

We don't have to mock all the `HomePage` dependencies, only the ones that we want to control and we get back the `HomePage` component with all those dependencies replaced by our stubs.

## A note on ES6 modules

At the top of `HomePage.jsx` we import the component's dependencies:

```javascript
...
import Footer from './Footer';
import { Oops } from './Oops';
...
```

The first line is importing a _default_ export (`export default function () { ··· }`), the second is importing a _named_ export (`export function Footer () {...}`);

Given the code above, the result of the exports is an object that looks like this:

```javascript
import * as math from "./math";

console.log(math);

// {
//   default: function sub (a, b) {...},
//   sum: function sum (a, b) {...}
// }
```

This is why on line 19 in `HomePage.proxy.spec.jsx` we take the `default` object from the result returned by proxyquire: that is where the exported function is.

The syntax `import Footer from './Footer'` hides the fact that under the hood the imported object is whatever is found inside the `default` property of the object returned by `./Footer`.

## Wrapping up

Proxyquire can mock all sorts of dependencies, this is just an example that applies to React; have a look at the [examples](https://github.com/thlorenz/proxyquire#examples) to see how powerful it can be.

_Useful links:_

- [exploringjs.com/es6/ch_modules.html](http://exploringjs.com/es6/ch_modules.html)
- [airbnb.io/enzyme](http://airbnb.io/enzyme)
- [facebook.github.io/react/docs/test-utils.html](http://airbnb.io/enzyme)
