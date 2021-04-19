import React, { useState, useContext } from 'react'
import { AuthUserContext } from '../../context/auth'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import IProject from '../../interfaces/Project'
import { DivButtons, LastColumnButton, ButtonFullWidth } from './ProjectCard.style'
import { toast } from 'react-toastify'
const PROJECT_DELETED = 'Project deleted with success'

interface ProjectInfos {
  project: IProject,
  setSomeProjectHasBeenDeleted(value: boolean): void
}

const ProjectCard: React.FC<ProjectInfos> = (projectInfos) => {
  const history = useHistory()
  const deleteProject = async () => {
    await api.delete(`/project/delete?id=${projectInfos.project.id}`)
    projectInfos.setSomeProjectHasBeenDeleted(true)
    history.push('/projects')
    toast(PROJECT_DELETED)
  }

  return (
    <>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Project: {projectInfos.project.name.toUpperCase()}
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="column">
                Create on: <b>{projectInfos.project.creationDate}</b>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                Last update: <b>{projectInfos.project.updatedOn}</b>
              </div>
            </div>
            {projectInfos.project.description && (<div className="columns">
              <div className="column">
                Description: <b>{projectInfos.project.description}</b>
              </div>
            </div>)}
          </div>
        </div>
        <footer className="card-footer">
          <DivButtons className="columns">
            <div className="column has-text-centered">
              <ButtonFullWidth className="button is-primary" onClick={() => history.push('/tasks')}>Check tasks</ButtonFullWidth>
            </div>
            <div className="column has-text-centered">
              <ButtonFullWidth className="button is-info" onClick={() => history.push(`/project/update/${projectInfos.project.id}`)}>Edit</ButtonFullWidth>
            </div>
            <LastColumnButton className="column has-text-centered">
              <ButtonFullWidth className="button is-danger" onClick={() => deleteProject()}>Delete</ButtonFullWidth>
            </LastColumnButton>
          </DivButtons>
        </footer>
      </div>
    </>
  )
}

export default ProjectCard
