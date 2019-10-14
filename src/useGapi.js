import { useEffect } from 'react'

function useGapi() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'

    script.onload = () => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: '',
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            clientId: '',
            scope: ['https://www.googleapis.com/auth/spreadsheets'],
          })
          .then(
            () => {
              console.log('success')
            },
            err => console.log(err)
          )
      })
    }

    document.body.appendChild(script)
  }, [])
}

export default useGapi
