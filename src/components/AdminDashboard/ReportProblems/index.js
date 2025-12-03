import React from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../GenericTable/GenericTable";
import ProblemReports from "../../../data/report_problems_success.json"; // JSON file

const ProblemReportColumns = [
  { id: "client_id", label: "Client ID" },
  { id: "store_id", label: "Store ID" },
  { id: "customer_name", label: "Customer Name" },
  { id: "customer_id", label: "Customer ID" },
  { id: "issue_reported", label: "Issue Reported" }
];

function ProblemReportsList() {
  const navigate = useNavigate();

  // Rows come directly from JSON since they’re already flat
  const rows = ProblemReports.data || [];

  return (
    <GenericTable
      title="Problem Reports"
      columns={ProblemReportColumns}
      rows={rows}
      showView={true}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["client_id", "store_id"]}
      onView={(row) => {
        // Example: Navigate to issue details page by customer_id
        navigate(`/problem-reports/${row.customer_id}`);
      }}
    />
  );
}

export default ProblemReportsList;
