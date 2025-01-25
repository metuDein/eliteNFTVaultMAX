"use client";
import { useState, useEffect } from "react";
import AuthBtn from "@/components/form/AuthBtn";
import InputFields from "@/components/form/InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faInfoCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

import Loading from "@/components/loading/Loading";

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z][a-zA-Z0-9!@#$%]{7,23}$/;

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  const [formData, setFormData] = useState({
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (confirmPass !== formData.password) {
      setErrorMsg("Passwords do not match.");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/userrequest/resetpassword", {
        method: "PATCH",
        body: JSON.stringify({ password: formData.password, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.message || "An unknown error occurred.");
        setTimeout(() => setErrorMsg(null), 3000);
        return;
      }

      toast.success("Password reset successfully. Redirecting...");
      // router.push("/login");
    } catch (error) {
      setErrorMsg(error.message);
      toast.error("Password reset failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const result = PWD_REGEX.test(formData.password);
    setValidPassword(result);
  }, [formData.password]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="sm:w-[1184px] h-[532px] rounded-[10px] border border-black/30 flex justify-around items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-start relative flex-1"
        >
          {loading && (
            <Loading otherStyles={"absolute z-30 bg-[#582b71]/30 top-0"} />
          )}
          <h2 className="text-3xl font-bold mb-2 text-center w-full">
            set new password
          </h2>
          {errorMsg && (
            <div className="p-2 w-[300px] rounded-[10px] bg-white text-black border border-[#cb4747]">
              <p className="text-[#cb4747] font-bold text-center">
                <FontAwesomeIcon icon={faCircleExclamation} /> {errorMsg}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mb-2">
            <div className="relative">
              <InputFields
                label={"New password"}
                placeholder={"enter a new password"}
                value={formData.password}
                otherStyles={"w-[450px]"}
                handleChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                inputType={"password"}
              />
              {formData.password && validPassword && (
                <div className="absolute w-[17px] rounded-full top-2 right-1">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-[#228b33]"
                  />
                </div>
              )}

              {formData.password && !validPassword && (
                <div className="bg-white rounded-[10px] p-2 w-[300px] absolute text-black">
                  <p className={"w-full"}>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ marginRight: "3px" }}
                    />
                    8 - 24 characters. <br />
                    Must begin With a letter. <br />
                    upper and lower case letter, a number and a special
                    character allowed :!@#$%.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="relative">
              <InputFields
                label={"Confirm new password"}
                placeholder={"enter a new password"}
                value={confirmPass}
                otherStyles={"w-[450px]"}
                handleChange={(e) => setConfirmPass(e.target.value)}
                inputType={"password"}
              />
              {confirmPass && confirmPass === formData.password && (
                <div className="absolute w-[17px] rounded-full top-2 right-1">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-[#228b33]"
                  />
                </div>
              )}
            </div>
          </div>
          <AuthBtn
            title={"Reset"}
            otherStyles={"p-4 bg-[#ff4ff3]"}
            handleClicked={submit}
          />
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
