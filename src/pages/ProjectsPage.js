import { MyLocationTwoTone } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Projects from "../components/projects";
import withRole from "../helpers/hoc/withRole";
import { MyModal } from "../modals/ProjectCreateModal";
import { get } from "../network/api";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const ProjectsPage = ({ user }) => {
  const projectData = useLoaderData();
  const [projects, setProjects] = useState(initialState);
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
  if (loading) {
    return <>Loading</>;
  }
  return (
    <Box>
      {" "}
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
  <Grid container spacing={2}>     <Box p={2}> 
      <Button onClick={()=>{console.log("thiranthitu seeshee")}} name="my-button">Create Project</Button>
    </Box>

        {data && data?.length > 0 ? (
          data.map((project, i) => (
            <>
            <Grid item xs={12} sm={6} lg={4} key={i} >
              <Projects project={project} />
            </Grid></>
          ))
        ) : (
          <Grid p={3}>{error}</Grid>
        )}
      </Grid>{" "}
      <MyModal/>
    </Box>
  );
};

export default withRole(ProjectsPage);
