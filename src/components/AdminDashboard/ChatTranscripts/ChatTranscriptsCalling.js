import React from "react";
import { useParams } from "react-router-dom";
import ChatTranscriptsWindow from "./ChatTranscriptsWindow";

function ChatTranscriptsCalling() {
  const { customer_id } = useParams();

  // Map customer_id to the correct file
  const jsonFiles = {
    2002: require("../../../data/chat_transcript_success.json"),
    2003: require("../../../data/chat_transcript_2_success.json"),
    2004: require("../../../data/chat_transcript_3_success.json"),
  };

  const chatData = jsonFiles[customer_id] || [];

  return <ChatTranscriptsWindow chatData={chatData} />;
}

export default ChatTranscriptsCalling;
