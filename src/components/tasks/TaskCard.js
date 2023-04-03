import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { name, description, project, status, estimatedTime } = task;
  const navigate = useNavigate();

  const ProjectDetails = (id) => {
    navigate(`/tasks/${id}`);
  };
  return (
    <Box px={2}>
      <Card sx={{ maxWidth: 355 }}>
        <div className=" border-2">
          <CardContent
            onClick={() => {
              ProjectDetails(task?.id);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="bg-white   pl-2 rounded-sm  ">
              <div className="text-secondary-main">
                {" "}
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
              </div>{" "}
              <div
                title={description}
                style={{
                  width: "100%",
                  height: " 52px",
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
                  <strong>Project:</strong> {project?.name}
                </Typography>
                <Typography variant="body2" py={1}>
                  <strong>Status:</strong> {status}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {estimatedTime} hours
                </Typography>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
};

export default TaskCard;
