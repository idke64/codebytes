"use client";
import blog from "@/markdown/blog.json";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";
import Image from "next/image";

function BlogPost() {
  const params = useParams();
  const blogId = params.blogPost;
  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">
            Blog
          </h1>
        </div>
      </section>
      <section className="w-full ">
        <div className="min-h-[calc(100vh-160px)] page-margins py-8 flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-y-6 w-full">
            <div className="flex flex-col gap-y-4 items-center">
              <h2 className="self-center">{blog[blogId].title}</h2>
              <div className="flex w-full justify-center gap-x-3">
                <p className="text-[17px]">By {blog[blogId].author}</p>•
                <p>Published {blog[blogId].date}</p>
              </div>
            </div>
          </div>
          <hr className="w-full" />
          {/* {blog[blogId].image && (
              <div className="flex justify-center ">
                <Image
                  className="w-1/2 object-cover rounded-md border shadow"
                  width={500}
                  height={500}
                  src={blog[blogId].image}
                  alt="picture"
                />
              </div>
            )} */}
          <div className="flex flex-col gap-y-4">
            <Markdown
              components={{
                a(props) {
                  return (
                    <a
                      className="link"
                      href={props.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.children}
                    </a>
                  );
                },
                code(props) {
                  return (
                    <code className="px-1 bg-neutral-100 font-medium rounded font-mono py-0.5 text-sm">
                      {props.children}
                    </code>
                  );
                },
                li(props) {
                  return (
                    <li>
                      <p>{props.children}</p>
                    </li>
                  );
                },
              }}
            >
              {blog[blogId].content}
            </Markdown>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPost;
