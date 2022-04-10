---
title: "Snapshot testing and why it makes sense"
date: "2017-02-24T10:00:00.000Z"
description: "Snapshot testing and why it makes sense"
publication_status: published
---

The JavaScript world is ever changing: every day new libraries come out and, as developers, we're lucky enough to get to try all these new ideas in our every day job.

Using the right tool for the right job means, in the end, using more tools and this leads us to more configuration, orchestration and maintenance (and, possibly, bugs). All of this goes under the name of _JavaScript fatigue_, a name that should represent the effort needed to stay on top of our game.  
JavaScript fatigue is, from my point of view, a blessing and we should embrace it as an opportunity to constantly add quality and improvements to our code base.

Of course not every tool or library will add value to the code, but many of them will help build the foundation of the next big thing.

Selecting the right tools is key.

### Jest, yet another tool

[Jest](https://facebook.github.io/jest/) is the best testing tool that I've been using lately.  
It is built on top of Jasmine and developed by Facebook. Like Jasmine, it offers a test runner, assertion and mock methods.  
Its API is very similar to what the combo Mocha/chai offers, so the switch is easy and painless. Among other useful features, Jest offers an advanced system for mocking external dependencies (automatically or manually) and a new concept for testing React components called Snapshot testing.

### Back to basics: unit testing a function

Unit testing is all about isolating the system under test and checking that at every given input corresponds a given, predictable output: what is easier to test than a well thought function?

1.  Call the function with specific arguments
2.  Compare the result with an expected value

As an example, we'll use a `parseDate` function that takes a Date object in input and returns a different object containing day, month and year.  
The implementation is not important, just to have something to get going:

This function can be easily tested by passing different dates in input and checking that the output is the expected object (boooring!)

If the expected object was big enough, you could decide to store it in a file, read that file at the beginning of your test and use that as expected result.

In a very similar fashion you can test API endpoint handlers: using a json file for the expected result that the endpoint should return:

This ensures that the response looks 100% like the json that you want: you usually don't test just a small part of it.

### Unit testing UI views and React components (and choosing what to test)

Testing the UI has alway been different from function testing:

1.  Initialise and render the view in some sort of DOM,
2.  Search for elements of interest in the DOM and make assertions on them.

Very different from passing arguments to a function and getting an output: **a)** you have a hidden dependency that needs to be there (DOM) and **b)** you don't test the result: you search for something known and make assertions on it.

In React, though, a component is just a function (or behaves like it in case you use the class declaration) so you can pass specific props and get back a React tree.

In case of shallow rendering, this becomes:

1.  (Shallow) render the component passing props and store the result in a variable (no DOM needed),
2.  Search for elements of interest in the result and make assertions on them.

The DOM dependency is now out of the equation (because of the [shallow renderer](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering), more on this later), but we still have to search the result for known elements to make assertions like:

- Do I have a list with 10 elements?
- Do I have an element with class "header"?
- Does it contain the text "Buy now"?

Different from comparing the output of your render with an expected result, but React allows us to test the UI in a more function-like fashion.

UI testing, with all its moving parts, forces the developer to decide between partial testing (testing only the parts related to the UI logic, that are less likely to change) or go for deep testing: checking element types, classes and copy. When going for the second approach, tests become more brittle and need more maintenance: this is where snapshot testing comes into play.

### Unit testing with snapshots

