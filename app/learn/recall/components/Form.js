import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AiQuizRecall } from "../../../../lib/aiService";

import Image from "next/image";

import { useSearchParams } from "next/navigation";
import LoadingDialog from "../../../components/LoadingDialog";

const CourseSelectionForm = ({
  setOutline,
  setCourseData,
  outline,
  setForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const searchparams = useSearchParams("");

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  useEffect(() => {
    const topic = searchparams.get("recall");
    if (topic) {
      setTopic(topic);
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const prompt = `Generate a study material for ${topic} for interview preparation with summery of course, List of Chapters along with summery for each chapter, Topic list in each chapter. in JSON format.`;
    try {
  const result = await AiQuizRecall.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log("Response Text: ", responseText);
      const json = JSON.parse(responseText);
      setCourseData(json);
      localStorage.setItem("RecallSyllabus", JSON.stringify(json));
      setOutline(true);
      window.location.reload();
      setForm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/30 blur-3xl"></div>

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-extrabold text-center text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
            Select Your Learning Path
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Field */}
            <div>
              <label
                htmlFor="topic"
                className="block text-white mb-2 font-light"
              >
                Learning Topic
              </label>
              <input
                id="topic"
                name="topic"
                value={topic}
                onChange={handleChange}
                placeholder="Enter your learning topic"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                  text-white placeholder-blue-200 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
                  hover:bg-blue-50 transition-all duration-300 ease-in-out
                  flex items-center justify-center space-x-3
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
                  before:opacity-0 hover:before:opacity-20 before:rounded-full
                  before:transition-all before:duration-300 before:ease-in-out
                  shadow-xl hover:shadow-2xl"
              >
                <span>Let's Start</span>
                <ChevronRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </button>
              <LoadingDialog loading={loading} />
            </div>
            <div className="flex justify-center items-center">
              {outline && (
                <Image
                  src={"/scroll-down.gif"}
                  alt="Logo"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Background Animations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute animate-blob top-1/4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute animate-blob animation-delay-2000 top-1/2 -right-4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
    </div>
  );
};

export default CourseSelectionForm;
