import {
  Anchor,
  Box,
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { signUp } from "../services/demoStore";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      signUp({
        username,
        email,
        password,
      });

      setErrorMessage(undefined);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <Box component="form" className="auth-card" onSubmit={handleSubmit}>
        <Title order={1} className="auth-title">
          Signup
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
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextInput
            label="Email"
            variant="filled"
            withAsterisk
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <PasswordInput
            label="Password"
            variant="filled"
            withAsterisk
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <Checkbox label="I accept terms & conditions" mt="sm" />
          <Text fz="sm" color="red.8" align="center">
            {errorMessage}
          </Text>
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "#ff9c6b", to: "#e34f4f", deg: 60 }}
            sx={{ marginTop: "1rem", alignSelf: "center" }}
          >
            Register
          </Button>

          <div className="auth-link-row">
            <Text td="underline" fz="sm">
              Already have account?
            </Text>
          </div>

          <div className="auth-link-row">
            <Anchor color="#ff9c6b" component={Link} to="/login">
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Box fw={700} fz="sm">
                  Go to Login
                </Box>
                <IconArrowRight size={rem(16)} />
              </Box>
            </Anchor>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default SignupPage;
