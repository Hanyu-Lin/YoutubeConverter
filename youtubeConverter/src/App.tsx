import { useState } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import UrlForm from './components/UrlForm'

function App() {

  return (
    <div className='container'>
       <header>
        <h1>Youtube Converter</h1>
      </header>
      <UrlForm></UrlForm>
      <ThemeSwitcher/>
    </div>
  )
}

export default App
