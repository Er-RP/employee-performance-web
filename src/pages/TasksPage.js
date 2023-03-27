import EmployeeTask from "../components/tasks/EmployeeTask";
import withRole from "../helpers/hoc/withRole";

const ROLES = {
  EMPLOYEE: <EmployeeTask />,
  MANAGER: <>Manager</>,
  HR: <>HRRRR</>,
};

const TasksPage = ({ user }) => {
  const role = user?.role;
  return ROLES[role];
};

export default withRole(TasksPage);
