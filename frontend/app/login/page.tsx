"use client";

import { signinAction } from "@/actions";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [state, action, isPending] = useActionState(signinAction, undefined);

  useEffect(() => {
    if (state?.user && !isPending) {
      toast({
        title: "Welcome back!",
        description: `Hi, ${state?.user.name}!`,
        variant: "success",
      });

      router.push("/dashboard");
    }
  }, [state?.user, isPending, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-950 gap-x-20">
      <div className="hidden lg:flex w-1/2 "></div>

      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome Back!
        </h2>

        <Form action={action}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <Input type="email" name="email" placeholder="Email" required />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}

          {/* Password Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            variant="default"
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
