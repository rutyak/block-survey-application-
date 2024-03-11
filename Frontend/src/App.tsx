import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Form from './Components/Blocks/Formblock/Form';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Preview from './Components/Blocks/Preview/Preview';

function App() {
  return (
    <div className="App">
      <Navbar/>
           <Routes>
             <Route path='/' element={<Form/>}/>
             <Route path='/preview' element={<Preview/>}/>
           </Routes>   
    </div>
  );
}

export default App;
