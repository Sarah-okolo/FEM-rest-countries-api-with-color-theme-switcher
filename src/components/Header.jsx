import {useRef} from 'react';
import '/src/index.scss'

function Header() {
  const themeTextRef = useRef(null);
  const themeIconRef = useRef(null);
  
  const toggleTheme = () => {
    themeIconRef.current.name = themeIconRef.current.name === "moon-outline" ? "sunny-outline" : "moon-outline";
    themeTextRef.current.textContent = themeTextRef.current.textContent === "Dark Mode" ? "Light Mode" : "Dark Mode";

    document.body.classList.toggle('darkMode')
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