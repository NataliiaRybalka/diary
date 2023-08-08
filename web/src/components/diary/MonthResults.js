import { useTranslation } from 'react-i18next';

function MonthResults({user}) {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Week Plans')}</h1>
		</div>
	);
};

export default MonthResults;