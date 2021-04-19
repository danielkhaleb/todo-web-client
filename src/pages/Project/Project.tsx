import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Container, Section, ButtonFullWidth, DivCard } from './Project.style'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { AuthUserContext } from '../../context/auth'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import LogoTransparent from '../../images/logo.png'
import api from '../../services/api'
import NavBar from '../../components/Navbar/Navbar'
import HelloUser from '../../components/HelloUser/HelloUser'
import IProject from '../../interfaces/Project'
import ProjectCard from '../../components/ProjectCard/ProjectCard'

type Inputs = {
  name: string
  description?: string
}

const Project: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const { handleLogin } = useContext(AuthUserContext)
  const [projects, setProjects] = useState<IProject[]>([])
  const [someProjectHasBeenDeleted, setSomeProjectHasBeenDeleted] = useState(false)
  const history = useHistory()

  const getProjectItems = useCallback(async () => {
    const response = await api.get('/project/list')
    console.log('RESPONSE', response)
    if (response && response.data && response.data.projects) {
      setProjects([...response.data.projects])
    }
    setSomeProjectHasBeenDeleted(false)
  }, [])

  useEffect(() => {
    getProjectItems()
  }, [getProjectItems])

  useEffect(() => {
    if (someProjectHasBeenDeleted) {
      getProjectItems()
    }
  }, [someProjectHasBeenDeleted, getProjectItems])

  const redirectToCreateProject = () => {
    history.push('/project/create')
  }

  return (
    <Section>
      <NavBar />
      <Container className="is-flex-direction-column">
        <HelloUser />
        <div className="columns">
          <div className="column is-half is-offset-one-quarter has-text-centered">
            Project List
          </div>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter has-text-centered">
            {projects.length > 0 && (
              <ButtonFullWidth onClick={() => redirectToCreateProject()} className="button is-link is-large">Create another project</ButtonFullWidth>
            )}
            {projects.length === 0 && (
              <ButtonFullWidth onClick={() => redirectToCreateProject()} className="button is-link is-large">
                Create your first project
              </ButtonFullWidth>
            )}
          </div>
        </div>
        {projects.length > 0 && (
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              {projects.map((project) => (
                <DivCard key={project.id}>
                  <ProjectCard
                    project={project}
                    setSomeProjectHasBeenDeleted={setSomeProjectHasBeenDeleted}
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
