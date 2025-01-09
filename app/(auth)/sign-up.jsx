import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, severURl } from "@/constants";
import { Image } from "react-native";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Alert } from "react-native";
import axios from "axios";
import { setUser } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      // Display error message using Toast
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all the fields",
      });
      return; // Early return to prevent further execution if fields are not filled
    }
    setIsSubmitting(true); // Set submitting state to true

    try {
      // Making POST request to the API using axios
      const response = await axios.post(
        `https://react-native-aora-server.vercel.app/api/v1/register`,
        form
      ); // Replace with your IP address
      const { username, email, avatar, _id } = response.data;

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          userId: _id,
          username,
          email,
          avatar,
        })
      );
      // Redirect to home page on successful registration
      router.replace("/verification");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      // Handle error case
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: errorMessage,
        props: {
          style: {
            padding: 20, // Increase the padding for larger toast
            borderRadius: 10,
          },
          textStyle: {
            fontSize: 18, // Increase font size for both title and message
          },
        },
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
              value={form.username || ""}
              handleChangeText={(e) => {
                setForm({ ...form, username: e });
              }}
              otherStyles="mt-10"
            />
            <FormField
              title="Email"
              value={form.email || ""}
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password || ""}
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
      <Toast />
    </>
  );
};

export default SignUp;
