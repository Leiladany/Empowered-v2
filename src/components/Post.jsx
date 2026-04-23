import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Input, Text, Textarea } from "@mantine/core";
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

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Card shadow="sm" padding="sm" className="post-shell">
      <div className="post-main">
        <div className="post-icon-wrap">
          <img
            className="post-icon"
            src="../../images/loudspeaker.png"
            alt="post icon"
          />
        </div>

        <div>
          {isEditing ? (
            <form onSubmit={handleSavePost} className="post-editor">
              <Input
                type="text"
                id="newTitle"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
              />
              <Textarea
                id="newContent"
                value={newContent}
                onChange={(event) => setNewContent(event.target.value)}
                autosize
                minRows={4}
              />
              <Button type="submit" color="indigo" variant="filled">
                Save post
              </Button>
            </form>
          ) : (
            <Card shadow="sm" padding="sm" className="post-body-card">
              <Text size="lg" color="indigo" weight={900} mb={20}>
                {post.title}
              </Text>

              <Text size="md" color="indigo" weight={700} mb={10}>
                {post.content}
              </Text>

              <Text size="sm" color="yellow" weight="extralight">
                by{" "}
                {post.author
                  ? post.author.username[0].toUpperCase() + post.author.username.slice(1)
                  : "deleted user account"}
              </Text>

              <Text size="sm" color="dimmed" weight="thin">
                created {new Date(post.createdAt).toLocaleDateString("en-US", options)}
              </Text>

              {post.author && post.author._id === user?._id ? (
                <div className="post-actions">
                  <Button onClick={() => setIsEditing(true)} variant="outline" color="indigo">
                    edit post
                  </Button>
                  <Button onClick={handleDeletePost} variant="outline" color="indigo">
                    delete
                  </Button>
                </div>
              ) : null}
            </Card>
          )}
        </div>
      </div>

      <Card shadow="sm" padding="sm" className="post-comments-card">
        <Text size="sm" color="pink" mb={12}>
          replies
        </Text>

        <div className="post-comment-list">
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
        </div>

        <form
          method="POST"
          action="/posts/:postId/createcomment"
          onSubmit={handleCreateComment}
          className="post-comment-form"
        >
          <Textarea
            id="content"
            autosize
            minRows={3}
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
            placeholder="start writing a reply here"
          />

          <Button type="submit" color="gray" variant="filled">
            submit reply
          </Button>
        </form>

        {errorMessage ? (
          <Text color="red" size="sm">
            {errorMessage}
          </Text>
        ) : null}
      </Card>
    </Card>
  );
}

export default Post;