From the [Jest website](https://facebook.github.io/jest/docs/snapshot-testing.html):

> Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.

> Instead of rendering the graphical UI, which would require building the entire app, you can use a test renderer to quickly generate a serializable value for your React tree.

I will not go into details of how exactly snapshot testing works, Facebook published [great](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) [articles](https://facebook.github.io/jest/docs/snapshot-testing.html) about it, definitely worth reading if new to the concept.

In short, snapshot testing means fully rendering a component (generating its React tree) and comparing the result with a stored, expected version (snapshot).  
If the new version differs (you added a container, changed a _div_ into a section) the test fails and you are shown a diff with the changes. At this point you get to accept the changes or fix your code. If accepted, the stored snapshot gets updated with the newly accepted version.  
The very first time you run the snapshot test, the generated tree is implicitly accepted and stored in a file: that will represent the reference for future changes.

With snapshots, the flow becomes:

1.  (Shallow) render the component passing props and store the snapshot in a variable
2.  Compare the resulting snapshot with a previously stored one

No dependency on the DOM and we are comparing the whole output with an expected result: ?

A simple example on how to snapshot test a component and what gets generated follows:

This test generates the following snapshot:

_The use of `toJson` from the [enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json) package is needed to convert the result of the shallow renderer to a serializable value (more on this later). This can be avoided, though, by adding [jest-serializer-enzyme](https://github.com/rogeliog/jest-serializer-enzyme) as a `snapshotSerializers` in the Jest config._

Since the whole output is captured by the snapshot, it is good practice to either **shallow render the component** or **mock it's dependencies**, so that a change in a nested component doesn't break the test.

Snapshot testing gives you a completely different view of your component, showing all the generated tree, every time. It implicitly tests 100% of the generated markup, forcing you to accept or reject every small change.

### It still feels like TDD

Snapshot testing differs from the usual TDD approach but, for UI testing, it's even better.

When we start developing a component we seldom know everything about it (the complete render output): class names, HTML attributes, element types are probably unknown, and more of an implementation detail. We know what the content should be and how it should behave, but we don't know every detail: that's why, when writing the tests, we only partially test the component, leaving outside all the unknowns.

Now consider the following workflow:

1.  Start jest in watch mode,
2.  Write a snapshot test for a basic use case - test fails (component doesn't exists),
3.  Implement your component as an empty _div_, nothing else - snapshot gets created and test passes, although no logic has been introduced yet (snapshot is implicitly accepted because it's being created),
4.  Implement a small feature of the component (i.e. Make it a button) - test fails and shows you the diff,
5.  Accept the changes or fix the component to make it look like it should and then accept the changes - snapshot gets updated and test passes,
6.  Repeat 4 to 5 until the component respects the requirements for that particular scenario,
7.  Add a new use case and repeat 4 to 6.

Although when using snapshot testing the concept of test-driven development is slightly different, this workflow ensures that you always have to review every small code change that reflects into a UI change and never implicitly accept an unwanted change.

### Snapshots are not only for components

Snapshots are an invaluable tool when it comes to UI testing, but their use is not only limited to it: technically _every serialisable value can be captured_.  
To make it useful, of course, the serialised value needs to retain its meaning so that it can be tested: there's not much value in serialising a function into `[Function]`.

A few examples follow, along with the generated snapshots:

While it's definitely possible to test API responses and other structures using snapshots, I still feel that setting expectations beforehand for completely defined modules is a better choice.  
Snapshots may be a nice addition when a module is stable, to prevent any unwanted change to happen, but I still see them as an addition, not a replacement for these cases.

### More time spent on testing scenarios

Since writing the actual expectation for a snapshot test is trivial, you can spend more time on creating more scenarios to make your component more robust: the following is just a small list.

- Scenario with no props passed (testing defaults and undefined props)
- Scenario with all props
- Scenario with props of wrong types
- Scenario with children
- Scenario with no children

Spending time on more scenarios means more resilient, robust code.  
Also, since the actual assertions when using snapshots don't communicate the intended behaviour well, it becomes essential to write better test cases (more on this later).

### The value of code reviews

In addition to "spec" files, we now get to review snapshot files. These are important files that should be reviewed with care, as they represent the UI markup the gets generated and the reviewer should take extra time to ensure that that markup is correct.

Since there are no specific expectations in code, test descriptions also become more important as they should clearly explain what that test is there for. Try to run the tests and read the output of the command line reporter: if it doesn't communicate the intentions of the tests and the expected behaviour, work on the descriptions and make sure the tests represent your best documentation.

### Keeping an open mind

Snapshots introduce a new, different way of testing where we don't set expectations _beforehand_ but we get to accept/refuse the _outcome_ of a test.  
It can feel uncomfortable at the beginning and it has to be used with an open mind, judging the results rather than the approach.

As with everything, it is not a perfect solution and cannot be applied everywhere:

- it's very easy to accept wrong snapshots by just pressing a button,
- when multiple snapshots are failing it's complicated to cherry-pick the ones you want to accept, very easy to accept them all (including the failing ones),
- every time the name of a test is changed (`describe`, `it` or `test` descriptions), the snapshot gets re-generated and implicitly accepted as newly created snapshot, so if you also change the code implementation at the same time, you'd be potentially accepting a failing snapshot.

On the other hand, knowing what to watch out for, snapshots represent a very valuable tool when it comes to checking how the UI reacts to code changes.

My suggestion is to try it and give it a go for more than one week: I'm sure you won't look back.
