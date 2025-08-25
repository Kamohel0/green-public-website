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

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full bg-[#3c6e33] hover:bg-[#295024] text-white">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-2">
          <CardAction className="text-center">
            <span className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Button variant="link" className="text-white-600 hover:underline p-0">
                Sign Up
              </Button>
            </span>
          </CardAction>
          <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
