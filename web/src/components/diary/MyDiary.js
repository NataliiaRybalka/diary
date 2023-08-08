import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MyDiary({user}) {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Dear Diary!')}</h1>

			<div>
				<nav>
					<ul>
						<li className='mainNavLi'>
							<Link to="/my-diary/week-plans">{t('Week Plans')}</Link>
						</li>
						<li className='mainNavLi'>
							<Link to="/my-diary/diary">{t('Diary')}</Link>
						</li>
						<li className='mainNavLi'>
							<Link to="/my-diary/month-results">{t('Month Results')}</Link>
						</li>
						<li className='mainNavLi'>
							<Link to="/my-diary/results">{t('Results')}</Link>
						</li>
						{user && user.sex === 'female' && <li className='mainNavLi'>
							<Link to="/my-diary/menstrual-cycle">{t('Menstrual Cycle')}</Link>
						</li>}
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default MyDiary;