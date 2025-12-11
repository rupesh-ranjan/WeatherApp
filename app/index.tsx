import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ForecastCard from "../src/components/ForecastCard";
import SearchBar from "../src/components/SearchBar";
import WeatherCard from "../src/components/WeatherCard";
import { fetchForecast, loadCached } from "../src/store/weatherSlice";

function formatTimestamp(ms: number | null) {
    if (!ms) return null;
    try {
        const d = new Date(ms);
        return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    } catch {
        return null;
    }
}

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { current, forecast, loading, error, locationName } = useSelector(
        (state: any) => state.weather || {}
    );

    const [lastUpdatedMs, setLastUpdatedMs] = useState<number | null>(null);

    const [selectedDays, setSelectedDays] = useState<number>(3);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [typedQuery, setTypedQuery] = useState<string>("");

    useEffect(() => {
        dispatch(loadCached());
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem("lastWeather");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed?.timestamp)
                        setLastUpdatedMs(Number(parsed.timestamp));
                    if (parsed?.city) {
                        setSelectedCity(parsed.city);
                        setTypedQuery(parsed.city);
                    }
                    if (parsed?.days) {
                        setSelectedDays(Number(parsed.days));
                    }
                }
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem("lastWeather");
                if (!raw) return;
                const parsed = JSON.parse(raw);
                if (parsed?.timestamp)
                    setLastUpdatedMs(Number(parsed.timestamp));
                if (parsed?.city) {
                    setSelectedCity(parsed.city);
                    setTypedQuery(parsed.city);
                }
                if (parsed?.days) {
                    setSelectedDays(Number(parsed.days));
                }
            } catch {
                // ignore
            }
        })();
    }, [current, forecast]);

    useEffect(() => {
        if (locationName) {
            dispatch(fetchForecast({ city: locationName, days: selectedDays }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDays]);

    useEffect(() => {
        if (error) {
            Alert.alert("Error", String(error));
        }
    }, [error]);

    const formatted = formatTimestamp(lastUpdatedMs);

    const handleSearchPress = () => {
        const cityToUse = selectedCity || typedQuery;
        if (!cityToUse || cityToUse.trim().length === 0) {
            Alert.alert("Please enter or select a city");
            return;
        }
        dispatch(fetchForecast({ city: cityToUse, days: selectedDays }));
        setDropdownOpen(false);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.root}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <Text style={styles.title}>WeatherApp</Text>
                <Text style={styles.subtitle}>
                    Check current weather & forecast
                </Text>
                {formatted ? (
                    <Text style={styles.updatedText}>
                        Last updated: {formatted}
                    </Text>
                ) : null}
            </View>
            <SearchBar
                value={typedQuery}
                onQueryChange={(text) => {
                    setTypedQuery(text);
                    setSelectedCity(null);
                }}
                onCitySelect={(cityName) => {
                    setSelectedCity(cityName);
                    setTypedQuery(cityName);
                }}
            />

            <View style={styles.row}>
                <View style={styles.dropdownWrapper}>
                    <TouchableOpacity
                        style={styles.dropdownPill}
                        onPress={() => setDropdownOpen((v) => !v)}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.dropdownPillText}>
                            Forecast: {selectedDays}d
                        </Text>
                        <Text style={styles.chev}>
                            {dropdownOpen ? "▴" : "▾"}
                        </Text>
                    </TouchableOpacity>

                    {dropdownOpen && (
                        <ScrollView
                            style={styles.floatingList}
                            contentContainerStyle={{ paddingVertical: 4 }}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"
                        >
                            {Array.from({ length: 14 }, (_, i) => i + 1).map(
                                (num) => (
                                    <TouchableOpacity
                                        key={num}
                                        style={[
                                            styles.floatingItem,
                                            num === selectedDays
                                                ? styles.floatingItemActive
                                                : null,
                                        ]}
                                        onPress={() => {
                                            setSelectedDays(num);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.floatingItemText,
                                                num === selectedDays
                                                    ? styles.floatingItemTextActive
                                                    : null,
                                            ]}
                                        >
                                            {num} Day{num > 1 ? "s" : ""}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}
                        </ScrollView>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearchPress}
                    activeOpacity={0.85}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
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
            {Array.isArray(forecast) && forecast.length > 0 && (
                <View style={styles.forecastSection}>
                    <Text style={styles.sectionTitle}>
                        {selectedDays}-Day Forecast
                    </Text>

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
    updatedText: {
        marginTop: 6,
        fontSize: 12,
        color: "#7b8b9a",
    },
    errorText: {
        color: "red",
        marginTop: 12,
    },
    row: {
        flexDirection: "row",
        marginTop: 12,
        alignItems: "center",
    },
    dropdownWrapper: {
        position: "relative",
        width: "55%",
        minWidth: 120,
    },
    dropdownPill: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e6ef",
        backgroundColor: "#f4f6f9",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    dropdownPillText: {
        fontSize: 14,
        color: "#0b2545",
        fontWeight: "600",
    },
    chev: {
        marginLeft: 8,
        color: "#556b86",
        fontSize: 12,
        paddingLeft: 8,
    },
    floatingList: {
        position: "absolute",
        top: 48,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e6eefc",
        marginTop: 8,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
        overflow: "hidden",
        maxHeight: 220,
    },
    floatingItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f3f7",
        backgroundColor: "#fff",
    },
    floatingItemActive: {
        backgroundColor: "#eef6ff",
    },
    floatingItemText: {
        fontSize: 14,
        color: "#334e68",
    },
    floatingItemTextActive: {
        color: "#0b6efd",
        fontWeight: "700",
    },
    searchButton: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: "#0b6efd",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    searchButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
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
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
