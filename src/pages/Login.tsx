import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/connection";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../styles/theme";
import Logo from "../components/Logo";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * Login page
 * @returns {JSX.Element}
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 8, sm: 10 }}
      sx={{
        background: theme.palette.primary.main,
        height: "100vh",
        color: "primary.contrastText",
      }}
    >
      <Stack alignItems="center">
        <Logo sx={{ width: 100, height: 100 }} />
        <Typography variant="h3" sx={{ fontFamily: "Cheque, sans-serif" }}>
          FITX
        </Typography>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="bold" align="center">
          INICIAR SESIÓN
        </Typography>
        <TextField
          type="email"
          label="Correo electrónico"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            boxShadow: `0px 4px 4px ${theme.palette.primary.light}`,
          }}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Contraseña"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            boxShadow: `0px 4px 4px ${theme.palette.primary.light}`,
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    sx={{ color: "primary.contrastText" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </Stack>
      <Button
        onClick={login}
        size="small"
        loading={loading}
        sx={{
          width: 120,
          color: "primary.contrastText",
          borderRadius: 3,
          border: `2px solid ${theme.palette.primary.dark}`,
          textTransform: "inherit",
          boxShadow: `0px 4px 4px rgba(255, 0, 0, 0.4)`,
          "& .MuiButton-loadingIndicator": {
            color: "primary.contrastText",
          },
        }}
      >
        Ingresar
      </Button>
    </Stack>
  );
};

export default Login;
