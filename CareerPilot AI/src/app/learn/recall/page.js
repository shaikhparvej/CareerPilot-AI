"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import CourseSelectionForm from "./components/Form";
import SyallbusOutline from "./components/PreviewOutline";
import NotesSection from "./components/NotesSection";

const Recall = () => {
  const [form, setForm] = useState(false);
  const [outline, setOutline] = useState(false);
  const [hero, setHero] = useState(false);
  const [courseData, setCourseData] = useState();

  useEffect(() => {
    const RecallSyllabus = localStorage.getItem("RecallSyllabus");
    if (RecallSyllabus) {
      setOutline(true);
    }
  }, []);
  return (
    <>
      <div>
        {form ? (
          <CourseSelectionForm
            setOutline={setOutline}
            setCourseData={setCourseData}
            outline={outline}
          />
        ) : (
          <HeroSection setForm={setForm} />
        )}
        {outline && <SyallbusOutline courseData={courseData} />}
      </div>
    </>
  );
};

export default Recall;
