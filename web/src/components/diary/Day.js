import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import DayPicker from "../pages/DayPicker";
import { getToday } from "../../lib/getDates";
import Menu from "./Menu";
import { SERVER } from "../../lib/constants";
import TimePicker from "../pages/TimePicker";

import "./Day.css";

function Day() {
    const { t } = useTranslation();
    const windowDimensions = useSelector(
        (state) => state.windowDimensions.value
    );

    let lang = useSelector((state) => state.language.value);
    if (lang === "ua") lang = "uk";

    const [pageData, setPageData] = useState({
        affirmation: "",
        menstrualDay: "",
        fellAsleep: "",
        wokeUp: "",
        totalHours: "",
        grateful: "",
        feeling: "",
        drankWater: "",
        physicalActivity: "",
        notes: "",
    });
    const [pageId, setPageId] = useState();
    const [today, setToday] = useState();
    const [date, setDate] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [fellAsleep, setFellAsleep] = useState("");
    const [showFellAsleepTimePicker, setShowFellAsleepTimePicker] =
        useState(false);
    const [wokeUp, setWokeUp] = useState("");
    const [showWokeUpTimePicker, setShowWokeUpTimePicker] = useState(false);

    useEffect(() => {
        const { word, numeric } = getToday(lang);
        setDate(numeric);
        setToday(word);
    }, [lang]);

    useEffect(() => {
        getPage();
    }, [date]);

    useEffect(() => {
        if (fellAsleep) {
            setPageData((prev) => ({
                ...prev,
                fellAsleep,
            }));
        }
    }, [fellAsleep]);
    useEffect(() => {
        if (wokeUp) {
            setPageData((prev) => ({
                ...prev,
                wokeUp,
            }));
        }
    }, [wokeUp]);

    const getPage = async () => {
        const res = await fetch(
            `${SERVER}/diary/page/${
                JSON.parse(localStorage.getItem("user")).id
            }/${date}`
        );
        const data = await res.json();

        if (data) {
            setPageData(data);
            setPageId(data._id);
        } else {
            setPageId();
            setPageData({
                affirmation: "",
                menstrualDay: "",
                fellAsleep: "",
                wokeUp: "",
                totalHours: "",
                grateful: "",
                feeling: "",
                drankWater: "",
                physicalActivity: "",
                notes: "",
            });
        }
    };

    const onChangeInput = (e) => {
        if (e.target.name === "selfCare" || e.target.name === "meditation") {
            return setPageData((prev) => ({
                ...prev,
                [e.target.name]: e.target.checked,
            }));
        }
        setPageData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const savePageData = async () => {
        const endpoint = pageId
            ? pageId
            : `${JSON.parse(localStorage.getItem("user")).id}/${date}`;
        const method = pageId ? "PUT" : "POST";

        await fetch(`${SERVER}/diary/page/${endpoint}`, {
            method,
            body: JSON.stringify({
                pageData,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <div className="dayContainer">
            {windowDimensions?.width <= 768 ? (
                <>
                    <h1 className="diaryTitle">{t("Diary")}</h1>

                    <div className="pickerDivDay">
                        {showDatePicker ? (
                            <DayPicker
                                day={date}
                                setDay={setDate}
                                setShowPicker={setShowDatePicker}
                            />
                        ) : (
                            <div
                                onClick={() =>
                                    setShowDatePicker(!showDatePicker)
                                }
                                className="monthInput"
                            >
                                {date}
                            </div>
                        )}
                    </div>

                    <Menu />
                </>
            ) : (
                <>
                    <div className="pickerDivDay">
                        {showDatePicker ? (
                            <DayPicker
                                day={date}
                                setDay={setDate}
                                setShowPicker={setShowDatePicker}
                            />
                        ) : (
                            <div
                                onClick={() =>
                                    setShowDatePicker(!showDatePicker)
                                }
                                className="monthInput"
                            >
                                {date}
                            </div>
                        )}
                    </div>

                    <h1 className="diaryTitle">{t("Diary")}</h1>

                    <Menu />
                </>
            )}

            <div className="diaryContainer">
                <h3 className="todayDate">{today}</h3>
                <h3 className="dayPart">{t("Morning")}</h3>

                <div className="affirmationDiv">
                    <input
                        type="text"
                        name="affirmation"
                        value={pageData.affirmation}
                        onChange={(e) => onChangeInput(e)}
                    />
                    <label>{t("affirmation")}</label>
                </div>

                <div className="morningInputDiv">
                    <div>
                        <label>{t("Day of the menstrual cycle")} </label>
                        <input
                            type="number"
                            name="menstrualDay"
                            min={1}
                            value={pageData.menstrualDay}
                            onChange={(e) => onChangeInput(e)}
                            className="pageInputNum"
                        />
                    </div>

                    <div className="morningInputDivRight">
                        <div>
                            <label>{t("Fell asleep yesterday")} </label>
                            <div className="pickerDivTime">
                                {showFellAsleepTimePicker ? (
                                    <TimePicker
                                        time={fellAsleep}
                                        setTime={setFellAsleep}
                                        setShowPicker={
                                            setShowFellAsleepTimePicker
                                        }
                                        pickerTitle={"day"}
                                    />
                                ) : (
                                    <div
                                        onClick={() =>
                                            setShowFellAsleepTimePicker(
                                                !showFellAsleepTimePicker
                                            )
                                        }
                                        className="monthInput"
                                    >
                                        {pageData.fellAsleep
                                            ? pageData.fellAsleep
                                            : fellAsleep}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>{t("Woke up today")} </label>
                            <div className="pickerDivTime">
                                {showWokeUpTimePicker ? (
                                    <TimePicker
                                        time={wokeUp}
                                        setTime={setWokeUp}
                                        setShowPicker={setShowWokeUpTimePicker}
                                        pickerTitle={"day"}
                                    />
                                ) : (
                                    <div
                                        onClick={() =>
                                            setShowWokeUpTimePicker(
                                                !showWokeUpTimePicker
                                            )
                                        }
                                        className="monthInput"
                                    >
                                        {pageData.wokeUp
                                            ? pageData.wokeUp
                                            : wokeUp}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>{t("Total hours of sleep per day")} </label>
                            <input
                                type="number"
                                name="totalHours"
                                max={24}
                                value={pageData.totalHours}
                                onChange={(e) => onChangeInput(e)}
                                className="pageInputNum"
                            />
                        </div>
                    </div>
                </div>

                <h3 className="dayPart">{t("Evening")}</h3>
                <div className="eveningInputDiv">
                    <input
                        type="text"
                        name="grateful"
                        value={pageData.grateful}
                        onChange={(e) => onChangeInput(e)}
                    />
                    <label>{t("what am I grateful for today:")} </label>
                </div>
                <div className="eveningInputDiv">
                    <input
                        type="text"
                        name="feeling"
                        value={pageData.feeling}
                        onChange={(e) => onChangeInput(e)}
                    />
                    <label>{t("how am I feeling today?")} </label>
                </div>

                <div className="eveningNumDiv">
                    <div>
                        <label>{t("Drank some water")} </label>
                        <input
                            type="number"
                            name="drankWater"
                            value={pageData.drankWater}
                            onChange={(e) => onChangeInput(e)}
                            className="pageInputNum"
                        />
                    </div>
                    <div>
                        <label>{t("Physical activity")} </label>
                        <input
                            type="number"
                            name="physicalActivity"
                            min={1}
                            max={10}
                            value={pageData.physicalActivity}
                            onChange={(e) => onChangeInput(e)}
                            className="pageInputNum"
                        />
                    </div>
                </div>

                <div className="eveningTextareaDiv">
                    <textarea
                        type="text"
                        name="notes"
                        rows={5}
                        value={pageData.notes}
                        onChange={(e) => onChangeInput(e)}
                    />
                    <label>{t("whatever you want to keep")} </label>
                </div>

                <button className="submit savePage" onClick={savePageData}>
                    {t("Save")}
                </button>
            </div>
        </div>
    );
}

export default Day;
