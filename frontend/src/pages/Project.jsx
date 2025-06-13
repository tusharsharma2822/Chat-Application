import React, { useState } from "react";

const Project = () => {
  // Dummy data for demonstration
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hello team!" },
    { sender: "Bob", text: "Hi Alice!" }
  ]);
  const [aiResponses, setAiResponses] = useState([
    { text: "How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
      // Simulate AI response
      setAiResponses([...aiResponses, { text: "AI is thinking..." }]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111",
        color: "#f1f1f1",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      {/* Left: User Chat */}
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #222",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            borderBottom: "1px solid #222",
            background: "#181818"
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#fff" }}>
            Project Chat
          </span>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#00bcd4",
              cursor: "pointer",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center"
            }}
            title="Add Collaborator"
            // onClick={...} // Add your handler here
          >
            <i className="ri-user-add-line"></i>
          </button>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: "0.8rem" }}>
              <span style={{ color: "#00bcd4", fontWeight: "bold" }}>{msg.sender}: </span>
              <span style={{ color: "#f1f1f1" }}>{msg.text}</span>
            </div>
          ))}
        </div>
        {/* Input */}
        <div style={{ padding: "1rem", borderTop: "1px solid #222", background: "#181818" }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              width: "80%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "none",
              background: "#222",
              color: "#f1f1f1",
              marginRight: "0.5rem"
            }}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "0.5rem 1rem",
              background: "#00bcd4",
              color: "#111",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>
      </div>
      {/* Right: AI Response */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#181818"
        }}
      >
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid #222",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#fff"
          }}
        >
          AI Assistant
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {aiResponses.map((resp, idx) => (
            <div key={idx} style={{ marginBottom: "1rem", color: "#90caf9" }}>
              {resp.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
