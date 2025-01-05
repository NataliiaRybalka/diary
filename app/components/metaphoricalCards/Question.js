import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput } from "react-native";

import Dropdown from "../pages/Dropdown";
import { FULCRUM, SERVER } from "../../lib/constants";

import { styles } from "./styles";

function Question({ navigation }) {
    const { t } = useTranslation();
    const bgColour = useSelector((state) => state.bgColour.value);

    const [card, setCard] = useState(null);
    const [deck, setDeck] = useState(FULCRUM);
    const [question, setQuestion] = useState("");

    const send = async () => {
        const res = await fetch(`${SERVER}/metaphorical-cards/${deck}/card`);

        if (res.status === 200) {
            const data = await res.json();
            setCard(data);
        }
    };

    useEffect(() => {
        if (card) navigation.navigate("Card", { card });
    }, [card]);

    return (
        <View style={[styles.container, { backgroundColor: bgColour }]}>
            <Dropdown
                data={["Fulcrum", "Internal Compass"]}
                entity={"card"}
                setData={setDeck}
            />

            <TextInput
                style={styles.input}
                value={question}
                onChangeText={(text) => setQuestion(text)}
            />

            <View style={styles.btn}>
                <Text style={styles.btnText} onPress={send}>
                    {t("Ask a Question")}
                </Text>
            </View>
        </View>
    );
}

export default Question;
