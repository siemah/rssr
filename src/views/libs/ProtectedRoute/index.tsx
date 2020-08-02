import React, { FC } from 'react';
import { Route, Redirect, RouteComponentProps, RouteChildrenProps, RouteProps, } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
}
/**
 * route guard to prevent accessing to private paths
 */
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  exact = true,
  path,
  isAuthenticated,
  redirectTo,
  component: C,
  children,
  ...rest
}) => {
  const _render = (props: any) => {
    if (!isAuthenticated) {
      return <Redirect to={redirectTo} from={props.location.pathname} />;
    } else if (C) {
      return <C {...rest} {...props} />;
    } else if (children) {
      return children;
    }
    return null;
  };

  return (
    <Route path={path} exact={exact} render={_render} />
  );
};

export default ProtectedRoute;