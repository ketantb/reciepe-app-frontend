import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/homepage';
import Register from './components/register/register';
import SignIn from './components/signin/signin';
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
