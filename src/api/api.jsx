import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An error occurred';

    if (error.response) {
      errorMessage = `Server Error: ${error.response.status}`;
      if (error.response.data?.message) {
        errorMessage += ` - ${error.response.data.message}`;
      }
    } else if (error.request) {
      errorMessage = 'Network Error - No response from server';
    } else {
      errorMessage = `Request Error: ${error.message}`;
    }

    console.error('API Error:', errorMessage);
    return Promise.reject(errorMessage);
  }
);

// APIs
export const getAllCountries = () =>
  api.get('/all?fields=name,flags,cca3,capital,region,languages');

export const getCountryByCode = (code) =>
  api.get(
    `/alpha/${code}?fields=name,flags,cca3,capital,region,subregion,languages,population,area,timezones`
  );

export default api;
