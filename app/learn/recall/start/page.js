"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import CourseInterface from "../components/NotesSection";

const page = () => {
  return (
    <div>
      <CourseInterface />
    </div>
  );
};

export default page;
