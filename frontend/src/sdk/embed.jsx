import React from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "../components/ChatWidget/ChatWidget";


const cssUrl = new URL("./chatbot.css", import.meta.url).href;

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = cssUrl;
document.head.appendChild(link);

const container = document.createElement("div");
container.id = "vet-chatbot-root";
document.body.appendChild(container);


window.__VET_CHATBOT_CONFIG__ = window.VetChatbotConfig || {};


const root = createRoot(container);
root.render(<ChatWidget />);
