import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AmericaMap from './pages/map';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<AmericaMap/>}
              ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
