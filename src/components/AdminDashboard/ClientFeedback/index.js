import React from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../GenericTable/GenericTable";
import FeedbackList from "../../../data/client_feedback_list_sucess.json"; // JSON file

const FeedbackColumns = [
  { id: "client_id", label: "Client ID" },
  { id: "session_id", label: "Session ID" },
  { id: "store_id", label: "Store ID" },
  { id: "customer_name", label: "Customer Name" },
  { id: "customer_id", label: "Customer ID" },
  { id: "rating", label: "Rating" },
  { id: "comment", label: "Comment" },
  {
    id: "tags",
    label: "Tags",
    render: (row) => {
      if (Array.isArray(row.tags)) {
        return row.tags.join(", ");
      }
      return row.tags || "";
    }
  }
];

function ClientFeedbackList() {
  const navigate = useNavigate();

  // Flatten JSON data
  const rows = (FeedbackList.data || []).map((item) => ({
    client_id: FeedbackList.client_id,
    session_id: item.session_id,
    store_id: item.store_id,
    customer_name: item.customer_name,
    customer_id: item.customer_id,
    rating: item.feedback?.rating,
    comment: item.feedback?.comment,
    tags: item.feedback?.tags
  }));

  return (
    <GenericTable
      title="Client Feedback List"
      columns={FeedbackColumns}
      rows={rows}
      showView={true}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["client_id", "store_id", "rating"]}
      onView={(row) => {
        // Navigate using customer_id
        navigate(`/client-feedback/${row.customer_id}`);
      }}
    />
  );
}

export default ClientFeedbackList;
