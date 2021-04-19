import React, { useState, useEffect, useCallback } from 'react'
import { Container, Section, ButtonFullWidth, DivCard } from './Task.style'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../services/api'
import NavBar from '../../components/Navbar/Navbar'
import HelloUser from '../../components/HelloUser/HelloUser'
import ITask from '../../interfaces/Task'
import TaskCard from '../../components/TaskCard/TaskCard'

const Project: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [someTaskHasBeenDeleted, setSomeTaskHasBeenUpdated] = useState(false)
  const history = useHistory()
  const { projectId } = useParams<{ projectId: string }>()

  const getTaskItems = useCallback(async () => {
    const response = await api.get(`/task/list?projectId=${projectId}`)
    if (response && response.data && response.data.tasks) {
      setTasks([...response.data.tasks])
    }
    setSomeTaskHasBeenUpdated(false)
  }, [projectId])

  useEffect(() => {
    if (projectId) {
      getTaskItems()
    }
  }, [getTaskItems, projectId])

  useEffect(() => {
    if (someTaskHasBeenDeleted) {
      getTaskItems()
    }
  }, [someTaskHasBeenDeleted, getTaskItems])

  const redirectToCreateTask = () => {
    history.push(`/project/${projectId}/task/create/`)
  }

  return (
    <Section>
      <NavBar />
      <Container className="is-flex-direction-column">
        <HelloUser />
        <div className="columns">
          <div className="column is-half is-offset-one-quarter has-text-centered">
            Task List
          </div>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter has-text-centered">
            {tasks.length > 0 && (
              <ButtonFullWidth onClick={() => redirectToCreateTask()} className="button is-link is-large">Create another task</ButtonFullWidth>
            )}
            {tasks.length === 0 && (
              <ButtonFullWidth onClick={() => redirectToCreateTask()} className="button is-link is-large">
                Create your first task
              </ButtonFullWidth>
            )}
          </div>
        </div>
        {tasks.length > 0 && (
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              {tasks.map((task) => (
                <DivCard key={task.id}>
                  <TaskCard
                    task={task}
                    setSomeTaskHasBeenUpdated={setSomeTaskHasBeenUpdated}
                  />
                </DivCard>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}

export default Project
