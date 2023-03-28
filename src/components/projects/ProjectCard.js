import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { name, description, manager, members, duration } = project;
  const navigate = useNavigate()
  // console.log("project :", project);

  const ProjectDetails = (project) => {
    navigate(`/projects/${project?.id}`)
  }
  return (
    <Box px={2}>
      <Card sx={{ maxWidth: 355 }}>
        <div className=" border-2  h-48">
          <CardContent  onClick={()=>{ProjectDetails(project)}} style={{cursor:"pointer"}} >
            <div className="bg-white   pl-2 rounded-sm  " >
              <div className="text-secondary-main">
                {" "}
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
              </div>{" "}
              <div title={description}
                style={{
                  width: "100%",
                  height:" 52px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
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
          </CardContent>
        </div>
      </Card>
    </Box>
  );
};

export default ProjectCard;
