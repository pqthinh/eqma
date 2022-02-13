import { LightTheme } from 'config/theme'
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import App from './App'
import reportWebVitals from './reportWebVitals'

const AppWrapper = ({ ...props }) => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={LightTheme}>
          <App {...props} />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

reportWebVitals(process.env.NODE_ENV === 'development' ? console.log : null)
