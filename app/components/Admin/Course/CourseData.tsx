import { styles } from "../../../../app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitsChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddPrerequisits = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1].title === "" ||
      prerequisites[prerequisites.length - 1].title === ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("All fields are required for go to next!");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benifits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            key={index}
            type="text"
            name="Benefits"
            placeholder="You will be able to build a full stack LMS platform...."
            required
            value={benefit.title}
            onChange={(e) => handleBenefitsChange(index, e.target.value)}
            className={`${styles.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((benefit, index) => (
          <input
            key={index}
            type="text"
            name="Benefits"
            placeholder="You will be able to build a full stack LMS platform...."
            required
            value={prerequisites?.title}
            onChange={(e) => handlePrerequisitChange(index, e.target.value)}
            className={`${styles.input} my-2`}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisits}
        />
        <div className="w-full flex items-center justify-between">
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => prevButton()}
          >
            Prev
          </div>
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => handleOptions()}
          >
            Next
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default CourseData;
