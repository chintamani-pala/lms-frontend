import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
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
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedCourseId, setSelectedUserId] = useState("");

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCourseMutation();
  const handleDelete = async () => {
    if (selectedCourseId) {
      await deleteCourse(selectedCourseId);
      setDeleteConfirmOpen(false);
    }
  };

  const handleOpenDeleteConfirm = (id: string) => {
    setSelectedUserId(id);
    setDeleteConfirmOpen(true);
  };

  useEffect(() => {
    if (deleteError) {
      if ("data" in deleteError) {
        toast.error((deleteError?.data as { message: string }).message);
      }
    }
    if (deleteSuccess) {
      toast.success("User Deleted Successfully");
      refetch();
    }
  }, [deleteSuccess, deleteError]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 0.5,
    },
    {
      field: "ratings",
      headerName: "ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineEdit className="dark:text-white text-black" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => handleOpenDeleteConfirm(params.row.id)}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  {
    data &&
      data?.course?.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
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
                Are you sure you want to delete this Course?
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
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
