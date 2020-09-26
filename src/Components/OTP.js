import OTPInput, { ResendOTP } from "otp-input-react";
import React, { useState } from "react";

function OTP() {
  const [OTP, setOTP] = useState("");
  return (
    <>
      <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={4}
        otpType="number"
        disabled={false}
        secure
      />
      <ResendOTP onResendClick={() => } />
    </>
  );
}

export default OTP;
