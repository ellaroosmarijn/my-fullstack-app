import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'

import './index.css'
import { BrowserRouter } from 'react-router-dom'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
})
