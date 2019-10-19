import React, { useState, useEffect } from 'react'

import { NETLIFY_FUNCTIONS_URI } from './constants'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState()

  const handleChange = setValue => e => setValue(e.target.value)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    if (submitted) {
      fetch(`${NETLIFY_FUNCTIONS_URI}/login`, {
        headers: { Authorization: `Basic ${submitted.username}:${submitted.password}` },
      })
        .then(res => {
          if (!res.ok) {
            throw Error('Something went wrong!')
          }
        })
        .catch(console.log)
    }
  }, [submitted])

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:&nbsp;
        <input type='text' onChange={handleChange(setUsername)} value={username} />
      </label>
      <br />
      <label>
        Password:&nbsp;
        <input type='password' onChange={handleChange(setPassword)} value={password} />
      </label>
      <br />
      <input type='submit' value='Login' />
    </form>
  )
}

export default Login
