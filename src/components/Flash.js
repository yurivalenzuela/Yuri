import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./flash.css";

export default function Flash() {
  const location = useLocation();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(location.state?.flash || "");

  useEffect(() => {
    if (!location.state?.flash) return;
    const timer = setTimeout(() => {
      setMsg("");
      // remove flash from history so it won't re-show
      navigate(location.pathname, { replace: true, state: {} });
    }, 4000);
    return () => clearTimeout(timer);
  }, [location, navigate]);

  if (!msg) return null;
  return <div className="flash-toast">{msg}</div>;
}
