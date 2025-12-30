import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TripPlannerPage from './pages/TripPlannerPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CompanionsPage from './pages/CompanionsPage'
import ExperiencesPage from './pages/ExperiencesPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trip-planner" element={<TripPlannerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/companions" element={<CompanionsPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
