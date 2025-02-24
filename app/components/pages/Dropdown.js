import { useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, Modal, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import { changeBg } from "../../redux/bgColour.slice";
import { changeLang } from "../../redux/language.slice";
import { FULCRUM, INTERNAL_COMPASS } from "../../lib/constants";

import { styles } from "./styles";

function Dropdown({
    data,
    entity,
    dispatchFuncName = null,
    setData = null,
    select = null,
    row = null,
    setRowInFocus = null,
}) {
    const DropdownButton = useRef();
    const { t } = useTranslation();

    const bgColour = useSelector((state) => state.bgColour.value);
    const windowDimensions = useSelector(
        (state) => state.windowDimensions.value
    );
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(select);
    const [dropdownTop, setDropdownTop] = useState(0);

    const getData = async () => {
        const data = await AsyncStorage.getItem(entity);
        setSelected(data);
    };

    useEffect(() => {
        if (entity !== "card" && !select) getData();
        else if (!select) setSelected(t(data[0]));
    }, []);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) =>
            setDropdownTop(py - h)
        );
        setVisible(true);
    };

    const onItemPress = async (item) => {
        if (entity === "lang") i18n.changeLanguage(item);
        if (entity !== "card") await AsyncStorage.setItem(entity, item);

        if (dispatchFuncName) {
            const dispatchFunc =
                dispatchFuncName === "changeLang" ? changeLang : changeBg;
            dispatch(dispatchFunc(item));
        }
        if (entity === "card") {
            const deck =
                item === "Internal Compass" ? INTERNAL_COMPASS : FULCRUM;
            setData(deck);
        }

        setSelected(t(item));
        setVisible(false);
    };

    useEffect(() => {
        if (entity === "notifLang") {
            setData(selected);
            setRowInFocus(row);
        }
    }, [selected]);

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={styles.overlay}
                >
                    <View
                        style={[
                            entity === "card"
                                ? windowDimensions.height < 620
                                    ? [
                                          styles.dropdownCard,
                                          styles.dropdownCard620,
                                      ]
                                    : styles.dropdownCard
                                : entity === "notifLang"
                                ? styles.dropdownNotifLang
                                : styles.dropdown,
                            { top: dropdownTop },
                        ]}
                    >
                        {data.map((item, index) => (
                            <Text
                                key={index}
                                style={[
                                    entity === "card"
                                        ? styles.itemCard
                                        : styles.item,
                                    {
                                        backgroundColor:
                                            dispatchFuncName === "changeBg"
                                                ? item
                                                : bgColour,
                                    },
                                ]}
                                onPress={() => onItemPress(item)}
                            >
                                {t(item)}
                            </Text>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={[
                entity === "card"
                    ? windowDimensions.height < 620
                        ? [styles.buttonCard, styles.buttonCard620]
                        : styles.buttonCard
                    : entity === "notifLang"
                    ? styles.buttonNotifLang
                    : styles.button,
                { backgroundColor: bgColour },
            ]}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text
                style={
                    entity === "card"
                        ? styles.buttonTextCard
                        : styles.buttonText
                }
            >
                {(!!selected && selected) || entity}
            </Text>
            <Text style={styles.icon}>&#9658;</Text>
        </TouchableOpacity>
    );
}

export default Dropdown;
