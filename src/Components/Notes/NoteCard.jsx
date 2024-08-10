import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
export default function NoteCard({
  note,
  setState,
  state,
  allNotes,
  setAllNotes,
  trash,
  setOpenSnackBar,
  setOpenSnackBarMessage,
  setOpenSnackBarSeverity,
}) {
  const handleChangeStatusToDeleted = () => {
    const index = allNotes.findIndex((n) => n.id === note.id);
    const updatedNote = { ...note, status: "deleted" };
    const updatedAllNotes = [...allNotes];
    updatedAllNotes.splice(index, 1, updatedNote);
    localStorage.setItem("NoteData", JSON.stringify(updatedAllNotes));
    setOpenSnackBar(true);
    setOpenSnackBarMessage("Note has been moved to trash!");
    setOpenSnackBarSeverity("error");
    setAllNotes(updatedAllNotes);
    setState(!state);
  };
  const handleChangeStatusToNew = () => {
    const index = allNotes.findIndex((n) => n.id === note.id);
    const updatedNote = { ...note, status: "new" };
    const updatedAllNotes = [...allNotes];
    updatedAllNotes.splice(index, 1, updatedNote);
    localStorage.setItem("NoteData", JSON.stringify(updatedAllNotes));
    setAllNotes(updatedAllNotes);
    setOpenSnackBar(true);
    setOpenSnackBarSeverity("success");
    setOpenSnackBarMessage("Note has been restored!");
    setState(!state);
  };
  const handleDelete = () => {
    const filtered = allNotes?.filter((item) => item.id != note.id);
    localStorage.setItem("NoteData", JSON.stringify(filtered));
    setOpenSnackBar(true);
    setOpenSnackBarMessage("Note has been deleted permanently!");
    setOpenSnackBarSeverity("error");
    setAllNotes(filtered);
    setState(!state);
  };
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Box>
        <Typography>{note?.note}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {trash ? (
          <Box>
            <Tooltip title="Restore" arrow>
              <IconButton color="success" onClick={handleChangeStatusToNew}>
                <RestoreFromTrashIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton color="error" onClick={handleDelete}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <IconButton onClick={handleChangeStatusToDeleted}>
            <DeleteOutlineIcon sx={{ fontSize: "20px" }} color="error" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}
