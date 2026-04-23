import { Box, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { logIn } from "../services/demoStore";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUser } = useContext(SessionContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const response = logIn({
        username,
        password,
      });

      setToken(response.token);
      setUser(response.foundUser);
      setErrorMessage(undefined);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <Box component="form" className="auth-card" onSubmit={handleSubmit}>
        <Title order={1} className="auth-title">
          Login
        </Title>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextInput
            label="Username"
            variant="filled"
            withAsterisk
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <PasswordInput
            label="Password"
            variant="filled"
            withAsterisk
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "#ff9c6b", to: "#e34f4f", deg: 60 }}
            sx={{ marginTop: "1rem", alignSelf: "center" }}
          >
            Connect
          </Button>
          <Text fw={700} fz="sm" color="red.8">
            {errorMessage}
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
