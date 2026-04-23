import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Group, Input, Text, Textarea } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import {
  createComment,
  deletePost,
  getComments,
  updatePost,
} from "../services/demoStore";
import Comment from "./Comment";

function Post({ post, setPosts, posts, fetchPosts }) {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(SessionContext);

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  useEffect(() => {
    setNewTitle(post.title);
    setNewContent(post.content);
  }, [post.content, post.title]);

  function fetchComments() {
    setComments(getComments(post._id));
  }

  function handleNewTitleChange(event) {
    setNewTitle(event.target.value);
  }

  function handleNewContentChange(event) {
    setNewContent(event.target.value);
  }

  function handleEditPost() {
    setIsEditing(true);
  }

  function handleSavePost(event) {
    event.preventDefault();

    try {
      updatePost(
        post._id,
        {
          title: newTitle,
          content: newContent,
        },
        user?._id
      );

      setIsEditing(false);
      setErrorMessage("");
      fetchPosts();
      fetchComments();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleDeletePost() {
    try {
      deletePost(post._id, user?._id);
      setErrorMessage("");
      setPosts(posts.filter((entry) => entry._id !== post._id));
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCreateComment(event) {
    event.preventDefault();

    try {
      createComment(post._id, {
        content: commentContent,
        authorId: user?._id,
      });

      setCommentContent("");
      setErrorMessage("");
      fetchComments();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCommentContentChange(event) {
    setCommentContent(event.target.value);
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(post.createdAt);

  return (
    <Card
      shadow="sm"
      padding="sm"
      style={{
        margin: "70px 100px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Group spacing="lg" direction="row">
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div>
            <img
              width={100}
              src="../../images/loudspeaker.png"
              alt="profile avatar"
              style={{ borderRadius: "50%" }}
            />
          </div>

          {isEditing ? (
            <form onSubmit={handleSavePost}>
              <Input
                type="text"
                id="newTitle"
                value={newTitle}
                onChange={handleNewTitleChange}
                style={{ width: "350px", margin: "15px" }}
              />
              <Textarea
                id="newContent"
                value={newContent}
                onChange={handleNewContentChange}
                autosize
                minRows={4}
                style={{ width: "600px", margin: "15px" }}
              />
              <Button
                type="submit"
                style={{ backgroundColor: "#5b64cf", margin: "15px" }}
                variant="filled"
              >
                Save post
              </Button>
            </form>
          ) : (
            <Card
              shadow="sm"
              padding="sm"
              style={{
                display: "block",
                width: "600px",
                margin: "40px",
              }}
            >
              <Text
                size="lg"
                color="indigo"
                weight={900}
                style={{ marginBottom: "20px" }}
              >
                {post.title}
              </Text>

              <Text
                size="md"
                color="indigo"
                weight={700}
                style={{ marginBottom: "10px" }}
              >
                {post.content}
              </Text>

              <Text size="sm" color="yellow" weight="extralight">
                by{" "}
                {post.author
                  ? post.author.username[0].toUpperCase() + post.author.username.slice(1)
                  : "deleted user account"}
              </Text>

              <Text size="sm" color="dimmed" weight="thin">
                created {date.toLocaleDateString("en-US", options)}
              </Text>

              {post.author && post.author._id === user?._id ? (
                <div>
                  <Button
                    onClick={handleEditPost}
                    variant="outline"
                    color="indigo"
                    style={{ margin: "10px" }}
                  >
                    edit post
                  </Button>
                  <Button
                    onClick={handleDeletePost}
                    variant="outline"
                    color="indigo"
                    style={{ margin: "10px" }}
                  >
                    delete
                  </Button>
                </div>
              ) : null}
            </Card>
          )}
        </div>
      </Group>

      <Card shadow="sm" padding="sm" style={{ marginBottom: "1rem" }}>
        <Group direction="column" style={{ display: "block" }}>
          <Text size="sm" color="pink">
            replies
          </Text>

          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setComments={setComments}
              comments={comments}
              fetchComments={fetchComments}
              post={post}
            />
          ))}
        </Group>

        <form
          method="POST"
          action="/posts/:postId/createcomment"
          onSubmit={handleCreateComment}
          style={{ margin: "30px" }}
        >
          <Textarea
            id="content"
            autosize
            minRows={3}
            style={{ width: "400px", margin: "10px" }}
            value={commentContent}
            onChange={handleCommentContentChange}
            placeholder="start writing a reply here"
          />

          <Button
            type="submit"
            style={{ backgroundColor: "gray", margin: "10px" }}
            variant="filled"
          >
            submit reply
          </Button>
        </form>

        {errorMessage ? (
          <Text color="red" size="sm" style={{ margin: "0 10px 10px" }}>
            {errorMessage}
          </Text>
        ) : null}
      </Card>
    </Card>
  );
}

export default Post;
