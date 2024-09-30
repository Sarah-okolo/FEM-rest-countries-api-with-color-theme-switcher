import React, { useContext, useEffect, useState, useRef } from 'react'
import {Link} from 'react-router-dom'
import Cards from '/src/components/Cards'
import NoMatch from '/src/components/NoMatch'
import SearchAndFilter from '/src/components/Search-and-filter'
import fetchCountries from '../_utilities'
import { CountriesDataContext, SearchInputContext, SelectedRegionContext } from '../contexts'


function CountriesHome() {
  const { countriesData, setCountriesData } = useContext(CountriesDataContext);
  const { searchInput } = useContext(SearchInputContext);
  const { selectedRegion } = useContext(SelectedRegionContext);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const countriesContainerRef = useRef(null)

  useEffect(() => {
    // Fetches the countries data and stores it in the context.
    fetchCountries().then(countries => setCountriesData(countries));
  }, [])

  // filters the countries data based on the search input or selected region.
  const filteredCountries = countriesData.filter(country => {
    const matchesSearch = searchInput === '' || country.name.toLowerCase().includes(searchInput.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || country.region.includes(selectedRegion); 
    return matchesSearch && matchesRegion;
  });

   // For lazy loading of countries data.
   useEffect(() => {
    if (countriesContainerRef.current && countriesContainerRef.current.lastElementChild) {
      const lastElement = countriesContainerRef.current.lastElementChild;

      const ISObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
          if (currentBatchIndex < filteredCountries.length) {
              setCurrentBatchIndex(prevBatch => prevBatch + 16);
          }
          ISObserver.unobserve(lastElement);
        }
      }, {root: null, threshold: 0,})

      ISObserver.observe(lastElement);
    }
  }, [filteredCountries, currentBatchIndex])

  // Resets the scroll position to the top when the search input or selected region changes.
  useEffect(() => {
    if (document.documentElement.scrollTop !== 0) {
      document.documentElement.scrollTop = 0;
      setCurrentBatchIndex(0);
    }  
  }, [searchInput, selectedRegion]);
   

  return (
    <>
    <SearchAndFilter />

    <div id="countries-container" ref={countriesContainerRef}>
      {
      countriesData.length > 0 ? (
        filteredCountries.length > 0 ? (    
          filteredCountries.slice( 0, currentBatchIndex + 16 ).map((country, index) => (
            <Link to={`/country/${country.name}`} key={index} style={{textDecoration: 'none', color: 'initial'}}>
              <Cards
                C_flag={country.flag}
                C_flagImgAlt={`${country.name} flag`}
                C_name={country.name}
                C_pop={country.population ? country.population.toLocaleString() : '0'}
                C_region={country.region ? country.region : 'No region'}
                C_capital={country.capital ? country.capital : 'No capital'}
              />
            </Link>
          ))
        ) : (
          <NoMatch />
        )
      ) : (
          <div id="loading"><ion-icon name="refresh"></ion-icon></div>
        )
      }
    </div>
    </>
  )
}

export default CountriesHome