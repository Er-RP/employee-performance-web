import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useForm from "../../helpers/hooks/useForm";
import { put } from "../../network/api";

const initialFormValues = {
  name: "",
  description: "",
  estimatedTime: "",
  progressLevel: "",
  status: "",
  actualTime: "",
};

const UpdateTask = ({ taskData, setTaskData }) => {
  const { values, setValues, handleInputChange } = useForm(initialFormValues);
  const [open, setOpen] = useState(false);
  const UpdateTaskk = async () => {
    try {
      const res = await put(`/tasks/${taskData?.id}`, values);
      if (res?.success) {
        setTaskData(res?.task);
        setOpen(false);
      }
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  const isButtonEnabled =
    Boolean(values?.name) &&
    Boolean(values?.description) &&
    Boolean(values?.progressLevel >= 0 && values?.progressLevel <= 100) &&
    Boolean(values?.status) &&
    Boolean(values?.estimatedTime) &&
    Boolean(values?.actualTime >= 0);

  const taskStatus = [
    { status: "To Do" },
    { status: "Progress" },
    { status: "Review" },
    { status: "Completed" },
  ];

  useEffect(() => {
    setValues({
      name: taskData?.name || "",
      description: taskData?.description || "",
      estimatedTime: taskData?.estimatedTime || "",
      progressLevel: taskData?.progressLevel || "",
      status: taskData?.status || "",
      actualTime: taskData?.actualTime || "",
    });
  }, [taskData]);
  console.log("values:", values);
  console.log("taskData:", taskData);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Update Task
      </Button>
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
          <div className="m-auto bg-white px-5 ">
            <div className="flex justify-center text-2xl text-primary-main font-semibold pb-7 pt-5">
              <h2>Update Task</h2>{" "}
            </div>
            <form>
              <TextField
                label="Name"
                value={values?.name}
                name="name"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Description"
                value={values?.description}
                name="description"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />

              <TextField
                label="Estimated Time"
                type="number"
                value={values?.estimatedTime}
                name="estimatedTime"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Progress Level"
                type="number"
                value={values?.progressLevel}
                name="progressLevel"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                inputProps={{ min: 0, max: 100 }}
                error={values?.progressLevel > 100 || values?.progressLevel < 0}
                helperText={
                  values?.progressLevel > 100 || values?.progressLevel < 0
                    ? "Progress level must be between 0 and 100"
                    : ""
                }
              />

              <TextField
                label="Hours Taken"
                type="number"
                value={values?.actualTime}
                name="actualTime"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                error={values?.actualTime < 0}
                helperText={
                  values?.actualTime < 0
                    ? "Actual Time must be a positive number "
                    : ""
                }
              />
              <FormControl style={{ width: "100%", margin: "15px 0px" }}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  value={values?.status}
                  name="status"
                  label="status"
                  onChange={handleInputChange}
                >
                  {taskStatus?.map((i) => (
                    <MenuItem key={i?.status} value={i?.status}>
                      {i?.status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={UpdateTaskk}
              disabled={!isButtonEnabled}
            >
              Update
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(!open);
              }}
              color="secondary"
              style={{ marginTop: 20, marginLeft: 10 }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateTask;
