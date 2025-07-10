import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "@tanstack/react-router";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function Verification({ email }: { email?: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null); // 🧠 persist timer ID
  const router = useRouter();
  // Countdown logic using useRef
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [canResend]);

  const resendOTP = async () => {
    setCanResend(false);
    setTimeLeft(30);
    try {
      const res = await axios.post(
        "https://talk-l955.onrender.com/api/v1/auth/resend-otp",
        { email }
      );
      console.log(res);
    } catch (err) {
      console.error("Failed to resend OTP", err);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setIsLoading(true);
    try {
      const datares = await axios.post(
        "https://talk-l955.onrender.com/api/v1/auth/verify-user-otp",
        { otp_code: data.pin }
      );
      console.log(datares);
      if (datares.data.status === "success") {
        form.reset();
        router.navigate({ to: "/" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="mt-6 flex w-full flex-col items-center gap-6">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  value={field.value}
                  onChange={field.onChange}
                  maxLength={6}
                  autoFocus
                  inputMode="numeric"
                >
                  <InputOTPGroup className="flex gap-2 justify-between w-full *:border  *:text-xl *:size-10 *:rounded-md">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-base py-5 tracking-wide text-white rounded-full mt-3 bg-main"
              >
                Submit
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full space-y-2">
          <p className="text-grey-150 dark:text-dark-grey-150 text-sm tracking-wide text-center">
            Didn&apos;t get the code ?
            <br />
          </p>
          <Button
            variant="outline"
            disabled={!canResend}
            onClick={resendOTP}
            className="w-full bg-secondary text-sm font-medium"
          >
            {canResend ? "Resend code" : `Resend code in ${timeLeft}s`}
          </Button>
        </div>
      </form>
    </Form>
  );
}
