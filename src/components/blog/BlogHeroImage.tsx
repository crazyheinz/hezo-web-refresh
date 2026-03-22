import { motion } from "framer-motion";

interface BlogHeroImageProps {
  src: string;
  alt: string;
}

const BlogHeroImage = ({ src, alt }: BlogHeroImageProps) => {
  return (
    <motion.div
      className="flex justify-center my-8"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain max-w-sm"
        loading="lazy"
      />
    </motion.div>
  );
};

export default BlogHeroImage;
