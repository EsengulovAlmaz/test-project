import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './main.css'

const basename = '/test-project'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
)
