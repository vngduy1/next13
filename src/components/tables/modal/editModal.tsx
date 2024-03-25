"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProp {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

const EditTableModal = (props: IProp) => {
  const { showModal, setShowModal, blog, setBlog } = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

  const handleOnchange = (e: any, name: string) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;

      case "author":
        setAuthor(e.target.value);
        break;

      case "content":
        setContent(e.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = () => {
    const Validate = [title, author, content];

    for (let i = 0; i < Validate.length; i++) {
      if (!Validate[i]) {
        toast.error("Not empty");
        return;
      }
    }

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("updated successfully");
          handleClose();
          mutate("http://localhost:8000/blogs");
        }
      })
      .catch((e) => {
        toast.error("updated fail!");
        console.log(e);
      });
  };

  const handleClose = () => {
    setShowModal(false);
    setTitle("");
    setAuthor("");
    setBlog(null);
    setContent("");
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create blogs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => handleOnchange(e, "title")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={author}
                onChange={(e) => handleOnchange(e, "author")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => handleOnchange(e, "content")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleSubmit()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTableModal;
