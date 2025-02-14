import './App.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './store/store'
import { AuthGuard } from './components/AuthGuard';
import { ErrorDialog } from './components/ErrorDialog';

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
