import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </StrictMode>,
)
