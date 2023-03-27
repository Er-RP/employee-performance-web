import { Card, CardContent, Typography } from "@mui/material";

const ProjectCard = ({ project }) => {
  const { name, description, manager, members, duration } = project;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">
          <strong>Manager:</strong> {manager}
        </Typography>
        <Typography variant="body2">
          <strong>Members:</strong> {members?.join(", ")}
        </Typography>
        <Typography variant="body2">
          <strong>Duration:</strong> {duration} hours
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
