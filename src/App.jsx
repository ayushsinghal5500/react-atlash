import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routers/AppRouters'; // ✅ Make sure path is correct

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
