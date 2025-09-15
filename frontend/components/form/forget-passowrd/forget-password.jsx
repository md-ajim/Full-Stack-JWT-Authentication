"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import axios from "axios";
import { toast } from "sonner";

export default function ForgetPassword() {
  const OTP_EXPIRY_TIME = 10 * 60;

  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setOtpExpired(true);
    }
  });

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const [forgetPasswordInput, setForgetPasswordInput] = React.useState({
    email: "",
    otp: "",
    set_password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [sendOTP, setSendOTP] = React.useState(false);
  const [validatedOTP, setValidatedOTP] = React.useState(false);
  const [passwordDisable, setPasswordDisable] = React.useState(false);
  const [server_OTP, setServerOTP] = React.useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(e) {
    const toastID = toast.loading("Loading...");

    e.preventDefault();

    if (sendOTP) {
      try {
        const response = axios.post(
          "https://full-stack-jwt-authentication.onrender.com/api/reset-password/",
          {
            email: forgetPasswordInput.email,
            otp: forgetPasswordInput.otp,
            password: forgetPasswordInput.set_password,
          }
        );
        const data = (await response).data;
        if (data) {
          console.log(data, "login data");
          const res = await signIn("credentials", {
            username: data?.username,
            password: data?.password,
            redirect: false,
          });

          if (res.ok) {
            toast.success(
              `The Password reset is successfully Welcome to the dashboard`
            );
            window.location.href = "/dashboard";
          }
          if (res.error) {
            toast.error(
              `This passowrd input is wrong. Please give valid input.`
            );
            console.error(`Error: ${res.error}`);
          }
        }
      } catch (error) {
        toast.error(`Password reset is field`);
        console.log(error, "error");
        // throw new Error(`Password reset is field${error}`);
      } finally {
        setLoading(false);
        toast.dismiss(toastID);
      }
    } else {
      try {
        const response = await axios.post(
          `https://full-stack-jwt-authentication.onrender.com/api/forget-password-send/`,
          {
            email: forgetPasswordInput.email,
          }
        );
        const data = response.data;
        console.log(data, "data");
        if (data) {
          setServerOTP(data?.otp);
          toast.success("Successfully send OTP Code check for the email");
          setSendOTP(true);
        }
      } catch (error) {
        console.log(error, "error");
        console.error(`OTP code sending error :${error}`);
        toast.error(`OTP code is sending field`);
      } finally {
        toast.dismiss(toastID);
        setLoading(false);
      }
    }
  }

  const handleOTPChangeORCheck = (OTP) => {
    setForgetPasswordInput({
      ...forgetPasswordInput,
      otp: OTP,
    });

    if (OTP === server_OTP) {
      setValidatedOTP(true);
    }
  };

  return (
    <div className=" h-svh   flex justify-center items-center">
      <Card className=" md:w-[420px]   md:px-0 lg:px-0  lg:w-[420px] ">
        <CardHeader className="py-6">
          <CardTitle className="text-3xl text-center ">
            Forget Password
          </CardTitle>

          <Link
            className="text-sm  underline  text-center text-gray-500 pt-1"
            href="/form/login"
          >
            Login page
          </Link>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label className="mb-2"> Email </Label>
              <Input
                value={forgetPasswordInput.email}
                placeholder="Email"
                disabled={sendOTP || loading}
                onChange={(e) =>
                  setForgetPasswordInput({
                    ...forgetPasswordInput,
                    email: e.target.value,
                  })
                }
                required
                type="email"
              />
            </div>

            {sendOTP ? (
              <div className=" space-y-4">
                <div>
                  <InputOTP
                    onChange={(OTP) => handleOTPChangeORCheck(OTP)}
                    maxLength={6}
                    disabled={validatedOTP || loading}
                  >
                    <InputOTPGroup className="space-x-1">
                      <InputOTPSlot index={0} className="rounded-md border-l" />
                      <InputOTPSlot index={1} className="rounded-md border-l" />
                      <InputOTPSlot index={2} className="rounded-md border-l" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="space-x-1">
                      <InputOTPSlot index={3} className="rounded-md border-l" />
                      <InputOTPSlot index={4} className="rounded-md border-l" />
                      <InputOTPSlot index={5} className="rounded-md border-l" />
                    </InputOTPGroup>

                    {otpExpired ? (
                      <Button variant="outline"> Recent OTP </Button>
                    ) : (
                      <Button disabled variant={validatedOTP ? "outline" : ""}>
                        {" "}
                        {validatedOTP ? "Valid" : "Waiting..."}
                      </Button>
                    )}
                  </InputOTP>

                  <p className="text-sm text-gray-500 pt-1">
                    OTP expires in:{" "}
                    <strong>
                      {minutes}:{seconds}{" "}
                    </strong>
                  </p>
                </div>
                <div>
                  <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
                    <Input
                      required
                      value={forgetPasswordInput.set_password}
                      onChange={(e) =>
                        setForgetPasswordInput({
                          ...forgetPasswordInput,
                          set_password: e.target.value,
                        })
                      }
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="border-0 focus-visible:ring-0 shadow-none"
                    />
                    <button onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <Button disabled={passwordDisable || loading} type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
