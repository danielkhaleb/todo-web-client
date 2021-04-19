import React, { FC, useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthUserContext } from '../context/auth'
import Login from '../pages/Login/Login'
import Project from '../pages/Project/Project'
import FormProject from '../pages/FormProject/FormProject'

interface PrivateRouteProps {
  isPrivate: boolean
  exact: boolean
  path: string
  component: FC
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { isPrivate, ...rest } = props
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
      <PrivateRoute
          isPrivate
          exact
          path="/projects"
          component={Project}
        />
        <PrivateRoute
          isPrivate
          exact
          path="/project/create"
          component={FormProject}
        />
        <PrivateRoute
          isPrivate
          exact
          path="/project/update/:id"
          component={FormProject}
        />
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
