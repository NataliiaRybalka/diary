import './Registration.css';

import { Link } from 'react-router-dom';

import { SERVER } from '../../lib/constants';

function Registration(): any {
	return (
		<div className="container">
			<div className="center">
				<h1>Register</h1>
				<form method="POST" action={`${SERVER}/signup`}>
					<div className="txt_field">
						<input type="text" name="username" required />
						<span></span>
						<label>Username</label>
					</div>
					<div className="txt_field">
						<input type="email" name="email" required />
						<span></span>
						<label>Email</label>
					</div>
					<div className="txt_field">
						<input type="password" name="password" required />
						<span></span>
						<label>Password</label>
					</div>
					<input name="submit" type="Submit" value="Sign Up" />
					<div className="signup_link">
						Have an Account ? <Link to='/signin'>Login Here</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Registration;