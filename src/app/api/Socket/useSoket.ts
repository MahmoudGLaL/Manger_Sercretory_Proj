import {   Meeting2 } from "@/app/Utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
// import io from "socket.io-client";

// Initialize socket connection


export default function useSocket(url : string) {
  // const socketRef = useRef(io("ws://http://128.16.66.169:7272"));
  const [messages, setMessages] = useState<Meeting2[]>([]); // ✅ Ensure it's an array
const [socket, setSocket] = useState<WebSocket | null>(null);
const [Call, setCall] = useState<string>(""); // ✅ Explicitly typed
const [Status, setStatus] = useState<string>(""); // ✅ Explicitly typed

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(url);

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

    // On open, log and set socket connection
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      console.log(event.data);
      
      console.log('message send ');
      if(typeof(event.data) === "string" && event.data.includes('sounds'))
        {
          setCall(event.data)
        }
        else if(typeof(event.data) === "string")
        {
          setStatus(event.data)
        }
        else
        {
          setMessages(event.data) // Append new messages
        }
    };

    // Handle connection closure
    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    // Save WebSocket connection in state
    setSocket(ws);

    // Cleanup the WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);


  // Fetch previous messages when the component mounts
 

  // Function to send a message
  const sendMessage = (msg : Meeting2[] | string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("message"); // Send message over WebSocket connection
      if(typeof(msg) === "string" && msg.includes('sounds'))
        {
          setCall(msg)
        }
        else if(typeof(msg) === "string")
        {
          setStatus(msg)
        }
        else
        {
          setMessages(msg) // Append new messages
        }
    }
  };
  return { messages, sendMessage , setMessages , Call , setCall , Status , setStatus , socket};
}
// setMessages((prev) => [...prev, msg]);
