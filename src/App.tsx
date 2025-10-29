import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {

  return (
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/crear-post" element={ <CreatePost/> } />
          <Route path="/perfil" element={ <Perfil/> } />
          <Route path="/post" element={ <Post/>} />
        </Routes>
  )
}

export default App