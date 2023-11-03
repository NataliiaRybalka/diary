import { useTranslation } from 'react-i18next';

import Menu from './Menu';

function MyDiary() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Dear Diary!')}</h1>

			<Menu />
		</div>
	);
};

export default MyDiary;