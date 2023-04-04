import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Dashboard from "../components/dashboard";

const initialState = {
  loading: true,
  projects: null,
  tasks: null,
  users: null,
  error: null,
};

const DashboardPage = () => {
  const data = useLoaderData();
  const [allData, setAllData] = useState(initialState);
  console.log("DashboardPage : ", data);
  const { loading, projects, tasks, users, error } = allData;
  const handleGettingData = () => {
    if (data?.success) {
      setAllData({
        ...allData,
        loading: false,
        projects: data?.projects,
        tasks: data?.tasks,
        users: data?.users,
      });
    } else {
      setAllData({
        ...allData,
        loading: false,
        error: "error occured while fetching",
      });
    }
  };
  useEffect(() => {
    handleGettingData();
  }, [data]);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error Occured</>;
  }

  return <Dashboard projects={projects} tasks={tasks} users={users} />;
};

export default DashboardPage;
