import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import { useAuth } from "../contexts/auth-context.jsx";

import { signUp } from "../utils/authenticators.js";

export default function SignUpPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const data = await signUp({
        name: event.target.name.value,
        phoneNumber: event.target.phoneNumber.value,
        password: event.target.password.value,
      });

      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.log("Failed to sign up");
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          required
        />
        <input type="text" name="name" placeholder="Name" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
