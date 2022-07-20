import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/AuthService';

const Login = (props) => {
	const email = useRef();
	const pass = useRef();

	const navigate = useNavigate();

	return (
		<div className='login'>
			<div className='loginForm' >
        <h1 style={{padding:'10px'}}>Login</h1>
				<input type={'email'} placeholder={'Email'} ref={email} />
				<input type={'password'} placeholder={'Password'} ref={pass} />
				<input
					type={'submit'}
					value={'Login'}
					onClick={() => {
						login(email.current.value, pass.current.value)
							.then((res) => {
								props.setIsAuth(res.success);
								if (res.success == true) navigate('/');
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				/>
			</div>
		</div>
	);
};

export default Login;
