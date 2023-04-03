import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../network/api";
import CreateTask from "../tasks/CreateTask";

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params;
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState();
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState("");
  const [sortedBy, setSortedBy] = useState("name");

  const GetProjectById = async () => {
    const res = await get(`/project/${projectId?.id}`);
    if (res?.success) {
      setProjectData(res?.project);
      const refinedTasks = res?.project?.tasks?.map((t) => {
        const fullName = t?.assignee?.fullName;
        return { ...t, assignee: fullName };
      });
      setTasks(refinedTasks);
    }
  };

  useEffect(() => {
    GetProjectById();
  }, []);

  const sortByColumn = (column) => {
    if (column === sortedBy) {
      tasks.reverse();
    } else {
      tasks.sort((a, b) => {
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      });
      setSortedBy(column);
    }
  };
  const handleClick = (task) => {
    setData(task?.id);
    navigate(`/tasks/${task?.id}`);
  };
  return (
    <div>
      <div className="flex flex-col items-center py-10 px-2">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {projectData?.name}
          </h1>
          <p className="text-gray-600 mb-4">{projectData?.description}</p>
          {/* <div className="flex justify-between items-center text-gray-600 mb-4">
            <span>{projectData?.duration} hours</span>
          </div> */}
          <div className="text-gray-600 mb-4">
            <span className="font-bold">Duration:</span>
            {projectData?.duration} hours
          </div>
          <div className="text-gray-600 mb-4">
            <span className="font-bold">Manager:</span>{" "}
            {projectData?.manager?.fullName}
          </div>
          <div className="text-gray-600 mb-4">
            <span className="font-bold">Members:</span>{" "}
            {projectData?.members?.map((member, i) => (
              <span key={i} className="">
                {member?.fullName},{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-2 text-2xl font-bold text-gray-800">
        <div>Task</div>
        <div>
          <CreateTask
            projectData={projectData}
            GetProjectById={GetProjectById}
          />
        </div>
      </div>
      <div className="p-2">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortedBy === "name"}
                    direction={sortedBy === "name" ? "asc" : "desc"}
                    onClick={() => sortByColumn("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortedBy === "assignee"}
                    direction={sortedBy === "assignee" ? "asc" : "desc"}
                    onClick={() => sortByColumn("assignee")}
                  >
                    Assignee
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortedBy === "status"}
                    direction={sortedBy === "status" ? "asc" : "desc"}
                    onClick={() => sortByColumn("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell
                    style={{
                      color:
                        task.status === "Completed"
                          ? "green"
                          : task.status === "Progress"
                          ? "blue"
                          : task.status === "Review"
                          ? "purple "
                          : task.status === "To Do"
                          ? "orange "
                          : "",
                    }}
                  >
                    <div className="flex justify-start items-center gap-x-2">
                      <span className="text-3xl">•</span> {task.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      className="rounded-full bg-slate-200 "
                      onClick={() => handleClick(task)}
                    >
                      <svg viewBox="0 0 512 282.68" className="w-5 h-5 ">
                        <path
                          fill-rule="nonzero"
                          d="M3.14 132.9c14.51-17.53 29.53-33.35 44.94-47.39 60.17-54.78 127.69-84 197.43-85.45 69.61-1.46 141.02 24.79 209.14 80.95 18.45 15.21 36.6 32.54 54.3 52 3.82 4.19 4.02 10.42.78 14.81-19.73 27.91-41.98 51.4-65.97 70.56-53.57 42.77-115.96 63.9-179.2 64.29-63.05.39-126.84-19.87-183.44-59.83-28.31-20-54.85-44.93-78.58-74.67-3.65-4.59-3.29-11.1.6-15.27zM256 83.24c32.09 0 58.1 26.01 58.1 58.1s-26.01 58.1-58.1 58.1-58.1-26.01-58.1-58.1c0-5.97.9-11.74 2.57-17.16 4.25 11.15 15.04 19.07 27.68 19.07 16.35 0 29.61-13.26 29.61-29.61 0-12.7-7.98-23.52-19.2-27.73 5.5-1.73 11.36-2.67 17.44-2.67zm107.24-33.52a141.453 141.453 0 0 1 23.1 37.7c6.92 16.67 10.74 34.9 10.74 53.92 0 19.03-3.82 37.26-10.73 53.94a141.479 141.479 0 0 1-30.6 45.8l-1.92 1.89c26.4-9.83 51.79-24.09 75.37-42.91 20.12-16.07 38.96-35.49 55.99-58.27-15-15.93-30.16-30.18-45.38-42.73-25.22-20.8-50.84-37.2-76.57-49.34zm-212.08 185.9c-10.65-11.81-19.33-25.44-25.5-40.32a140.518 140.518 0 0 1-10.74-53.96c0-19.01 3.81-37.22 10.72-53.87 6.85-16.52 16.75-31.46 28.96-44.1-31.5 13.33-61.97 33.25-90.76 59.44-12.7 11.57-25.04 24.3-36.95 38.17 20.74 24.71 43.54 45.64 67.69 62.71 18.19 12.84 37.15 23.5 56.58 31.93zM300.95 32.58c-13.78-5.71-28.98-8.88-44.94-8.88-15.94 0-31.12 3.17-44.93 8.9-14.34 5.95-27.32 14.73-38.23 25.64-10.88 10.89-19.64 23.85-25.6 38.2-5.71 13.79-8.88 28.97-8.88 44.9 0 15.96 3.17 31.17 8.9 44.98a117.654 117.654 0 0 0 25.58 38.19c10.86 10.84 23.84 19.6 38.24 25.57 13.8 5.72 28.98 8.88 44.92 8.88 15.95 0 31.15-3.17 44.96-8.88 14.36-5.93 27.32-14.7 38.2-25.57 10.88-10.88 19.64-23.84 25.57-38.16 5.72-13.85 8.89-29.05 8.89-45.01 0-15.95-3.17-31.14-8.89-44.95-5.93-14.37-14.69-27.33-25.57-38.21-10.86-10.86-23.84-19.63-38.22-25.6z"
                        />
                      </svg>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProjectDetails;
