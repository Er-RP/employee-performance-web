import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ProjectCard = ({ project }) => {
  const { name, description, manager, members, duration } = project;
  // console.log("project :", project);
  return (
  <Box px={2} > 
     <Card sx={{ maxWidth: 355 }}  >
     <div className=" border-2  ">
      <CardContent >
        <div className="bg-white   pl-2 rounded-sm active:bg-primary-main " >
          <div className="text-secondary-main">
            {" "}
            <Typography variant="h5" component="div">
              {name}
            </Typography>
          </div>{" "}
          <div>
            <Typography color="text.secondary">{description}</Typography>
          </div>
        </div>
        <div className="pt-3">
          <div className=" py-3 pl-2 rounded-md ">
            <Typography variant="body2" py={1}>
              <strong>Manager:</strong> {manager?.fullName}
            </Typography>
            <Typography variant="body2">
              <strong>Duration:</strong> {duration} hours
            </Typography>
          </div>
        </div>
      </CardContent></div>
    </Card></Box>
  );
};

export default ProjectCard;
