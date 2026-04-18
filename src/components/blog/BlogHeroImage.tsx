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
      <div className="w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default BlogHeroImage;
