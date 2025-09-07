"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";



import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";


import FormField from "./FormField";
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email:z.email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({type}:{type:FormType}) => {



  
  const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type==='sign-up'){
        console.log('SIGN-UP',values);
      }
      else{
        console.log('SIGN-IN',values)
      }
    } catch (error) {
      console.log(error);
      toast.error("There was some error:${error}")
    }
  }

const isSignIn = type === 'sign-in';

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className=" card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row justify-center gap-2">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100">HirePath</h2>
        </div>
         <h3 className="text-center">Practice job interviews with AI</h3>
      
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
         {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}
        <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
        <Button type="submit" className="btn">{isSignIn ? "sign-in":"Create an account"}</Button>
      </form>
    </Form>
    <p className="text-center">
        {isSignIn? "No account yet?": "Have an account already?"}
        <Link href={isSignIn?"/sign-up":"/sign-in"} className="font-bold text-user-primary ml-1">
          {isSignIn?"Sign-up":"Sign-in"}
        </Link>
    </p>
    </div>
    </div>
    </div>
  )
}

export default AuthForm
