import React, { useState, useContext } from 'react'
import { AuthUserContext } from '../../context/auth'
import { faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DivIconButton } from './Navbar.style'

const Navbar: React.FC = () => {
  const { handleLogout } = useContext(AuthUserContext)

  return (
    <div className="hero is-info">
      <div className="hero-body">
        <div className="columns is-flex-direction-row">
          <div className="column is-11">
            <DivIconButton>
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
