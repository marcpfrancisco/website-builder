"use server";

import {
  createSession,
  FormState,
  SignupFormSchema,
  SigninFormSchema,
  deleteSession,
} from "@/lib";
import { login, register } from "@/services";
import { redirect } from "next/navigation";

export const signinAction = async (state: FormState, formData: FormData) => {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await login(validatedFields.data);
    const { user, token } = response;
    await createSession(user.id, token);
    return { user };
  } catch (error) {
    console.error("Sign-in error:", error);
    return {
      message: "Invalid email or password. Please try again.",
    };
  }
};

export const signupAction = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // register
    const response = await register(validatedFields.data);

    const { user, token } = response;

    if (!user || !token) {
      return {
        success: false,
        message: "Failed to create an account. Please try again.",
      };
    }

    await createSession(user.id, token);

    return { user };
  } catch (error: any) {
    console.error("Sign-up error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while creating an account.",
    };
  }
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
