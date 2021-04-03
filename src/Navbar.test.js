import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import {createStore} from "redux";
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import Navbar from "./Navbar";

afterEach(cleanup);

const startingState = {};

/**
 * reducer function to mimic the reducer used in Redux.
 * @param {object} state - holds an object of data used within the components
 * @param {object} action - object where the values are strings used to fire certain actions
 */
function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_TRACKS":
      return {...state, tracks: action.tracks};
    default:
      return state;
  };
};

/**
 * Function that renders the component within a redux environment since most 
 * components rely on redux for data in order to mount.
 * @param {ReactComponent} component - private spotify client id
 * @param {function} store - creates the react store using the createStore method imported from redux
 */
function renderWithRedux(
  component,
  {initialState, store = createStore(reducer, initialState)} = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

//SMOKE TEST
describe('Smoke Test for Navbar component', () => {

  it('renders without crashing', () => {
    const history = createMemoryHistory();

    renderWithRedux(
      <Router history={history}>
        <Navbar />
      </Router>
    );
  });
});

//SNAPSHOT TEST
describe('Snapshot Test for Navbar component', () => {

  it('matches snapshot', () => {
    const history = createMemoryHistory();

    const {asFragment} = renderWithRedux(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});