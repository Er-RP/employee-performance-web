import { useUser } from "./providers/userProvider";
import Layout from "./layouts";

const App = () => {
  const {
    currentUser: { user },
  } = useUser();

  if (user?.role) {
    return <Layout />;
  }

  return <>OOPS</>;
};

export default App;
