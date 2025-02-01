import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const [roomId] = useState("default-room"); // You can make this dynamic

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Code Editor Section */}
      <div className="md:flex-[3] p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">Code Editor</h2>
          <button
            onClick={logoutHandler}
            className="bg-gradient-to-r from-blue-300 via-cyan-400 to-teal-400 hover:bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
        <CodeEditor roomId={roomId} />
      </div>

      {/* Chat Section */}
      <div className="md:flex-[1] pt-4 px-4 border-t md:border-t-0 md:border-l border-gray-300">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300">
          Chat
        </h2>
        <Chat roomId={roomId} />
      </div>
    </div>
  );
};

export default EditorPage;
