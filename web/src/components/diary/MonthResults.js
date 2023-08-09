import { useTranslation } from 'react-i18next';

import Menu from './Menu';

function MonthResults() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Month Results')}</h1>

			<Menu />
		</div>
	);
};

export default MonthResults;