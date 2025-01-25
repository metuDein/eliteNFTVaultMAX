"use client";

import { useEffect, useState, use } from "react";
import { useDataContext } from "@/components/context/DataProvider";
import InputFields from "@/components/form/InputFields";
import AuthBtn from "@/components/form/AuthBtn";
import Loading from "@/components/loading/Loading";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
import { toast } from "react-toastify";
import Image from "next/image";
import ConfirmBtn from "@/components/loading/ConfirmBtn";

const Page = (props) => {
  const params = use(props.params);
  const { appData } = useDataContext();
  const { assets } = appData;

  const [resolvedParams, setResolvedParams] = useState(null);
  const [asset, setAsset] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    supply: "",
    description: "",
  });
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchParams() {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams && assets.length) {
      const currentAsset = assets.find(
        (item) => item._id === resolvedParams.id
      );
      setAsset(currentAsset);
      if (currentAsset) {
        setFormData({
          name: currentAsset.name,
          price: currentAsset.price,
          supply: currentAsset.supply,
          description: currentAsset.description,
        });
        setCategory(currentAsset.category);
        setImage(currentAsset.image);
      }
    }
  }, [resolvedParams, assets]);

  async function handleUpdate(e) {
    e.preventDefault();
    if (!formData.name || !formData.price || !category || !image) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/assets", {
        method: "PATCH",
        body: JSON.stringify({
          id: resolvedParams.id,
          name: formData.name,
          price: formData.price,
          supply: formData.supply,
          description: formData.description,
          category: category,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message);
        return;
      }
      if (res.ok) {
        toast.success("Asset updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAsset() {
    setLoading(true);
    try {
      const response = await fetch("/api/assets", {
        method: "DELETE",
        body: JSON.stringify({
          id: resolvedParams.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }
      if (response.ok) {
        toast.success;
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!resolvedParams || !asset) return <Loading otherStyles={"mx-auto"} />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-[75px] pb-6">
      <h2 className="text-center text-3xl font-bold text-[#ffffff] mb-3">
        Edit Asset
      </h2>
      <div className="sm:w-[1184px] min-h-[532px] rounded-[10px] flex flex-col sm:flex-row sm:space-x-5 justify-center items-center sm:items-start relative">
        {loading && (
          <Loading otherStyles="absolute mx-auto z-30 bg-[#582b71]/50 top-2" />
        )}
        <div>
          <label
            htmlFor="imageupload"
            className=" w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] bg-[#ef8bf7]/30 flex items-center justify-center rounded-xl cursor-default mx-auto"
          >
            {image && (
              <Image
                src={image || "/assets/nftsample.jpg"}
                alt="upload sample"
                className="w-full h-[400px] sm:h-[500px] object-cover rounded-xl"
                width={"750"}
                height={"750"}
              />
            )}
          </label>
        </div>
        <div className="h-[400px] w-[1px] border border-[#ff4ff3] self-center hidden sm:flex" />
        <form onSubmit={handleUpdate}>
          <p className="text-xl font-semibold mb-2 mt-3 sm:mt-0 ">
            Provide details for your asset.
          </p>
          <InputFields
            label="Name"
            value={formData.name}
            handleChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Pick a unique name for your asset"
          />
          <InputFields
            label="Price"
            value={formData.price}
            handleChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="Set a price for your asset"
            inputType="number"
          />
          <InputFields
            label="Supply"
            value={formData.supply}
            handleChange={(e) =>
              setFormData({ ...formData, supply: e.target.value })
            }
            placeholder="Select amount for sale"
            inputType="number"
          />
          <CustomDropdown
            category={category}
            setCategory={setCategory}
            otherStyles={"w-[299px]"}
          />
          <div className="w-[298px] p-3 flex flex-col">
            <label htmlFor="description" className="mb-3">
              Description:
            </label>
            <textarea
              className="bg-transparent border border-[#ef8bf7] placeholder:text-[#969494] placeholder:text-[16px] p-3"
              placeholder="Tell us more about your asset"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              cols={10}
            />
          </div>
          <div className="w-full mx-auto flex items-center justify-center">
            <ConfirmBtn
              title="Update"
              loading={loading}
              otherStyles={"p-3 bg-[#ff4ff3]"}
              handleClicked={handleUpdate}
            />
            <ConfirmBtn
              title="Delete"
              loading={loading}
              otherStyles={"p-3 bg-[#cb4747] ml-3"}
              handleClicked={deleteAsset}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
