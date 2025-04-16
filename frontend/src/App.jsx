import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./contexts/auth-context.jsx";

import HomePage from "./pages/HomePage.jsx";
import JourneyDetailsPage from "./pages/JourneyDetailsPage.jsx";
import SignIn from "./pages/SignInPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import ReserveTicketsPage from "./pages/ReserveTicketsPage.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/journey-details" element={<JourneyDetailsPage />} />
      <Route path="/reserve-tickets" element={<ReserveTicketsPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
    </Routes>
  );
}
