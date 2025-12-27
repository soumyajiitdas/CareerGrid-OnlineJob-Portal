import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CompanyDashboard from './pages/CompanyDashboard';
import PostJob from './pages/PostJob';
import Loading from './components/Loading';

// Protected Route Component for Companies
const CompanyRoute = ({ children }) => {
  const { isAuthenticated, isCompany, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isCompany) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Protected Route Component for Job Seekers
const JobSeekerRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Company Routes */}
          <Route
            path="/company/dashboard"
            element={
              <CompanyRoute>
                <CompanyDashboard />
              </CompanyRoute>
            }
          />
          <Route
            path="/company/post-job"
            element={
              <CompanyRoute>
                <PostJob />
              </CompanyRoute>
            }
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;