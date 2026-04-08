import { motion } from "framer-motion";
import poster1 from "@/assets/photo_2026-04-07_17-20-57.jpg";
import poster2 from "@/assets/photo_2026-04-07_17-21-06.jpg";
import poster3 from "@/assets/photo_2026-04-07_17-21-16.jpg";
import poster4 from "@/assets/photo_2026-04-07_17-21-22.jpg";

const cases = [
  {
    title: "Business Growth Campaign",
    outcome: "Built stronger premium positioning and clearer service visibility, ideal when you want your brand to stand out quickly.",
    image: poster1,
  },
  {
    title: "Seasonal Conversion Creative",
    outcome: "Designed for campaign periods where attention and engagement need to convert into enquiries.",
    image: poster2,
  },
  {
    title: "Youth Day Branded Creative",
    outcome: "Event-driven storytelling that lifts social reach while keeping your brand identity memorable.",
    image: poster3,
  },
  {
    title: "Holiday Visual Campaign",
    outcome: "Polished themed visuals that help your audience remember your offer and return to your brand.",
    image: poster4,
  },
];

const WorkShowcase = () => {
  const loopCases = [...cases, ...cases];

  return (
    <section className="px-4 py-6">
      <div className="mb-3">
        <h2 className="text-h2 text-foreground font-showcase-title">Graphic Samples</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card/85 backdrop-blur-sm shadow-card"
      >
        <div className="flex w-max animate-[showcase-scroll_52s_linear_infinite]">
          {loopCases.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="w-[82vw] max-w-[640px] shrink-0 border-r border-border/40 flex flex-col"
            >
              <div className="w-full min-h-[240px] flex items-center justify-center bg-background/10">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-[78vh] max-w-full h-auto w-auto object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-h3 text-foreground">{item.title}</h3>
                <p className="text-small text-muted-foreground mt-2">{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WorkShowcase;
