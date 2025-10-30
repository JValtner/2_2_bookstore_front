import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken, getCurrentProfile } from "../../service/authService";
import { useUser } from "../../context/contextUser";

const GoogleCallback = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const query = new URLSearchParams(location.search);
      const token = query.get("token");

      if (!token) {
        console.error("Token nije pronađen u URL-u");
        return;
      }

      // Save token in localStorage and Axios headers
      setToken(token);

      try {
        const profile = await getCurrentProfile();
        setUser(profile.user ?? profile);
        navigate("/books");
      } catch (err) {
        console.error("Greška prilikom preuzimanja profila:", err);
      }
    };

    fetchProfile();
  }, [location.search, navigate, setUser]);

  return <div>Učitavanje...</div>;
};

export default GoogleCallback;
