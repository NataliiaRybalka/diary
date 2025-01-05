import { useTranslation } from "react-i18next";

function MainDescription({ setAskQuestion }) {
    const { t } = useTranslation();

    return (
        <div className="mcDescription">
            <h2>{t("Metaphorical Cards")}</h2>

            <p>
                {t(
                    "Metaphorical cards have nothing to do with divination, magic and esotericism. This is a tool that will help you extract thoughts and feelings from your subconscious"
                )}{" "}
                💫
                <br />
                🕊{" "}
                {t(
                    "Formulate your question or think about what is bothering you."
                )}
                <br />
                🕊 {t("Receive the message in the form of one card.")}
                <br />
                🕊{" "}
                {t(
                    "Look at the image, read the description and think about what it is about for you?"
                )}
            </p>

            <p>{t("You have two decks of cards at your disposal:")}</p>

            <h3>{t("Fulcrum")}</h3>
            <p>
                {t(
                    "«Fulcrum» - these are resource cards. It depicts positive scenes, landscapes and abstractions that are designed to inspire you, give you strength and joy. Such cards provide an opportunity to formulate a new solution, look at yourself differently, gain internal support and find an external resource."
                )}
            </p>

            <h3>{t("Internal Compass")}</h3>
            <p>
                {t(
                    "«Inner Compass» is a versatile deck with a wide range of looks and scenes to suit almost any situation. It is energetically filled and very harmoniously reflects everything that happens inside a person."
                )}
            </p>

            <button
                className="submit savePage"
                onClick={() => setAskQuestion(true)}
            >
                {t("Ask a Question")}
            </button>
        </div>
    );
}

export default MainDescription;
