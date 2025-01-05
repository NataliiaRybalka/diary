import { useTranslation } from "react-i18next";

import "./Pages.css";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer>
            <div>
                <p className={"footerLink"}>
                    <span>
                        {t("For any questions: ")}
                        <span
                            className="developerEmail"
                            onClick={() =>
                                (window.location =
                                    "mailto:your.best.friend.diary@gmail.com")
                            }
                        >
                            your.best.friend.diary@gmail.com
                        </span>
                    </span>

                    <span>
                        &copy; 2023 - {new Date().getFullYear()}{" "}
                        <a
                            href="https://github.com/NataliiaRybalka"
                            target="blank"
                        >
                            <span className="developerName">
                                Nataliia Rybalka
                            </span>
                        </a>
                    </span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
