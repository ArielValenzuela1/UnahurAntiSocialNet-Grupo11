import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import NavBar from './components/NavBar';
import Header from './components/Header';

function App() {

  return (
    <>
      <Header />
      <NavBar />
      <main className="MainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crear-post" element={<CreatePost />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </main>
    </>

  )
}

export default App