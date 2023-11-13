import './Pages.css';

function Footer() {

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
						<span className='developerName'>Nataliia Rybalka</span>
					</a>
				</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
