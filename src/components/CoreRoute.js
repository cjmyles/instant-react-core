import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

// Determine if the core routes should require authentication
const CoreRoute = CONFIG.app.useAuth
  ? AuthenticatedRoute
  : UnauthenticatedRoute;

export default CoreRoute;
