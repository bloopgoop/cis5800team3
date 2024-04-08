import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .max(150, {
      message: "Email must be less than 150 characters.",
    })
    .min(5, {
      message: "Email must be more than 5 characters.",
    }),

  password: z
    .string()
    .max(150, {
      message: "Password must be less than 150 characters.",
    })
    .min(6, {
      message: "Password must be more than 6 characters.",
    }),
});

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    loginUser(values.email, values.password);
  }

  return (
    <div className="mt-20 mx-auto bg-secondary max-w-screen-lg">
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-xl font-bold mt-16">Sign In</h1>
        <p className="mb-16">Welcome back!</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="input" placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>User email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>User login password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="float-right" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <div className="footer mb-10">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </p>
          <p>
            Just browsing?{" "}
            <Link to="/" className="hover:underline">
              Continue as guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
