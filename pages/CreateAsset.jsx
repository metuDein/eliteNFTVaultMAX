"use client";
import ImageUpload from "@/components/imageupload/ImageUpload";
import InputFields from "@/components/form/InputFields";
import AuthBtn from "@/components/form/AuthBtn";
import { useState } from "react";
import Loading from "@/components/loading/Loading";
import { toast } from "react-toastify";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmBtn from "@/components/loading/ConfirmBtn";
import { useDataContext } from "@/components/context/DataProvider";

const CreateAsset = () => {
  const { fetchAppData } = useDataContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = searchParams.get("collectionId");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [blockChain, setBlockChain] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    supply: 1,
    description: "",
  });

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("65ae7a63b050e3a7e9978b79");

  async function submitCreate(e) {
    e.preventDefault();
    console.log(name, blockChain, image.substring(0, 10));
    if (!formData.name || !formData.price || !category || !image || !userId) {
      toast.error("All fields required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/mediaupload", {
        method: "POST",
        body: JSON.stringify({
          image,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      if (response.ok) {
        const imageData = await response.json();
        const res = await fetch("/api/assets", {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            owner: userId,
            collection: collectionId,
            image_public_id: imageData.uid,
            image_url: imageData.imageURL,
            price: formData.price,
            category,
            description: formData.description,
            supply: formData.supply,
            blockChain,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.message);
        }
        if (res.ok) {
          await fetchAppData();
          router.push("/user");
          toast.success("Asset created");
        }
      }
    } catch (error) {
      console.log(error.name, error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-[75px] pb-6">
      <h2 className="text-center text-3xl font-bold text-[#ffffff] mb-3">
        Create an Asset
      </h2>
      <div className=" w-full sm:max-w-5xl min-h-[532px] rounded-[10px]  flex flex-col sm:flex-row sm:space-x-5 justify-center items-start relative">
        {loading && (
          <Loading
            otherStyles={"absolute mx-auto z-30  bg-[#582b71]/50 top-2"}
          />
        )}
        <div className="min-h-3 mx-auto">
          <ImageUpload
            image={image}
            setImage={setImage}
            title={`(File types supported: JPG, PNG, GIF, SVG, WAV, OGG, GLB, GLTF. Max size: 10 MB)`}
            otherStyles={""}
          />
        </div>
        <div className="h-[400px] w-[1px] border border-[#ff4ff3] border-solid self-center sm:flex hidden" />
        <form onSubmit={submitCreate} className="mt-6 sm:mt-0 mx-auto">
          <p className="text-xl font-semibold mb-2">
            Provide details for your asset.
          </p>
          <InputFields
            label={"Name"}
            value={formData.name}
            handleChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder={"pick a unique name for your asset"}
            otherStyles={"mb-2"}
          />
          <InputFields
            label={"Price"}
            value={formData.price}
            handleChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder={"set a price for your asset"}
            otherStyles={"mb-2"}
            inputType={"number"}
          />
          <InputFields
            label={"Supply"}
            value={formData.supply}
            handleChange={(e) =>
              setFormData({ ...formData, supply: e.target.value })
            }
            placeholder={"select amount for sale"}
            otherStyles={"mb-2"}
            inputType={"number"}
          />
          <CustomDropdown
            category={category}
            setCategory={setCategory}
            otherStyles={"mb-2"}
          />
          <div className={`w-[298px]  p-3 flex flex-col `}>
            <label htmlFor={"description"} className="mb-3">
              Description :
            </label>
            <textarea
              className={`bg-transparent border  border-[#ef8bf7] border-solid outline-none placeholder:text-[#969494] placeholder:text-[16px] p-3 `}
              placeholder={"tells us more about your asset"}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              name={"desciption"}
              rows={5}
              cols={10}
            />
          </div>
          <div className="mx-auto flex items-center justify-center">
            <ConfirmBtn
              title={"Create"}
              otherStyles={"p-4 bg-[#ff4ff3] ml-0 sm:ml-3 w-[200px] sm:w-full"}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAsset;
