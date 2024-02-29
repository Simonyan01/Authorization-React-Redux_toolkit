import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'
import 'utils/firebase.js';
import "./main.css"

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
