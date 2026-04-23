import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, Text, TextInput, Title } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { updateUserProfile } from "../services/demoStore";

function UpdatePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, user } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = (event) => {
    event.preventDefault();

    try {
      const updatedUser = updateUserProfile(user._id, {
        username,
        email,
      });

      setUser(updatedUser);
      setErrorMessage("");
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <Box component="form" className="auth-card" onSubmit={handleUpdate}>
        <Title order={1} className="auth-title">
          Update
        </Title>

        <Badge
          sx={{
            margin: "0 auto 10px",
            textTransform: "none",
            color: "blue",
          }}
          size="xl"
          color="pink"
        >
          username
        </Badge>

        <TextInput
          value={username}
          variant="filled"
          onChange={(event) => setUsername(event.target.value)}
          sx={{ marginBottom: "26px" }}
        />

        <Badge
          sx={{
            margin: "0 auto 10px",
            textTransform: "none",
            color: "blue",
          }}
          size="xl"
          color="pink"
        >
          email
        </Badge>

        <TextInput
          type="email"
          variant="filled"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
          style={{ margin: "32px auto 0", alignSelf: "center" }}
        >
          update
        </Button>

        {errorMessage ? (
          <Text align="center" color="red" mt={16}>
            {errorMessage}
          </Text>
        ) : null}
      </Box>
    </div>
  );
}

export default UpdatePage;
