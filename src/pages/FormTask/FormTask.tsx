import React, { useState, useEffect, useCallback } from 'react'
import { Container, Section } from './FormTask.style'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import NavBar from '../../components/Navbar/Navbar'
import HelloUser from '../../components/HelloUser/HelloUser'
import ITask from '../../interfaces/Task'
import IProject from '../../interfaces/Project'
const PROJECT_REGISTERED = 'Task successfully registered'
const PROJECT_UPDATE = 'Update task with success'

type Inputs = {
  description?: string
}

const FormTask: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const { id, projectId } = useParams<{ id?: string, projectId: string }>()
  const [task, setTask] = useState<ITask>()
  const [project, setProject] = useState<IProject>()
  const history = useHistory()

  const getProjectById = useCallback(async () => {
    const response = await api.get(`/project/get_by_id?id=${projectId}`)
    if (response && response.data && response.data.project) {
      setProject({ ...response.data.project })
    }
  }, [projectId])

  useEffect(() => {
    if (projectId) {
      getProjectById()
    }
  }, [getProjectById, projectId])

  const getTaskById = useCallback(async () => {
    const response = await api.get(`/task/get_by_id?id=${id}`)
    if (response && response.data && response.data.task) {
      setTask({ ...response.data.task })
    }
  }, [id])

  useEffect(() => {
    if (id) {
      getTaskById()
    }
  }, [getTaskById, id])

  const onSubmit = async (data: Inputs) => {
    const { description } = data

    if (task) {
      const taskRequest = await api.put('/task/update', { id: task.id, description }).catch(error => {
        toast(error)
      })
      if (taskRequest) {
        toast(PROJECT_UPDATE)
        history.goBack()
      }
    } else {
      const taskRequest = await api.post('/task/create', { projectId, description }).catch(error => {
        toast(error)
      })
      if (taskRequest) {
        toast(PROJECT_REGISTERED)
        history.goBack()
      }
    }
  }

  return (
    <Section>
      <NavBar />
      <Container className="is-flex-direction-column">
        <HelloUser />
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <b>{!task ? 'Create Task' : 'Update Task'}</b> to <b>{project?.name}</b> project
          </div>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Task Name"
                    className="input"
                    name="description"
                    ref={register({ required: true })}
                    required
                    defaultValue={task && task.description ? task.description : ''}
                  />
                  {errors.description && (
                    <p className="help is-danger">This name is invalid</p>
                  )}
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success is-medium"
                  >
                    Save
                  </button>
                </div>
                <div className="control">
                  <button className="button is-light is-medium" onClick={() => history.goBack()}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default FormTask
