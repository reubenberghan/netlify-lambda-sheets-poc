import React from 'react'

import useLambda from './useLambda'
import { READ_SHEET } from './constants'

function ReadSheet() {
  const [{ isLoading, response, requested }, getLambda] = useLambda()

  function handleClick(e) {
    getLambda(READ_SHEET)
  }

  return (
    <>
      <button onClick={handleClick}>Read Sheet</button>
      {requested && (isLoading ? <p>loading...</p> : <pre>{JSON.stringify(response)}</pre>)}
    </>
  )
}

export default ReadSheet
