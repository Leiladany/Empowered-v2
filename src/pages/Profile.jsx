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
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="page-title">profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-details">
          <div className="profile-detail-card">
            <Text className="profile-label">username</Text>

            {user.username}
          </div>

          <div className="profile-detail-card">
            <Text className="profile-label">email</Text>

            {user.email}
          </div>
        </div>

        <div className="profile-avatar-wrap">
          <img
            className="profile-avatar"
            src="../../images/profile-avatar.png"
            alt="profile avatar"
          />
        </div>
      </div>

      <div className="profile-actions">
        <Button
          component={Link}
          to={`/update/${user._id}`}
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
        >
          update profile
        </Button>

        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "#ed6ea0", deg: 35 }}
          onClick={handleDeleteProfile}
          loading={deleting}
        >
          delete profile
        </Button>
      </div>

      {errorMessage ? (
        <Text align="center" color="red" mt={20}>
          {errorMessage}
        </Text>
      ) : null}
    </div>
  );
}

export default Profile;
