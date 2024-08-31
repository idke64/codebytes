"use client";
import BlogCard from "@/components/BlogCard";
import blog from "@/markdown/blog.json";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";
import { useEffect } from "react";

function Blog() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-sine",
      once: true,
    });
  });
  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">
            Blog
          </h1>
        </div>
      </section>
      <section className="page-margins py-8 flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-3">
          <h3>Blog Posts</h3>
          <hr />
        </div>
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 min-h-[206px]">
          {Object.values(blog).map((blogPost, index) => (
            <BlogCard
              key={index}
              title={blogPost.title}
              author={blogPost.author}
              date={blogPost.date}
              image={blogPost.image}
              description={blogPost.description}
              id={blogPost.id}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Blog;
