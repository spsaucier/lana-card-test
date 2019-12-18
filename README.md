# Order & item management app prototype

A restaurant needs to keep track on how many ingredients it has left in stock after each order has been placed

They also want to know how many times a recipe has been ordered.

You are being tasked with building a ui that will let management keep track of these things.

Although management is willing to give you creative freedom they do have certain demands and requirements:

Main requirements(Actual assignment):

1 Management is a big fan of Facebook and has heard of this thing called React so they want you to use it
2 Management wants to be able to see in the same screen pending orders and items inventory
3 Management would like to have a top bar where the number of cancelled, pending, in progress and fulfilled orders is visible
4 An order should not be created if not all the items are in stock

Nice to Have Requirements:

1 Management has read some tech blogs and learned about TypeScript and would like it to be used
1 Management likes filtering things, so he would like to be able to filter the items by color
2 Management wants to be able to cancel an order that is in pending state within 3 minutes of the order being created.
3 An order should be in pending state when first created and transitioned into in progress state after 3 minutes of being created

All this is supported by the apis the manager wrote and the documentation can be found here

https://app.swaggerhub.com/apis/d65yan/restaurant/0.0.0

------------------

Functional plan:

**Dashboard** screen

- pending orders
  - Can cancel order within 3 minutes of placing it
- items inventory
  - Nice to have: Filter by color

**Status bar** on top includes:

- counts of orders in these statuses:
  - cancelled
  - pending
  - in progress
  - fulfilled

**New Order** form

- Order consists of a number of recipes
- Each recipe consists of a number of items
- An order should not be created if all recipes' items are not in stock

------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
