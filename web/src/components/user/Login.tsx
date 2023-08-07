import './Registration.css';

import { Link } from 'react-router-dom';

function Login(): any {
	return (
		<div className="container">
			<div className="center">
				<h1>Login</h1>
				<form method="POST" action="">
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
					<input name="submit" type="Submit" value="Sign In" />
					<div className="signup_link">
						Have not an Account ? <Link to='/signup'>Register Here</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;