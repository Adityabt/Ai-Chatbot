import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import botlogo from "./ChatGPT_Clone_assets/assets/Chatbot.png";
import addBtn from "./ChatGPT_Clone_assets/assets/add-30.png";
import msgIcon from "./ChatGPT_Clone_assets/assets/message.svg";
import home from "./ChatGPT_Clone_assets/assets/home.svg";
import saved from "./ChatGPT_Clone_assets/assets/bookmark.svg";
import rocket from "./ChatGPT_Clone_assets/assets/rocket.svg";
import sendBtn from "./ChatGPT_Clone_assets/assets/send.svg";
import userIcon from "./ChatGPT_Clone_assets/assets/user-icon.png";
import gptImgLogo from "./ChatGPT_Clone_assets/assets/chatbotLogo.png";
import { sendMsgToAI } from "./openai";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text:
        "Hi, I am ChatBot, a state-of-the-art language model. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how I can help you!",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setIsTyping(true);
    const res = await sendMsgToAI(text);
    setIsTyping(false);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput("");
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setIsTyping(true);
    const res = await sendMsgToAI(text);
    setIsTyping(false);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  const handleNewChat = () => {
    setMessages([
      {
        text:
          "Hi, I am ChatBot, a state-of-the-art language model. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how I can help you!",
        isBot: true,
      },
    ]);
    setInput("");
  };

  const handleSavedClick = () => {
    setShowSavedPopup(true);
    setTimeout(() => setShowSavedPopup(false), 2500);
  };

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const closeUpgradeModal = () => {
    setShowUpgradeModal(false);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <img src={botlogo} alt="Loading..." className="animatedLogo" />
        </div>
      ) : (
        <>
          <div className="sideBar">
            <div className="upperSide">
              <div className="upperSideTop">
                <img src={botlogo} alt="logo" className="logo" />
                <span className="brand">Ai ChatBot</span>
              </div>
              <button className="midBtn" onClick={handleNewChat}>
                <img src={addBtn} alt="New Chat" className="addBtn" />
                New Chat
              </button>
              <div className="upperSideBottom">
                <button className="query" onClick={handleQuery} value="What is Programming ?">
                  <img src={msgIcon} alt="Query" />
                  What is Programming?
                </button>
                <button className="query" onClick={handleQuery} value="How to use an API ?">
                  <img src={msgIcon} alt="Query" />
                  How to use an API?
                </button>
              </div>
            </div>

            <div className="lowerSide">
              <div className="listItems" onClick={() => window.scrollTo(0, 0)}>
                <img src={home} alt="Home" className="listItemsImg" />
                Home
              </div>
              <div className="listItems" onClick={handleSavedClick}>
                <img src={saved} alt="Saved" className="listItemsImg" />
                Saved
              </div>
              <div className="listItems" onClick={handleUpgradeClick}>
                <img src={rocket} alt="Upgrade" className="listItemsImg" />
                Upgrade to Pro
              </div>
            </div>
          </div>

          <div className="main">
            <div className="chats">
              {messages.map((message, i) => (
                <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                  <img
                    className="chatImg"
                    src={message.isBot ? gptImgLogo : userIcon}
                    alt="avatar"
                  />
                  <p className="txt">{message.text}</p>
                </div>
              ))}
              {isTyping && (
                <div className="chat bot typing">
                  <img className="chatImg" src={gptImgLogo} alt="Typing..." />
                  <p className="txt">
                    Thinking<span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </p>
                </div>
              )}
              <div ref={msgEnd} />
            </div>

            <div className="chatFooter">
              <div className="inp">
                <input
                  type="text"
                  placeholder="Ask Anything"
                  value={input}
                  onKeyDown={handleEnter}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="send" onClick={handleSend}>
                  <img src={sendBtn} alt="Send" />
                </button>
              </div>
              <p>
                ChatBot may produce inaccurate information about people, places, or facts. Version 2022.0.0
              </p>
            </div>
          </div>

          {/* SAVED Popup */}
          {showSavedPopup && (
            <div className="popup saved-popup">
              📌 This feature is under development.
            </div>
          )}

          {/* UPGRADE Modal */}
          {showUpgradeModal && (
            <div className="modalOverlay">
              <div className="modalBox">
                <h2>🚀 Upgrade to Pro</h2>
                <ul>
                  <li>⚡ Faster responses</li>
                  <li>📖 Longer memory</li>
                  <li>💾 Save chat sessions</li>
                  <li>🎨 Customize interface</li>
                  <li>🌐 Access to Bot-4</li>
                </ul>
                <button className="closeBtn" onClick={closeUpgradeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
