import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import '../components-styles/Countries-details.scss'
import fetchCountries from '../_utilities'
import { CountriesDataContext } from '../contexts'

function CountriesDetails() {
  const { countriesData, setCountriesData } = useContext(CountriesDataContext);
  const {countryName} = useParams();
  // check if the countryName is a valid name in the countrydata first / fallback to page not found.
  const [selectedCountry, setSelectedCountry] = useState({}); // Find and store the selected country from the countries data.

  // checks if the countries data state is empty on component mount, if it is, re-fetch the data.
  useEffect(() => {
    if (countriesData.length <= 0) {
    fetchCountries().then(countries => setCountriesData(countries));
    }
  }, [])

  // Find and store the selected country from the countries data.
  useEffect(() => {
    if (countriesData.length > 0) {
      setSelectedCountry(preval => preval = countriesData.find(country => country.name === countryName));
    }
  }, [countriesData, countryName])


  return (
    <>
    <div id="country-details-page">
      <div id='back-btn' onClick={() => history.back()}><ion-icon name="arrow-back-outline"></ion-icon> Back</div>

      <div id="details-container">
        <div className="flag-container">
          <img src={selectedCountry.flag} alt={`${selectedCountry.name} flag`} className='country-flag' />
        </div>

        <div className="country-details">
          <p className='name'>{selectedCountry.name}</p>
          <div id='all-details'>
            <div className='details-1'>
              <p>Native Name: <span>{selectedCountry.nativeName ? selectedCountry.nativeName : 'No native name'}</span></p>
              <p>Population: <span>{selectedCountry.population ? selectedCountry.population.toLocaleString() : '0'}</span></p>
              <p>Region: <span>{selectedCountry.region ? selectedCountry.region : 'No region'}</span></p>
              <p>Sub Region: <span>{selectedCountry.subregion ? selectedCountry.subregion : 'No sub region'}</span></p>
              <p>Capital: <span>{selectedCountry.capital ? selectedCountry.capital : 'No capital'}</span></p>
            </div>
            <div className='details-2'>
              <p>Top Level Domain: <span>{selectedCountry.topLevelDomain ? selectedCountry.topLevelDomain : 'No top level domain'}</span></p>
              <p>Currencies: {selectedCountry.currencies ? selectedCountry.currencies.map((currency, index) => <span key={index}>{`${currency.name}, `}</span>) : <span>No currency</span>}</p>
              <p>Languages: {selectedCountry.languages ? selectedCountry.languages.map((language, index) => <span key={index}>{`${language.name}, `}</span>) : <span>No language</span>}</p>
            </div>
          </div>
          <div className='border-countries'>
            <div id='bdr-wrapper'><p>Border Countries:</p> <div>{selectedCountry.borders 
              ? selectedCountry.borders.map((border, index) => {
                const borderCountry = countriesData.find(country => country.alpha3Code === border);
                return (
                  <Link to={`/country/${borderCountry.name}`} key={index} style={{textDecoration: 'none', color: 'initial'}}>
                    <span className='border-country'>{borderCountry.name}</span>
                  </Link>
                )})
              : <span>No bordering countries</span>}
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </>
  )
}

export default CountriesDetails