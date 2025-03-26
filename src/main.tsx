import { HashRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './main.css'

const basename = '/'

createRoot(document.getElementById('root')!).render(
  <HashRouter basename={basename}>
    <App />
  </HashRouter>,
)
