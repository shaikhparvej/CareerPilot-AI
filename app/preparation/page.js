"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChatBot from "../components/ChatBot";

const componentMap = {
  StartInterview: nextDynamic(() =>
    import("./components/StartHumanInterview")
  ),
  AptitudeExam: nextDynamic(() =>
    import("./components/AptitudeExam")
  ),

  CompanyProblem: nextDynamic(() =>
    import("./components/CompanyProblem")
  ),
  CodingRound: nextDynamic(() =>
    import("./components/CodingRound")
  ),
};

const ParamsPage = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    nextDynamic(() => import("../components/Instruction"));
  return (
    <>
      <Component />
      <ChatBot />
    </>
  );
};

export default ParamsPage;
