import { useNavigate } from "react-router-dom";
import { isAuthenticated } from ".";
import { SIGNIN } from "../../links";
import NotFound from "./NotFound";

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();
  return isAuthenticated() ? (
    children
  ) : (
    <NotFound desc="You have to signin first to access this page!!" />
  );
};

export default PrivateRoutes;
