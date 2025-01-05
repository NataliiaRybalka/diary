import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    err: {
        color: "#ff0000",
        textAlign: "center",
    },
    question: {
        textAlign: "center",
        marginTop: 10,
        color: "blue",
    },
    btn: {
        height: 40,
        borderRadius: 25,
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        marginTop: 10,
        marginLeft: "25%",
    },
    btnText: {
        fontSize: 18,
        fontWeight: "700",
    },
    checkboxContainer: {
        justifyContent: "center",
        flexDirection: "row",
    },
    checkbox: {
        marginLeft: 10,
    },
    btnRegistr: {
        width: "60%",
        marginLeft: "20%",
    },
    containerRestore: {
        flex: 1,
        textAlign: "center",
    },
    btnGoogle: {
        width: "55%",
        marginLeft: "22%",
        flexDirection: "row",
    },
    logoGoogle: {
        width: 40,
        height: 40,
    },
    label: {
        fontSize: 16,
    },
});
