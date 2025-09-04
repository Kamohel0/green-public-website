"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setSuccessMsg("✅ Account created successfully! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const errData = await res.json();
        setErrorMsg(errData.message || "Signup failed");
      }
    } catch (err) {
      setErrorMsg("Server unreachable. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DAB6A2] to-[#e9d6c5] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#3c2f2f]">
              Create an account
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Fill in your details to register
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-green-600 text-sm text-center">{successMsg}</p>
              )}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-2"
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2"
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#3c6e33] hover:bg-[#295024] text-white text-lg rounded-xl py-6"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-4">
            <CardAction className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login">
                  <Button
                    variant="link"
                    className="text-[#6b3e2e] font-semibold hover:underline p-0"
                  >
                    Login
                  </Button>
                </Link>
              </span>
            </CardAction>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 rounded-xl py-6"
              >
                Sign Up with Google
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
