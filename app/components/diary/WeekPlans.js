import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { getMonday, getWeekDays } from "../../lib/getDates";
import { SERVER } from "../../lib/constants";

import { styles } from "./styles";

function WeekPlans({ navigation }) {
    const bgColour = useSelector((state) => state.bgColour.value);
    let lang = useSelector((state) => state.language.value);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [engDates, setEngDates] = useState([]);
    const [savedWeekPlan, setSavedWeekPlan] = useState({});

    useFocusEffect(
        useCallback(() => {
            getWeekPlan();
        }, [currentDate])
    );

    useEffect(() => {
        changeWeek();
    }, [lang]);

    const getWeekPlan = async () => {
        const monday = await getMonday(currentDate);
        const user = await AsyncStorage.getItem("user");
        const res = await fetch(
            `${SERVER}/diary/week-plan/${JSON.parse(user).id}/${monday}`
        );
        const data = await res.json();
        setSavedWeekPlan(data);
    };

    const changeWeek = async (type = null) => {
        const language = lang !== "ua" ? lang : "uk";
        const startDate =
            type === "prev"
                ? new Date(currentDate.getTime() - 604800000)
                : type === "next"
                ? new Date(currentDate.getTime() + 604800000)
                : currentDate;
        setCurrentDate(startDate);
        const mon = await getMonday(startDate);

        if (language === "en") {
            const week = getWeekDays(mon, language);
            setDates(week);
            setEngDates(week);
        } else {
            setDates(getWeekDays(mon, language));
            setEngDates(getWeekDays(mon, "en"));
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: bgColour }]}>
            <View style={styles.arrowsConatiner}>
                <Text
                    style={styles.arrowsEl}
                    onPress={() => changeWeek("prev")}
                >
                    {" "}
                    {"<"}{" "}
                </Text>
                <Text
                    style={styles.arrowsEl}
                    onPress={() => changeWeek("next")}
                >
                    {" "}
                    {">"}{" "}
                </Text>
            </View>
            {dates.length ? (
                dates.map((date, index) => (
                    <Text
                        key={index}
                        style={styles.row}
                        onPress={() =>
                            navigation.navigate("Update Week Plan", {
                                date,
                                engDate: engDates[index],
                                dayPlan: savedWeekPlan[index],
                                lang,
                            })
                        }
                    >
                        {date}
                    </Text>
                ))
            ) : (
                <></>
            )}
        </ScrollView>
    );
}

export default WeekPlans;
