import { InsertEmoticonRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useForm from "../../helpers/hooks/useForm";
import { post } from "../../network/api";

const initialFormValues = {
  name: "",
  description: "",
  assignee: "",
  estimatedTime: "",
  project: "",
};

const CreateTask = ({ projectData, GetProjectById }) => {
  const { values, handleInputChange } = useForm(initialFormValues);
  const [open, setOpen] = useState(false);
  const createNewTask = async () => {
    const res = await post("/tasks/create", {
      ...values,
      project: projectData?.id,
    });
    if (res?.success) {
      await GetProjectById();
      setOpen(false);
    }
  };

  const isButtonEnabled =
    Boolean(values?.name) &&
    Boolean(values?.description) &&
    Boolean(values?.assignee) &&
    Boolean(values?.estimatedTime);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Task
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
              <h2>Create Task</h2>{" "}
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
              <FormControl style={{ width: "100%", margin: "15px 0px" }}>
                <InputLabel id="assignee">Assignee</InputLabel>
                <Select
                  labelId="assignee"
                  id="assignee"
                  value={values?.assignee}
                  name="assignee"
                  label="Assignee"
                  onChange={handleInputChange}
                >
                  {projectData?.members?.map((i) => (
                    <MenuItem key={i?.id} value={i?.id}>
                      {i?.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Estimated Time"
                type="number"
                value={values?.estimatedTime}
                name="estimatedTime"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
            </form>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={createNewTask}
              disabled={!isButtonEnabled}
            >
              Create
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

export default CreateTask;
