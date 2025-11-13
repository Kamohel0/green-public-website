"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "@/api/authApi";
import { Mail, CheckCircle, AlertCircle, ArrowLeft, Loader } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    // Validate email
    if (!email.trim()) {
      setMessage({ 
        text: "Please enter your email address.", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ 
        text: "Please enter a valid email address.", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    try {
      // Correct API call - passing object with email property
      await forgotPassword({ email: email.trim() });
      setEmailSent(true);
      setMessage({ 
        text: "Password reset instructions have been sent to your email!", 
        type: "success" 
      });
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage({ 
        text: err.response?.data?.message || "Failed to send reset email. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DAB6A2] to-[#e9d6c5] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
              className="absolute left-4 top-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </Button>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-gray-600">
                {emailSent 
                  ? "Check your email for reset instructions" 
                  : "Enter your email to reset your password"
                }
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pb-6">
            <AnimatePresence>
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm mb-6 ${
                    message.type === "success" 
                      ? "bg-green-50 border border-green-200 text-green-700" 
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {!emailSent ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Enter the email address associated with your account
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading || !validateEmail(email)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-xl py-3 h-12 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        Sending Reset Link...
                      </div>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-medium text-gray-800 text-base">{email}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    The link will expire in 1 hour for security reasons.
                  </p>
                </div>
                
                {/* Helpful Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-blue-700 font-medium mb-2">
                    💡 Didn't receive the email?
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email address</li>
                    <li>• Wait a few minutes and try again</li>
                  </ul>
                </div>

                {/* Resend Option */}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmailSent(false);
                      setMessage({ text: "", type: "" });
                    }}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    Send to a different email
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>

          {!emailSent && (
            <CardFooter className="pt-6 border-t border-gray-100">
              <div className="text-center w-full">
                <span className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link to="/login">
                    <Button
                      variant="link"
                      className="text-green-600 font-semibold hover:text-green-700 hover:underline p-0 h-auto text-sm"
                    >
                      Back to Login
                    </Button>
                  </Link>
                </span>
              </div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;