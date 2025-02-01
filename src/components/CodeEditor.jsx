import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import io from "socket.io-client";
import PropTypes from "prop-types";

const socket = io(import.meta.env.VITE_API_URL);

const CodeEditor = ({ roomId }) => {
  const [code, setCode] = useState("// Start coding here...");

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
    }

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  const editorDidMount = (editor) => {
    editor.focus();
  };

  return (
    <MonacoEditor
      height="90%"
      width="100%"
      language="javascript"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      editorDidMount={editorDidMount}
      onChange={handleCodeChange}
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        wordWrap: "on",
      }}
    />
  );
};

CodeEditor.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default CodeEditor;
