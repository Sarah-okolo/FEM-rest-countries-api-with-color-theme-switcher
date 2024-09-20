import React, { useContext, useEffect, useState, useRef } from 'react'
import Cards from './Cards'
import NoMatch from './NoMatch'
import { CountriesDataContext, SearchInputContext, SelectedRegionContext } from '../contexts'


function CountriesHome() {
  const { countriesData, setCountriesData } = useContext(CountriesDataContext);
  const { searchInput } = useContext(SearchInputContext);
  const { selectedRegion } = useContext(SelectedRegionContext);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const countriesContainerRef = useRef(null)

  const fetchCountries = async () => {
    try {
      const res = await fetch('/data.json')
      setCountriesData(await res.json())
    } catch (err) {
      console.log(`Opps, seems an error occured: ${err}`)
    }
  }

  useEffect(() => {
    fetchCountries();
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

  useEffect(() => {
    if (document.documentElement.scrollTop !== 0) {
      document.documentElement.scrollTop = 0;
      setCurrentBatchIndex(0);
    }  
  }, [searchInput, selectedRegion]);
   

  return (
    <>
    <div id="countries-container" ref={countriesContainerRef}>
      {
        filteredCountries.length > 0 ? (    
          filteredCountries.slice( 0, currentBatchIndex + 16 ).map((country, index) => (
            <Cards
              key={index}
              C_flag={country.flag}
              C_flagImgAlt={`${country.name} flag`}
              C_name={country.name}
              C_pop={country.population.toLocaleString()}
              C_region={country.region}
              C_capital={country.capital}
            />
          ))
        ) : (
          <NoMatch />
        )
      }
    </div>
    </>
  )
}

export default CountriesHome