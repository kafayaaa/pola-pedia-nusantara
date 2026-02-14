import Image from "next/image";

interface ServiceCardProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

export default function ServiceCard({
  title,
  image,
  children,
}: ServiceCardProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-10 bg-brand-white/10 border border-brand-white/50 rounded-[3rem] p-15 backdrop-blur-sm">
        <div className="col-span-1 flex flex-col justify-center gap-5">
          <h1 className="text-4xl font-bold text-brand-white">{title}</h1>
          <p className="text-lg text-justify text-brand-light-gray">
            {children}
          </p>
        </div>
        <div className="col-span-1">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="rounded-2xl max-h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
