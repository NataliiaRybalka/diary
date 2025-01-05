import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getMonth } from "../../lib/getDates";
import Menu from "./Menu";
import MonthPicker from "../pages/MonthPicker";
import { SERVER } from "../../lib/constants";

import "./MonthResults.css";

function MonthResults() {
    const { t } = useTranslation();
    const windowDimensions = useSelector(
        (state) => state.windowDimensions.value
    );

    const fieldsList = [
        "Date",
        "Day of the menstrual cycle",
        "Sleep (h)",
        "Physical activity",
        "Drank some water",
    ];
    const [tableData, setTableData] = useState([
        {
            date: "",
            menstrualDay: "",
            totalHours: "",
            physicalActivity: "",
            drankWater: "",
        },
    ]);
    const [rows, setRows] = useState(0);
    const [month, setMonth] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const yearMonth = getMonth(new Date());
        setMonth(yearMonth);
    }, []);

    useEffect(() => {
        getMonthResult();
    }, [month]);

    const getMonthResult = async () => {
        const res = await fetch(
            `${SERVER}/diary/result/${
                JSON.parse(localStorage.getItem("user")).id
            }/${month}`
        );
        const data = await res.json();

        setRows(data.length);
        setTableData(data);
    };

    return (
        <div>
            {windowDimensions?.width <= 768 ? (
                <>
                    <h1 className="monthReultsTitle">{t("Month Results")}</h1>

                    <div className="pickerDiv">
                        {showPicker ? (
                            <MonthPicker
                                month={month}
                                setMonth={setMonth}
                                setShowPicker={setShowPicker}
                            />
                        ) : (
                            <div
                                onClick={() => setShowPicker(!showPicker)}
                                className="monthInput"
                            >
                                {month}
                            </div>
                        )}
                    </div>

                    <Menu />
                </>
            ) : (
                <>
                    <div className="pickerDiv">
                        {showPicker ? (
                            <MonthPicker
                                month={month}
                                setMonth={setMonth}
                                setShowPicker={setShowPicker}
                            />
                        ) : (
                            <div
                                onClick={() => setShowPicker(!showPicker)}
                                className="monthInput"
                            >
                                {month}
                            </div>
                        )}
                    </div>

                    <h1 className="monthReultsTitle">{t("Month Results")}</h1>

                    <Menu />
                </>
            )}

            <table className="menstrualCycleTable">
                <thead>
                    <tr>
                        {fieldsList.map((field) => (
                            <th key={field}>{t(field)}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {[...Array(rows)].map((row, rowI) => (
                        <tr key={rowI}>
                            <td>{tableData[rowI].date}</td>
                            <td>{tableData[rowI].menstrualDay}</td>
                            <td>{tableData[rowI].totalHours}</td>
                            <td>{tableData[rowI].physicalActivity}</td>
                            <td>{tableData[rowI].drankWater}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MonthResults;
