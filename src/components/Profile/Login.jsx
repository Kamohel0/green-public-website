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
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Login success:", data);

        // Save token to localStorage (or context)
        localStorage.setItem("token", data.token);

        alert("Login successful!");
        // redirect to dashboard/products page
        window.location.href = "/products";
      } else {
        const errData = await res.json();
        setErrorMsg(errData.message || "Login failed");
      }
    } catch (err) {
      setErrorMsg("Server unreachable. Try again later.");
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
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
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
