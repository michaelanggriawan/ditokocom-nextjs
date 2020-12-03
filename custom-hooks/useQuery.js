// import { useLocation } from "react-router-dom";
import { withRouter } from 'next/router';
const useQuery = ({ router }) => new URLSearchParams(router.pathname);
export default withRouter(useQuery);
