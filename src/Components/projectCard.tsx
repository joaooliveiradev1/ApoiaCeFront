import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
interface ProjectCardProps {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  raised: number;
  goal: number;
  daysLeft: number;
  supporters: number;
  index?: number;
}

export function ProjectCard({
  id,
  title,
  author,
  category,
  imageUrl,
  raised,
  goal,
  daysLeft,
  supporters,
  index = 0,
}: ProjectCardProps) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel rounded-2xl overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl || "https://placehold.co/400x300"}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs">{author}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="text-primary font-medium">
              {progress.toFixed(0)}% financiado
            </span>
            <span>{daysLeft}d restantes</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {supporters} apoiadores
          </span>
          <Link to={`/projeto/${id}`}>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-xs border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
            >
              Ver mais
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
