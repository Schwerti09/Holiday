import { useState, useRef, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "auto";
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  aspectRatio = "auto",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 shimmer transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        />
      )}
    </div>
  );
});
