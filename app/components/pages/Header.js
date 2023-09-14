import { useEffect } from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Image } from 'react-native';

// import i18n from '../../i18n';
// import { changeBg } from '../../redux/bgColour.slice';
// import { changeLang } from '../../redux/language.slice';
// import { SERVER } from '../../lib/constants';

function Header({ user }) {
	// const { t } = useTranslation();

	// const language = useSelector(state => state.language.value);
	// const bgColour = useSelector(state => state.bgColour.value);
	// const dispatch = useDispatch();

	// const chooseLanguage = (e) => {
	// 	localStorage.setItem('lang', e.target.value);
	// 	dispatch(changeLang(e.target.value));
    // };

	// const sendLanguage = async () => {
	// 	if (!user) return;

	// 	const resp = await fetch(`${SERVER}/user/${user.id}`, {
	// 		method: 'PUT',
	// 		body: JSON.stringify({language}),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});

	// 	if (resp.status === 201) localStorage.setItem('lang', language);
	// };

	// const selectColour = (e) => {
	// 	dispatch(changeBg(e.target.value));
	// 	localStorage.setItem('bgColour', e.target.value);
	// };

	// const logout = () => {
	// 	localStorage.removeItem('user');
	// 	window.location = '/signin';
	// };

	// useEffect(() => {
	// 	console.log(language);
    //     i18n.changeLanguage(language);
	// 	sendLanguage();
	// }, [language]);

	// useEffect(() => {
	// 	localStorage.setItem('bgColour', bgColour);
	// 	document.body.style.backgroundColor = bgColour;
	// }, [bgColour]);

	return (
		<View style={styles.header}>
			<Image source={require('../../img/logo.png')} style={styles.logo} />

			{/* <div>
				<nav>
					<ul>
						{user && <li className='mainNavLi'>
							<Link to="/my-diary">{t('My Diary')}</Link>
						</li>}
						{user && <li className='mainNavLi'>
							<Link to="/metaphorical-cards">{t('Metaphorical Cards')}</Link>
						</li>}
						{user && <li className='mainNavLi'>
							<Link to="/">{user.username}</Link>
						</li>}
						<li className='mainNavLi'>
							{!user 
								? <Link to="/signin">{t('Sign in')}</Link>
								: <button className='logoutBtn' onClick={logout}>{t('Log out')}</button>
							}
						</li>
						<li className='mainNavLi'>
							<select className='chooseLanguage' style={{ backgroundColor: bgColour }} defaultValue={language} onChange={e => chooseLanguage(e)}>
								<option value='en'>en</option>
								<option value='ru'>ru</option>
								<option value='ua'>ua</option>
							</select>
						</li>
						<li className='mainNavLi'>
							<select className='selectColorBtn' style={{ backgroundColor: bgColour }} defaultValue={bgColour} onChange={e => selectColour(e)} >
								<option value='#ffe5cc' style={{ backgroundColor: '#ffe5cc' }}></option>
								<option value='#eebeed' style={{ backgroundColor: '#eebeed' }}></option>
								<option value='#cae6f7' style={{ backgroundColor: '#cae6f7' }}></option>
								<option value='#d0fbd9' style={{ backgroundColor: '#d0fbd9' }}></option>
								<option value='#f1f9b4' style={{ backgroundColor: '#f1f9b4' }}></option>
							</select>
						</li>
					</ul>
				</nav>

				<hr />
				<Outlet />
			</div> */}
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1
	},
	logo: {
		height: '70px',
	}
});

export default Header;
