import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Header from './components/Header';
import Register from './pages/Register';
import SideBar from './components/SideBar';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <AuthProvider>
      <Header />
      <SideBar />
      <main className="MainContent">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/crear-post" element={<CreatePost />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/post/:postId" element={<Post />} />
          </Route>
        </Routes>
      </main>
    </AuthProvider>

  )
}

export default App