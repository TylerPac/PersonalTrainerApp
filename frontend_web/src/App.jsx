import { useState, useEffect } from 'react'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AuthService from './services/AuthService'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome') // 'welcome', 'login', 'register', 'dashboard'
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isLoggedIn()) {
          const user = await AuthService.getCurrentUser();
          setCurrentUser(user);
          setCurrentPage('dashboard');
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await AuthService.login(username, password);
      setCurrentUser(user);
      setCurrentPage('dashboard');
      console.log('User logged in:', user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  const handleRegister = async (username, email, password) => {
    try {
      const user = await AuthService.register(username, email, password);
      setCurrentUser(user);
      setCurrentPage('dashboard');
      console.log('User registered:', user);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  }

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setCurrentPage('welcome');
  }

  if (loading) {
    return (
      <div className="App" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#00d4aa'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return (
          <WelcomePage 
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        )
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentPage('register')}
            onNavigateToWelcome={() => setCurrentPage('welcome')}
          />
        )
      case 'register':
        return (
          <RegisterPage 
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToWelcome={() => setCurrentPage('welcome')}
          />
        )
      case 'dashboard':
        return (
          <DashboardPage 
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )
      default:
        return (
          <WelcomePage 
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        )
    }
  }

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  )
}

export default App
