"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChatBot from "../components/ChatBot";

const componentMap = {
  Projects: dynamic(() => import("@/app/learn/components/Projects")),
  ToolsCompanyUse: dynamic(() =>
    import("@/app/learn/components/ToolsCompanyUse")
  ),
  DayRemains: dynamic(() => import("@/app/learn/components/Days30Preparation")),
  ResumeExtractor: dynamic(() =>
    import("@/app/learn/components/ResumeExtractor")
  ),
  CreatedCourses: dynamic(() => import("@/app/learn/components/CreateCourse")),
  SoftSkill: dynamic(() => import("@/app/learn/components/SoftSkill")),
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
