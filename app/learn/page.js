"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChatBot from "../components/ChatBot";

const componentMap = {
  Projects: dynamic(() => import("./components/Projects")),
  ToolsCompanyUse: dynamic(() =>
    import("./components/ToolsCompanyUse")
  ),
  DayRemains: dynamic(() => import("./components/Days30Preparation")),
  ResumeExtractor: dynamic(() =>
    import("./components/ResumeExtractor")
  ),
  CreatedCourses: dynamic(() => import("./components/CreateCourse")),
  SoftSkill: dynamic(() => import("./components/SoftSkill")),
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
