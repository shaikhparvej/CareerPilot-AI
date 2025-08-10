"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChatBot from "../components/ChatBot";

const componentMap = {
  DepartmentJobRoles: dynamic(() =>
    import("./components/DepartmentJobs")
  ),
  RoleRoadMap: dynamic(() =>
    import("./components/RoleRoadMap")
  ),

  MoreInfoRole: dynamic(() =>
    import("./components/MoreInfoRole")
  ),

  CourseRoadmap: dynamic(() =>
    import("./components/CourseRoadmap")
  ),
};

const CareerPlanning = () => {
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

export default CareerPlanning;
