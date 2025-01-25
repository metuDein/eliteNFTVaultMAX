const InputFields = ({
  placeholder,
  label,
  otherStyles,
  value,
  handleChange,
  inputStyles,
  inputType,
}) => {
  return (
    <div className={`w-[298px] h-[110px] p-3 flex flex-col ${otherStyles}`}>
      <label htmlFor={label} className="mb-3">
        {label} :
      </label>
      <input
        type={inputType || "text"}
        className={`bg-transparent border border-t-0 border-l-0 border-r-0 border-[#ef8bf7] border-solid outline-none placeholder:text-[#969494] placeholder:text-[16px] pt-3 pr-3 ${inputStyles}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={label}
      />
    </div>
  );
};
export default InputFields;
