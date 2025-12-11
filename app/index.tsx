import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.header}>
                <Text style={styles.title}>WeatherApp</Text>
                <Text style={styles.subtitle}>
                    Check current weather & 3-day forecast
                </Text>
            </View>

            <View style={styles.searchWrap}>
                <TextInput
                    placeholder="Search city (UI only)"
                    style={styles.searchInput}
                    editable={false}
                />
                <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
                    <Text style={styles.searchBtnText}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.currentCard}>
                <Image
                    source={{
                        uri: "https://www.example.png",
                    }}
                    style={styles.currentIcon}
                />
                <View style={styles.currentInfo}>
                    <Text style={styles.currentTemp}>28°C</Text>
                    <Text style={styles.currentCond}>
                        Sunny • Feels like 30°C
                    </Text>
                    <Text style={styles.currentLocation}>New Delhi, India</Text>
                </View>
            </View>

            <View style={styles.forecastSection}>
                <Text style={styles.sectionTitle}>3-Day Forecast</Text>

                <View style={styles.forecastRow}>
                    <View style={styles.dayCard}>
                        <Text style={styles.dayDate}>Thu, 11 Dec</Text>
                        <Image
                            source={{
                                uri: "https://www.example.png",
                            }}
                            style={styles.dayIcon}
                        />
                        <Text style={styles.dayCond}>Partly Cloudy</Text>
                        <Text style={styles.dayTemp}>H: 30° L: 20°</Text>
                    </View>

                    <View style={styles.dayCard}>
                        <Text style={styles.dayDate}>Fri, 12 Dec</Text>
                        <Image
                            source={{
                                uri: "https://www.example.png",
                            }}
                            style={styles.dayIcon}
                        />
                        <Text style={styles.dayCond}>Cloudy</Text>
                        <Text style={styles.dayTemp}>H: 28° L: 19°</Text>
                    </View>

                    <View style={styles.dayCard}>
                        <Text style={styles.dayDate}>Sat, 13 Dec</Text>
                        <Image
                            source={{
                                uri: "https://www.example.png",
                            }}
                            style={styles.dayIcon}
                        />
                        <Text style={styles.dayCond}>Showers</Text>
                        <Text style={styles.dayTemp}>H: 26° L: 18°</Text>
                    </View>
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
