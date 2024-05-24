import React, { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./Home.css"

export const Home = ({ role }) => {

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [forAll, setForAll] = useState(false);

    const [allPosts, setAllPosts] = useState([]);
    const [notUserPosts, setNotUserPosts] = useState([]);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const fetchPosts = async () => {

        try {
            const response = await fetch("http://localhost:5000/api/get-all-posts");

            if (response.ok) {
                const content = await response.json();
                const partOfPosts = content.filter(chosenPost => chosenPost.forAll === true);
                setNotUserPosts(partOfPosts);
                setAllPosts(content);
            } else {
                const errorData = await response.json();
                console.log("failed to fetch posts", response, errorData)
            }

        } catch {
            console.log("error");
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const resetData = () => {
        setId(0);
        setName("");
        setDescription("");
        setForAll(false);
    }

    const handleCreatePost = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    forAll
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Post created: ', result);
                handleClose1();
                resetData();
                fetchPosts();
            } else {
                const errorData = await response.json();
                console.log("failed to create invoice", response, errorData)
            }

        } catch {
            console.log("error");
        }
    }

    const cancelCreatePost = () => {
        handleClose1();
        resetData();
    }

    const handleSetEditData = (post) => {
        setId(post.id);
        setName(post.name);
        setDescription(post.description);
        setForAll(post.forAll);

        handleShow2();
    }

    const handleEditPost = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/edit-post", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    description,
                    forAll
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Post updated: ', result);
                handleClose2();
                resetData();
                fetchPosts();

            } else {
                const errorData = await response.json();
                console.log("failed to create invoice", response, errorData)
            }

        } catch {
            console.log("error");
        }
    }

    const cancelEditPost = () => {
        handleClose2();
        resetData();
    }

    const handleDeletePost = async (post) => {
        if (window.confirm("Do you really want to delete post \"" + post.name + "\"?") === true) {
            try {
                const response = await fetch("http://localhost:5000/api/delete-post", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({
                        id: post.id
                    }),
                });

                if (response.ok) {
                    fetchPosts();
                } else {
                    const errorData = await response.json();
                    console.log("Error: ", errorData);
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
    }

    return (
        <div className="homeDiv">
            {!role && (
                <div>
                    <h1>Split Payment App News</h1>
                    <br />
                    {notUserPosts.toReversed().map((post, index) => (
                        <Card>
                            <Card.Header as="h5">{post.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {post.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}

                </div>


            )}
            {role && (
                <div className="homePageDiv">
                    <h1>News</h1>
                    {role === 'owner' && (
                        <Button variant="primary" onClick={handleShow1}>Create new post</Button>
                    )}

                    {allPosts.toReversed().map((post, index) => (
                        <div>
                            <br />
                            <Card>
                                <Card.Header as="h5">{post.name}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {post.description}
                                    </Card.Text>
                                    {role === 'owner' && (
                                        <div className="buttonDiv">
                                            <Button variant="secondary" onClick={() => handleSetEditData(post)}>Edit post</Button>&nbsp;
                                            <Button variant="danger" onClick={() => handleDeletePost(post)}>Delete post</Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <input type="text" className="form-control" id="name" name="name" onChange={e => setName(e.target.value)} placeholder="Title" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control as="textarea" rows={4} id="description" name="description" onChange={e => setDescription(e.target.value)} placeholder="This is my new post..." required />
                        </Form.Group>
                        <div>
                            <input type="checkbox" checked={forAll} onChange={() => setForAll(!forAll)} value={forAll} /><label>&nbsp;Post for everyone</label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelCreatePost}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreatePost}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <input type="text" className="form-control" id="name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Title" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control as="textarea" rows={4} id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="This is my new post..." required />
                        </Form.Group>
                        <div>
                            <input type="checkbox" checked={forAll} onChange={() => setForAll(!forAll)} value={forAll} /><label>&nbsp;Post for everyone</label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelEditPost}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditPost}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
