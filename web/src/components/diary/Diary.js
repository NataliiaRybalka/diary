import { useTranslation } from 'react-i18next';

import Menu from './Menu';

function Diary() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Diary')}</h1>

			<Menu />
		</div>
	);
};

export default Diary;