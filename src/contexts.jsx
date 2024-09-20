import { createContext, useState } from "react";

// stores the value of the countries data.
export const  CountriesDataContext = createContext();
export const SearchInputContext = createContext();
export const SelectedRegionContext = createContext();

export const MyContextsProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]) // For use in CountriesDataContext
  const [searchInput, setSearchInput] = useState(''); // For use in SearchInputContext
  const [selectedRegion, setSelectedRegion] = useState('All'); // For use in SelectedRegionContext


  return (
    <CountriesDataContext.Provider value={{ countriesData, setCountriesData }}>
      <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
        <SelectedRegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
      </SelectedRegionContext.Provider>
      </SearchInputContext.Provider>
    </CountriesDataContext.Provider>
  );
};