import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
    if (!localStorage.getItem('SignedIn')) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};
export default Protected;