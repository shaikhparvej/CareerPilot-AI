"use client";
import ChatBot from "@/app/components/ChatBot";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const componentMap = {
  StartInterview: dynamic(() =>
    import("@/app/preparation/components/StartHumanInterview")
  ),
  AptitudeExam: dynamic(() =>
    import("@/app/preparation/components/AptitudeExam")
  ),

  CompanyProblem: dynamic(() =>
    import("@/app/preparation/components/CompanyProblem")
  ),
  CodingRound: dynamic(() =>
    import("@/app/preparation/components/CodingRound")
  ),
};

const ParamsPage = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    dynamic(() => import("@/app/components/Instruction"));
  return (
    <>
      <Component />
      <ChatBot />
    </>
  );
};

export default ParamsPage;
