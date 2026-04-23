import React, { useContext, useState } from "react";
import { Button, Card, Input, Text } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import { deleteComment, updateComment } from "../services/demoStore";

function Comment({ comment, setComments, comments, fetchComments, post }) {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState(comment.content);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(SessionContext);

  function handleDeleteComment(selectedComment) {
    try {
      deleteComment(post._id, selectedComment._id, user?._id);
      setErrorMessage("");
      setComments(comments.filter((entry) => entry._id !== selectedComment._id));
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleSaveComment(selectedComment) {
    try {
      updateComment(
        post._id,
        selectedComment._id,
        {
          content: newCommentContent,
        },
        user?._id
      );

      setErrorMessage("");
      setIsEditingComment(false);
      fetchComments();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Card padding="sm" className="comment-card">
      {isEditingComment ? (
        <>
          <Input
            id={`newCommentContent-${comment._id}`}
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
          />
          <Button
            mt={10}
            variant="filled"
            color="gray"
            onClick={() => handleSaveComment(comment)}
          >
            save
          </Button>
        </>
      ) : (
        <>
          <Text size="lg" color="pink" weight="bold" className="comment-content">
            {comment.content}
          </Text>
          <Text size="sm" color="yellow" weight="extralight">
            by {comment.author ? comment.author.username : "deleted user account"}
          </Text>
          <Text size="sm" color="dimmed" weight="thin">
            created {new Date(comment.createdAt).toLocaleDateString(undefined, options)}
          </Text>

          {comment.author && comment.author._id === user?._id ? (
            <div className="comment-actions">
              <Button onClick={() => setIsEditingComment(true)} variant="outline" color="gray">
                edit reply
              </Button>
              <Button
                onClick={() => handleDeleteComment(comment)}
                variant="outline"
                color="gray"
              >
                delete
              </Button>
            </div>
          ) : null}
        </>
      )}

      {errorMessage ? (
        <Text color="red" size="sm" mt={10}>
          {errorMessage}
        </Text>
      ) : null}
    </Card>
  );
}

export default Comment;
