"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Meeting, WebSocketContextType } from "../Utils/types";
import axios from "axios";


const WebSocketContext = createContext<WebSocketContextType>({
  socket: null, // Initially, no WebSocket connection
  messages: [], // Default to an empty array
  setMessages: () => { }, // Empty function to prevent errors
  Call: "",
  setCall: () => { }, // Empty function to prevent errors
  Status: "",
  setStatus: () => { }, // Empty function to prevent errors
  sendMessage: () => { },
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Meeting[]>([]); // ✅ Ensure it's an array
  const [Call, setCall] = useState<string>("any");
  const [Status, setStatus] = useState<string>("");


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/oppointments"); // Your API endpoint
        // console.log('data got success');


        setMessages(res.data); // Set previous messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleMessage = (data: string) => {
    // console.log("Message received globally:", data);
  
    if (!data.includes("{")) {
      if (data.includes("sounds")) {
        setCall(data);
      } else {
        setStatus(data);
      }
    } else {
      try {
        const parsedData = JSON.parse(data);
        setMessages(parsedData);
      } catch (error) {
        console.error("Invalid JSON format:", error);
      }
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://128.16.66.169:7272"); // WebSocket URL
    setSocket(ws);
  
    // Handle incoming messages
    ws.onmessage = async  ({ data }) => {
      // console.log("Message received globally:", data);

      if (data instanceof Blob) {
        // Convert Blob to text
        if (data instanceof Blob) {
          // Convert Blob to text
          const text = await data?.text();
          // console.log(text);
          
          handleMessage(text);
        } else {
          handleMessage(data);
        }
      
  
        // 🔥 **Broadcast message to all connected clients**
        socket?.send(data);
      }
    };
  
    // Handle disconnection and auto-reconnect
    ws.onclose = () => {
      // console.log("WebSocket closed, attempting to reconnect...");
      setTimeout(() => {
        const newSocket = new WebSocket("ws://128.16.66.169:7272");
        setSocket(newSocket);
      }, 3000); // Auto-reconnect after 3s
    };
  
    return () => ws.close();
  }, []);
  

  // if (typeof event?.data === "string") {
  //   if (event?.data.includes("sounds")) {
  //     setCall(event?.data);
  //   } else {
  //     setStatus(event?.data);
  //   }
  // } else {

  //   setMessages(event?.data); 
  // }

  // ✅ Send Message Function
  const sendMessage = (msg: Meeting[] | string) => {

    if (socket && socket.readyState === WebSocket.OPEN) {
      if (typeof msg === "string") {
        socket.send(msg);
      } else {
        socket.send(JSON.stringify(msg));
      }
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  };
  // sendMessage
  return (
    <WebSocketContext.Provider value={{ socket, messages, setMessages, Call, setCall, Status, setStatus, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// ✅ Custom Hook for WebSocket
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    // console.log("useWebSocket must be used within a WebSocketProvider");

  }
  return context;
};
