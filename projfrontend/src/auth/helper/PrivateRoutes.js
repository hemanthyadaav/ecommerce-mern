import { isAuthenticated } from ".";
import NotFound from "./NotFound";

const PrivateRoutes = ({ children }) => {
  return isAuthenticated() ? (
    children
  ) : (
    <NotFound desc="You have to signin first to access this page!!" />
  );
};

export default PrivateRoutes;
