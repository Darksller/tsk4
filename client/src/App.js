import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</>
	)
}

export default App
