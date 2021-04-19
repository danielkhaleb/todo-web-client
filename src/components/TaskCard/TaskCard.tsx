/* eslint-disable import/no-duplicates */
import React from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import ITask from '../../interfaces/Task'
import { DivButtons, LastColumnButton, ButtonFullWidth, DivCard } from './TaskCard.style'
import { toast } from 'react-toastify'
const TASK_DELETED = 'Task deleted with success'
const TASK_FINISHED = 'Task finished with success'
const FORMAT_DATE = 'MM/dd/yyyy HH:mm:ss'

interface TaskInfos {
  task: ITask,
  setSomeTaskHasBeenUpdated(value: boolean): void
}

const TaskCard: React.FC<TaskInfos> = (taskInfos) => {
  const history = useHistory()
  const deleteTask = async () => {
    await api.delete(`/task/delete?id=${taskInfos.task.id}`)
    taskInfos.setSomeTaskHasBeenUpdated(true)
    toast(TASK_DELETED)
  }

  const completeTask = async () => {
    await api.put('/task/update_status', { id: taskInfos.task.id })
    taskInfos.setSomeTaskHasBeenUpdated(true)
    toast(TASK_FINISHED)
  }

  return (
    <>
    <DivCard disabled={taskInfos.task.isFinished} className="card">
      <header className="card-header">
        <p className="card-header-title">
          Task: {taskInfos.task.description.toUpperCase()}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column">
              Create on:
              <b>
                {format(new Date(taskInfos.task.creationDate), FORMAT_DATE, {
                  locale: pt
                })}
              </b>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              Last update:
              <b>
                {format(new Date(taskInfos.task.updatedOn), FORMAT_DATE, {
                  locale: pt
                })}
              </b>
            </div>
          </div>
          {taskInfos.task.conclusion && (
            <div className="columns">
              <div className="column">
                Conclusion:
                <b>

                  {format(new Date(taskInfos.task.conclusion), FORMAT_DATE, {
                    locale: pt
                  })}
                </b>
              </div>
            </div>
          )}
        </div>
      </div>
      {!taskInfos.task.isFinished && (
        <footer className="card-footer">
          <DivButtons className="columns">
            <div className="column has-text-centered">
              <ButtonFullWidth
                className="button is-success"
                onClick={() => completeTask()}
              >
                Complete Task
              </ButtonFullWidth>
            </div>
            <div className="column has-text-centered">
              <ButtonFullWidth
                className="button is-info"
                onClick={() =>
                  history.push(
                    `/project/${taskInfos.task.project}/task/${taskInfos.task.id}/update/`
                  )
                }
              >
                Edit
              </ButtonFullWidth>
            </div>
            <LastColumnButton className="column has-text-centered">
              <ButtonFullWidth
                className="button is-danger"
                onClick={() => deleteTask()}
              >
                Delete
              </ButtonFullWidth>
            </LastColumnButton>
          </DivButtons>
        </footer>
      )}
    </DivCard>
  </>
  )
}

export default TaskCard
