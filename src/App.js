import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TerminalCV() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [history, setHistory] = useState([]); 
  const [historyIndex, setHistoryIndex] = useState(0); 

  const handleCommand = (e) => {
    e.preventDefault();

    const newOutput = [...output];
    newOutput.push(`[andi@fedora] ~$ ${command}`);

    setIsLoading(true); 

    setTimeout(() => {
      switch (command.toLowerCase()) {
        case "cat about-me.txt":
          newOutput.push(
            "Name: Andi Cakolli"
          );
          newOutput.push(
            "Role: Backend Developer, Trainer at jCoders Academy"
          );
          newOutput.push(
            "Skills: Node.js, ReactJS, MongoDB, QGIS, Ethical Hacking, Cybersecurity"
          );
          newOutput.push(
            "Experience:"
          );
          newOutput.push(
            "  - 1.5 years of teaching and mentoring students at jCoders Academy"
          );
          newOutput.push(
            "  - Developer for multiple applications and tools for jCoders Academy"
          );
          newOutput.push(
            "  - Developed a point system for student progress and motivation"
          );
          newOutput.push(
            "  - Organized workshops and training sessions for students"
          );
          newOutput.push(
            "Projects:"
          );
          newOutput.push(
            "  - Ticket Management System for jCoders Academy (Node.js, ReactJS, MongoDB)"
          );
           newOutput.push(
      "  - Urban Mjedisi: A geospatial project using QGIS for urban planning and environmental analysis"
    );
          newOutput.push(
            "  - Discord Bot for point tracking and ticketing at jCoders Academy"
          );
          newOutput.push(
            "Certifications:"
          );
          newOutput.push(
            "  - Riinvest Hackathon Coders Hub (2018) - HTML, CSS, JQuery, Bootstrap, OOP with JavaScript"
          );
          newOutput.push(
            "  - Best Student Award (2019) - Kosovo Municipal IT Competitions"
          );
          newOutput.push(
            "  - Information Security (2021) - Freecodecamp Cybersecurity Module"
          );
          break;
        case "ls projects":
          newOutput.push("Ticket Management System\nDiscord Bot for jCoders Academy\nVarious educational applications\n...");
          break;
        case "echo contact info":
          newOutput.push("Email: andi@example.com\nGitHub: github.com/AndiCakolli");
          break;
        case "clear":
          setOutput([]);
          setCommand(""); 
          setIsLoading(false); 
          return;
        case "date":
          newOutput.push(new Date().toLocaleString());
          break;
        case "help":
          newOutput.push("Available commands: cat, ls, echo, clear, date, help");
          break;
        default:
          newOutput.push(`Command not found: ${command}`);
      }
      

      setOutput(newOutput);
      setCommand(""); 
      setIsLoading(false); 

      setHistory([...history, command]);
      setHistoryIndex(history.length + 1);
    }, 500); 
  };

  // up edhe down arrow
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && historyIndex > 0) {
      setCommand(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    } else if (e.key === "ArrowDown" && historyIndex < history.length) {
      setCommand(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div
      className="bg-dark text-success p-4"
      style={{
        maxWidth: "1000px",
        minWidth: "600px",
        borderRadius: "10px",
        position: "relative", 
      }}
    >
    {/* Terminal Header */}
<div
  className="bg-dark text-white px-4 py-3 d-flex justify-content-between align-items-center rounded-top shadow-sm"
  style={{
    borderBottom: "2px solid #2D3748", // Subtle separator line
  }}
>
  {/* Left Side: Buttonat */}
  <div className="d-flex align-items-center">
    <div
      className="w-4 h-4 bg-danger rounded-circle cursor-pointer"
      title="Close"
      style={{ marginRight: "10px", border: "2px solid yellow" }}
    ></div>
    <div
      className="w-4 h-4 bg-warning rounded-circle cursor-pointer"
      title="Minimize"
      style={{ marginRight: "10px", border: "2px solid red" }}
    ></div>
    <div
      className="w-4 h-4 bg-success rounded-circle cursor-pointer"
      title="Maximize"
      style={{ border: "2px solid green" }}
    ></div>
  </div>

  {/* Right Side: Titulli */}
  <div className="text-light font-weight-bold">
    CV Terminal
  </div>
</div>

      {/* Terminal Body */}
      <div
        className="flex-grow p-4 overflow-y-auto"
        style={{ maxHeight: "500px", position: "relative" }}
      >
        {output.map((line, index) => (
          <div
            key={index}
            className="whitespace-pre-wrap mb-2"
            style={{ color: line.startsWith("Command not found") ? "red" : "#00FF00" }}
          >
            {line}
          </div>
        ))}
        {isLoading && (
          <div className="whitespace-pre-wrap mb-2 text-yellow-500">Loading...</div>
        )}
      </div>

      {/* Command Input */}
      <form
        onSubmit={handleCommand}
        className="bg-gray-800 text-white px-4 py-2 flex items-center"
      >
        <span className="mr-2">[andi@fedora] ~$</span>
        <input
          type="text"
          className="flex-grow bg-black text-green-400 border-none outline-none font-mono p-1 rounded-md"
          style={{
            color: "#00FF00",
            fontSize: "16px",
            height: "30px",
            outline: "none",
            boxShadow: "none",
            transition: "background-color 0.3s", 
          }}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
}
