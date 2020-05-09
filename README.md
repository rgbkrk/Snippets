# Snippet UI Take Home Assignment

![](images/initial_view.png)

## Overview

The Snippet UI consists of an input and output area. The input area contains a code editor which accepts javascript code. The output area needs to display the result of the evaluated code in the code editor, e.g. see below. **The goal of this activity is to hook up the `Run` button so that the results of the evaluated code appear in the output area.**

![](images/results.gif)

## Summary

### Goal

1. Hook up the `Run` button so that the results of the evaluated javascript code appear in the output area of the UI.
2. Include a separate `README.md` entitled `SOLUTION.md` explaining a bit about what you did and also how you would test your solution.

### Extra Credit

1. Make the UI your own by adding styling or improving the UX.
2. Create a snippet history feature.

If you have extra time and want to go further, you could try your hand at hooking up the snippet history feature. The end result should be a simple list of previously run snippets identified by their snippet id. The task is as follows:

1. Display a list of the previously run snippets in the side drawer (to get to the side drawer, see image below). You may use the snippet `id` as the display text for each item in the list.

![](images/snippet_history.gif)

2. Make each item in the list clickable, and when clicked the UI should display both the input and output of the previously run snippet.

**Hint**: This requires examining the `server/schema.ts` file to determine which [GraphQL](https://www.apollographql.com/docs/apollo-server/) queries are available and hooking them up utilizing [Apollo Client](https://www.apollographql.com/docs/react/).

## Getting Started

### Prerequisites

1. [Node](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/getting-started/install)

### Install dependencies

In the project directory, you can run:

```
$ yarn && yarn start
```

## Getting help

If you have questions, run into issues, or find bugs, please feel free to contact us at dsp-notebook-dl@netflix.com.

## Submitting the assignment

When you are done, zip the project folder and email it to dsp-notebook-dl@netflix.com.

## References

- [React](https://reactjs.org/)
- [Apollo](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [MaterialUI](https://material-ui.com/)
- [Styled Components](https://styled-components.com/docs/basics)
- [Typescript](https://www.typescriptlang.org/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
