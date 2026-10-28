import Image from "next/image";
import { unwrapTypefloImageUrl } from "@/lib/blog-images";

type ResponsiveBlogImageProps = {
  src: string;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
};

export function ResponsiveBlogImage({
  src,
  alt,
  sizes,
  eager = false,
  className = "object-cover",
}: ResponsiveBlogImageProps) {
  const normalizedSource = unwrapTypefloImageUrl(src);

  if (normalizedSource.startsWith("/")) {
    return (
      <img
        src={normalizedSource}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={normalizedSource}
      alt={alt}
      fill
      sizes={sizes}
      quality={85}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={className}
    />
  );
}
