import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import { apiConfig } from "../api/apiConfig";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    background: "rgba(255, 255, 255, 0.8)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  form: {
    width: "100%",
    marginTop: "16px",
  },
  submitButton: {
    margin: "24px 0 16px",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#45A049",
    },
  },
  title: {
    marginBottom: "24px",
    fontWeight: "bold",
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1.5rem",
  },
  textField: {
    marginBottom: "20px",
    "& label.Mui-focused": {
      color: "#4CAF50",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#4CAF50",
      },
      "&:hover fieldset": {
        borderColor: "#45A049",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4CAF50",
      },
    },
  },
  loading: {
    margin: "24px 0",
    color: "#4CAF50",
  },
  background: {
    background: "linear-gradient(to bottom right, #e0f7fa, #80deea)",
    backgroundImage: "login.jpg",
    minHeight: "100vh",
    width:'100vw',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Login = ({ onLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!username || !password) {
      setErrorMessage("Username and password are required");
      setLoading(false);
      return;
    }
    try {
      const response = await apiConfig.post(
        "login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("isLogin", true);
        Cookies.set("jwt", response.data.access, { path: "/" });
        onLogin(true)
        navigate('/dashboard');
      } else {
        const errorData = response.data;
            const errorMessage = errorData.non_field_errors
              ? errorData.non_field_errors[0]
              : 'Invalid credentials';
            setErrorMessage(errorMessage);
      }
    } catch (error) {
      setErrorMessage('Error logging in: ' + error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.background}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.formContainer}>
          <Typography component="h1" variant="h5" className={classes.title}>
            <img
              src="/login.png"
              alt="login"
              style={{ width: "60px", height: "60px" }}
            />
          </Typography>
          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitButton}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} className={classes.loading} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
