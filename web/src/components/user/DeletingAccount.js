import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { SERVER } from "../../lib/constants";

import "./User.css";

function DeletingAccount({ user }) {
    const { t } = useTranslation();
    const language = useSelector((state) => state.language.value);

    const [check, setCheck] = useState();
    const [err, setErr] = useState(null);

    const deleteAccount = async () => {
        if (!check) return;

        const resp = await fetch(`${SERVER}/user/${user?.id}`, {
            method: "DELETE",
            body: JSON.stringify({
                username: user?.username,
                email: user?.email,
                language,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (resp.status !== 204) setErr("Something went wrong");
        else {
            localStorage.removeItem("user");
            setErr(null);
            window.location = "/signin";
        }
    };

    return (
        <div className="center">
            <h2>{t("Delete Account")}</h2>
            <div className="form">
                <div className="checkboxDelete">
                    <label>{t("Are you sure?")}</label>
                    <input
                        type="checkbox"
                        name="deleteAccount"
                        value={check}
                        onChange={({ target: { checked } }) =>
                            setCheck(checked)
                        }
                    />
                </div>
                {err && <p className="pError">{err}</p>}
                <button
                    className="submit restoreSubmit"
                    onClick={deleteAccount}
                >
                    {t("Delete")}
                </button>
            </div>
        </div>
    );
}

export default DeletingAccount;
