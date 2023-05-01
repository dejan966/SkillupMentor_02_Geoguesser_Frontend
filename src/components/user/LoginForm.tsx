import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { observer } from 'mobx-react'
import { Controller } from 'react-hook-form'
import useMediaQuery from 'hooks/useMediaQuery'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { isMobile } = useMediaQuery(1038)
  const { handleSubmit, errors, control } = useLoginForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await API.login(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.login(response.data)
      navigate(routes.HOME)
    }
  })

  return (
    <>
      <div className='verticalCenter left'>
        <div className="text-center">
          <h1 className="display-4 blue">Sign in</h1>
            <p>Welcome back to Geotagger. We are glad that you are back.</p>
        </div>
        <Form onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            render={({field})=>(
              <Form.Group className="mb-3">
                <FormLabel htmlFor="email">Email</FormLabel>
                <input
                  {...field}
                  type="email"
                  placeholder="example@gmail.com"
                  aria-label="Email"
                  aria-describedby="email"
                  className={
                    errors.email ? 'form-control is-invalid' : 'form-control'
                  }
                />
                {errors.email && (
                  <div className="invalid-feedback text-danger">
                    {errors.email.message}
                  </div>
                )}
              </Form.Group>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field})=>(
              <Form.Group className="mb-3">
                <FormLabel htmlFor="password">Password</FormLabel>
                <input
                  {...field}
                  type="password"
                  placeholder="******"
                  aria-label="Password"
                  aria-describedby="password"
                  className={
                    errors.password ? 'form-control is-invalid' : 'form-control'
                  }
                />
                {errors.password && (
                  <div className="invalid-feedback text-danger">
                    {errors.password.message}
                  </div>
                )}
              </Form.Group>
            )}
          />
          <Button className="w-100 btnRegister" type="submit">
            Sign in
          </Button>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="mb-0">Dont have an account yet?</p>
            <Link className="text-decoration-none text-end signUpText" to={routes.SIGNUP}>
              Sign up
            </Link>
          </div>
        </Form>
      </div>
      {!isMobile && (
        <div className='right'>
          <img src="/location-signup.png" alt="location img" height="801" width="1012"/>
        </div>
      )}
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default observer(LoginForm)
