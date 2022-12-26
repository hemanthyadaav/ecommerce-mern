import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from ".";
import { SIGNIN } from "../../links";
import NotFound from "./NotFound";

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    children
  ) : (
    <NotFound />
  );
};

export default AdminRoutes;
