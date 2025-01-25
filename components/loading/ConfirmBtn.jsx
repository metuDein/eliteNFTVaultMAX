"use client";

const ConfirmBtn = ({ otherStyles, handleClicked, title, loading }) => {
  return (
    <button
      className={`${otherStyles} rounded-[10px] w-[129px] h-[52px] text-center`}
      onClick={handleClicked}
      disabled={loading}
    >
      {title}
    </button>
  );
};
export default ConfirmBtn;
