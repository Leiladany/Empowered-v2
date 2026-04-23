import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { Text, Button, Input, Group, Textarea } from '@mantine/core';
import Post from '../components/Post';
import { createPost, getPosts } from "../services/demoStore";

function ForumPage() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useContext(SessionContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    function fetchPosts() {
        setPosts(getPosts());
    }

    function handleCreatePost(e) {
        e.preventDefault();

        try {
            createPost({
                title,
                content,
                authorId: user?._id,
            });
            setTitle('');
            setContent('');
            setErrorMessage("");
            fetchPosts();
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div style={{  
            margin: "auto", padding: "80px 200px 0",
            display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center"
            }} >

            <h1 style={{ color: "#5b64cf" , marginLeft: "250px" }}>forum</h1>

            <Text size="lg" align='center'
                style={{ color: "#5b64cf" , 
                margin:"20px 100px 15px" , 
                }}
                >We also value the <b>voices</b> of our readers, so we encourage you to share your questions and experiences and also support each other with replies. <sup>*, **</sup>
            </Text>

            <Text 
                style={{ color: "grey" ,  textAlign:"center", fontSize:"12px" }}
                >
                *this page is not a substitute for professional medical advice
            </Text>

            <Text 
                style={{ color: "grey" ,  textAlign:"center", fontSize:"12px" }}
                >
                **individual experiences may vary
            </Text>


            <form method="POST" action="/createpost" onSubmit={handleCreatePost}>
                    <Group 
                        spacing="lg" 
                        direction="column" 
                        style={{ margin:"50px 200px 10px", display:"block", 
                    }} >
                        
                            <Input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="start writing short title here"
                                style={{width:'350px', margin:"15px"}}
                            />

                            <Textarea
                                id="content"
                                value={content}
                                onChange={handleContentChange}
                                autosize
                                minRows={4}
                                style={{width:'600px', margin:"15px"}}
                                placeholder="start writing the details here"
                            />

                            
                        
                            <Button 
                                type="submit"
                                style={{ backgroundColor: "#5b64cf", margin:"15px"}}
                                variant="filled"
                            >
                                submit post
                            </Button>

                    </Group>
                </form>

                {errorMessage ? (
                    <Text color="red" style={{ margin: "0 215px 20px" }}>
                        {errorMessage}
                    </Text>
                ) : null}

                {posts.length === 0 ? (
                    <Text align="center" style={{ color: "#5b64cf", marginTop: "40px" }}>
                        No posts yet. Create the first one for this demo.
                    </Text>
                ) : null}

                {posts.map((post) => (
                    <Post key={post._id} post={post} setPosts={setPosts} posts={posts} fetchPosts={fetchPosts} />
                ))}

                <Button 
                    style={{ position: "fixed", bottom: "20px", right: "20px" }} 
                    onClick={scrollToTop}
                    variant="gradient" 
                    gradient={{ from: '#ed6ea0', to: 'indigo', deg: 35 }}
                    >
                        scroll to top
                    </Button>

        </div>
    );
}



export default ForumPage;
