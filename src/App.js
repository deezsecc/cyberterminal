import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Shield, Cpu, Network, Globe } from 'lucide-react';

const CyberTerminal = () => {
  const [commandHistory, setCommandHistory] = useState([
    '> [Initializing secure environment...]',
    '> [Connection established]'
  ]);
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef(null);

  // Enhanced command handler
  const handleCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();
    let response = [];

    const commandMap = {
      'clear': () => {
        setCommandHistory([
          '> Terminal cleared. Systems reset.',
        ]);
        return [];
      },
      'help': [
        '#Showing whats possible',
        '🚀 projects   : See some cool operations',
        '🔬 skills     : Explore my capabilities',
        '🌐 contact    : Establish a connection with me',
        '🔒 clear      : Reset the terminal log',
        '💡 whoami     : Discover who DeezSec is'
      ],
      'projects': [
        '# Some funny little projects',
        '- [👓] Wireless Penetration Testing using Airgeddon',
          '- [👻] OSINT Investigations using Publicly Available Info',
          '- [🤖] Exploit Development with Bash Scripting'
      ],
      'skills': [
        '# Technical Capabilities',
        '- [🧑‍🏭] Vulnerabilty Assessment & Penetration Testing',
          '- [🍻] Network Forensics',
          '- [🍑] Threat Research & hunting',
          '- [🍓] Linux Adminstration',
          '- [🍫] Shell SCripting & PrivEsc',
          '- [🧁] Prompt Injections in LLMs',
          '- [🍝] WebApp Security'
      ],
      'contact': [
        '# Get in-touch',
        '- PGP Key: [ENCRYPTED]',
        '- [🏂] Secure Email: d4dz@tuta.io',
        '- Encrypted Messaging Available'
      ],
      'whoami': [
        '# Notorious haxor',
        '🎯 Mission: Hacking the Planet!',
        '💡 Vision: Helping APTs',
        '🏆 Specialties: Very mid bash & python scripts',
        '🌟 Motto: "Fall seven times, standup eight."'
      ]
    };

    // Handle command execution
    if (lowerCommand === 'clear') {
      response = commandMap['clear']();
    } else {
      response = commandMap[lowerCommand] || 
        [`Unknown command: ${command}. Type 'help' for available commands.`];
    }

    setCommandHistory(prev => [
      ...prev, 
      `> ${command}`, 
      ...response, 
      ''
    ]);

    // Auto-scroll to bottom
    setTimeout(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 50);
  };

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => 
      setCursorVisible(prev => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a3a] to-[#0a0a2a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#141432] to-[#0e0e22] rounded-xl shadow-2xl border-2 border-[#00ff41]/20 overflow-hidden">
        {/* Header */}
        <div className="bg-[#00ff41]/10 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-[#00ff41]" />
            <h2 className="text-xl font-bold text-[#00ff41]">
              DeezSec's Mini Portfolio
            </h2>
          </div>
          <div className="text-xs text-[#00ff41]/70">
            ACCESS LEVEL: TS/SCI
          </div>
        </div>

        {/* Terminal Output */}
        <div 
          ref={terminalRef}
          className="h-[400px] overflow-y-auto p-4 font-mono text-sm bg-[#0a0a1a] text-[#00ff41]"
        >
          {commandHistory.map((line, idx) => (
            <div key={idx} className="animate-fade-in-right">{line}</div>
          ))}
        </div>

        {/* Command Input */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              handleCommand(input);
              setInput('');
            }
          }}
          className="flex items-center p-4 bg-[#040410]"
        >
          <span className="text-[#00ff41] mr-2">λ</span>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent text-[#00ff41] outline-none placeholder-[#00ff41]/50"
            placeholder="Enter command (type 'help')"
          />
          <span 
            className={`ml-2 ${cursorVisible ? 'visible' : 'invisible'} text-[#00ff41]`}
          >
            ▮
          </span>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-center text-[#00ff41]/70">
        <div className="flex justify-center space-x-4 mb-2">
          <Code className="hover:text-[#00ff41] transition-colors" />
          <Network className="hover:text-[#00ff41] transition-colors" />
          <Cpu className="hover:text-[#00ff41] transition-colors" />
          <Globe className="hover:text-[#00ff41] transition-colors" />
        </div>
        <p className="text-xs">
          © 2024 DeezSec | Powered by Tailwind & React
        </p>
      </footer>
    </div>
  );
};

export default CyberTerminal;
