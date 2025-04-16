import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import { useAuth } from "../contexts/auth-context.jsx";

import { signIn } from "../utils/authenticators.js";

export default function SignIn() {
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signIn({
        phoneNumber: event.target.phoneNumber.value,
        password: event.target.password.value,
      });

      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.log("Failed to sign in");
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone number"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
