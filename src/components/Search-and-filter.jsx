import {useRef, useState, useContext, useEffect} from 'react'
import '../components-styles/Search-and-filter.scss'
import { SearchInputContext, SelectedRegionContext } from '../contexts'

function SearchAndFilter() {
  const {searchInput, setSearchInput} = useContext(SearchInputContext);
  const {selectedRegion, setSelectedRegion} = useContext(SelectedRegionContext);
  const searchBoxRef = useRef(null);
  const clearIconRef = useRef(null);
  const filterBoxRef = useRef(null);
  const filterArrowRef = useRef(null);
  const regionsDropdownRef = useRef(null);


  const handleInputState = () => {
    if (searchBoxRef.current.value !== '') {
      clearIconRef.current.style.visibility="visible";
    }
    else {
      clearIconRef.current.style.visibility="hidden"
    }
  }

  const handleSearch = () => {
    setSearchInput(searchBoxRef.current.value);
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

  useEffect(() => {
    // Set the search box value to the search input value on component mount.
    searchBoxRef.current.value = searchInput; 
    if (searchBoxRef.current.value !== '') clearIconRef.current.style.visibility="visible";
    
    // Set the filter box text content to the selected region on component mount.
    filterBoxRef.current.textContent = selectedRegion; 
    const regions = document.querySelectorAll('.region');
    const currentRegion = Array.from(regions).find(region => region.textContent === selectedRegion);
    if (currentRegion) currentRegion.classList.add('active');
    if(selectedRegion == 'All') filterBoxRef.current.textContent = 'Filter by Region'

    // Loops through and add event listener to each item in the regions dropdown list.
    regions.forEach(region => {
      region.addEventListener('click', (e) => {
        regions.forEach(reg => reg.classList.remove('active'));
        setSelectedRegion(e.target.textContent);
        e.target.classList.add('active')
        if(filterBoxRef.current.textContent !== 'All')
          filterBoxRef.current.textContent = e.target.textContent;
        else
          filterBoxRef.current.textContent = 'Filter by Region'
      })
    })
    // Remove event listeners when the component unmounts.
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