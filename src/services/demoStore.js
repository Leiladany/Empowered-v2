const DATA_KEY = "empowered.demo.data";
const SESSION_KEY = "empowered.demo.session";
const LEGACY_TOKEN_KEY = "bearer";

const DEMO_STATE = {
  users: [
    {
      _id: "user_demo_anna",
      username: "anna",
      email: "anna@empowered.demo",
      password: "demo1234",
      createdAt: "2026-01-05T10:00:00.000Z",
    },
    {
      _id: "user_demo_leila",
      username: "leila",
      email: "leila@empowered.demo",
      password: "demo1234",
      createdAt: "2026-01-06T14:30:00.000Z",
    },
  ],
  posts: [
    {
      _id: "post_demo_1",
      title: "How can I talk about boundaries without making it awkward?",
      content:
        "I want to be clearer about boundaries in relationships and would love advice on how to start that conversation.",
      authorId: "user_demo_anna",
      createdAt: "2026-02-12T09:00:00.000Z",
      updatedAt: "2026-02-12T09:00:00.000Z",
    },
    {
      _id: "post_demo_2",
      title: "What resources helped you learn about contraception?",
      content:
        "I am collecting useful beginner-friendly resources and would like recommendations that are easy to understand.",
      authorId: "user_demo_leila",
      createdAt: "2026-02-14T18:45:00.000Z",
      updatedAt: "2026-02-14T18:45:00.000Z",
    },
  ],
  comments: [
    {
      _id: "comment_demo_1",
      postId: "post_demo_1",
      content:
        "Starting with what makes you feel safe and respected usually keeps the conversation grounded.",
      authorId: "user_demo_leila",
      createdAt: "2026-02-12T10:15:00.000Z",
      updatedAt: "2026-02-12T10:15:00.000Z",
    },
    {
      _id: "comment_demo_2",
      postId: "post_demo_2",
      content:
        "Planned Parenthood and Scarleteen are a good place to start for clear explanations.",
      authorId: "user_demo_anna",
      createdAt: "2026-02-14T19:30:00.000Z",
      updatedAt: "2026-02-14T19:30:00.000Z",
    },
  ],
};

function clone(value) {
  if (value === null || value === undefined) {
    return value;
  }

  return JSON.parse(JSON.stringify(value));
}

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function readJson(key, fallbackValue) {
  const storage = getStorage();

  if (!storage) {
    return clone(fallbackValue);
  }

  const rawValue = storage.getItem(key);

  if (!rawValue) {
    return clone(fallbackValue);
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    storage.removeItem(key);
    return clone(fallbackValue);
  }
}

function writeJson(key, value) {
  const storage = getStorage();

  if (storage) {
    storage.setItem(key, JSON.stringify(value));
  }

  return value;
}

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getState() {
  const state = readJson(DATA_KEY, DEMO_STATE);

  if (
    !state ||
    !Array.isArray(state.users) ||
    !Array.isArray(state.posts) ||
    !Array.isArray(state.comments)
  ) {
    return resetDemoData();
  }

  return state;
}

function saveState(state) {
  return writeJson(DATA_KEY, state);
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...publicUser } = user;
  return publicUser;
}

function getUserRecord(users, userId) {
  return users.find((user) => user._id === userId) || null;
}

function getPostRecord(posts, postId) {
  return posts.find((post) => post._id === postId) || null;
}

