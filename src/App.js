import logo from './logo.svg';
import './App.css';
import ScreenFirst from './ScreenFirst';
import ScreenSecond from './ScreenSecond';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<ScreenFirst />}/>
        <Route exact path="/second" element={<ScreenSecond />}/>
      </Routes>
        
    </BrowserRouter>
  );
}

export default App;
