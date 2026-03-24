import { motion } from "framer-motion";

interface BlogHeroImageProps {
  src: string;
  alt: string;
}

const BlogHeroImage = ({ src, alt }: BlogHeroImageProps) => {
  return (
    <motion.div
      className="flex justify-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full max-w-md h-auto object-contain rounded-2xl"
        loading="lazy"
      />
    </motion.div>
  );
};

export default BlogHeroImage;
