import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import GenericTable from "../../GenericTable/GenericTable";
import userData from "../../../../data/user_list_success.json"; // Assuming you have a JSON file with user data
import { useNavigate } from "react-router-dom";
const userColumns = [
    { id: "user_id", label: "User ID" },
    { id: "username", label: "Username" },
    { id: "phone_number", label: "Phone Number" },
    { id: "last_login", label: "Last Login" },
];

function UserManagementList() {
    const navigate = useNavigate();
     const [rows, setRows] = useState(userData.data);

  // ✅ Modal states
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
      setRows((prev) =>
        prev.filter((r) => r.user_id !== selectedRow.user_id) // assuming "user_id" exists
      );
    }
    handleClose();
  };
    return (
        <>
        <GenericTable
            title="Current Users"
            columns={userColumns}
            rows={userData.data}
             showView={false}
        showEdit={false}
        showDelete={true}
            //   dropdownFilters={["user_id"]}
            onView={(row) => alert(`View user: ${row.username}`)}
            onEdit={(row) => alert(`Edit user: ${row.username}`)}
            onDelete={handleDeleteClick}
               customHeaderButtons={[
        {
          label: "Add New User",
          icon: "add",
          onClick: () => navigate(`/user-management/add-user`)
        }
      ]}
      />
      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedRow?.username}</strong>?
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

export default UserManagementList;
