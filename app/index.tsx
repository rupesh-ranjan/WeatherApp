import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import ForecastCard from "../src/components/ForecastCard";
import SearchBar from "../src/components/SearchBar";
import WeatherCard from "../src/components/WeatherCard";

export default function HomeScreen() {
    const { current, forecast, loading, error, locationName } = useSelector(
        (state: any) => state.weather || {}
    );

    useEffect(() => {
        (async () => {
            try {
                const cached = await AsyncStorage.getItem("lastWeather");
                if (cached) {
                    // TODO
                }
            } catch (e) {
                // TODO cache errors
            }
        })();
    }, []);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", String(error));
        }
    }, [error]);

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={styles.header}>
                <Text style={styles.title}>WeatherApp</Text>
            </View>

            <SearchBar />

            {loading && (
                <ActivityIndicator style={{ marginTop: 16 }} size="large" />
            )}

            {error && <Text style={styles.errorText}>{String(error)}</Text>}

            {current && (
                <WeatherCard
                    title={`${current.temp_c}°C — ${current.condition?.text}`}
                    subtitle={`${locationName || ""} • Feels like ${
                        current.feelslike_c
                    }°C`}
                    iconUrl={`https:${current.condition?.icon}`}
                />
            )}

            {forecast?.length > 0 && (
                <View style={styles.forecastSection}>
                    <Text style={styles.sectionTitle}>3-Day Forecast</Text>

                    <View style={styles.forecastRow}>
                        {forecast.map((day: any) => (
                            <ForecastCard
                                key={day.date}
                                day={day}
                                date={day.date}
                                condition={day.day.condition?.text}
                                iconUrl={`https:${day.day.condition?.icon}`}
                                max={Math.round(day.day.maxtemp_c)}
                                min={Math.round(day.day.mintemp_c)}
                            />
                        ))}
                    </View>
                </View>
            )}

            <View style={{ height: 80 }} />
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
    errorText: {
        color: "red",
        marginTop: 12,
    },
    forecastSection: {
        marginTop: 20,
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
});
