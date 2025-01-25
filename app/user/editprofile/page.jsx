"use client";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/imageupload/ImageUpload";
import { useDataContext } from "@/components/context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/loading/Loading";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { toast } from "react-toastify";
import InputFields from "@/components/form/InputFields";

const USER_REGEX = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z][a-zA-Z0-9!@#$%]{7,23}$/;

const page = () => {
  const { user, getUser } = useDataContext();
  const [userData, setUserData] = useState("");
  const [image, setImage] = useState("");
  const [tab, setTab] = useState("view");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [validUserName, setValidUserName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    console.log(formData, confirmPass);

    if (!formData.username || !formData.email) {
      setErrorMsg("All fields required");

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return;
    }
    if (confirmPass !== newPassword) {
      setErrorMsg("passwords do not match");

      return;
    }

    try {
      setLoading(true);

      if (image !== user.image) {
        const response = await fetch("/api/mediaupload", {
          method: "POST",
          body: JSON.stringify({
            image,
          }),
        });

        if (response.ok) {
          const imageData = await response.json();
          const res = await fetch("/api/userrequest/edit", {
            method: "PATCH",
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: newPassword,
              bio: formData.bio,
              image_public_id: imageData.uid,
              image_url: imageData.imageURL,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            setErrorMsg(errorData.message);
            toast.error("update failed");
            return;
          }
          if (res.ok) {
            await getUser();
            toast.success("update successful.");
          }
        }
      } else {
        const response = await fetch("/api/userrequest/edit", {
          method: "PATCH",
          body: JSON.stringify({
            id: user?._id,
            username: formData.username,
            email: formData.email,
            password: newPassword,
            bio: formData.bio,
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
          await getUser();
          toast.success("update successful.");
        }
      }
    } catch (error) {
      toast.error("update failed.");
    } finally {
      setLoading(false);
    }
  }

  function cancelEdit() {
    setImage(user.image);
    setFormData({
      ...formData,
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
    });
    setTab("view");
  }

  useEffect(() => {
    const result = USER_REGEX.test(formData.username);
    setValidUserName(result);
  }, [formData.username]);
  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidPassword(result);
  }, [newPassword]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(formData.email);
    setValidEmail(result);
  }, [formData.email]);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setFormData({
        ...formData,
        username: user.username,
        email: user.email,
      });
      setImage(user.image);
    }
  }, [user]);

  if (!userData) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-[75px] pb-6">
      <h2 className="text-center text-3xl font-bold text-[#ffffff] mb-3">
        Profile Details
      </h2>
      <div className=" rounded-[10px] flex  flex-col sm:flex-row justify-center items-start relative">
        <div className="mx-3">
          <ImageUpload
            image={image}
            setImage={setImage}
            title={`click to change`}
            otherStyles={""}
          />
        </div>
        <div className="h-[400px] w-[1px] border border-[#ff4ff3] border-solid self-center sm:mx-3 hidden sm:flex" />
        {tab === "view" && (
          <div className="flex flex-col items-start justify-start flex-1 self-center mx-3">
            <div className="w-full">
              <p> username : </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2">
                {user?.username}
              </p>
            </div>
            <div className="w-full">
              <p> email : </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2">
                {user?.email}
              </p>
            </div>
            <div className="w-full">
              <p> wallet address : </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words">
                {user?.walletAddress && user?.walletAddress}
                {!user?.walletAddress && "no wallet connected"}
              </p>
            </div>
            <div className="w-full">
              <p> Bio: </p>
              <p className="p-3 bg-[#ff4ff3]/30 rounded text-white text-left w-[290px] mt-2 break-words">
                {user?.bio && user?.bio}
                {!user?.bio && "bio"}
              </p>
            </div>
            <ConfirmBtn
              title={"Edit"}
              otherStyles={"p-3 bg-[#ff4ff3] font-semibold my-3 float-left"}
              handleClicked={() => setTab("edit")}
            />
          </div>
        )}
        {tab === "edit" && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-start justify-start relative mx-3"
          >
            {loading && (
              <Loading otherStyles={"absolute z-30 bg-[#582b71]/30 top-0"} />
            )}

            {errorMsg && (
              <div className="p-2 w-[300px] rounded-[10px] bg-white text-black border border-[#cb4747]">
                <p className="text-[#cb4747] font-bold text-center">
                  <FontAwesomeIcon icon={faCircleExclamation} /> {errorMsg}
                </p>
              </div>
            )}

            <div className="flex flex-col items-center justify-between mb-2">
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
              <div className="relative">
                <InputFields
                  label={"Bio"}
                  placeholder={"enter your Bio"}
                  value={formData.bio}
                  handleChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between mb-2">
              <div className="relative">
                <InputFields
                  label={"New Password"}
                  placeholder={"enter your password"}
                  value={newPassword}
                  handleChange={(e) => setNewPassword(e.target.value)}
                />
                {newPassword && validPassword && (
                  <div className="absolute w-[17px] rounded-full top-2 right-1">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-[#228b33]"
                    />
                  </div>
                )}

                {newPassword && !validPassword && (
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
                />
                {confirmPass && confirmPass === newPassword && (
                  <div className="absolute w-[17px] rounded-full top-2 right-1">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-[#228b33]"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <ConfirmBtn
                title={"Save"}
                otherStyles={"p-4 bg-[#ff4ff3] mx-1"}
                handleClicked={submit}
                loading={loading}
              />
              <ConfirmBtn
                title={"Cancel"}
                otherStyles={"p-4 bg-[#ff4ff3]/30 mx-1"}
                handleClicked={cancelEdit}
                loading={loading}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default page;
