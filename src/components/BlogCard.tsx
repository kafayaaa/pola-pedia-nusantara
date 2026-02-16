import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  image: string;
  author: string;
  createdAt: string;
  desc: string;
  slug: string;
}

export default function BlogCard({
  title,
  image,
  author,
  createdAt,
  desc,
  slug,
}: BlogCardProps) {
  const plainText = desc
    ? desc.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."
    : "";
  return (
    <Link
      href={`/admin/blogs/${slug}`}
      className="w-full p-5 flex items-center gap-5 rounded-lg bg-white shadow-md"
    >
      <div className="">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="aspect-square size-40 object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">{author}</p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <p className="text-sm text-gray-500">{plainText}</p>
      </div>
    </Link>
  );
}
