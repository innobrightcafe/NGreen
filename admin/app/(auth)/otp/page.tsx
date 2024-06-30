import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function Otp() {
  return (
    <div className="flex justify-center text-center items-center min-h-screen  ">
      <Card className="bg-[#FFBE58]/20 hover:bg-[#FFBE58]/50 w-400 h-500">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="font-medium text-black">
            Enter OTP

          </CardTitle>
          <CardDescription>
            Enter the 6 digit OTP sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
      </Card>
    </div>
  );
}
export default Otp;
