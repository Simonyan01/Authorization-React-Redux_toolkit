import UserContextProvider from 'context/createContext';
import Router from 'routes/Router';

const App = () => {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  )
}

export default App
