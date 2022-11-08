import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: '#373cff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    header: {
        fontSize: 25,
        fontWeight: "Bold",
        paddingBottom: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: 200,
    },
    name: {
        fontSize: 20,
        fontWeight: "Bold",
        paddingBottom: 10,
    },
    card: {
        backgroundColor: "#f6f6f6",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
});

export default styles;
