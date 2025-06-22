import ChatBot from "@/app/components/ChatBot";

export default function CourseLayout({ children }) {
  return (
    <div>
      {children}
      <div className="mb-12">
        <ChatBot />
      </div>
    </div>
  );
}
