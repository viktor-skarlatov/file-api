import './App.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux';
import { AuthGuard } from './components/AuthGuard';
import { ErrorDialog } from './components/ErrorDialog';
import { createStore } from './store/store';
import { storeUtils } from './store/utils';

const { store, persistor } = createStore()
storeUtils.appDispatch = store.dispatch;

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <AuthGuard />
        <ErrorDialog />
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
