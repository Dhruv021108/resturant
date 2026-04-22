"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";

const starterMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hi! I can help with menu, combos, booking tables, timings, location, and deals."
  }
];

function getBotReply(input, menuItems) {
  const text = input.toLowerCase();
  if (text.includes("noodle")) {
    return "Try Hakka Noodles or Schezwan Noodles. Both are guest favorites.";
  }
  if (text.includes("combo")) {
    return "Our Family Feast Combo and Lunch Bowl Combo give the best value for groups and office lunches.";
  }
  if (text.includes("book")) {
    return "You can reserve a table from the Booking page by selecting date, time, guests, and special requests.";
  }
  if (text.includes("time") || text.includes("open")) {
    return "We are open now and close at 11:30 PM.";
  }
  if (text.includes("location") || text.includes("address")) {
    return "We are at Ayregaon Selfie Point, Dombivli / Kopar East, Maharashtra 421201.";
  }
  if (text.includes("veg")) {
    const vegItems = menuItems.filter((item) => item.type === "Veg").slice(0, 3).map((item) => item.name);
    return `Popular veg picks: ${vegItems.join(", ")}.`;
  }
  if (text.includes("deal") || text.includes("offer")) {
    return "Use coupon WOK10 for 10% off on online orders above Rs.299.";
  }
  return "You can ask about menu, best dishes, combos, booking, contact details, offers, or delivery.";
}

export function ChatbotWidget() {
  const { menuItems } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const suggestions = useMemo(() => ["Best noodles?", "Any combo deals?", "How to book a table?"], []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), sender: "user", text: input };
    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotReply(input, menuItems)
    };
    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className={`chatbot ${open ? "chatbot--open" : ""}`}>
      <button className="chatbot__toggle" onClick={() => setOpen((current) => !current)}>
        AI Chat
      </button>
      {open && (
        <div className="chatbot__panel">
          <div className="chatbot__messages">
            {messages.map((message) => (
              <div key={message.id} className={`chatbot__message chatbot__message--${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot__suggestions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => setInput(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
          <div className="chatbot__composer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about menu, deals, booking..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
