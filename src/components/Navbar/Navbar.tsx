import React, { useContext } from 'react'
import { AuthUserContext } from '../../context/auth'
import { faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DivIconButton } from './Navbar.style'
import { useHistory } from 'react-router-dom'

const Navbar: React.FC = () => {
  const { handleLogout } = useContext(AuthUserContext)
  const history = useHistory()

  return (
    <div className="hero is-info">
      <div className="hero-body">
        <div className="columns is-flex-direction-row">
          <div className="column is-11">
            <DivIconButton onClick={() => history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size="2x"/>
            </DivIconButton>
          </div>
          <div className="column is-1 is-off-set-11 is-align-content-end">
            <DivIconButton className="has-text-right" onClick={() => handleLogout()}>
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            </DivIconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
