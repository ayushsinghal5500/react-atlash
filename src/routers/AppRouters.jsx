import { Routes, Route } from 'react-router-dom';
import Index from '../pages/index';
import CountryList from '../pages/CountryList';
import CountryDetail from '../pages/CountryDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/countries" element={<CountryList />} />
      <Route path="/countries/:countryCode" element={<CountryDetail />} />
    </Routes>
  );
};

export default AppRoutes;
