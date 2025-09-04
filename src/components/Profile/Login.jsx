import { useState } from "react";
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
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/authApi";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setErrorMsg("Email and password are required.");
    return;
  }

  try {
    setErrorMsg("");
    setLoading(true);

    const response = await login({ email: email.trim(), password });

    //  save JWT or session to localStorage
    if (response.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }

    // Save user info so you can link purchases to them
    if (response.data?.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    console.log("Login success:", response.data);

    // Redirect to payment after successful login
    navigate("/payment");

  } catch (err) {
    console.error("Login error:", err);
    if (err.response?.status === 400) {
      setErrorMsg("Invalid email or password.");
    } else if (err.response?.status === 401) {
      setErrorMsg("Unauthorized. Please check credentials.");
    } else {
      setErrorMsg("Something went wrong. Try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DAB6A2] to-[#e9d6c5] px-5">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-none rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#3c2f2f]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Login to continue your journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#3c6e33] hover:bg-[#295024] text-white text-lg rounded-xl py-6"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-4">
            <CardAction className="text-center">
              <span className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/signup">
                  <Button
                    variant="link"
                    className="text-[#6b3e2e] font-semibold hover:underline p-0"
                  >
                    Sign Up
                  </Button>
                </Link>
              </span>
            </CardAction>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 rounded-xl py-6"
              >
                Login with Google
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
