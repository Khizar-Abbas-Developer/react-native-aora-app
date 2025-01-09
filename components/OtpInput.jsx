import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";

const OTPVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // OTP state with 4 fields
  const inputRefs = useRef([]); // Ref for managing input fields

  const handleChangeText = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const submit = async () => {
    if (otp.some((digit) => !digit)) {
      // Display error message using Toast if any field is empty
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all the OTP fields",
      });
      return;
    }
    setIsSubmitting(true); // Set submitting state to true

    // Simulate OTP verification
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "https://your-api-endpoint.com/verify-otp",
        { otp }
      );

      if (response.data.success) {
        // Redirect or perform further actions after OTP verification success
        router.replace("/home");
      } else {
        // Handle failure case
        Toast.show({
          type: "error",
          text1: "Invalid OTP",
          text2: "Please check the OTP and try again.",
        });
      }
    } catch (error) {
      // Handle error case
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <SafeAreaView className="bg-primary px-4">
      {/* Added padding on the x-axis */}
      <ScrollView>
        <View
          className="flex justify-center w-full my-2"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="flex-row px-5">
            <Image
              source={images.logo}
              resizeMethod="contain"
              className="w-[115px] h-[35px]"
            />
          </View>
          <Text className="mt-10 text-2xl px-5 text-white font-psemibold ">
            Enter OTP
          </Text>
          <View className="flex-row justify-between gap-6 mt-7 px-5">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)} // Set ref for each input
                value={digit}
                onChangeText={(value) => handleChangeText(index, value)}
                maxLength={1} // Ensures only 1 character can be entered
                keyboardType="numeric"
                style={{
                  width: "17%",
                  textAlign: "center",
                  fontSize: 24,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 10,
                }}
              />
            ))}
          </View>
          <CustomButton
            title="Verify OTP"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Didn't receive the OTP?
            </Text>
            <Link
              href="/resend-otp"
              className="text-lg text-secondary font-psemibold"
            >
              Resend OTP
            </Link>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default OTPVerification;
