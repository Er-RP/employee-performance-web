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
import { useParams } from "react-router-dom";
import { get } from "../../network/api";

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params;
  const [projectData, setProjectData] = useState();
  const [tasks, setTasks] = useState([]);
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
  return (
    <div>
      <div className="flex flex-col items-center py-10 px-2">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {projectData?.name}
          </h1>
          <p className="text-gray-600 mb-4">{projectData?.description}</p>
          <div className="flex justify-between items-center text-gray-600 mb-4">
            <span>{projectData?.duration} days</span>
            <span>{projectData?.hoursTaken} hours</span>
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
      <div className="flex justify-start px-4 py-2 text-2xl font-bold text-gray-800">
        <div>Task</div>
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
                          : task.status === "In progress"
                          ? "orange"
                          : task.status === "Pending"
                          ? "red"
                          : "",
                    }}
                  >
                    {task.status}
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
