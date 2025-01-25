import Image from "next/image";

const Loading = ({ otherStyles }) => {
  return (
    <div
      className={`w-[299px] h-[400px] sm:w-[332px] sm:h-[511] rounded-[10px]  flex flex-col p-3 items-center justify-center  ${otherStyles} `}
    >
      <div className="w-full flex items-center justify-around">
        <Image
          src={"/assets/loading.gif"}
          width="197"
          height="112"
          alt="currently loading"
          className="w-[197px] h-[201px]"
          unoptimized
        />
      </div>
    </div>
  );
};
export default Loading;
