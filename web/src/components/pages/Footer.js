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
					Nataliia Rybalka
					</a>
				</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
