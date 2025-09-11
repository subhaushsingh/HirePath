'use server';

import { db } from "@/firebase/admin";
import { success } from "zod";

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists)
            return {
                success: false,
                message: "User already exists. Please sign in.",
            };


         await db.collection("users").doc(uid).set({
      name,
      email,
    });


    } catch (e: any) {
        console.log("Error creating the user", e)

        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "This email is already in use."
            }
        }

        return {
            success: false,
            message: "Failed to create an account."
        }
    }
}

