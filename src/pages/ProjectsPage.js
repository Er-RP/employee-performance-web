import { MyLocationTwoTone } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Projects from "../components/projects";
import CreateProject from "../components/projects/CreateProject";
import withRole from "../helpers/hoc/withRole";
import { get } from "../network/api";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const ProjectsPage = ({ user }) => {
  const projectData = useLoaderData();
  const [projects, setProjects] = useState(initialState);
  const [usersData, setUsersData] = useState();
  const { loading, data, error } = projects;
  const handleGettingProjects = () => {
    if (projectData?.success) {
      setProjects({ ...projects, loading: false, data: projectData?.projects });
    } else {
      setProjects({
        ...projects,
        loading: false,
        error: "error occured while fetching",
      });
    }
  };
  useEffect(() => {
    handleGettingProjects();
  }, [projectData]);

  const getAllUsers = async () => {
    try {
      const res = await get("/users");
      if (res?.success) {
        setUsersData(res?.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <Box>
      {" "}
      <div className="md:flex justify-between px-5 items-center">
        <div>
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bolder",
              fontSize: 30,
            }}
            py={1}
          >
            PROJECTS
          </Typography>
        </div>
        <div className="flex justify-center py-2 md:py-0">
          <CreateProject usersData={usersData} setProjects={setProjects} />
        </div>
      </div>
      <Grid container spacing={2}>
        {" "}
        {data && data?.length > 0 ? (
          data.map((project, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Projects project={project} />
            </Grid>
          ))
        ) : (
          <Grid p={3}>{error}</Grid>
        )}
      </Grid>{" "}
    </Box>
  );
};

export default withRole(ProjectsPage);
