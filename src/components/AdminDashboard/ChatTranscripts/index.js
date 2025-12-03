import React from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../GenericTable/GenericTable";
import ChatList from "../../../data/chat_list_success.json"; // Assuming you have a JSON file with user data

const ChatColumns = [
  { id: "client_name", label: "Client Name"},
  { id: "customer_name", label: "Customer Name" },
  { id: "store_name", label: "Store Name" },
  { id: "last_visit", label: "Last Visit" },
  { id: "purchased_product", label: "Purchased Product" },
  {
    id: "top_mood",
    label: "Top Mood",
    render: (row) => {
      if (Array.isArray(row.top_mood)) {
        return row.top_mood.join(", ");
      }
      return row.top_mood || "";
    }
  },
  { id: "active_time", label: "Active Time" },
  { id: "chat_overview", label: "Chat Overview" }
];

function ChatTranscriptsList() {
  const navigate = useNavigate();

  return (
    <GenericTable
      title="Chat Transcript List"
      columns={ChatColumns}
      rows={ChatList.data}
      showView={true}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["client_name", "top_mood","store_name"]}
      onView={(row) => {
        // Assuming your JSON has `customer_id`
        navigate(`/chat-transcripts/chats/${row.customer_id}`);
      }}
    />
  );
}

export default ChatTranscriptsList;
