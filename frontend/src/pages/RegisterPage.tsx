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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const registerFormSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .max(150, {
        message: "Password must be less than 150 characters.",
      })
      .min(6, {
        message: "Password must be more than 6 characters.",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

const RegisterPage = () => {
    const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    );
    if (response.ok) {
        navigate("/login")
    } else {
        const responseBody = await response.json()
        console.log(responseBody)
        alert(`An error occurred. Please try again:\n\n${responseBody.message}`)
    }
  }

  return (
    <div className="mt-20 mx-auto bg-secondary max-w-screen-lg">
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-xl font-bold my-16">Register an account</h1>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormDescription>Re-enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="float-right" type="submit">
              Register
            </Button>
          </form>
        </Form>
        <div className="footer mb-10">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="hover:text-accent underline">
              Log in
            </Link>
          </p>
          <p>
            Just browsing?{" "}
            <Link to="/" className="hover:text-accent underline">
              Continue as guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
