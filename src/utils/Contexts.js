import { createContext } from "react";

//Country data is needed in various places across the app
export const CountriesContext = createContext({})

//Similarly, Dark/Light Mode is also needed across the app
export const DarkLightModeContext = createContext({})

// We need compared countries to be tracked across routes to prevent user annoyance and odd bugs
export const ComparedCountriesContext = createContext({})

//We also need the current filter object to persist between routes
export const FiltersContext = createContext({})

//We also need the displayed countries to persist between routes
export const DisplayedCountriesContext = createContext({})

//We need the sort setting to persist between routes
export const SortContext = createContext({})