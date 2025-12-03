import React, {useState} from "react";
import GenericTable from "../GenericTable/GenericTable";
import clientList from "../../../data/client_list_success.json"; 
import { useNavigate} from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const clientColumns = [
  { id: "client_name", label: "Client Name" },
  { id: "client_email_id", label: "Client Email ID" },
  { id: "client_phone_number", label: "Client Phone Number" },
  { id: "last_logged_in_date", label: "Last logged in Date" },
  { id: "subscription_type", label: "Subscription Type" }
];

function ClientList() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(clientList.data);
  

  // ✅ State for modal
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      setRows((prevRows) =>
        prevRows.filter((r) => r.client_store_id !== selectedRow.client_store_id)
      );
    }
    handleClose();
  };

  const customActions = [
     {
      label: "View",
      icon: "visibility",
      color: "secondary",
    },
    {
      label: "Copy Link",
      icon: "content_copy",
      color: "primary",
      onClick: async (row) => {
        const link = `${window.location.origin}/client/${row.client_id}`;
        try {
          await navigator.clipboard.writeText(link);
          alert("Link copied to clipboard");
        } catch {
          const ta = document.createElement("textarea");
          ta.value = link;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          alert("Link copied");
        }
      }
    }
   
  ];

  return (
    <>
    <GenericTable
      title="Clients"
      columns={clientColumns}
      rows={clientList.data}
      showView={false}
      showEdit={true}
      showDelete={true}
      onEdit={(row) => alert(`Edit Client: ${row.username}`)}
           onDelete={handleDeleteClick} // ✅ Open modal instead of alert
      customHeaderButtons={[
        {
          label: "Add New Client",
          icon: "add",
          onClick: () => navigate(`/client-management/create-client`)
        }
      ]}
      customActions={customActions}
      customActionsHeader="View / Copy Link"
    />
     {/* ✅ Professional Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedRow?.client_name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ClientList;
