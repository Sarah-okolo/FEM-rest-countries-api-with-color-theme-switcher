import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import '../components-styles/Countries-details.scss'
import { CountriesDataContext } from '../contexts'

function CountriesDetails() {
  const { countriesData } = useContext(CountriesDataContext);
  const {countryName} = useParams();
  // Find and store the selected country from the countries data.
  const selectedCountry = countriesData.find(country => country.name === countryName);


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
            <p>Border Countries: {selectedCountry.borders 
              ? selectedCountry.borders.map((border, index) => {
                const borderCountry = countriesData.find(country => country.alpha3Code === border);
                return (
                  <Link to={`/country/${borderCountry.name}`} key={index} style={{textDecoration: 'none', color: 'initial'}}>
                    <span className='border-country'>{border}</span>
                  </Link>
                )})
              : <span>No border countries</span>}
            </p>
          </div>
        </div>
      </div> 
    </div>
    </>
  )
}

export default CountriesDetails