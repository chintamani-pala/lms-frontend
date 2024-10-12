import React, { FC, useState } from "react";
import { styles } from "../../../../app/styles/style";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1); // Proceed to the next step
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        {/* Course Name Field */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-lg font-semibold mb-2">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            value={courseInfo.name || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="Enter course name"
            className={`${styles.input}`}
            required
          />
        </div>

        {/* Course Description Field */}
        <div className="mb-5">
          <label htmlFor="description" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            id="description"
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} h-min py-2`}
            value={courseInfo.description || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* Course Price and Estimated Price Fields */}
        <div className="w-full flex justify-between">
          {/* Course Price */}
          <div className="w-[45%]">
            <label htmlFor="price" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              id="price"
              value={courseInfo.price || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="29"
              className={`${styles.input}`}
              required
            />
          </div>

          {/* Estimated Price */}
          <div className="w-[45%]">
            <label htmlFor="estimatedPrice" className={`${styles.label}`}>
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice || ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                })
              }
              placeholder="49"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        {/* Course Tags Field */}
        <div className="mt-5">
          <label htmlFor="tags" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            id="tags"
            value={courseInfo.tags || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
            className={`${styles.input}`}
            required
          />
        </div>
        <br />
        {/* Course Level Field */}
        <div className="w-full flex justify-between mt-5">
          <div className="w-[45%]">
            <label htmlFor="level" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              id="level"
              value={courseInfo.level || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
              required
            />
          </div>

          {/* Demo URL Field */}
          <div className="w-[45%]">
            <label htmlFor="demoUrl" className={`${styles.label}`}>
              Demo URL
            </label>
            <input
              type="text"
              id="demoUrl"
              value={courseInfo.demoUrl || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="eer74fd"
              className={`${styles.input}`}
              required
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="Thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        {/* Submit Button */}
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] dark:text-black rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
