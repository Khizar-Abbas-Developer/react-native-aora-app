import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { Alert } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the field");
    }
    setIsSubmitting(true);
    try {
      const { username, email, password } = form;
      const result = await createUser({ username, email, password });

      //set it to global state
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to connect to database!");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <ScrollView>
          <View
            className="flex justify-center w-full h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Image
              source={images.logo}
              resizeMethod="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="mt-10 text-2xl text-white font-psemibold ">
              Sign Up to Aora
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => {
                setForm({ ...form, username: e });
              }}
              otherStyles="mt-10"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex-row justify-center gap-2 pt-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg text-secondary font-psemibold"
              >
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
