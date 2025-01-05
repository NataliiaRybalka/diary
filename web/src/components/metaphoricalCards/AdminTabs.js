import { useState } from "react";
import { useTranslation } from "react-i18next";

import AdminMetaphoricalCards from "./AdminMetaphoricalCards";
import { FULCRUM, INTERNAL_COMPASS } from "../../lib/constants";

import "./Cards.css";

export const AdminTabs = () => {
    const { t } = useTranslation();

    const [currentTab, setCurrentTab] = useState("1");
    const tabs = [
        {
            id: 1,
            tabTitle: "Fulcrum",
        },
        {
            id: 2,
            tabTitle: "Internal Compass",
        },
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    };

    return (
        <div className="adminTabs">
            <div className="tabs">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        id={tab.id}
                        disabled={currentTab === `${tab.id}`}
                        onClick={handleTabClick}
                    >
                        {t(tab.tabTitle)}
                    </button>
                ))}
            </div>

            <div className="adminContent">
                {currentTab === "1" && (
                    <AdminMetaphoricalCards
                        deck={FULCRUM}
                        deckTitle={"Fulcrum"}
                    />
                )}
                {currentTab === "2" && (
                    <AdminMetaphoricalCards
                        deck={INTERNAL_COMPASS}
                        deckTitle={"Internal Compass"}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminTabs;
