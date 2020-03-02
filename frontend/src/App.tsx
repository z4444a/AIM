import React, { ReactNode } from 'react';
import { History } from 'history';
import './App.css';
import 'moment/locale/ru';
import AppContainer from './modules/portal/features/app-container/index';
import { SnackbarProvider } from 'notistack';
import { store } from './redux/store/configureStore';
import { Provider } from 'react-redux';

interface RouterProps {
  history: History;
}

export interface LocationState {
  from: string;
}

class App extends React.PureComponent {
  public render(): ReactNode {
    return (
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <AppContainer />
        </SnackbarProvider>
      </Provider>
    );
  }
}

export default App;