function attachAuthor(record, users) {
  return {
    ...record,
    author: sanitizeUser(getUserRecord(users, record.authorId)),
  };
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function requireText(value, label) {
  if (!value || !value.trim()) {
    throw new Error(`${label} is required.`);
  }
}

function requireUser(users, userId) {
  const user = getUserRecord(users, userId);

  if (!user) {
    throw new Error("You must be logged in to do that.");
  }

  return user;
}

function sortNewestFirst(left, right) {
  return new Date(right.createdAt) - new Date(left.createdAt);
}

function sortOldestFirst(left, right) {
  return new Date(left.createdAt) - new Date(right.createdAt);
}

function setStoredSession(session) {
  const storage = getStorage();

  if (storage) {
    if (session) {
      storage.setItem(SESSION_KEY, JSON.stringify(session));
      storage.setItem(LEGACY_TOKEN_KEY, session.token);
    } else {
      storage.removeItem(SESSION_KEY);
      storage.removeItem(LEGACY_TOKEN_KEY);
    }
  }

  return session;
}

export function ensureDemoData() {
  return getState();
}

export function clearSession() {
  setStoredSession(null);
}

export function restoreSession(expectedToken) {
  const session = readJson(SESSION_KEY, null);

  if (!session || !session.userId || !session.token) {
    clearSession();
    return null;
  }

  if (expectedToken && session.token !== expectedToken) {
    clearSession();
    return null;
  }

  const state = getState();
  const user = getUserRecord(state.users, session.userId);

  if (!user) {
    clearSession();
    return null;
  }

  return {
    token: session.token,
    user: sanitizeUser(user),
  };
}

export function resetDemoData() {
  saveState(clone(DEMO_STATE));
  clearSession();
  return getState();
}

export function signUp({ username, email, password }) {
  requireText(username, "Username");
  requireText(email, "Email");
  requireText(password, "Password");

  if (password.trim().length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const state = getState();
  const normalizedUsername = normalizeUsername(username);
  const normalizedEmail = normalizeEmail(email);

  if (state.users.some((user) => normalizeUsername(user.username) === normalizedUsername)) {
    throw new Error("Username already exists.");
  }

  if (state.users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    throw new Error("Email already exists.");
  }

  const user = {
    _id: createId("user"),
    username: username.trim(),
    email: email.trim(),
    password,
    createdAt: new Date().toISOString(),
  };

  state.users.unshift(user);
  saveState(state);

  return sanitizeUser(user);
}

export function logIn({ username, password }) {
  requireText(username, "Username");
  requireText(password, "Password");

  const state = getState();
  const foundUser = state.users.find(
    (user) => normalizeUsername(user.username) === normalizeUsername(username)
  );

  if (!foundUser || foundUser.password !== password) {
    throw new Error("Invalid username or password.");
  }

  const session = setStoredSession({
    token: createId("session"),
    userId: foundUser._id,
  });

  return {
    token: session.token,
    foundUser: sanitizeUser(foundUser),
  };
}

export function updateUserProfile(userId, { username, email }) {
  requireText(username, "Username");
  requireText(email, "Email");

  const state = getState();
  const currentUser = requireUser(state.users, userId);
  const normalizedUsername = normalizeUsername(username);
  const normalizedEmail = normalizeEmail(email);

  const usernameTaken = state.users.some(
    (user) =>
      user._id !== userId && normalizeUsername(user.username) === normalizedUsername
  );

  if (usernameTaken) {
    throw new Error("Username already exists.");
  }

  const emailTaken = state.users.some(
    (user) => user._id !== userId && normalizeEmail(user.email) === normalizedEmail
  );

  if (emailTaken) {
    throw new Error("Email already exists.");
  }

  const updatedUser = {
    ...currentUser,
    username: username.trim(),
    email: email.trim(),
    updatedAt: new Date().toISOString(),
  };

  state.users = state.users.map((user) => {
    if (user._id === userId) {
      return updatedUser;
    }

    return user;
  });

  saveState(state);

  return sanitizeUser(updatedUser);
}

export function deleteUserProfile(userId) {
  const state = getState();
  requireUser(state.users, userId);

  state.users = state.users.filter((user) => user._id !== userId);
  saveState(state);

  const activeSession = readJson(SESSION_KEY, null);

  if (activeSession && activeSession.userId === userId) {
    clearSession();
  }
}

export function getPosts() {
  const state = getState();

  return [...state.posts]
    .sort(sortNewestFirst)
    .map((post) => attachAuthor(post, state.users));
}

export function createPost({ title, content, authorId }) {
  requireText(title, "Title");
  requireText(content, "Content");

  const state = getState();
  requireUser(state.users, authorId);

  const post = {
    _id: createId("post"),
    title: title.trim(),
    content: content.trim(),
    authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  state.posts.unshift(post);
  saveState(state);

  return attachAuthor(post, state.users);
}

export function updatePost(postId, { title, content }, actorId) {
  requireText(title, "Title");
  requireText(content, "Content");

  const state = getState();
  const post = getPostRecord(state.posts, postId);

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.authorId !== actorId) {
    throw new Error("You can only edit your own posts.");
  }

  const updatedPost = {
    ...post,
    title: title.trim(),
    content: content.trim(),
    updatedAt: new Date().toISOString(),
  };

  state.posts = state.posts.map((entry) => {
    if (entry._id === postId) {
      return updatedPost;
    }

    return entry;
  });

  saveState(state);

  return attachAuthor(updatedPost, state.users);
}

export function deletePost(postId, actorId) {
  const state = getState();
  const post = getPostRecord(state.posts, postId);

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.authorId !== actorId) {
    throw new Error("You can only delete your own posts.");
  }

  state.posts = state.posts.filter((entry) => entry._id !== postId);
  state.comments = state.comments.filter((comment) => comment.postId !== postId);
  saveState(state);
}

export function getComments(postId) {
  const state = getState();

  return state.comments
    .filter((comment) => comment.postId === postId)
    .sort(sortOldestFirst)
    .map((comment) => attachAuthor(comment, state.users));
}

export function createComment(postId, { content, authorId }) {
  requireText(content, "Reply");

  const state = getState();
  requireUser(state.users, authorId);

  if (!getPostRecord(state.posts, postId)) {
    throw new Error("Post not found.");
  }

  const comment = {
    _id: createId("comment"),
    postId,
    content: content.trim(),
    authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  state.comments.push(comment);
  saveState(state);

  return attachAuthor(comment, state.users);
}

export function updateComment(postId, commentId, { content }, actorId) {
  requireText(content, "Reply");

  const state = getState();
  const comment = state.comments.find(
    (entry) => entry._id === commentId && entry.postId === postId
  );

  if (!comment) {
    throw new Error("Reply not found.");
  }

  if (comment.authorId !== actorId) {
    throw new Error("You can only edit your own replies.");
  }

  const updatedComment = {
    ...comment,
    content: content.trim(),
    updatedAt: new Date().toISOString(),
  };

  state.comments = state.comments.map((entry) => {
    if (entry._id === commentId) {
      return updatedComment;
    }

    return entry;
  });

  saveState(state);

  return attachAuthor(updatedComment, state.users);
}

export function deleteComment(postId, commentId, actorId) {
  const state = getState();
  const comment = state.comments.find(
    (entry) => entry._id === commentId && entry.postId === postId
  );

  if (!comment) {
    throw new Error("Reply not found.");
  }

  if (comment.authorId !== actorId) {
    throw new Error("You can only delete your own replies.");
  }

  state.comments = state.comments.filter((entry) => entry._id !== commentId);
  saveState(state);
}
