import { createContext, useEffect, useState } from 'react';
import Menu from './Components/Menu';
import Login from './Components/Login';
import { checkAuth } from './Services/AuthService';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Load from './Components/Load';

export const AuthContex = createContext();

function App() {
	const [isAuth, setIsAuth] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		checkAuth()
			.then((res) => {
				setIsAuth(res.success);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (isAuth === null) return <div style={{width:"100%", height:"100vh"}}><Load /></div>;
	else if (!isAuth) return <Login setIsAuth={setIsAuth}></Login>;

	return (
		<div className="App">
			<AuthContex.Provider value={{ isAuth, setIsAuth }}>
				<Menu></Menu>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</AuthContex.Provider>
		</div>
	);
}

export default App;
