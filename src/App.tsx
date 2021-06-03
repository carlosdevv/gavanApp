import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { LibraryContextProvider } from './contexts/LibraryContext';
import { SearchContextProvider } from './contexts/SearchContext';
import Routes from './routes';
import './styles/global.scss';

function App() {
  return (
    <>
      <SearchContextProvider>
        <LibraryContextProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </LibraryContextProvider>
      </SearchContextProvider>
    </>
  );
}

export default App;
