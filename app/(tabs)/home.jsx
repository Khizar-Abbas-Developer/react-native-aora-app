import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>{user.id}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
    </View>
  );
};

export default Home;
