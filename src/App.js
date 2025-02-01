import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default function TerminalCV() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, initialX: 0, initialY: 0 });

  
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 400),
        y: Math.min(prev.y, window.innerHeight - 300)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeHint = () => setShowHint(false);
  // const toggleHint = () => setShowHint(!showHint);

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;
      
      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;
      const maxX = window.innerWidth - 400;
      const maxY = window.innerHeight - 300;

      setPosition({
        x: Math.min(maxX, Math.max(0, dragStart.initialX + deltaX)),
        y: Math.min(maxY, Math.max(0, dragStart.initialY + deltaY))
      });
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchend', handleUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, dragStart]);

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({
      x: clientX,
      y: clientY,
      initialX: position.x,
      initialY: position.y
    });
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
            "👤 Name: Andi Cakolli",
            "💼 Role: Backend Developer, Trainer at jCoders Academy",
            "💻 Skills: Node.js, ReactJS, MongoDB, QGIS, Ethical Hacking, Cybersecurity",
            "",
            "🚀 Passionate about programming, automation, and cybersecurity.",
            "   Constantly experimenting with new scripts, optimizations, and tools.",
            "   Whether it's building automation scripts, developing backend systems,",
            "   or diving into ethical hacking, I'm always seeking to improve and innovate.",
            "",
            "📚 Experience:",
            "  - 1.5 years teaching at jCoders Academy",
            "  - Developer for multiple jCoders applications",
            "  - Created custom student progress tracking system",
            "  - Organized programming & cybersecurity workshops",
            "",
            "🎓 Certifications:",
            "  - Riinvest Hackathon Coders Hub (2018)",
            "  - Best Student Award (2019)",
            "  - Freecodecamp Cybersecurity (2021)"
          );
          break;
        case "ls projects":
          newOutput.push(
            "📝 Ticket Management System (Node.js, React, MongoDB)",
            "🤖 Discord Bot (Node.js, MongoDB)",
            "💬 iPhone Messages UI Clone",
            "📢 SMEASE - Social media tool",
            "🌱 Urban Mjedisi - Environmental platform",
            "🛡️ Cybersecurity Experiments",
            "🎮 Game Automation Scripts (Selenium, Python)"
          );
          break;
        case "echo contact info":
          newOutput.push("Email: andi@example.com\nGitHub: github.com/AndiCakolli");
          break;
        case "clear":
          setOutput([]);
          break;
        case "ls":
          newOutput.push("about-me.txt");
        break;
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
    <div 
      className="bg-dark text-success p-2 p-sm-3"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '95vw',
        maxWidth: '1000px',
        minWidth: '280px',
        borderRadius: '8px',
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none',
        touchAction: 'none',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: 1000
      }}
    >
      {/* Terminal Header */}
      <div 
        className="bg-dark text-white px-3 py-2 d-flex justify-content-between align-items-center"
        style={{
          borderBottom: '2px solid #2D3748',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      >
        <div className="d-flex align-items-center">
          {['danger', 'warning', 'success', 'info'].map((color, i) => (
            <div
              key={color}
              className={`bg-${color} rounded-circle me-2`}
              style={{
                width: '0.7rem',
                height: '0.7rem',
                border: `2px solid var(--bs-${color})`
              }}
            />
          ))}
        </div>
        <div className="text-light fw-bold" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
          CV Terminal
        </div>
      </div>

      {/* Help Overlay */}
      {showHint && (
        <div 
          className="position-absolute start-50 translate-middle-x p-3"
          style={{
            top: '20%',
            width: '90%',
            maxWidth: '500px',
            backgroundColor: '#001a00',
            border: '2px solid #00FF00',
            borderRadius: '8px',
            zIndex: 1001
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="text-success mb-0">Terminal Help</h5>
            <button 
              onClick={closeHint}
              className="btn btn-sm text-success border-success"
            >
              ✕
            </button>
          </div>
          <ul className="text-success list-unstyled">
            {[
              ['cat about-me.txt', 'Show personal info'],
              ['ls projects', 'List projects'],
              ['echo contact info', 'Contact information'],
              ['clear', 'Clear terminal'],
              ['date', 'Current date/time'],
              ['help', 'List commands']
            ].map(([cmd, desc]) => (
              <li key={cmd} className="mb-1">
                <code>{cmd}</code> - {desc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Terminal Body */}
      <div 
        className="p-2 p-sm-3 overflow-auto"
        style={{
          maxHeight: '50vh',
          minHeight: '200px',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)'
        }}
      >
        {output.map((line, i) => (
          <div 
            key={i}
            className={`mb-1 ${line.startsWith('Command not found') ? 'text-danger' : 'text-success'}`}
          >
            {line}
          </div>
        ))}
        {isLoading && <div className="text-warning">Loading...</div>}
      </div>

      {/* Command Input */}
      <form onSubmit={handleCommand} className="bg-gray-800 mt-2 p-2">
  <div className="d-flex align-items-center gap-2">
    <span className="text-success">[andi@fedora] ~$</span>
    <input
  type="text"
  value={command}
  onChange={(e) => setCommand(e.target.value)}
  onKeyDown={handleKeyDown}
  className="custom-input flex-grow-1 bg-dark text-success border-0 px-2 py-1 rounded"
  style={{
    fontSize: 'inherit',
    minWidth: '50%'
  }}
/>

  </div>
</form>

    </div>
  );
}