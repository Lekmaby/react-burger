import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App/App.tsx';
import './index.css';
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import {Provider} from "react-redux";
import {store} from "./store.ts";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <ErrorBoundary>
                        <App/>
                    </ErrorBoundary>
                </DndProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
);
