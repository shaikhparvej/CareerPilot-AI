"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const componentMap = {
  CompanyAuthPortal: nextDynamic(() =>
    import("./components/CompanyAuthPortal")
  ),
  HiringTalent: nextDynamic(() => import("./components/HiringTalent")),
  TakeAssisment: nextDynamic(() =>
    import("./components/TakeAssisment")
  ),
  CompanyProblem: nextDynamic(() =>
    import("./components/CompanyProblem")
  ),
  PrepareForJob: nextDynamic(() =>
    import("./components/PrepareForJob")
  ),
};

const Student = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    nextDynamic(() => import("../components/Instruction"));
  return (
    <>
      <Component />
    </>
  );
};

export default Student;
