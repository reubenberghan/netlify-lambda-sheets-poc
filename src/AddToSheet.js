import React, { useState, useEffect } from 'react'

import { NETLIFY_FUNCTIONS_URI, WRITE_SHEET } from './constants'

function AddToSheet() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState()

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(value)
  }

  useEffect(() => {
    if (submitted) {
      fetch(`${NETLIFY_FUNCTIONS_URI}/${WRITE_SHEET}`, {
        method: 'POST',
        body: JSON.stringify({ value: submitted }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          if (res.status !== 200) {
            throw Error('Something went wrong!')
          }
          return res
        })
        .then(res => {
          setSubmitted('')
          setValue('')
        })
        .catch(console.log)
    }
  }, [submitted])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Add value to sheet:&nbsp;
          <input type='text' onChange={handleChange} value={value} disabled={Boolean(submitted)} />
        </label>
        <input type='submit' value='Add to sheet' disabled={Boolean(submitted)} />
      </form>
    </>
  )
}

export default AddToSheet
