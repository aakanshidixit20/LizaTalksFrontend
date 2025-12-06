import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import GenericTable from "../../GenericTable/GenericTable";
import userData from "../../../../data/user_list_success.json";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import config from "../../../../config";
const userColumns = [
  { id: "username", label: "Username" },
  { id: "phone_number", label: "Phone Number" },
  { id: "last_login", label: "Last Login" },
];
// or your prod URL
const CLIENT_ID = config.clientId;


function UserManagementList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

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

const handleConfirmDelete = async () => {
  if (!selectedRow) return;

  try {
    // Call backend soft delete
    const res = await fetch(`${config.API_BASE_URL}/client/user/${selectedRow.user_id}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (!res.ok || json?.success === false) {
      console.error("Delete failed:", json?.error?.details || json?.message);
      // optional: show a snackbar here if you have one
      // setSnackbarMsg(json?.message || "Failed to delete user.");
      // setSnackbarOpen(true);
      return; // don't update UI if backend failed
    }
    
    setTimeout(() => {
        navigate("/user-management/");
      }, 1500);
  } catch (e) {
    console.error("Network error deleting user:", e?.message || e);
    // optional: snackbar error here too
  } finally {
    handleClose(); // close modal either way
  }
};

 useEffect(() => {
    let abort = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${config.API_BASE_URL}/client/user/list?client_id=${CLIENT_ID}&page=1&limit=50`

        );
        const json = await res.json();
        console.log(config)
        if (!res.ok || json?.success === false) {
          // fallback to empty on error; you can toast if needed
          if (!abort) setRows([]);
          return;
        }

        const data = Array.isArray(json.data) ? json.data : [];

        // ✅ normalize fields the table expects (fallbacks)
       const normalized = data.map((u) => {
        const rawDate = u.last_login;
        let formattedDate = "-";

        if (rawDate) {
          try {
            const d = new Date(rawDate);
            const datePart = d.toISOString().split("T")[0]; // YYYY-MM-DD
            const timePart = d.toTimeString().split(" ")[0]; // HH:MM:SS
            formattedDate = `${datePart} ${timePart}`;
          } catch {
            formattedDate = rawDate;
          }
        }

  return {
    user_id: u.user_id,
    username: u.username || "",
    email_id: u.email_id || "",
    phone_number: u.phone_number || "-",
    last_login: formattedDate,
  };
});


        if (!abort) setRows(normalized);
      } catch (_e) {
        if (!abort) setRows([]);
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <>
      <GenericTable
        title="Current Users"
        columns={userColumns}
        rows={rows}
        showView={false}
        showEdit={true}
        showDelete={true}
        onView={(row) => alert(`View user: ${row.username}`)}
        onEdit={(row) => navigate(`/user-management/${row.user_id}/edit-user`)}
        onDelete={handleDeleteClick} // ✅ Open modal instead of confirm
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
