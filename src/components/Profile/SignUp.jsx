"use client";

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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DAB6A2] to-[#e9d6c5]  px-4">
      {/* Motion wrapper for card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Signup Card */}
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
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
                <Input id="password" type="password" required className="w-full" />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#3c6e33] hover:bg-[#295024] text-white text-lg rounded-xl py-6"
                >
                  Sign Up
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
