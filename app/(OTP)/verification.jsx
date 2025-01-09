import { View, Text } from "react-native";
import React, { useEffect } from "react";
import OTPVerification from "@/components/OtpInput";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const verification = () => {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.email) {
      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2: `OTP has been sent to ${user.email}`,
      });
    }
  }, [user?.email]);

  return <OTPVerification />;
};

export default verification;
