import React, { FC, useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthUserContext } from '../context/auth'
import Login from '../pages/Login/Login'

interface PrivateRouteProps {
  isPrivate: boolean
  exact: boolean
  path: string
  component: FC<{}>
  section: string
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { isPrivate, section, ...rest } = props
  const { loading, user } = useContext(AuthUserContext)
  if (loading) {
    return null
  }
  if (isPrivate && !user.isAuthenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;


