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
import { get, post } from "../../network/api";

const initialFormValues = {
  name: "",
  description: "",
  manager: "",
  members: [],
  duration: "",
};

const CreateProject = ({ usersData, setProjects }) => {
  const { values, handleInputChange } = useForm(initialFormValues);
  const [open, setOpen] = useState(false);

  const createNewProject = async () => {
    const res = await post("/project/create", values);
    if (res?.success) {
      setProjects((prevValue) => ({
        ...prevValue,
        data: [res?.project, ...prevValue?.data],
      }));
      setOpen(false);
    }
  };

  const isButtonEnabled =
    Boolean(values?.name) &&
    Boolean(values?.description) &&
    Boolean(values?.manager) &&
    Boolean(values?.members.length > 0) &&
    Boolean(values?.duration);
  const filteredManagers = usersData?.filter((user) => user.role === "MANAGER");
  const filteredMembers = usersData?.filter((user) => user.role === "EMPLOYEE");

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Project
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
              <h2>Create Project</h2>{" "}
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
                <InputLabel id="Manager">Manager</InputLabel>
                <Select
                  labelId="Manager"
                  id="Manager"
                  value={values?.manager}
                  name="manager"
                  label="Manager"
                  onChange={handleInputChange}
                >
                  {filteredManagers?.map((i) => (
                    <MenuItem key={i?.id} value={i?.id}>
                      {i?.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%", margin: "7px 0px 9px 0px" }}>
                <InputLabel id="Members">Members</InputLabel>
                <Select
                  multiple
                  labelId="Members"
                  id="Members"
                  value={values?.members}
                  onChange={handleInputChange}
                  name="members"
                  label="Members"
                >
                  {filteredMembers?.map((members) => (
                    <MenuItem key={members?.id} value={members?.id}>
                      {members?.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Duration"
                type="number"
                value={values?.duration}
                name="duration"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
            </form>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={createNewProject}
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

export default CreateProject;
