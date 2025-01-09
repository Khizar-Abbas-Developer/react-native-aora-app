import { Dimensions, ScrollView, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useSelector } from "react-redux";

const Index = () => {
  const user = useSelector((state) => state.user); // Replace with your actual state
  const { height } = Dimensions.get("window");
  const viewHeight = height * 0.85; // 85% of the screen height
  if (user && Object.keys(user).length > 0 && user.id)
    return <Redirect href="/home" />;
  if (user && Object.keys(user).length === 0) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="flex items-center justify-center w-full h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="relative mt-5">
              <Text className="text-3xl font-bold text-center text-white">
                Discover endless possibilities with{" "}
                <Text className="text-secondary-200">Aora</Text>
              </Text>
              <Image
                source={images.path}
                style={{
                  width: 80,
                  height: 15,
                  position: "absolute",
                  bottom: -8, // -bottom-2 in px
                  right: 109,
                }}
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm text-center text-gray-100 font-pregular mt-7">
              Where creativity meets innovation: embark on a journey of
              limitless exploration with Aora
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => {
                router.push("/sign-in");
              }}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Index;
