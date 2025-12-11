import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
    const { date } = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Weather Details</Text>

            <View style={styles.card}>
                <Image
                    source={{
                        uri: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
                    }}
                    style={styles.icon}
                />

                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.dateText}>{date || "Thu, 11 Dec"}</Text>
                    <Text style={styles.condition}>Partly Cloudy</Text>
                    <Text style={styles.temp}>28°C</Text>
                    <Text style={styles.feels}>Feels like 30°C</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Hourly Overview (UI only)
                </Text>

                {[1, 2, 3, 4, 5].map((h) => (
                    <View key={h} style={styles.hourRow}>
                        <Text style={styles.hourTime}>0{h}:00</Text>
                        <Text style={styles.hourInfo}>24°C • Clear Sky</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
    },
    card: {
        flexDirection: "row",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e6eaf2",
        marginBottom: 20,
    },
    icon: { width: 64, height: 64 },
    dateText: { fontSize: 16, fontWeight: "600" },
    condition: { fontSize: 14, color: "#677788", marginTop: 4 },
    temp: { fontSize: 22, fontWeight: "700", marginTop: 8 },
    feels: { fontSize: 14, marginTop: 4, color: "#8999aa" },

    section: { marginTop: 20 },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    hourRow: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f2f5",
    },
    hourTime: { width: 80, fontSize: 14, color: "#6b7b8c" },
    hourInfo: { fontSize: 14, color: "#3b4b5a" },
});
