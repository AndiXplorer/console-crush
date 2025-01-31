import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TerminalCV() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleCommand = (e) => {
    e.preventDefault();

    const newOutput = [...output];
    newOutput.push(`[andi@fedora] ~$ ${command}`);

    setIsLoading(true);

    setTimeout(() => {
      switch (command.toLowerCase()) {
        case "cat about-me.txt":
          newOutput.push(
            "👤 Name: Andi Cakolli"
          );
          newOutput.push(
            "💼 Role: Backend Developer, Trainer at jCoders Academy"
          );
          newOutput.push(
            "💻 Skills: Node.js, ReactJS, MongoDB, QGIS, Ethical Hacking, Cybersecurity"
          );
          newOutput.push("");
          newOutput.push(
            "🚀 Passionate about programming, automation, and cybersecurity. "
          );
          newOutput.push(
            "   Constantly experimenting with new scripts, optimizations, and tools to push the limits of what's possible."
          );
          newOutput.push(
            "   Whether it's building automation scripts, developing backend systems, or diving into ethical hacking, I'm always seeking to improve and innovate."
          );
          newOutput.push("");
          newOutput.push(
            "📚 Experience:"
          );
          newOutput.push(
            "  - 1.5 years of teaching and mentoring students at jCoders Academy"
          );
          newOutput.push(
            "  - Developer for multiple applications and tools for jCoders Academy"
          );
          newOutput.push(
            "  - Created a custom point system to track and motivate student progress"
          );
          newOutput.push(
            "  - Organized workshops and training sessions focused on programming & cybersecurity"
          );
          newOutput.push("");
          newOutput.push(
            "🎓 Certifications:"
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
          newOutput.push(
            "📝 Ticket Management System for jCoders Academy (Node.js, ReactJS, MongoDB)",
            "🤖 Discord Bot for jCoders Academy (Node.js, MongoDB)",
            "💬 iPhone Messages UI Clone (Frontend Only)",
            "📢 SMEASE (Social Media Ease) - A social media management tool",
            "🌱 Urban Mjedisi - A platform for environmental awareness & sustainability",
            "🛡️ Various Cybersecurity & Ethical Hacking Experiments",
            "🎮 Custom Automation Scripts & Cheats for Games (Selenium, Python)"
        );        
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
    <div className="bg-dark text-success p-4" style={{ maxWidth: "1000px", minWidth: "600px", borderRadius: "10px" }}>
      {/* Terminal Header */}
      <div className="bg-dark text-white px-4 py-3 d-flex justify-content-between align-items-center rounded-top shadow-sm" style={{ borderBottom: "2px solid #2D3748" }}>
        <div className="d-flex align-items-center">
          <div className="w-4 h-4 bg-danger rounded-circle cursor-pointer" title="Close" style={{ marginRight: "10px", border: "2px solid yellow" }}></div>
          <div className="w-4 h-4 bg-warning rounded-circle cursor-pointer" title="Minimize" style={{ marginRight: "10px", border: "2px solid red" }}></div>
          <div className="w-4 h-4 bg-success rounded-circle cursor-pointer" title="Maximize" style={{ marginRight: "10px", border: "2px solid green" }}></div>
          <div className="w-4 h-4 bg-info rounded-circle cursor-pointer" title="Help" style={{ border: "2px solid cyan" }} onClick={toggleHint}></div>
        </div>
        <div className="text-light font-weight-bold">CV Terminal</div>
      </div>

      {/* Help Hint Overlay */}
      {showHint && (
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#001a00',
          border: '2px solid #00FF00',
          borderRadius: '5px',
          padding: '15px',
          zIndex: 1000,
          width: '80%',
          maxWidth: '600px'
        }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 style={{ color: '#00FF00' }}>Terminal Help</h5>
            <button 
              onClick={toggleHint}
              style={{
                background: 'none',
                border: '1px solid #00FF00',
                color: '#00FF00',
                borderRadius: '3px',
                padding: '2px 8px'
              }}
            >
              X
            </button>
          </div>
          <p style={{ color: '#00FF00', marginBottom: '8px' }}>Available commands:</p>
          <ul style={{ color: '#00FF00', listStyleType: 'none', paddingLeft: '0' }}>
            <li><code>cat about-me.txt</code> - Show personal info</li>
            <li><code>ls projects</code> - List key projects</li>
            <li><code>echo contact info</code> - Display contact information</li>
            <li><code>clear</code> - Clear the terminal</li>
            <li><code>date</code> - Show current date/time</li>
            <li><code>help</code> - List available commands</li>
          </ul>
          <p style={{ color: '#00FF00', marginTop: '10px', marginBottom: '0' }}>
            Use ↑/↓ arrows to navigate command history
          </p>
        </div>
      )}

      {/* Terminal Body */}
      <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
        {output.map((line, index) => (
          <div
            key={index}
            className="whitespace-pre-wrap mb-2"
            style={{ color: line.startsWith("Command not found") ? "red" : "#00FF00" }}
          >
            {line}
          </div>
        ))}
        {isLoading && <div className="whitespace-pre-wrap mb-2 text-warning">Loading...</div>}
      </div>

      {/* Command Input */}
      <form onSubmit={handleCommand} className="bg-gray-800 text-white px-4 py-2">
        <div className="d-flex align-items-center">
          <span className="mr-2">[andi@fedora] ~$</span>
          <input
            type="text"
            className="flex-grow bg-black text-success border-0 outline-none font-monospace p-1 rounded"
            style={{ height: "30px" }}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}