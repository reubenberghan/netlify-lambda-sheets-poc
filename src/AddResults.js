import React from 'react'

import useLambda from './useLambda'
import { WRITE_RESULTS } from './constants'

function AddResults() {
  const [{ isLoading, response, requested }, getLambda] = useLambda()

  function handleClick(e) {
    getLambda(WRITE_RESULTS)
  }

  return (
    <>
      <button onClick={handleClick}>Add results</button>
      {requested && (isLoading ? <p>loading...</p> : <pre>{JSON.stringify(response)}</pre>)}
    </>
  )
}

export default AddResults
