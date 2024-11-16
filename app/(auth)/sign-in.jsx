import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the field");
    }
    setIsSubmitting(true);
    try {
      const { email, password } = form;
      await signIn({ email, password });

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
              Log in to Aora
            </Text>
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
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex-row justify-center gap-2 pt-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg text-secondary font-psemibold"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
