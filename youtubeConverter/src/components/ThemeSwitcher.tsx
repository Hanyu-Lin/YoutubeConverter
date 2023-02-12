import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import { setToDark, setToLight, setTo } from '../redux/themeSlice';
// Icons
import {SunIcon, MoonIcon } from '@heroicons/react/24/outline';
// Styles
import styles from './moduleCss/ThemeSwitcher.module.css' ;


const ThemeSwitcher: React.FC = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const { theme } = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTo(defaultDark ? "dark" : "light"))
  },[]);


  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
    localStorage.setItem('components.theme', theme);
  }, [theme])



  return (
  <div className={styles.themeSwitcherWrapper}>
    <button
      className='btn'
      aria-label={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
      role="switch"
      onClick={() => (theme === "light" ? dispatch(setToDark()) : dispatch(setToLight()))}
      >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
    
  </div>
  )
}
export default ThemeSwitcher
