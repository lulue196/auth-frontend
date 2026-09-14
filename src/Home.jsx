import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export default function Home() {
  const navigate = useNavigate();

  const {
    user,
    logout,
    isLoggedIn,
    isInitializing,
  } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn && !isInitializing) {
      navigate("/login");
    }
  }, [isLoggedIn, isInitializing, navigate]);

  if (isInitializing) {
    return null;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            My Frontend 1.0
          </Typography>

          <Typography sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          {user?.email === "admin@gmail.com" && (
  <Button
    color="inherit"
    onClick={() => navigate("/users")}
  >
    User
  </Button>
)}
          <Button
            color="inherit"
            onClick={async () => {
              const success = await logout();

              if (success) {
                navigate("/login");
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h4">
          Home
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Logged in as: {user?.email}
        </Typography>

        <Outlet />
      </Box>
    </div>
  );
}
