import { useTranslation } from 'react-i18next';

import Menu from './Menu';

import './MyDiary.css';

function MyDiary() {
	const { t } = useTranslation();

	return (
		<div className='myDiaryHeader'>
			<h1>{t('Dear Diary!')}</h1>

			<Menu />
		</div>
	);
};

export default MyDiary;