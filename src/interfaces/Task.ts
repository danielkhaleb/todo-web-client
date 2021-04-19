import IProject from './Project'

export default interface ITask {
  id: string
  description: string
  creationDate: string
  updatedOn: string
  deletionDate: string
  isFinished: boolean
  deadline: string
  conclusion?: string
  project: string
}
