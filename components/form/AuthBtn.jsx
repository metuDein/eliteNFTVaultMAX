const AuthBtn = ({ otherStyles, handleClicked, title, loading }) => {
  return (
    <button
      className={`${otherStyles} rounded-[10px] w-[329px] h-[72px]text-center text-[17px] font-semibold`}
      onClick={handleClicked}
      disabled={loading}
    >
      {title}
    </button>
  );
};
export default AuthBtn;
