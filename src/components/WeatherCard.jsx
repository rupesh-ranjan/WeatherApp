import { Image, StyleSheet, Text, View } from "react-native";

export default function WeatherCard({ title, subtitle, iconUrl }) {
    return (
        <View style={styles.card}>
            {iconUrl && <Image source={{ uri: iconUrl }} style={styles.icon} />}

            <View style={styles.infoWrap}>
                <Text style={styles.title}>{title}</Text>
                {subtitle ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#f7fbff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e6eefc",
        marginVertical: 10,
    },
    icon: {
        width: 58,
        height: 58,
        marginRight: 14,
    },
    infoWrap: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0b2545",
    },
    subtitle: {
        marginTop: 6,
        color: "#6c7a89",
        fontSize: 14,
    },
});
