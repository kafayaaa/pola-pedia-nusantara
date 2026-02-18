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
    <div className="md:h-screen w-full md:w-screen flex items-center justify-center px-4 md:px-0 py-10 md:py-0">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-brand-white/10 border border-brand-white/50 rounded-3xl md:rounded-[3rem] p-8 md:p-15 backdrop-blur-sm">
        <div className="col-span-1 flex flex-col justify-center gap-3 md:gap-5">
          <h1 className="text-2xl md:text-4xl font-bold text-brand-white text-center md:text-left">
            {title}
          </h1>
          <p className="text-base md:text-lg text-justify text-brand-light-gray">
            {children}
          </p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="rounded-2xl max-h-60 md:max-h-80 w-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
