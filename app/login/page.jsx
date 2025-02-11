"use client";
import { useState, useEffect } from "react";
import AuthBtn from "@/components/form/AuthBtn";
import InputFields from "@/components/form/InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useDataContext } from "@/components/context/DataProvider";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/loading/Loading";

const page = () => {
  const router = useRouter();
  const { getUser } = useDataContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMsg("Enter your details.");

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      console.log(response);

      if (!response.ok) {
        const errorData = JSON.parse(response.error); // Parse the JSON error message
        if (errorData.code === 404) {
          setErrorMsg("User not found.");
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
        await getUser();
        toast.success("Login Successful. redirecting...");
        router.push("/user");
        return;
      }
    } catch (error) {
      setErrorMsg(error.message);
      setTimeout(() => setErrorMsg(null), 3000);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center pt-[75px] pb-6">
      <div className="sm:w-[1184px] h-[532px] rounded-[10px] flex justify-around items-center">
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
          className="flex flex-col items-center justify-start relative"
        >
          {loading && (
            <Loading otherStyles={"absolute z-30 bg-[#582b71]/30 top-0"} />
          )}
          <h2 className="text-3xl font-bold mb-2 text-center w-full">
            Sign In
          </h2>
          <p className="mb-2 font-semibold text-[16px] text-center w-full">
            Don't have an account?{" "}
            <Link href={"/register"} className="text-[#ff4ff3] underline">
              Sign up
            </Link>
          </p>
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
                label={"Username"}
                placeholder={"enter your username"}
                value={formData.username}
                otherStyles={"w-[299px] sm:w-[450px]"}
                handleChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="relative">
              <InputFields
                label={"Password"}
                placeholder={"enter your password"}
                value={formData.password}
                otherStyles={"w-[299px] sm:w-[450px]"}
                handleChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                inputType={"password"}
              />
            </div>
          </div>
          <div className="mb-2 font-semibold text-[16px] text-left w-[300px] sm:w-[400px] -mt-3">
            <Link
              href={"/forgot-password"}
              className="text-[#ff4ff3] underline"
            >
              forgot password?
            </Link>
          </div>
          <AuthBtn
            title={"Sign In"}
            otherStyles={"p-4 bg-[#ff4ff3]  w-[270px] sm:w-full"}
            handleClicked={submit}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};
export default page;
