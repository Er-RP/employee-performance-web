import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ projects, tasks, users }) => {
  return (
    <Box>
      <>
        <Title title="PROJECTS" />
        <ProjectsGrid projects={projects} />
      </>
      <>
        <Title title="TASKS" />
        <TasksGrid tasks={tasks} />
      </>
    </Box>
  );
};

export default Dashboard;

const Title = ({ title }) => (
  <div className="md:flex justify-center px-5 items-center">
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
        {title}
      </Typography>
    </div>
  </div>
);

const Content = ({ onClick = () => null, title = "Total", count }) => (
  <Box px={2}>
    <Card sx={{ maxWidth: 355 }}>
      <div className=" border-2  h-28">
        <CardContent onClick={onClick} style={{ cursor: "pointer" }}>
          <div className="bg-white pl-2 rounded-sm ">
            <div className="text-secondary-main ">
              <Typography variant="h5" component="div">
                {title}
              </Typography>
            </div>
            <div className="text-secondary-main p-2 text-center">
              <Typography color="text.primary" variant="h5">
                {count}
              </Typography>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  </Box>
);

const ProjectsGrid = ({ projects = [] }) => {
  const navigate = useNavigate();
  const total = projects?.length;
  const completed = projects?.filter((project) => project?.isCompleted)?.length;
  const progressing = total - completed;
  const handleProjectClick = () => {
    navigate(`/projects`);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <Content count={total} onClick={handleProjectClick} />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="In Progress"
          count={progressing}
          onClick={handleProjectClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="Completed"
          count={completed}
          onClick={handleProjectClick}
        />
      </Grid>
    </Grid>
  );
};

const TasksGrid = ({ tasks = [] }) => {
  const navigate = useNavigate();
  const total = tasks?.length;
  const completed = tasks?.filter(
    (project) => project?.status === "Completed"
  )?.length;
  const progressing = total - completed;
  const handleProjectClick = () => {
    navigate(`/tasks`);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <Content count={total} onClick={handleProjectClick} />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="In Progress"
          count={progressing}
          onClick={handleProjectClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="Completed"
          count={completed}
          onClick={handleProjectClick}
        />
      </Grid>
    </Grid>
  );
};
