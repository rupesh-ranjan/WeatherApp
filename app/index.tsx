import { ScrollView, StyleSheet, Text, View } from "react-native";
import ForecastCard from "../src/components/ForecastCard";
import SearchBar from "../src/components/SearchBar";
import WeatherCard from "../src/components/WeatherCard";

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.header}>
                <Text style={styles.title}>WeatherApp</Text>
            </View>

            <SearchBar />

            <WeatherCard
                title="28°C — Sunny"
                subtitle="New Delhi • Feels like 30°C"
                iconUrl="https://cdn.weatherapi.com/weather/64x64/day/113.png"
            />

            <View style={{ marginTop: 20 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "700",
                        marginBottom: 12,
                    }}
                >
                    3-Day Forecast
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <ForecastCard
                        date="Thu, 11 Dec"
                        condition="Partly Cloudy"
                        iconUrl="https://cdn.weatherapi.com/weather/64x64/day/116.png"
                        max={30}
                        min={20}
                    />

                    <ForecastCard
                        date="Fri, 12 Dec"
                        condition="Cloudy"
                        iconUrl="https://cdn.weatherapi.com/weather/64x64/day/122.png"
                        max={28}
                        min={19}
                    />

                    <ForecastCard
                        date="Sat, 13 Dec"
                        condition="Showers"
                        iconUrl="https://cdn.weatherapi.com/weather/64x64/day/308.png"
                        max={26}
                        min={18}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 16,
        backgroundColor: "#ffffff",
        minHeight: "100%",
    },

    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0b2545",
    },
    subtitle: {
        fontSize: 14,
        color: "#556b86",
        marginTop: 4,
    },

    searchWrap: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        marginBottom: 18,
    },
    searchInput: {
        flex: 1,
        height: 44,
        borderColor: "#e0e6ef",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#f6f8fb",
    },
    searchBtn: {
        marginLeft: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#0b6efd",
        borderRadius: 8,
    },
    searchBtnText: {
        color: "#fff",
        fontWeight: "600",
    },

    currentCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#f7fbff",
        borderWidth: 1,
        borderColor: "#e6eefc",
        marginBottom: 16,
    },
    currentIcon: {
        width: 72,
        height: 72,
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    currentInfo: {
        flex: 1,
    },
    currentTemp: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0b2545",
    },
    currentCond: {
        fontSize: 14,
        color: "#44607a",
        marginTop: 4,
    },
    currentLocation: {
        marginTop: 6,
        fontSize: 13,
        color: "#7a8ea0",
    },

    forecastSection: {
        marginTop: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
        color: "#0b2545",
    },
    forecastRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dayCard: {
        width: "30%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f0f3f7",
        alignItems: "center",
    },
    dayDate: {
        fontSize: 12,
        color: "#5d7388",
        marginBottom: 8,
        textAlign: "center",
    },
    dayIcon: {
        width: 46,
        height: 46,
        marginBottom: 8,
    },
    dayCond: {
        fontSize: 12,
        color: "#5d7388",
        textAlign: "center",
    },
    dayTemp: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
        color: "#0b2545",
    },

    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    footerText: {
        fontSize: 13,
        color: "#8899aa",
    },
});
