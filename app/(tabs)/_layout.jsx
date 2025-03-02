import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "@/constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="mt-5 gap-1 flex items-center justify-center flex-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-8 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-[8px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#2325533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon
                  icon={icons.home}
                  color={color}
                  focused={focused}
                  name="Home"
                />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  focused={focused}
                  name="Book"
                />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  focused={focused}
                  name="Create"
                />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  focused={focused}
                  name="Profile"
                />
              </>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
