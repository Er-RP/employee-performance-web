import { useUser } from "../../providers/userProvider";

function withRole(Component) {
  function ComponentWithRoleProp(props) {
    const {
      currentUser: { user },
    } = useUser();
    return <Component {...props} user={user} />;
  }

  return ComponentWithRoleProp;
}

export default withRole;
