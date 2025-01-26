"use client";
import InputFields from "@/components/form/InputFields";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/loading/Loading";
import { useDataContext } from "@/components/context/DataProvider";

const page = () => {
  const { user, appData } = useDataContext();
  const [email, setEmail] = useState("");
  const [receiver, setReciever] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/notification", {
        method: "POST",
        body: JSON.stringify({
          receiver: receiver,
          sender: user?._id || "65ae7a63b050e3a7e9978b79",
          subject,
          email,
          body: description,
        }),
      });
      if (response.ok) {
        await fetch("/api/mailer/custom", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            subject: subject,
            body: `<h2>You have a new message from Elite NFT Vault</h2> 
      <p>${description}</p>`,
          }),
        });
        toast.success("Message sent.");
      }

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error.name, ": ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (appData?.users) {
      const { users } = appData;
      setUsers(users);
      const receiverEmail = users.find((item) => item._id === receiver);
      setEmail(receiverEmail?.email);
    }
  }, [appData, receiver]);

  if (!appData)
    return (
      <div className="">
        <Loading otherStyles={"mx-auto"} />
      </div>
    );

  const UsersOptions = ({ user }) => {
    return <option value={user?._id}>{user?.username}</option>;
  };

  return (
    <div className="w-full min-h-screen p-3 pt-[75px] mb-6">
      <h2 className="text-3xl font-bold text-white text-center">
        {" "}
        Email a User{" "}
      </h2>
      <p className="text-white text-center"> send a message to a user </p>
      <form className="flex flex-col items-center justify-center mx-auto self-center relative">
        {loading && <Loading otherStyles={"absolute bg-[#141414]/60"} />}
        <select
          onChange={(e) => setReciever(e.target.value)}
          value={receiver}
          className="bg-white text-black"
        >
          <option> --- select a user ---</option>
          {[...users].map((item) => (
            <UsersOptions user={item} key={item?._id} />
          ))}
        </select>
        <InputFields
          label={"Email"}
          placeholder={"enter your email"}
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <InputFields
          label={"Subject"}
          placeholder={"enter the subject matter"}
          value={subject}
          handleChange={(e) => setSubject(e.target.value)}
        />
        <div className={`w-[298px]  p-3 flex flex-col `}>
          <label htmlFor={"description"} className="mb-3">
            Description :
          </label>
          <textarea
            className={`bg-transparent border rounded border-[#ef8bf7] border-solid outline-none placeholder:text-[#969494] placeholder:text-[16px] p-3 `}
            placeholder={"send message to a user"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name={"desciption"}
            rows={5}
            cols={10}
          />
        </div>
        <ConfirmBtn
          title={"Submit"}
          otherStyles={"bg-[#ef9bf7] p-3 w-[300px]"}
          loading={loading}
          handleClicked={handleSubmit}
        />
      </form>
    </div>
  );
};
export default page;
