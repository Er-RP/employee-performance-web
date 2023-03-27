import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Projects from "../components/projects";
import withRole from "../helpers/hoc/withRole";
import { get } from "../network/api";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const ProjectsPage = ({ user }) => {
  // const data = useLoaderData();
  const [projects, setProjects] = useState(initialState);
  const { loading, data, error } = projects;
  const handleGettingProjects = async () => {
    const res = await get("/project");
    if (res?.success) {
      setProjects({ ...projects, loading: false, data: res?.projects });
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
  }, []);
  if (loading) {
    return <>Loading</>;
  }
  console.log("DATA : ", data);
  return (
    <Grid container spacing={2}>
      {data &&
        data?.length > 0 &&
        data.map((project, i) => (
          <Grid item xs={12} sm={6} lg={4} key={i}>
            <Projects project={project} />
          </Grid>
        ))}
    </Grid>
  );
};

export default withRole(ProjectsPage);
