import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi"; // Ensure this import is correct
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = (props) => {
  // const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editlayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "Default Title");
      setSubTitle(data?.layout?.banner?.subTitle || "Default SubTitle");
    }
    if (isLoading) {
      toast.loading("Updating...");
    } else if (!isLoading) {
      toast.dismiss();
    }
    if (isSuccess) {
      toast.success("Hero Updated Successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, isLoading, refetch]);

  const handleHeadingChange = (event: React.FocusEvent<HTMLHeadingElement>) => {
    setTitle(event.target.innerHTML);
  };

  const handleDescriptionChange = (
    event: React.FocusEvent<HTMLParagraphElement>
  ) => {
    setSubTitle(event.target.innerHTML);
  };

  const handleEdit = async () => {
    await editlayout({
      type: "Banner",
      title,
      subTitle,
    });
  };

  return (
    <div className="w-[95%] m-auto flex justify-center items-center h-[70vh] 800px:h-[90vh] translate-y-0 opacity-100 transition-all duration-1000 ease-in-out">
      <div className="relative w-[90%] 800px:w-[80%]">
        <h1
          className="font-extrabold text-[25px] leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center dark:text-white text-[#000000d1] font-Poppins 800px:!leading-[60px] cursor-text"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleHeadingChange}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="pt-2"></div>
        <div className="w-full text-center">
          <p
            className="font-poppins text-[#A3B3BC] mt-5 mb-10 cursor-text"
            contentEditable
            suppressContentEditableWarning
            onBlur={handleDescriptionChange}
            dangerouslySetInnerHTML={{ __html: subTitle }}
          />
        </div>

        <button
          className={` bottom-12 right-12 w-[100px] min-h-[40px] bg-[#656b68] text-black rounded ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle
              ? "cursor-pointer !bg-[#42d383]"
              : "!cursor-not-allowed"
          }`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle
              ? handleEdit
              : () => null
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditHero;
