"use client";
import ChatBot from "../components/ChatBot";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const componentMap = {
  StartInterview: dynamic(() =>
    import("./components/StartHumanInterview")
  ),
  AptitudeExam: dynamic(() =>
    import("./components/AptitudeExam")
  ),

  CompanyProblem: dynamic(() =>
    import("./components/CompanyProblem")
  ),
  CodingRound: dynamic(() =>
    import("./components/CodingRound")
  ),
};

const ParamsPage = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    dynamic(() => import("../components/Instruction"));
  return (
    <>
      <Component />
      <ChatBot />
    </>
  );
};

export default ParamsPage;
