import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../network/api";
import UpdateTask from "./UpdateTask";

const TaskDetails = () => {
  const params = useParams();
  const TaskId = params;
  const [taskData, setTaskData] = useState();

  const GetTaskById = async () => {
    const res = await get(`/tasks/${TaskId?.id}`);
    if (res?.success) {
      setTaskData(res?.task);
    }
  };

  useEffect(() => {
    GetTaskById();
  }, []);
  const statusClassName = () => {
    switch (taskData?.status) {
      case "Completed":
        return "border-[#198020]";
      case "Progress":
        return "border-[#2345a1]";
      case "To Do":
        return "border-[#e8e22a]";
      case "Review":
        return "border-[#831d8f]";
      default:
        return "border-black";
    }
  };
  return (
    <div className="p-3">
      <div className="flex justify-between">
        <div>
          <Typography
            style={{
              display: "flex",
              justifyContent: "start",
              fontWeight: "bolder",
              fontSize: 30,
            }}
            py={1}
          >
            TASK
          </Typography>
        </div>
        <div>
          <UpdateTask taskData={taskData} setTaskData={setTaskData} />
        </div>
      </div>
      <div className=" p-4 rounded-lg shadow-md ">
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className={`bg-white rounded-lg p-4 shadow-md border-2 ${statusClassName()}`}
          >
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">Name:</div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.name}
              </div>
            </div>
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">
                Project:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.project?.name}
              </div>
            </div>
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">
                Estimated Time:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.estimatedTime}
              </div>
            </div>
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1 ">
                Description:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.description}
              </div>
            </div>
            {taskData?.actualTime >= 0 && (
              <div className="py-4 flex gap-x-1">
                <div className="text-xl font-bold text-gray-600 mb-1 ">
                  Hours Taken:
                </div>
                <div className="text-lg font-semibold text-gray-500 pt-0.5">
                  {taskData?.actualTime}
                </div>
              </div>
            )}
          </div>

          <div
            className={`bg-white rounded-lg p-4 shadow-md border-2 ${statusClassName()}`}
          >
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">
                Assigned To:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.assignee?.fullName}
              </div>
            </div>
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">
                Created By:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.createdBy?.fullName}
              </div>
            </div>
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">
                Progress Level:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.progressLevel}
              </div>
            </div>
            <div className="py-4 flex gap-x-1">
              <div className="text-xl font-bold text-gray-600 mb-1">
                Status:
              </div>
              <div className="text-lg font-semibold text-gray-500 pt-0.5">
                {taskData?.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
