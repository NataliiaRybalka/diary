import { useTranslation } from 'react-i18next';

import './Pages.css';

import android from '../../img/android.svg';
import ios from '../../img/ios.png';

function Application() {
	const { t } = useTranslation();

	return (
		<div className='appContainer'>
			<div>
				<a
					href={'https://yourbestfriendbucket.s3.amazonaws.com/yourbestfriend.apk'}
					download="android_app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={android} alt='app for android' className='appLogo' />
					<span className='appText'>{t('download application for android')}</span>
				</a>
			</div>

			{/* <div>
				<a
					href={'https://yourbestfriendbucket.s3.amazonaws.com/yourbestfriend.apk'}
					download="ios_app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={ios} alt='app for ios' className='appLogo' />
					<span className='appText'>{t('download application for ios')}</span>
				</a>
			</div> */}
		</div>
	);
};

export default Application;
