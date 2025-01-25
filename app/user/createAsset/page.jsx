import { Suspense } from "react";
import Loading from "@/components/loading/Loading";
import CreateAsset from "@/pages/CreateAsset";

export default function CreateAssetPage() {
  return (
    <Suspense fallback={<Loading otherStyles={"mx-auto"} />}>
      <CreateAsset />
    </Suspense>
  );
}
