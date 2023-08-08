import { useTranslation } from 'react-i18next';

function Diary({user}) {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Diary')}</h1>
		</div>
	);
};

export default Diary;