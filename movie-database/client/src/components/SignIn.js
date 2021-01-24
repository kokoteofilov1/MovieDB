import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

function SignIn() {
	const { auth, admin } = useContext(AuthContext);
	const [isAuthenticated, setIsAuthenticated] = auth;

	const [formFields, setFormFields] = useState({
	  email: '',
		password: '',
	});

	const changeFormValues = (event) => {
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};

	const history = useHistory();

	const login = async (event) => {
		event.preventDefault();

		try {
			const body = JSON.stringify({
				email: formFields.email,
				password: formFields.password,
			});

			await axios.post('/api/SignIn', body, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			await setIsAuthenticated(true);

			history.push('/');
		} catch (error) {
			if (error.response.status === 401) {
				console.log('Authentication failed!');
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div>
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<form className="mt-8" action="#" method="POST" onSubmit={login}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm">
						<div>
							<input
								aria-label="Email address"
								name="email"
								type="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
								placeholder="Email address"
								onChange={changeFormValues}
							/>
						</div>

						<div className="-mt-px">
							<input
								aria-label="Password"
								name="password"
								type="password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
								placeholder="Password"
								onChange={changeFormValues}
							/>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember_me"
								type="checkbox"
								className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
							/>
							<label
								htmlFor="remember_me"
								className="ml-2 block text-sm leading-5 text-gray-900">
								Remember me
							</label>
						</div>

						<div className="text-sm leading-5">
							<Link
								to={'/SignUp'}
								className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none hover:underline transition ease-in-out duration-150">
								Don't have an account?
							</Link>
						</div>
					</div>

					<div className="mt-6">
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
									fill="currentColor"
									viewBox="0 0 20 20"></svg>
							</span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
