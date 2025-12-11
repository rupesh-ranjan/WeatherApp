import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import {
    clearSuggestions,
    fetchForecast,
    fetchSuggestions,
} from "../store/weatherSlice";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const suggestions = useSelector((s) => s.weather.suggestions || []);

    const debouncedSearch = useDebounce((text) => {
        if (!text || text.length < 2) return;
        dispatch(fetchSuggestions(text));
    }, 400);

    const handleChange = (text) => {
        setQuery(text);
        debouncedSearch(text);
    };

    const handleSelect = (item) => {
        const cityName = item.name || item;
        setQuery(`${item.name}, ${item.country}`);
        dispatch(fetchForecast({ city: cityName, days: 3 }));
        dispatch(clearSuggestions());
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Search city..."
                    placeholderTextColor="#888"
                    style={styles.input}
                    value={query}
                    onChangeText={handleChange}
                />

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (query)
                            dispatch(fetchForecast({ city: query, days: 3 }));
                        dispatch(clearSuggestions());
                    }}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {suggestions.length > 0 && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item, idx) =>
                            item?.id ? String(item.id) : `${item.name}-${idx}`
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.dropdownText}>
                                    {item.name}, {item.country}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { width: "100%" },
    container: { flexDirection: "row", alignItems: "center" },
    input: {
        flex: 1,
        height: 44,
        borderColor: "#d0d7e2",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#f4f6f9",
    },
    button: {
        marginLeft: 10,
        backgroundColor: "#0b6efd",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: { color: "#fff", fontWeight: "600" },
    dropdown: {
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#d0d7e2",
        backgroundColor: "#fff",
        borderRadius: 8,
        maxHeight: 160,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f1f1",
    },
    dropdownText: { fontSize: 14 },
});
