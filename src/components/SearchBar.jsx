import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import { clearSuggestions, fetchSuggestions } from "../store/weatherSlice";

export default function SearchBar({ value, onQueryChange, onCitySelect }) {
    const [query, setQuery] = useState(value ?? "");
    const dispatch = useDispatch();
    const suggestions = useSelector((s) => s.weather?.suggestions || []);

    useEffect(() => {
        if (typeof value === "string" && value !== query) {
            setQuery(value);
        }
    }, [query, value]);

    const debounced = useDebounce((txt) => {
        if (!txt || txt.length < 1) {
            dispatch(clearSuggestions());
            return;
        }
        dispatch(fetchSuggestions(txt));
    }, 350);

    const handleChange = (text) => {
        setQuery(text);
        if (onQueryChange) onQueryChange(text);
        debounced(text);
    };

    const handleSelect = (item) => {
        const cityName = item?.name || item;
        const display = item?.country
            ? `${item.name}, ${item.country}`
            : cityName;
        setQuery(display);
        if (onQueryChange) onQueryChange(display);
        if (onCitySelect) onCitySelect(cityName);
        dispatch(clearSuggestions());
    };

    return (
        <View style={styles.wrapper}>
            <TextInput
                placeholder="Search city..."
                placeholderTextColor="#888"
                style={styles.input}
                value={query}
                onChangeText={handleChange}
                autoCorrect={false}
                returnKeyType="search"
            />

            {suggestions?.length > 0 && (
                <View style={styles.dropdown}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled={true}
                        contentContainerStyle={{ paddingVertical: 4 }}
                    >
                        {suggestions.map((item, idx) => (
                            <TouchableOpacity
                                key={
                                    item?.id
                                        ? String(item.id)
                                        : `${item.name}-${idx}`
                                }
                                style={styles.dropdownItem}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.dropdownText}>
                                    {item.name}
                                    {item.country ? `, ${item.country}` : ""}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { width: "100%" },
    input: {
        height: 48,
        borderColor: "#d0d7e2",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: "#f6f8fb",
        fontSize: 16,
    },
    dropdown: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#e6eefc",
        borderRadius: 10,
        backgroundColor: "#fff",
        maxHeight: 200,
        overflow: "hidden",
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f3f7",
    },
    dropdownText: { fontSize: 14, color: "#223" },
});
