import { Badge, Button, Text } from "@mantine/core";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { deleteUserProfile } from "../services/demoStore";

function Profile() {
  const { user, logout } = useContext(SessionContext);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDeleteProfile = () => {
    setDeleting(true);

    try {
      deleteUserProfile(user._id);
      logout();
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setDeleting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          margin: "80px 300px 5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1 style={{ color: "#5b64cf" }}> profile</h1>
      </div>

      <div
        style={{
          margin: "5px 50px 10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            margin: "20px 50px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <div
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              weight={500}
              style={{
                margin: 10,
                fontWeight: "bold",
                color: "#5b64cf",
              }}
            >
              username
            </Text>

            <Badge
              style={{
                margin: 10,
                textTransform: "none",
                color: "blue",
              }}
              size="xl"
              color="pink"
            >
              {user.username}
            </Badge>
          </div>

          <div
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              weight={500}
              style={{
                margin: 10,
                fontWeight: "bold",
                color: "#5b64cf",
              }}
            >
              email
            </Text>

            <Badge
              style={{
                margin: 10,
                textTransform: "none",
                color: "blue",
              }}
              size="xl"
              color="pink"
            >
              {user.email}
            </Badge>
          </div>
        </div>

        <div>
          <img
            width={300}
            height={300}
            src="../../images/profile-avatar.png"
            alt="profile avatar"
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Button
          component={Link}
          to={`/update/${user._id}`}
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
          style={{ margin: "40px" }}
        >
          update profile
        </Button>

        <Button
          style={{ margin: "40px" }}
          variant="gradient"
          gradient={{ from: "indigo", to: "#ed6ea0", deg: 35 }}
          onClick={handleDeleteProfile}
          loading={deleting}
        >
          delete profile
        </Button>
      </div>

      {errorMessage ? (
        <Text align="center" color="red" style={{ marginBottom: "30px" }}>
          {errorMessage}
        </Text>
      ) : null}
    </div>
  );
}

export default Profile;
