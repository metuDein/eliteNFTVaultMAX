import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StepsCard = ({ icon, title, body }) => {
  return (
    <div className=" w-[150px] sm:w-[200px] py-3 sm:py-10 px-3 rounded-[10px] bg-[#ef8bf7]/50 flex flex-col items-start justify-center">
      <FontAwesomeIcon icon={icon} className="text-xl" />
      <p className="my-2 font-semibold"> {title}</p>
      <small> {body} </small>
    </div>
  );
};
export default StepsCard;
