import { useState, useEffect } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";

const socket = io("http://localhost:5000");

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
    }

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        roomId,
        message,
        userId: user._id,
        userName: user.username,
      });

      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[90vh]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto border-b border-gray-300 pt-2.5 px-2.5">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2.5">
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input & Send Button */}
      <div className="p-2.5 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-4/5 p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-gradient-to-r from-blue-300 via-cyan-400 to-teal-400 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Chat;
