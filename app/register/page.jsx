"use client";
import { useState, useEffect } from "react";
import AuthBtn from "@/components/form/AuthBtn";
import InputFields from "@/components/form/InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/loading/Loading";

const USER_REGEX = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z][a-zA-Z0-9!@#$%]{7,23}$/;

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");

  const [validUserName, setValidUserName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    console.log(formData, confirmPass);

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMsg("All fields required");

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return;
    }
    if (confirmPass !== formData.password) {
      setErrorMsg("passwords do not match");

      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log(response);
      if (response.status === 409) {
        setErrorMsg("username already exists");
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);

        return;
      }
      if (response.ok) {
        await fetch("/api/mailer/custom", {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            subject: `Welcome on Board ${formData.username}`,
            body: `<h2>Welcome to EliteNFTVault! 🎉</h2> 
            <p>Hi ${formData.username},</p>
            <p>Thank you for joining EliteNFTVault! We’re excited to have you on board and can’t wait to help you make your first sale.
</p>
<p>Need help? Reply anytime—we’re here for you! Cheers,
</p>
<p>
EliteNFTVault team,</p>`,
          }),
        });
        toast.success(
          "Registration Successful. check your email (also your spam folder). Redirecting..."
        );
        router.push("/login");
      }
    } catch (error) {
      toast.error("registration failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const result = USER_REGEX.test(formData.username);
    setValidUserName(result);
  }, [formData.username]);
  useEffect(() => {
    const result = PWD_REGEX.test(formData.password);
    setValidPassword(result);
  }, [formData.password]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(formData.email);
    setValidEmail(result);
  }, [formData.email]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center pt-[75px] pb-6">
      <div className="w-full sm:w-[1184px]  rounded-[10px] flex justify-around items-center">
        <div className="w-[466px] hidden items-end sm:flex">
          <Image
            src={"/assets/authimage.png"}
            alt="auth sample"
            width={"700"}
            height={"700"}
            className="w-full self-end"
          />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-start relative min-h-1"
        >
          {loading && (
            <Loading otherStyles={"absolute z-30 bg-[#582b71]/30 top-0"} />
          )}
          <h2 className="text-3xl font-bold mb-2 text-center w-full">
            Sign Up
          </h2>
          <p className="mb-2 font-semibold text-[16px] text-center w-full">
            Already have an account?{" "}
            <Link href={"/login"} className="text-[#ff4ff3] underline">
              Sign In
            </Link>
          </p>
          {errorMsg && (
            <div className="p-2 w-[300px] rounded-[10px] bg-white text-black border border-[#cb4747]">
              <p className="text-[#cb4747] font-bold text-center">
                <FontAwesomeIcon icon={faCircleExclamation} /> {errorMsg}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
            <div className="relative">
              <InputFields
                label={"Username"}
                placeholder={"enter your username"}
                value={formData.username}
                handleChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              {formData.username && validUserName && (
                <div className="absolute w-[17px] rounded-full top-2 right-1">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-[#228b33]"
                  />
                </div>
              )}
              {formData.username && !validUserName && (
                <div className="bg-white rounded-[10px] p-2 w-[300px] z-30 absolute text-black">
                  <p className="w-full ">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ marginRight: "3px" }}
                    />
                    8 - 24 characters. <br />
                    Must begin With a letter. <br />
                    Letters, numbers, special characters allowed.
                  </p>
                </div>
              )}
            </div>
            <div className="relative">
              <InputFields
                label={"Email"}
                placeholder={"enter your email"}
                value={formData.email}
                handleChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {formData.email && validEmail && (
                <div className="absolute w-[17px] rounded-full top-2 right-1">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-[#228b33]"
                  />
                </div>
              )}
              {formData.email && !validEmail && (
                <div className="bg-white rounded-[10px] p-2 w-[300px] z-30 absolute text-black">
                  <p className="w-full">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ marginRight: "3px" }}
                    />
                    please enter a vaild email e.g <br />
                    example@gmail.com <br />
                    example@hotmail.com <br />
                    example@yahoomail.com
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
            <div className="relative">
              <InputFields
                label={"Password"}
                placeholder={"enter your password"}
                value={formData.password}
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
            <div className="relative">
              <InputFields
                label={"Confirm password"}
                placeholder={"re-enter your password"}
                value={confirmPass}
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
          <p className="my-2 sm:text-[16px] text-sm w-[300px] mx-auto text-center">
            {" "}
            By continuing, you have agreed to the{" "}
            <Link
              href={`/frequently-asked-question?tab=5`}
              className="font-bold text-[#ff4ff3] underline"
            >
              {" "}
              terms and conditions
            </Link>{" "}
            of EliteNFTVault.{" "}
          </p>
          <AuthBtn
            title={"Sign Up"}
            otherStyles={"p-4 bg-[#ff4ff3] w-[270px] sm:w-full"}
            handleClicked={submit}
          />
        </form>
      </div>
    </div>
  );
};
export default page;
