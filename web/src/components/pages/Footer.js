import { useTranslation } from 'react-i18next';

function Footer() {
	const { t } = useTranslation();

	return (
		<footer>
			<div>
				<p className={'footerLink'}>
				<span>
					&copy; 2023 - {new Date().getFullYear()}{" "}
					<a
					href="https://github.com/NataliiaRybalka"
					target="blank"
					>
						{/* {t('Developing By')}  */}
						<span className='developName'>Nataliia Rybalka</span>
					</a>
				</span>
				</p>
			</div>
			{/* <div>
				<p className={'footerLink'}>
				<span>
					<a
					href="https://github.com/NataliiaRybalka"
					target="blank"
					>
						{t('Design By')} <span className='developName'>Nataliia Rybalka</span>
					</a>
				</span>
				</p>
			</div> */}
		</footer>
	);
};

export default Footer;
