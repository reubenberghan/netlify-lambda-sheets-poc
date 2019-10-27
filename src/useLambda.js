import { useEffect, useState } from 'react'

import { NETLIFY_FUNCTIONS_URI } from './constants'

function useLambda() {
  const [requested, setRequested] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState()

  useEffect(() => {
    if (requested) {
      setIsLoading(true)

      fetch(`${NETLIFY_FUNCTIONS_URI}/${requested}`)
        .then(res => {
          if (!res.ok) {
            setIsLoading(false)
            throw Error('Something went wrong!')
          }
          return res
        })
        .then(res => res.json())
        .then(res => {
          setResponse(res)
          setIsLoading(false)
        })
        .catch(console.log)
    }
  }, [requested])

  return [{ isLoading, response, requested }, setRequested]
}

export default useLambda
