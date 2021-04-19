import React, { useContext } from 'react'
import { AuthUserContext } from '../../context/auth'

const HelloUser: React.FC = () => {
  const { user } = useContext(AuthUserContext)

  return (
    <div className="columns">
      <div className="column is-half is-offset-one-quarter has-text-centered">
        Hi <b>{user.email}</b>
      </div>
    </div>
  )
}

export default HelloUser
