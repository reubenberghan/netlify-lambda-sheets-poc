import { useEffect, useState } from 'react'

function useLambda() {
  const [requested, setRequested] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState()

  useEffect(() => {
    if (requested) {
      setIsLoading(true)

      fetch(`.netlify/functions/${requested}`)
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