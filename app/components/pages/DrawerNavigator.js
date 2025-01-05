import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { changeUser } from "../../redux/user.slice";
import Dropdown from "./Dropdown";
import About from "./About";
import Login from "../user/Login";
import Menu from "../diary/Menu";
import MetaphoricalCards from "../metaphoricalCards/MetaphoricalCards";
import User from "../user/User";

import logo from "../../img/logo_mini.png";

const Drawer = createDrawerNavigator();

function LogoutDrawerContent(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const logout = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        }

        dispatch(changeUser(null));
        await AsyncStorage.removeItem("user");
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label={t("Log out")}
                onPress={() => logout()}
                activeTintColor="#000000"
                inactiveTintColor="#000000"
            />
            <Dropdown
                data={["en", "ru", "ua"]}
                entity={"lang"}
                dispatchFuncName={"changeLang"}
            />
            <Dropdown
                data={["#ffe5cc", "#eebeed", "#cae6f7", "#d0fbd9", "#f1f9b4"]}
                entity={"bgColour"}
                dispatchFuncName={"changeBg"}
            />
        </DrawerContentScrollView>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Image
                source={logo}
                style={{ width: "100%", height: 70, marginBottom: 10 }}
            />
            <DrawerItemList {...props} />
            <Dropdown
                data={["en", "ru", "ua"]}
                entity={"lang"}
                dispatchFuncName={"changeLang"}
            />
            <Dropdown
                data={["#ffe5cc", "#eebeed", "#cae6f7", "#d0fbd9", "#f1f9b4"]}
                entity={"bgColour"}
                dispatchFuncName={"changeBg"}
            />
        </DrawerContentScrollView>
    );
}

function DrawerNavigator() {
    const { t } = useTranslation();
    const bgColour = useSelector((state) => state.bgColour.value);
    const user = useSelector((state) => state.user.value);

    return (
        <Drawer.Navigator
            drawerContent={(props) =>
                user ? (
                    <LogoutDrawerContent {...props} />
                ) : (
                    <CustomDrawerContent {...props} />
                )
            }
            screenOptions={{
                drawerStyle: {
                    backgroundColor: bgColour,
                    width: 240,
                },
                drawerActiveTintColor: "#000000",
                drawerInactiveTintColor: "#000000",
            }}
        >
            {user ? (
                <>
                    <Drawer.Screen name={user?.username} component={User} />
                    <Drawer.Screen name={t("My Diary")} component={Menu} />
                    <Drawer.Screen
                        name={t("Metaphorical Cards")}
                        component={MetaphoricalCards}
                    />
                    <Drawer.Screen name={t("About Us")} component={About} />
                </>
            ) : (
                <>
                    {/* <Image source={logo} /> */}
                    <Drawer.Screen name={t("Login")} component={Login} />
                    <Drawer.Screen name={t("About Us")} component={About} />
                </>
            )}
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
