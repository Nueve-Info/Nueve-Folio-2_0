import { Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import ThankYouPage from "@/pages/ThankYouPage"
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  )
}

export default App
