"use client";
import useSWR, { Fetcher } from "swr";
import Card from "react-bootstrap/Card";
import Link from "next/link";

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
  const fetcher: Fetcher<IBlog, String> = (url: any) =>
    fetch(url).then((res) => res.json());

  const { data, isLoading, isValidating } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <div>isLoading</div>;
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      <h4>View page</h4>
      <div>
        <Link href="/blogs">Go back</Link>
      </div>
      <Card>
        <Card.Header>Title: {data?.title} </Card.Header>
        <Card.Body>
          <Card.Title> </Card.Title>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
      </Card>
    </div>
  );
};

export default ViewDetailBlog;
