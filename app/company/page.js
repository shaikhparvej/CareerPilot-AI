export const dynamic = 'force-dynamic';
export const revalidate = 0;
"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const componentMap = {
  CompanyAuthPortal: dynamic(() =>
    import("./components/CompanyAuthPortal")
  ),
  HiringTalent: dynamic(() => import("./components/HiringTalent")),
  TakeAssisment: dynamic(() =>
    import("./components/TakeAssisment")
  ),
  CompanyProblem: dynamic(() =>
    import("./components/CompanyProblem")
  ),
  PrepareForJob: dynamic(() =>
    import("./components/PrepareForJob")
  ),
};

const Student = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    dynamic(() => import("../components/Instruction"));
  return (
    <>
      <Component />
    </>
  );
};

export default Student;
