import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(clearUser());
    router.replace("/sign-in");
  };
  return (
    <View className="mt-10 flex items-center justify-center flex-1">
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;
