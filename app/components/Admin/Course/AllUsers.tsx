import React, { FC, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "../../../../app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  // const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

  const handleDelete = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId);
      setDeleteConfirmOpen(false);
    }
  };

  const handleOpenDeleteConfirm = (id: string) => {
    setSelectedUserId(id);
    setDeleteConfirmOpen(true);
  };

  const handleSubmitAddMemberInUpdateRole = async () => {
    const user = data?.users.find((user: any) => user.email === email);
    if (user) {
      await updateUserRole({ id: user._id, role });
      setOpenAddDialog(false);
    } else {
      toast.error("No user found with this email");
    }
  };

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        toast.error((updateError?.data as { message: string }).message);
      }
    }
    if (isSuccess) {
      toast.success("Role Updated Successfully");
      refetch();
      // setActive(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        toast.error((deleteError?.data as { message: string }).message);
      }
    }
    if (deleteSuccess) {
      toast.success("User Deleted Successfully");
      refetch();
    }
  }, [updateError, isSuccess, deleteError, deleteSuccess]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params: any) => (
        <Box display="flex" alignItems="center">
          <Button onClick={() => handleOpenDeleteConfirm(params.row.id)}>
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
          <Button>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </Button>
        </Box>
      ),
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const newData = data?.users?.filter((item: any) => item.role !== "user");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data?.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={`20px`}>
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[250px] dark:bg-[#57c7a3] !h-[35px] dark:border-[#ffffff30]`}
                onClick={() => setOpenAddDialog(true)}
              >
                Add new member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "white" : "black",
                borderBottom:
                  theme === "dark" ? "1px solid #ffffff30" : "1px solid #ccc",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </Box>

          {/* Delete Confirmation Modal */}
          <Dialog
            open={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
            PaperProps={{
              style: {
                borderRadius: 16, // Rounded corners
                backgroundColor: theme === "dark" ? "#475d89" : "#ffffff", // Modal background color
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
              },
            }}
          >
            <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
              Confirm Delete
            </DialogTitle>
            <DialogContent style={{ textAlign: "center" }}>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
                Are you sure you want to delete this user?
              </Typography>
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                onClick={() => setDeleteConfirmOpen(false)}
                style={{
                  backgroundColor: theme === "dark" ? "#475d79" : "#f0f0f0", // Background for Cancel button
                  color: theme === "dark" ? "white" : "black",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  marginRight: 10,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                color="error" // Use the error color for Delete button
                variant="contained"
                style={{
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Add New Member Dialog */}
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle
              style={{ backgroundColor: theme === "dark" ? "#475d89" : "" }}
            >
              Add New Member
            </DialogTitle>
            <DialogContent
              style={{ backgroundColor: theme === "dark" ? "#475d89" : "" }}
            >
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Role"
                select
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions
              style={{ backgroundColor: theme === "dark" ? "#475d89" : "" }}
            >
              <Button
                onClick={() => setOpenAddDialog(false)}
                style={{ color: theme === "dark" ? "white" : "black" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAddMemberInUpdateRole}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
