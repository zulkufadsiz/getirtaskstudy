# Market App

#### Description

Basic Market app, is a simple responsive market application developed using React, React Hooks
and an example of an e-commerce application in which standard CRUD transactions are made.

![Market App With Redux][main-screenshot]
![Market App With Redux][responsive-screenshot]

### Built With

The major frameworks used when built the project:

- [React](https://reactjs.org/)
- [React-Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Redux-thunk](https://redux.js.org/usage/writing-logic-thunks)
- [Material-ui](https://mui.com/material-ui/getting-started/overview/)
- [Jss](https://cssinjs.org/?v=v10.9.2)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- Atomic Design principles (Not exactly. But it has been tried)
- Error Boundary

## Getting Started

To get a local copy up and running follow steps:

### Prerequisites

This project is currently not dependent on any back-end, database or prerequisites. You can continue with the steps below.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/zulkufadsiz/getirtaskstudy.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```
3. Start JSON Server

   ```JS
   node server.js
   ```
3. Start Project

   ```JS
   npm start
   ```   

## Usage

You can sort the radio buttons in the sidebar according to the price of the product or the date it was added. You can also filter products by brand and tag. You can switch between pages with pagination. To add a product to the cart, simply click the add button of the relevant product. You can click on the basket icon in the header to update the count of the product you have added to the basket or to delete it from the basket.

### What could be better? What can be added?
- I could write more jss and tests but it took too much time.
- I wrote some basic tests and only used jss in the footer component.
- I had to use some !important to overwhelm the css from the Material ui.
- It can be written with better css. Functions can be placed in a more modular system.
- Finally for resuable components maybe I could create storybook.

# Component usage
## IncDecInput
IncDecInput is used to increase or decrease the input value.
```js
<IncDecInput value={count} setValue={(count) => {}} />
```
### Options

The IncDecInput component can contain the following properties:

- `value` (required): Accept a number of value it can be integer
- `setValue`: (required): Return new value of input.

## FilterItem
FilterItem component is used for filtering and sorting operations.
```js
      <FilterItem
        value={`${_sort}-${_order}`}
        name="Sorting"
        radio={sortingValues}
        setFilter={applySorting}
      />
      <FilterItem
        name="Brands"
        search={searchBrands}
        onChange={onBrandChange}
        checkbox={company.companies.filter((item) =>
          item.name.toLowerCase().includes(company.searchText.toLowerCase())
        )}
      />
      <FilterItem
        name="Tags"
        search={searchTags}
        onChange={onTagChange}
        checkbox={tags.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))}
      />
```
### Options

The FilterItem component can contain the following properties:

- `name` (required): Accept a string value and show labels top of the component
- `search` (function): Callback fired when the value changes and return new value
- `radio` (array[]): Object options are id,value,label.
- `checkbox` (array[]): Object options are id, name, value, label, isChecked
- `setFilter` (required for radio): Callback fired when the state is changed.You can get new sorting value.
- `onChange` (required for checkbox) : Callback fired when the state is changed. You can pull out the new checked state by accessing event.target`.checked (boolean)

## Tag
You can use tag for show selected products or product tag options top of the page.
```js
        <Tag label="mug" />
        <Tag label="shirt" disabled />
```
### Options

The Tag component can contain the following properties:

- `label` (string): Accept a string value and show labels in the component
- `onClick` (function): Callback fired when click the item 
- `disabled` (boolean): Disabled tag default false.

[main-screenshot]: https://i.ibb.co/zm0R72T/Screen-Shot-2022-11-30-at-12-11-49.png
[responsive-screenshot]: https://i.ibb.co/Bc16yKC/Screen-Shot-2022-11-30-at-12-12-41.png
