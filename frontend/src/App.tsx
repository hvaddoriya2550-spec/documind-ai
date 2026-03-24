/**
 * Main App component with routing
 */

import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SplashPage from './pages/Splash';
import { AppRoutes } from './routes';
import './styles/animations.css';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Auto-dismiss splash screen after 3 seconds
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashPage onComplete={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
