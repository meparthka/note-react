import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Error404 from './Error404'
import '../style/style.css'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
