import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { SERVER } from "../../lib/constants";

import { styles } from "./styles";

function MenstrualCycle({ navigation }) {
    const { t } = useTranslation();
    const bgColour = useSelector((state) => state.bgColour.value);

    const [tableData, setTableData] = useState([]);
    const [rows, setRows] = useState(1);

    useFocusEffect(
        useCallback(() => {
            getMenstrualCycleTable();
        }, [])
    );

    const getMenstrualCycleTable = async () => {
        const user = await AsyncStorage.getItem("user");
        const res = await fetch(
            `${SERVER}/diary/menstrual-cycle/${JSON.parse(user).id}`
        );
        const data = await res.json();
        setTableData(data);
        setRows(data.length);
    };

    const handleAddRow = () => {
        setTableData([
            {
                month: "",
                startDate: "",
                endDate: "",
                durationCycle: "",
                startOvulation: "",
                notes: "",
            },
            ...tableData,
        ]);
        setRows(rows + 1);
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: bgColour }]}>
            <Text style={styles.newMonth} onPress={handleAddRow}>
                {t("Add new month")}
            </Text>

            {tableData.length ? (
                tableData.map((row, rowI) => (
                    <Text
                        key={rowI}
                        style={styles.row}
                        onPress={() =>
                            navigation.navigate("Update Menstrual Cycle", {
                                row,
                            })
                        }
                    >
                        {row.month}
                    </Text>
                ))
            ) : (
                <></>
            )}
        </ScrollView>
    );
}

export default MenstrualCycle;
