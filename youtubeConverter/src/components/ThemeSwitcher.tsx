import React, {useEffect } from 'react';

// Icons
import {SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// Custom hooks
import useLocalStorage from '../hooks/useLocalStorage';

// Styles
import styles from './moduleCss/ThemeSwitcher.module.css' ;

const ThemeSwitcher: React.FC = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('components.theme', defaultDark ? "dark" : "light" )


  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
  }, [theme])


  return (
  <div className={styles.themeSwitcherWrapper}>
    <button
      className='btn'
      aria-label={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
      role="switch"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
    
  </div>
  )
}
export default ThemeSwitcher
