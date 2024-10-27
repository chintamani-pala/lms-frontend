import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [originalQuestions, setOriginalQuestions] = useState<any[]>([]);
  const [editlayout, { isSuccess: layoutSuccess, error, reset }] =
    useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      const initialFaqs = data?.layout?.faq || [];
      setQuestions(initialFaqs);
      setOriginalQuestions(initialFaqs);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
      reset(); // Reset the state to avoid multiple triggers
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("Failed to update FAQ: " + errorData?.data?.message);
      }
    }
  }, [layoutSuccess, error, refetch, reset]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, answer: value } : q
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions.map((q) => ({ ...q, active: false })), // Collapse all existing questions
      {
        _id: Math.random().toString(36).substring(2, 15), // Generate a unique ID for new items
        question: "",
        answer: "",
        active: true, // New question should be expanded
      },
    ]);
  };

  const deleteFaqHandler = (id: any) => {
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q: any) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data?.layout?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editlayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
      <div className="mt-8">
        <dl className="space-y-2">
          {questions?.map((q: any, index: number) => (
            <div key={q._id} className="pb-4">
              {/* Added padding for spacing */}
              <div>
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <input
                      className={`${styles.input} border-none`}
                      value={q.question}
                      onChange={(e: any) =>
                        handleQuestionChange(q._id, e.target.value)
                      }
                      placeholder="Add Your Question"
                    />
                    <span className="ml-6 flex-shrink-0">
                      {q.active ? (
                        <HiMinus className="h-6 w-6" />
                      ) : (
                        <HiPlus className="h-6 w-6" />
                      )}
                    </span>
                  </button>
                </dt>
                {q.active && (
                  <dd className="mt-2 flex items-center">
                    <input
                      className={`${styles.input} border-none`}
                      value={q.answer}
                      onChange={(e: any) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                      placeholder="Add Your Answer"
                    />
                    <span className="ml-6 flex-shrink-0">
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => deleteFaqHandler(q._id)}
                      />
                    </span>
                  </dd>
                )}
              </div>
              {/* Single line separator between question-answer pairs */}
              <hr className="mt-4 border-gray-300" />
            </div>
          ))}
        </dl>
        <br />
        <IoMdAddCircleOutline
          className="dark:text-white text-black text-[25px] cursor-pointer"
          onClick={newFaqHandler}
        />
      </div>
      <div
        className={`${
          styles.button
        } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34] ${
          areQuestionsUnchanged(originalQuestions, questions) ||
          isAnyQuestionEmpty(questions)
            ? "!cursor-not-allowed"
            : "!cursor-pointer !bg-[#42d383]"
        } !rounded mt-[20px] bottom-12 right-12`}
        onClick={
          areQuestionsUnchanged(originalQuestions, questions) ||
          isAnyQuestionEmpty(questions)
            ? () => null
            : handleEdit
        }
      >
        Save
      </div>
    </div>
  );
};

export default EditFaq;
