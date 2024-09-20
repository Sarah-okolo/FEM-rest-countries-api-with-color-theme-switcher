import {useRef, useState, useContext, useEffect} from 'react'
import '../components-styles/Search-and-filter.scss'
import { SearchInputContext, SelectedRegionContext } from '../contexts'

function SearchAndFilter() {
  const {setSearchInput} = useContext(SearchInputContext);
  const {setSelectedRegion} = useContext(SelectedRegionContext);

  const searchBoxRef = useRef(null);
  const clearIconRef = useRef(null);
  const filterBoxRef = useRef(null);
  const filterArrowRef = useRef(null);
  const regionsDropdownRef = useRef(null);

  const handleInputState = () => {
    if (searchBoxRef.current.value.length > 0) {
      clearIconRef.current.style.visibility="visible";
    }
    else {
      clearIconRef.current.style.visibility="hidden"
    }
  }

  const clearIconFunc = () => {
    searchBoxRef.current.value = ''; 
    clearIconRef.current.style.visibility = "hidden";
    setSearchInput('');
  }

  const showRegionsDropdown = () => {
    regionsDropdownRef.current.classList.toggle('reveal');
    filterArrowRef.current.name = 
      filterArrowRef.current.name === "chevron-down-outline" 
      ? "chevron-up-outline" 
      : "chevron-down-outline";
  }

  const handleSearch = () => {
      setSearchInput(searchBoxRef.current.value);
  }

  useEffect(() => {
    const regions = document.querySelectorAll('.region');
    regions[0].classList.add('active');
    regions.forEach(region => {
      region.addEventListener('click', (e) => {
        regions.forEach(reg => reg.classList.remove('active'));
        setSelectedRegion(e.target.textContent);
        if(filterBoxRef.current.textContent !== 'All')
          filterBoxRef.current.textContent = e.target.textContent;
        else
          filterBoxRef.current.textContent = 'Filter by Region'
        e.target.classList.add('active')
      })
    })


    return () => {
      regions.forEach(region => {
        region.removeEventListener('click', (e) => {
        console.log(e.target.textContent);
        })
      })
    }
  }, [])  


  return (
    <>
      <div id="search-and-filter">
        <div id="search-box">
          <ion-icon name="search"></ion-icon>
          <input type="text" name="search-box" id="searchbox" placeholder='Search for a country ...' ref={searchBoxRef} onInput={() => {handleInputState(); handleSearch()}}/>
          <ion-icon name="close" id="clear-icon" ref={clearIconRef} onClick={clearIconFunc}></ion-icon>
        </div>

        <div id='filter-container'>
          <div id="filter-box" onClick={showRegionsDropdown}>
            <span ref={filterBoxRef}>Filter by Region</span>
            <ion-icon name="chevron-up-outline" id="filter-arrow" ref={filterArrowRef}></ion-icon>
          </div>
          
          <ul className="filter-regions-dropdown" ref={regionsDropdownRef}>
            <li className='region'>All</li>
            <li className='region'>Africa</li>
            <li className='region'>America</li>
            <li className='region'>Asia</li>
            <li className='region'>Europe</li>
            <li className='region'>Oceania</li>
          </ul>
        </div>

      </div>
    </>
  )
}

export default SearchAndFilter