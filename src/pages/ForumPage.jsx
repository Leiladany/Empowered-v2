import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Text, Textarea } from "@mantine/core";
import { SessionContext } from "../contexts/SessionContext";
import Post from "../components/Post";
import { createPost, getPosts } from "../services/demoStore";

function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(SessionContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    setPosts(getPosts());
  }

  function handleCreatePost(event) {
    event.preventDefault();

    try {
      createPost({
        title,
        content,
        authorId: user?._id,
      });
      setTitle("");
      setContent("");
      setErrorMessage("");
      fetchPosts();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="forum-page">
      <div className="forum-header">
        <h1 className="page-title">forum</h1>

        <Text size="lg" align="center" className="page-lead">
          We also value the <b>voices</b> of our readers, so we encourage you to
          share your questions and experiences and also support each other with
          replies. <sup>*, **</sup>
        </Text>

        <Text align="center" className="page-note">
          *this page is not a substitute for professional medical advice
        </Text>
        <Text align="center" className="page-note">
          **individual experiences may vary
        </Text>
      </div>

      <form
        method="POST"
        action="/createpost"
        onSubmit={handleCreatePost}
        className="forum-create-form"
      >
        <div className="forum-create-stack">
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="start writing short title here"
            className="forum-text-input"
          />

          <Textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            autosize
            minRows={4}
            placeholder="start writing the details here"
            className="forum-textarea"
          />

          <Button type="submit" variant="filled" color="indigo">
            submit post
          </Button>
        </div>
      </form>

      {errorMessage ? (
        <Text color="red" className="forum-error">
          {errorMessage}
        </Text>
      ) : null}

      {posts.length === 0 ? (
        <Text align="center" className="forum-empty" color="#5b64cf">
          No posts yet. Create the first one for this demo.
        </Text>
      ) : null}

      <div className="forum-post-list">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            setPosts={setPosts}
            posts={posts}
            fetchPosts={fetchPosts}
          />
        ))}
      </div>

      <Button
        className="scroll-top-button"
        onClick={scrollToTop}
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "indigo", deg: 35 }}
      >
        scroll to top
      </Button>
    </div>
  );
}

export default ForumPage;
