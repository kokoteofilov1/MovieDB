import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import UserReviews from './components/UserReviews';
import AdminPanel from './components/AdminPanel';
import { AuthContext } from './AuthContext';

import { checkAuthentication, checkAdmin } from './api';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const getIsAuthenticated = async () => {
			const result = await checkAuthentication();
			setIsAuthenticated(result.data);
		};

		const getIsAdmin = async () => {
			const result = await checkAdmin();
			setIsAdmin(result.data);
		};

		getIsAuthenticated();
		getIsAdmin();

		console.log('isAuthenticated: ' + isAuthenticated);
		console.log('isAdmin: ' + isAdmin);
	}, [isAuthenticated, isAdmin]);

	return (
		<Router>
			<Switch>
				<AuthContext.Provider
					value={{
						auth: [isAuthenticated, setIsAuthenticated],
						admin: [isAdmin, setIsAdmin],
					}}>
					<Route exact path={'/'} component={Home} />
					<Route path={'/UserReviews'} component={UserReviews} />
					<Route path={'/SignIn'} component={SignIn} />
					<Route path={'/SignUp'} component={SignUp} />
					<Route path={'/AdminPanel'} component={AdminPanel} />
				</AuthContext.Provider>
			</Switch>
		</Router>
	);
}

export default App;
