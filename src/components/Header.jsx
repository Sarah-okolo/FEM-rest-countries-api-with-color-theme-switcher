import {useEffect, useRef, useState} from 'react';
import '/src/index.scss'

function Header() {
  const themeTextRef = useRef(null);
  const themeIconRef = useRef(null);

  // Check if user has a saved theme preference, if not, set light mode as default. // true - light, false - dark
  const [isLightMode, setIsLightMode] = useState(() => {
    if (localStorage.getItem('userThemeChoice') === null) {
      localStorage.setItem('userThemeChoice', true);
      return true;
    }
    else {
      return localStorage.getItem('userThemeChoice') === 'true' ? true : false;
    }
  });

  // Save user's theme preference to local storage
  useEffect(() => {
    localStorage.setItem('userThemeChoice', isLightMode);
  }, [isLightMode])

  // On page load, set site theme based on user's currently saved theme.
  useEffect(() => {
    if (isLightMode) {
      themeIconRef.current.name = "moon-outline";
      themeTextRef.current.textContent = "Dark Mode";
      document.documentElement.classList.remove('darkMode');
    }
    else {
      themeIconRef.current.name = "sunny-outline";
      themeTextRef.current.textContent = "Light Mode";
      document.documentElement.classList.add('darkMode');
    }
  }, []);

  // Handle theme switch
  const toggleTheme = () => {
    themeIconRef.current.name = themeIconRef.current.name === "moon-outline" ? "sunny-outline" : "moon-outline";
    themeTextRef.current.textContent = themeTextRef.current.textContent === "Dark Mode" ? "Light Mode" : "Dark Mode";
    document.documentElement.classList.toggle('darkMode');
    setIsLightMode(preVal => !preVal);
  }


  return (
    <>
      <header>
        <a href='/'>Where in the world</a>

        <div id='theme-switch-container'>
          <div onClick={toggleTheme}><ion-icon name="moon-outline" id="theme-icon" ref={themeIconRef}></ion-icon><span ref={themeTextRef}>Dark Mode</span></div>
        </div>
      </header>
    </>
  );
};

export default Header;