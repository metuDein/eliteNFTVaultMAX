import Loading from "@/components/loading/Loading";
const loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Loading otherStyles={"mx-auto"} />
    </div>
  );
};
export default loading;
