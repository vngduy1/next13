"use client";

import useSWR from "swr";

import Tables from "@/components/tables/Table";

const Blogs = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading, isValidating } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data) {
    return <div>isLoading</div>;
  }

  return (
    <div className="mt-3">
      <Tables blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  );
};

export default Blogs;
