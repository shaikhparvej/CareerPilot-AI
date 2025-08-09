import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { AiTooldSoftware } from '../../../config/AiModels';
import LoadingDialog from "../../components/LoadingDialog";
import ShowToolsSoftware from "./ShowToolsSoftware";

const ToolsCompanyUse = () => {
  const [tools, setTools] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const value = localStorage.getItem("role");
    if (value) {
      setValue(value);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = `which are the tools and software are used in current ${value} industry use to do their daily work or routine work. include name,use,description,top companies uses.in json formate.`;
    try {
      const result = await AiTooldSoftware.sendMessage(prompt);
      const responseText = await result.response.text();
      const data = JSON.parse(responseText);
      console.log(responseText);
      setTools(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-br from-blue-400 to-indigo-50">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-xl p-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-xl rounded-2xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Search Software and Tools
              </h2>

              <div className="relative">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your job role..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent transition-all duration-200
                  placeholder:text-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2
                     transform transition-all duration-200
                     hover:shadow-lg active:scale-[0.98]"
              >
                Submit
              </Button>
              <LoadingDialog loading={loading} />
            </form>
          </div>
        </div>

        {tools && <ShowToolsSoftware tools={tools} value={value} />}
      </div>
    </>
  );
};

export default ToolsCompanyUse;
