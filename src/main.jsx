import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { JournalApp } from './JournalApp';
import { HashRouter } from 'react-router-dom';
import './styles.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         {/* <BrowserRouter> */}
         <HashRouter>
            <JournalApp />
         </HashRouter>

         {/* </BrowserRouter> */}
      </Provider>
   </React.StrictMode>
);
