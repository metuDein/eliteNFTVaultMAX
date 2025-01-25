import { Suspense } from "react";
import User from "@/pages/User"; // Rename your component file if necessary
import Loading from "@/components/loading/Loading";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading otherStyles={"mx-auto"} />}>
      <User />
    </Suspense>
  );
}
