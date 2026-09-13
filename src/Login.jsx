import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const username = useRef("");
  const password = useRef("");
  const isInit = useRef(false);
  const navigate = useNavigate();

  const { login, isLoggedIn, isLogInError, loginErrorMsg } =
    useContext(UserContext);

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true;
      return;
    }

    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onLogin = async () => {
    await login(
      username.current.value,
      password.current.value
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ minWidth: 320 }}>
        <CardContent>
          <Typography sx={{ marginBottom: "10px" }} variant="h6">
            Login
          </Typography>

          <div style={{ marginBottom: "12px" }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              inputRef={username}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <TextField
              fullWidth
              type="password"
              id="password"
              name="password"
              label="Password"
              inputRef={password}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={onLogin}>
              Login
            </Button>
          </div>

          {isLogInError && (
            <div style={{ marginTop: "12px" }}>
              <Typography color="error">
                {loginErrorMsg}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}