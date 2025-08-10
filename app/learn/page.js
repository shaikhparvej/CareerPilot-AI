"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChatBot from "../components/ChatBot";

const componentMap = {
  Projects: nextDynamic(() => import("./components/Projects")),
  ToolsCompanyUse: nextDynamic(() =>
    import("./components/ToolsCompanyUse")
  ),
  DayRemains: nextDynamic(() => import("./components/Days30Preparation")),
  ResumeExtractor: nextDynamic(() =>
    import("./components/ResumeExtractor")
  ),
  CreatedCourses: nextDynamic(() => import("./components/CreateCourse")),
  SoftSkill: nextDynamic(() => import("./components/SoftSkill")),
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
