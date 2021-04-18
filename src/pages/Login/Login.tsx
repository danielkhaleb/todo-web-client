import React, { useState, useContext } from 'react'
import { Container, FirstContainer, SecondContainer, ImgLogoTransparent, DivImgLogo, DivForm, Form } from './Login.style'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { AuthUserContext } from '../../context/auth'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import LogoTransparent from '../../images/logo.png'
import api from '../../services/api'

type Inputs = {
  email: string
  password: string
  keepConnected: boolean
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const { handleLogin } = useContext(AuthUserContext)
  const [isRegister, setIsRegister] = useState(false)
  const history = useHistory()

  const onSubmit = async (data: Inputs) => {
    const { email, password, keepConnected } = data

    if (isRegister) {
      await api.post('/register', { email, password }).catch(error => {
        toast(error)
      })
    }

    handleLogin(email, password, keepConnected).then(response => {
      if (response) {
        history.push('/projects')
      }
    }).catch(error => {
      toast(error)
    })
  }

  const onClickRegister = () => {
    setIsRegister(true)
  }

  return (
      <Container className="columns">
        <FirstContainer className="column">
          <div className="columns is-centered">
            <DivImgLogo className="column is-half">
              <ImgLogoTransparent src={LogoTransparent} alt="" />
            </DivImgLogo>
          </div>
        </FirstContainer>
        <SecondContainer className="column">
          <div className="columns is-mobile is-centered">
            <DivForm className="column is-half">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      placeholder="daniel.khaleb@gmail.com"
                      className="input"
                      name="email"
                      ref={register({ required: true })}
                      required
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    {errors.email && (
                      <p className="help is-danger">This password is invalid</p>
                    )}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      name="password"
                      ref={register({ required: true })}
                      required
                    />
                    {errors.password && (
                      <p className="help is-danger">This email is invalid</p>
                    )}
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" name="keepConnected" ref={register()}/>
                        {' '}Keep you connected?
                    </label>
                  </div>
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <button type="submit" className="button is-success is-medium is-fullwidth">Login</button>
                  </div>
                  <div className="control">
                    <button type="submit" onClick={() => onClickRegister()} className="button is-link is-medium is-fullwidth">Register</button>
                  </div>
                </div>
              </Form>
            </DivForm>
          </div>
        </SecondContainer>
      </Container>
  )
}

export default Login
