import React from 'react'

import useLambda from './useLambda'

function CreateSheet() {
  const [{ isLoading, response, requested }, getLambda] = useLambda()

  function handleClick(e) {
    getLambda('create-sheet')
  }

  return (
    <>
      <button onClick={handleClick}>Create Sheet</button>
      {requested && (isLoading ? <p>loading...</p> : <pre>{JSON.stringify(response)}</pre>)}
    </>
  )
}

export default CreateSheet
