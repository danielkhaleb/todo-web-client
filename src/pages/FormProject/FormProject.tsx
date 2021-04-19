import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Container, Section } from './FormProject.style'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { AuthUserContext } from '../../context/auth'
import { toast } from 'react-toastify'
import LogoTransparent from '../../images/logo.png'
import api from '../../services/api'
import NavBar from '../../components/Navbar/Navbar'
import HelloUser from '../../components/HelloUser/HelloUser'
import IProject from '../../interfaces/Project'
const PROJECT_REGISTERED = 'Project successfully registered'
const PROJECT_UPDATE = 'Update project with success'

type Inputs = {
  name: string
  description?: string
}

const FormProject: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const { handleLogin } = useContext(AuthUserContext)
  const { id } = useParams<{ id?: string }>()
  const [project, setProject] = useState<IProject>()
  const history = useHistory()

  const getProjectById = useCallback(async () => {
    const response = await api.get(`/project/get_by_id?id=${id}`)
    if (response && response.data && response.data.project) {
      setProject({ ...response.data.project })
    }
  }, [])

  useEffect(() => {
    if (id) {
      getProjectById()
    }
  }, [getProjectById, id])

  const onSubmit = async (data: Inputs) => {
    const { name, description } = data

    if (project) {
      const projectRequest = await api.put('/project/update', { id: project.id, name, description }).catch(error => {
        toast(error)
      })
      if (projectRequest) {
        toast(PROJECT_UPDATE)
        history.push('/projects')
      }
    } else {
      const projectRequest = await api.post('/project/create', { name, description }).catch(error => {
        toast(error)
      })
      if (projectRequest) {
        toast(PROJECT_REGISTERED)
        history.push('/projects')
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
            {!project ? 'Create Project' : 'Update Project'}
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
                    placeholder="Project Name"
                    className="input"
                    name="name"
                    ref={register({ required: true })}
                    required
                    defaultValue={project && project.name ? project.name : ''}
                  />
                  {errors.name && (
                    <p className="help is-danger">This name is invalid</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Project Description"
                    className="input"
                    name="description"
                    defaultValue={project && project.description ? project.description : ''}
                    ref={register()}
                  />
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
                  <button className="button is-light is-medium" onClick={() => history.push('/projects')}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default FormProject
