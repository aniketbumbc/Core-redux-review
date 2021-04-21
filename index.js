const redux = require('redux');
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE = 'BUY_ICE';

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action',
  };
}

function buyIcecream() {
  return {
    type: BUY_ICE,
    info: 'Second redux action',
  };
}

const initialState = {
  numOfCakes: 10,
};

const initialIceState = {
  numOfIce: 30,
};

const iceReducer = (state = initialIceState, action) => {
  switch (action.type) {
    case BUY_ICE:
      return {
        ...state,
        numOfIce: state.numOfIce - 1,
      };
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducer({
  ice: iceReducer,
  cake: reducer,
});
const store = createStore(rootReducer);

console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() =>
  console.log('update Sotre', store.getState())
);
store.dispatch(buyCake(), buyIcecream());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();
