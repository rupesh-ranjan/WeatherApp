import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
    const params = useLocalSearchParams();
    const dayParam: any = params?.day || null;
    let day = null;

    try {
        if (dayParam) {
            day = JSON.parse(dayParam);
        }
    } catch (e) {
        day = null;
    }

    if (!day) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No data</Text>
            </View>
        );
    }

    const date = day.date;
    const condition = day.day?.condition?.text;
    const icon = day.day?.condition?.icon
        ? `https:${day.day.condition.icon}`
        : null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Weather Details - {date}</Text>

            <View style={styles.card}>
                {icon && <Image source={{ uri: icon }} style={styles.icon} />}
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.condition}>{condition}</Text>
                    <Text style={styles.temp}>Max: {day.day.maxtemp_c}°C</Text>
                    <Text style={styles.temp}>Min: {day.day.mintemp_c}°C</Text>
                    <Text style={styles.feels}>Avg: {day.day.avgtemp_c}°C</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hourly Overview</Text>

                {day.hour?.map((h: any) => (
                    <View key={h.time_epoch} style={styles.hourRow}>
                        <Text style={styles.hourTime}>
                            {h.time.split(" ")[1]}
                        </Text>
                        <Text style={styles.hourInfo}>
                            {h.temp_c}°C • {h.condition?.text}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
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
    temp: { fontSize: 14, marginTop: 6 },
    feels: { fontSize: 14, color: "#8999aa", marginTop: 4 },
    section: { marginTop: 20 },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
    hourRow: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f2f5",
    },
    hourTime: { width: 80, fontSize: 14, color: "#6b7b8c" },
    hourInfo: { fontSize: 14, color: "#3b4b5a" },
});
