import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, DeepPartial } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from '../reducers';
import rootSaga from '../sagas';
import { RootState } from 'typesafe-actions';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
export const rootReducer = createRootReducer(history);

function configureStore(preloadedState?: DeepPartial<RootState>) {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line @typescript-eslint/no-explicit-any
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancer(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();
