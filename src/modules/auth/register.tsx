"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { step1Schema } from "@/validations";

export default function RegisterStep1Page() {
  const router = useRouter();

  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: Step1FormValues) => {
    // Store user data in sessionStorage or pass via router state
    sessionStorage.setItem(
      "registrationData",
      JSON.stringify({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );

    // Navigate to interests selection page
    router.push("/register/interests");
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-2">
          Get Started on Notewords
        </h1>
        <p className="text-center text-gray-600">
          Step 1 of 2: Basic Information
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. john.doe@techcorp.com" {...field} />
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
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-xs text-left">
            By creating an account, you agree to NoteWord&apos;s{" "}
            <Link
              href="/terms"
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use and Privacy policy
            </Link>
          </p>

          <Button
            className="bg-amber-400 text-white h-[54px] rounded-4xl font-semibold"
            type="submit"
          >
            Continue to Interests
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/signin" className="text-amber-400 font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
