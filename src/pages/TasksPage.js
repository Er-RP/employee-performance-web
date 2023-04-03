import { useLoaderData } from "react-router-dom";
import withRole from "../helpers/hoc/withRole";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TaskCard from "../components/tasks/TaskCard";
const initialState = {
  loading: true,
  data: null,
  error: null,
};
const TasksPage = ({ user }) => {
  const taskData = useLoaderData();
  const [tasks, setTasks] = useState(initialState);
  const { loading, data, error } = tasks;

  const handleGettingProjects = () => {
    if (taskData?.success) {
      setTasks({ ...tasks, loading: false, data: taskData?.tasks });
    } else {
      setTasks({
        ...tasks,
        loading: false,
        error: "error occured while fetching",
      });
    }
  };
  useEffect(() => {
    handleGettingProjects();
  }, [taskData]);
  if (loading) {
    return <>Loading</>;
  }
  if (error) {
    return <>Error Occured!!!</>;
  }

  return (
    <Box>
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
            Tasks
          </Typography>
        </div>
      </div>
      <Grid container spacing={2}>
        {data && data?.length > 0 ? (
          data.map((task, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <TaskCard task={task} />
            </Grid>
          ))
        ) : (
          <Grid p={3}>No Tasks Found</Grid>
        )}
      </Grid>
    </Box>
  );
};

export default withRole(TasksPage);
