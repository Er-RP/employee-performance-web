import withRole from "../helpers/hoc/withRole";

const ROLES = {
  EMPLOYEE: <>i am employee</>,
  MANAGER: <>Manager</>,
  HR: <>HRRRR</>,
};

const ProjectsPage = ({ user }) => {
  const role = user?.role;
  return ROLES[role];
};

export default withRole(ProjectsPage);
