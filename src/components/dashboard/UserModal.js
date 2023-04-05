import { Box, Modal } from "@mui/material";
import React from "react";

const UserModal = ({ open, userData, setOpen }) => {
  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 1000,
          height: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        hi
      </Box>
    </Modal>
  );
};

export default UserModal;
