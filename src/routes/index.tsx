import React, { FC, useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthUserContext } from '../context/auth'
import Login from '../pages/Login/Login'
import Project from '../pages/Project/Project'
import FormProject from '../pages/FormProject/FormProject'
import Task from '../pages/Task/Task'
import FormTask from '../pages/FormTask/FormTask'

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
        <PrivateRoute
          isPrivate
          exact
          path="/project/:projectId/tasks"
          component={Task}
        />
        <PrivateRoute
          isPrivate
          exact
          path="/project/:projectId/task/create"
          component={FormTask}
        />
        <PrivateRoute
          isPrivate
          exact
          path="/project/:projectId/task/:id/update"
          component={FormTask}
        />
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
