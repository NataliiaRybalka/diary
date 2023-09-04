import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { SERVER } from '../../lib/constants';

import logo from '../../img/logo.png';

function Header({ user }) {
	const { t } = useTranslation();

	const lang = localStorage.getItem('lang');
	const bgColour = localStorage.getItem('bgColour');
	const [selectedLanguage, setSelectedLanguage] = useState(lang || 'en');
	const [selectedBgColour, setSelectedBgColour] = useState(bgColour || '#ffe5cc');

	const chooseLanguage = (e) => {
		e.preventDefault();
        setSelectedLanguage(e.target.value);
		localStorage.setItem('lang', e.target.value);
    };

	const sendLanguage = async () => {
		if (!user) return;

		const resp = await fetch(`${SERVER}/user/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify({language: selectedLanguage}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status === 201) localStorage.setItem('lang', selectedLanguage);
	};

	const selectColour = (e) => {
		setSelectedBgColour(e.target.value);
		localStorage.setItem('bgColour', e.target.value);
	};

	const logout = () => {
		localStorage.removeItem('user');
		window.location = '/signin';
	};

	useEffect(() => {
        i18n.changeLanguage(lang);
		sendLanguage();
	}, [selectedLanguage, lang]);

	useEffect(() => {
		localStorage.setItem('bgColour', selectedBgColour);
		document.body.style.backgroundColor = selectedBgColour;
	}, [selectedBgColour]);

	return (
		<header>
			<img src={logo} alt='Dear Diary' className='logo' />

			<div>
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
							<select className='chooseLanguage' style={{ backgroundColor: bgColour }} defaultValue={selectedLanguage} onChange={e => chooseLanguage(e)}>
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
			</div>
		</header>
	);
};

export default Header;
