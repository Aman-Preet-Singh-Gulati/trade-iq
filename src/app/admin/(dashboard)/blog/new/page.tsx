import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">New Blog Post</h1>
      <BlogPostForm mode="create" />
    </div>
  );
}
