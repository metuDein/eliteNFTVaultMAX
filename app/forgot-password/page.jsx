"use client";
import { useState, useEffect } from "react";
import AuthBtn from "@/components/form/AuthBtn";
import InputFields from "@/components/form/InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/loading/Loading";

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!formData.email) {
      setErrorMsg("Enter your email.");

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      console.log(response);

      if (!response.ok) {
        const errorData = JSON.parse(response.error); // Parse the JSON error message
        if (errorData.code === 404) {
          setErrorMsg(errorData.message);
        } else if (errorData.code === 401) {
          setErrorMsg("Incorrect password.");
        } else if (errorData.code === 400) {
          setErrorMsg("Username and password are required.");
        } else {
          setErrorMsg("An unknown error occurred.");
        }
        setTimeout(() => setErrorMsg(null), 3000);
        return;
      }

      if (response.ok) {
        const res = await fetch("/api/mailer/resetpassword", {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            url: data.resetUrl,
          }),
        });

        if (res.ok) {
          toast.success("reset link sent.");
          return;
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
      toast.error("reset failed.");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    } finally {
      setLoading(false);
    }
  }

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
            Forgot Password
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
                label={"Email"}
                placeholder={"enter your email"}
                value={formData.email}
                otherStyles={"w-[450px]"}
                handleChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <AuthBtn
            title={"Submit"}
            otherStyles={"p-4 bg-[#ff4ff3]"}
            handleClicked={submit}
          />
        </form>
      </div>
    </div>
  );
};
export default page;
