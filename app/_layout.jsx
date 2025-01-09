import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import "../global.css";

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export function RootLayout() {
  // Load custom fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
      SplashScreen.hideAsync(); // Ensure splash screen is hidden even on error
      return;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen when fonts are ready
    }
  }, [fontsLoaded, error]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
          Failed to load fonts. Please try restarting the app.
        </Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={100} color="#0000ff" />
        {/* Increase size to 100 */}
        {/* <Text style={{ marginTop: 10 }}>Loading fonts...</Text> */}
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="#0000ff" />}
        persistor={persistor}
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}

export default RootLayout;
