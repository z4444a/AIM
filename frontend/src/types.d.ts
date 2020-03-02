import { ActionType, StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./redux/store/configureStore').store>;
  export type RootState = StateType<typeof import('./redux/store/configureStore').rootReducer>;
  export type RootAction = ActionType<typeof import('./redux/actions/index').default>;

  interface Types {
    RootAction: RootAction;
  }
}
