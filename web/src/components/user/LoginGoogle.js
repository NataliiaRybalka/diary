import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

import { SERVER } from "../../lib/constants";

import "./User.css";

function LoginGoogle({ setErr }) {
    const language = useSelector((state) => state.language.value);

    const onSuccess = async (response) => {
        const userData = jwt_decode(response.credential);
        await sendUserData(userData);
    };

    const onError = (response) => setErr(response);

    const sendUserData = async (userData) => {
        const resp = await fetch(`${SERVER}/signin-google`, {
            method: "POST",
            body: JSON.stringify({
                username: userData.name,
                email: userData.email,
                timezone: new Date().getTimezoneOffset() / 60,
                language,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await resp.json();
        if (resp.status !== 200) setErr(JSON.stringify(data));
        else {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: data.username,
                    email: data.email,
                    id: data._id,
                    role: data.role,
                })
            );
            localStorage.setItem("lang", data.language);
            setErr(null);
            window.location.reload();
        }
    };

    return (
        <>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                logo_alignment="center"
                size="medium"
            />
        </>
    );
}

export default LoginGoogle;
