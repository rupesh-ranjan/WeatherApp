import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ForecastCard({
    date,
    condition,
    iconUrl,
    max,
    min,
    day,
}) {
    const handlePress = () => {
        router.push({
            pathname: "/detail",
            params: { day: JSON.stringify(day) },
        });
    };

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <Text style={styles.date}>{date}</Text>
            <Image source={{ uri: iconUrl }} style={styles.icon} />
            <Text style={styles.condition}>{condition}</Text>
            <Text style={styles.temp}>
                H: {max}° • L: {min}°
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "31%",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e6e9ef",
        alignItems: "center",
    },
    date: {
        fontSize: 12,
        color: "#6b7b8c",
        marginBottom: 6,
        textAlign: "center",
    },
    icon: { width: 48, height: 48, marginBottom: 8 },
    condition: { fontSize: 12, color: "#6b7b8c", textAlign: "center" },
    temp: { marginTop: 8, fontSize: 13, fontWeight: "600", color: "#0b2545" },
});
