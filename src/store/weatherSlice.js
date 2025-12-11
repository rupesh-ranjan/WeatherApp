import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getForecast, searchCities } from "../api/weatherService";

export const fetchForecast = createAsyncThunk(
    "weather/fetchForecast",
    async ({ city, days = 3 }, { rejectWithValue }) => {
        try {
            const data = await getForecast(city, days);
            await AsyncStorage.setItem(
                "lastWeather",
                JSON.stringify({ timestamp: Date.now(), data })
            );
            return data;
        } catch (err) {
            const msg = err?.response?.data || err.message || "Unknown error";
            return rejectWithValue(msg);
        }
    }
);

export const fetchSuggestions = createAsyncThunk(
    "weather/fetchSuggestions",
    async (query, { rejectWithValue }) => {
        try {
            if (!query) return [];
            const data = await searchCities(query);
            return data;
        } catch (err) {
            const msg = err?.response?.data || err.message || "Unknown error";
            return rejectWithValue(msg);
        }
    }
);

const initialState = {
    current: null,
    forecast: [],
    loading: false,
    error: null,
    suggestions: [],
    locationName: null,
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setFromCache(state, action) {
            const { current, forecast, locationName } = action.payload || {};
            state.current = current || state.current;
            state.forecast = forecast || state.forecast;
            state.locationName = locationName || state.locationName;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload.current;
                state.forecast = action.payload.forecast?.forecastday || [];
                state.locationName =
                    action.payload.location?.name || state.locationName;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch forecast";
            })
            .addCase(fetchSuggestions.pending, (state) => {
                // TODO set a small loading flag for suggestions
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.suggestions = action.payload || [];
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                // TODO keep suggestions unchanged on error
            });
    },
});

export const { setFromCache, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
