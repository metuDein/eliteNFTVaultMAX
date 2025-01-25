import { Suspense } from "react";
import ResetPassword from "@/pages/ResetPassword";
import Loading from "@/components/loading/Loading"; // Rename your component file if necessary

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading otherStyles={"mx-auto"} />}>
      <ResetPassword />
    </Suspense>
  );
}
