import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContex } from '../App';
import { login, logout } from '../Services/AuthService';
import About from './About';
import Home from './Home';

const Menu = () => {

	const {isAuth, setIsAuth} = useContext(AuthContex);

	return (
			<div className='menu'>
				<Link to={'/'}>Home</Link>
				<Link to={'/about'}>About</Link>
				<a href="#" onClick={() => {
					logout(setIsAuth)
				}}>
					Logout
				</a>
			</div>
	);
};

export default Menu;
