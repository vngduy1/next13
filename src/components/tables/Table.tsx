"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import TableModal from "./modal/modal";
import { useState } from "react";
import EditTableModal from "./modal/editModal";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  blogs: IBlog[];
}

const Tables = (props: IProps) => {
  const { blogs } = props;

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Do you want to delete this blog ${title}`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.success("Delete successfully");
            mutate("http://localhost:8000/blogs");
          }
        })
        .catch((e) => {
          toast.error("delete fail!");
          console.log(e);
        });
    }
  };

  return (
    <>
      <div
        className="mb-3 mt-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Add new
        </Button>
      </div>
      <Table striped bordered hover variant="white">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author} </td>
                <td>
                  <Link className="btn btn-primary" href={`blogs/${blog.id}`}>
                    view
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setBlog(blog);
                      setShowModal(true);
                    }}
                  >
                    edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(blog.id, blog.title)}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TableModal showModal={showModal} setShowModal={setShowModal} />
      <EditTableModal
        showModal={showModal}
        setShowModal={setShowModal}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};

export default Tables;
