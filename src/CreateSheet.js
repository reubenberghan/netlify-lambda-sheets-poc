import React from 'react'

import useLambda from './useLambda'
import { CREATE_SHEET } from './constants'

function CreateSheet() {
  const [{ isLoading, response, requested }, getLambda] = useLambda()

  function handleClick(e) {
    getLambda(CREATE_SHEET)
  }

  return (
    <>
      <button onClick={handleClick}>Create Sheet</button>
      {requested && (isLoading ? <p>loading...</p> : <pre>{JSON.stringify(response)}</pre>)}
    </>
  )
}

export default CreateSheet
