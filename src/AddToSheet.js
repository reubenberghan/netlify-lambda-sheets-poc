import React, { useState, useEffect } from 'react'

import { NETLIFY_FUNCTIONS_URI } from './constants'

function AddToSheet() {
  const [value, setValue] = useState('')
  const [addedValue, addValue] = useState()

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    addValue(value)
  }

  useEffect(() => {
    if (addedValue) {
      fetch(`${NETLIFY_FUNCTIONS_URI}/write-sheet`, {
        method: 'POST',
        body: JSON.stringify({ value: addedValue }),
        headers: { 'Content-Type': 'application/json' },
      }).catch(console.log)
    }
  }, [addedValue])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Add value to sheet:&nbsp;
          <input type='text' onChange={handleChange} value={value} />
        </label>
        <input type='submit' value='Add to sheet' />
      </form>
    </>
  )
}

export default AddToSheet
