---
title: "Build feature flags in React using the Context API: how to"
date: "2020-03-29T09:30:00Z"
description: "Learn how to build and leverage feature flags (or feature toggles) in React to improve both the development/release workflow and the user experience."
publication_status: published
---

_One of the tenets of lean development is "deliver fast, deliver often"._

_Now, this can become tricky when you have to add new, big features to an application that is already live, or you have to delay a release to a specific day (e.g. changing the landing page for a big sale)._

_How can we build (and leverage) [feature flags (or feature toggles)](https://martinfowler.com/articles/feature-toggles.html) to improve both the development/release workflow and the user experience?_

## The case for releasing features "in the dark"

Suppose you have a successful, high traffic blog built in React and you want to add a list of featured posts at the top. The first step would be to break this feature or epic down into smaller stories with your team.

Let's assume that these are the stories you come up with:

- create an empty container for the featured posts
- display a list of unstyled posts
- add style to the list of posts
- add UX behaviour to the list of posts, such as a link to the post page and author page

You can expect to have other work ongoing in parallel, like maintaining the blog, making small UI changes etc so how do you handle this big feature release? You definitely cannot go live with an empty container at the top of the page, or with a list of unstyled text that has no behaviour.

One solution may be to create a long-living branch that you rebase on to master as often as you manage to remember (and fix all the conflicts every time), and build the whole feature there, then do a big-bang release of all the code. I don't need to go on to explain why this is a bad decision on so many levels.

**Another solution is to use feature flags to wrap your new feature so that you release the code to production as often as you want, following your usual development/release workflow, you just don't display it to the user.**

Following is an example:

```jsx
// This configuration can come from wherever you prefer:
// a config file, a mongo database, etc
const features = {
  featuredPosts: false,
};

// In your react component
import FeaturedPosts from "./featured-posts";

const HomePage = ({ features }) => {
  return (
    <article>
      // ... other content
      {features.featuredPosts && <FeaturedPosts />}
      // ... other content
    </article>
  );
};
```

So the idea behind feature flags is to ship code "in the dark", without the user seeing it.  
This way you can keep your big feature within your normal development/delivery flow, just hidden from the final users.

## React implementation

I want to create a small component to wrap content with so that I can decide whether or not to render it based on the value of a feature flag.

To keep this as simple as possible, the following is the way I see this component being used:

```jsx
import FeaturedPosts from "./featured-posts";

<Feature name="featuredPosts">
  <FeaturedPosts />
</Feature>;
```

This is a very declarative, React-like way of consuming features.

Where do I get the features' list from, though? And what a possible implementation may look like?

[React Context](https://reactjs.org/docs/context.html) can help inject a list of features into the application and retrieve it later, as for the component implementation, let's have a look:

```jsx
import { createContext, useContext } from "react";

const FeaturesContext = createContext();

export const FeaturesProvider = FeaturesContext.Provider;

export const Feature = ({ name, children }) => {
  const flags = useContext(FeaturesContext);

  if (!children) {
    return null;
  }

  return flags[name] ? children : null;
};
```

First of all, I am creating a `FeaturesContext` to be used later to wrap my app.

The `Feature` component then takes the feature's name and the children and based on the boolean state of the feature, it'll either render the children (if the feature is enabled) or `null`. It can do it because it's got access to the list of feature flags from the context.

Following is a usage example:

```jsx
import FeaturedPosts from "./featured-posts";

const HomePage = () => {
  return (
    <>
      /* other content */
      <Feature name="featuredPosts">
        <FeaturedPosts />
      </Feature>
      /* other content */
    </>
  );
};

const features = {
  featuredPosts: true,
};

const App = () => {
  return (
    <FeaturesProvider value={features}>
      <HomePage />
    </FeaturesProvider>
  );
};
```

## Adding MVT (MultiVariate Testing) support

The use case for MVT is when you want to try out different variations of the same feature (e.g. trying out three different colors for call to action buttons) to see which one is the best performer.

We can easily extend the `Feature` component to support MVT by adding a `variation` property:

```jsx
export const Feature = ({ name, variation, children }) => {
  const flags = useContext(FeaturesContext);

  if (!children) return null;

  if (variation === undefined) {
    return flags[name] ? children : null;
  }

  return flags[name] === variation ? children : null;
};
```

In the code above, if we don't receive a `variation`, we treat the flag as a `Boolean` otherwise we only render the correct variation.

## Thoughts on deployment environments

Many projects are deployed through a series of environments (dev, staging, pre-prod, _add your name here_) before being released to production.

This can allow for additional levels of testing, usually E2E tests, to be carried out. You can fully test the code behind a feature flag by having different settings for different environments: one of the practices that I'd use is to have all features enabled on a staging environment and run all level of tests against them, then have them turned off in pre-prod and prod.

This way you have the confidence of having well-tested features and the ability to keep them hidden until it's release time.

## Feature flags and technical debt

Technical debt is a reality in every application we build. It can be kept under control, but real-life scenarios call for technical debt to be created in order to deliver faster in some periods or accommodate for temporary business requirements.

It is like a loan: you need it, but you also need to have a plan in place to pay it back.

Feature flags add to technical debt because they are part of the code only for a short amount of time and need to be removed afterwards, without actually being a user feature.

This doesn't mean they shouldn't be used, the opposite actually, but there must be a plan in place to clean up the code: every time you use them, make sure your stories include points about removing the feature flag wrapping your code and update the tests to reflect the presence of the feature, plus anything else you may have to do.

Enjoy your improved workflow!
