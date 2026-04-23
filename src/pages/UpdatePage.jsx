import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, Text, TextInput } from "@mantine/core";
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
    <Box
      component="form"
      sx={{
        margin: "0 auto",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
      onSubmit={handleUpdate}
    >
      <Badge
        sx={{
          margin: "0 auto",
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
        sx={{ margin: "10px 30px 50px" }}
      />

      <Badge
        sx={{
          margin: "0 auto",
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
        sx={{ margin: "10px" }}
      />

      <Button
        type="submit"
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
        style={{ margin: "40px", alignSelf: "center" }}
      >
        update
      </Button>

      {errorMessage ? (
        <Text align="center" color="red">
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
}

export default UpdatePage;
