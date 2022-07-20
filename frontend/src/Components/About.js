import React, { useEffect, useState } from 'react';
import { axiosWithToken } from '../Services/AuthService';

const About = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axiosWithToken({ method: 'get', url: 'http://localhost:3001' })
			.then((res) => {
				console.log(res.data);
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div style={{ padding: '10px' }}>
			{users.map((user) => {
				return (
					<div key={user.id} style={{ borderBottom: '1px solid black', padding: '5px' }}>
						<h2>{user.name}</h2>
						<p>{user.age}</p>
					</div>
				);
			})}
		</div>
	);
};

export default About;
