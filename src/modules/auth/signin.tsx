"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "@/validations";

export default function Signin() {
  const form = useForm<ILoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const { mutate: login, isPending } = useLogin();
  const onSubmit = async (data: ILoginPayload) => {
    login(data);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Sign in to your account
      </h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="dedonald" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className=" bg-amber-400 text-white h-[54px] rounded-4xl font-semibold"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Login"}
          </Button>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3 md:justify-between mt-2 text-sm">
            <Link
              href="/forgot-password"
              className="text-amber-300 font-semibold hover:underline"
            >
              Forgot password?
            </Link>
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-amber-300 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
