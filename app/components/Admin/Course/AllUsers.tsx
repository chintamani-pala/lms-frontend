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
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteUser(id);
  };
  const handleSubmitAddMemberInUpdateRole = async () => {
    const userIdfinded = data?.users.find((user: any) => user.email === email);
    if (userIdfinded) {
      const id = userIdfinded._id;
      await updateUserRole({ id, role });
      setOpen(false);
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
      console.log(data);
      setActive(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        toast.error((deleteError?.data as { message: string }).message);
      }
    }
    if (deleteSuccess) {
      toast.success("User Deleted Successfully");
      refetch();
      setOpen(false);
    }
  }, [updateError, isSuccess, deleteError, deleteSuccess]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <a href={`mailto:${params.row.email}`}>
                <AiOutlineMail
                  className="dark:text-white text-black"
                  size={20}
                />
              </a>
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const newData = data?.users?.filter((item: any) => item.role !== "user");
    newData &&
      newData?.forEach((item: any) => {
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
      data?.users?.forEach((item: any) => {
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
                onClick={() => setOpen(!open)}
              >
                Add new member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "white" : "black",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& . MuiTablePagination-root": {
                color: theme === "dark" ? "white" : "black",
              },
              "& .name-column--cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                color: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
              },
              "& .css-1fxkmyt-MuiDataGrid-root .MuiDataGrid-container--top [role=row], .css-1fxkmyt-MuiDataGrid-root .MuiDataGrid-container--bottom [role=row]":
                {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                  color: theme === "dark" ? "white" : "black",
                  borderBottom: "none",
                },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "white" : "black",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color:
                  theme === "dark" ? "white !important" : "black !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </Box>
          <Dialog open={open} onClose={() => setOpen(true)}>
            <DialogTitle
              style={{
                backgroundColor: theme === "dark" ? "#475d89" : "",
              }}
            >
              Add New Member
            </DialogTitle>
            <DialogContent
              style={{
                backgroundColor: theme === "dark" ? "#475d89" : "",
              }}
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
              style={{
                backgroundColor: theme === "dark" ? "#475d89" : "",
              }}
            >
              <Button
                style={{ color: theme === "dark" ? "white" : "black" }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAddMemberInUpdateRole}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
