"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChatBot from "../components/ChatBot";

const componentMap = {
  DepartmentJobRoles: nextDynamic(() =>
    import("./components/DepartmentJobs")
  ),
  RoleRoadMap: nextDynamic(() =>
    import("./components/RoleRoadMap")
  ),

  MoreInfoRole: nextDynamic(() =>
    import("./components/MoreInfoRole")
  ),

  CourseRoadmap: nextDynamic(() =>
    import("./components/CourseRoadmap")
  ),
};

const CareerPlanning = () => {
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

export default CareerPlanning;
