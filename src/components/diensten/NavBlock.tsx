import { motion } from "framer-motion";
import { FileText, Users, Headphones, GraduationCap } from "lucide-react";

const navItems = [
  { id: "administratie", icon: FileText, label: "Administratie & ondersteuning", color: "bg-light-blue/10 text-light-blue hover:bg-light-blue/20" },
  { id: "instroom", icon: Users, label: "Instroom van patiënten", color: "bg-coral/10 text-coral hover:bg-coral/20" },
  { id: "begeleiding", icon: Headphones, label: "Persoonlijke begeleiding", color: "bg-yellow/10 text-yellow hover:bg-yellow/20" },
  { id: "opleiding", icon: GraduationCap, label: "Opleiding en groei", color: "bg-green/10 text-green hover:bg-green/20" },
];

const NavBlock = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 100;
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - navHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${item.color} cursor-pointer`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default NavBlock;
