import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Users, Lightbulb, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageHero from "@/components/ui/ImageHero";
import image5 from "@/assets/image 5.jpg";
import emilyPhoto from "@/assets/emily-moseni.png";
import ernestPhoto from "@/assets/ernest-moseni.png";
import { IMAGE_FOCAL } from "@/lib/visuals";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const values = [
  {
    icon: Award,
    title: "Professional Excellence",
    description: "High standards in every service we deliver"
  },
  {
    icon: Heart,
    title: "Integrity & Trust",
    description: "Honest, transparent client relationships"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Modern solutions for evolving needs"
  },
  {
    icon: Users,
    title: "Client-Centered Approach",
    description: "Every solution tailored for impact"
  }
];

const whyChooseUs = [
  "End-to-end professional solutions",
  "Experienced leadership",
  "Client-focused delivery",
  "Modern tools and methods",
  "Reliable support and communication"
];

const aboutQuickLinks = [
  { icon: Award, label: "Our Values", target: "#our-values" },
  { icon: Lightbulb, label: "How We Work", target: "#who-we-are" },
  { icon: Users, label: "Leadership", target: "#our-leadership" },
  { icon: Heart, label: "Why EMIMOS", target: "#why-emimos" },
];

const About = () => {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageHero
            imageSrc={image5}
            imageAlt="About EMIMOS Services"
            title="About EMIMOS Services"
            subtitle="A professional services company built on excellence, innovation, and trust."
            minHeightClass="min-h-[360px]"
            imagePositionClass={IMAGE_FOCAL.heroPrimary}
          />
        </motion.div>
      </section>

      {/* Company Story Section */}
      <section id="who-we-are" className="py-20 px-4 bg-background scroll-mt-24">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Who We Are
              </h2>
              <Separator className="w-16 h-1 bg-gold rounded-full" />
              <p className="text-muted-foreground leading-relaxed text-lg">
                EMIMOS Services is a full-service professional agency providing branding, design, professional writing, audio and visual advertising, social media management, event planning, and digital solutions including web and app development, hosting, and domain services.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We work with individuals, businesses, and organisations to help them present themselves professionally, communicate effectively, and grow confidently in today's competitive environment. Our approach combines creativity, strategy, and operational excellence to deliver solutions that are both visually compelling and functionally effective.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-square rounded-3xl gradient-navy-soft p-8 flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  {aboutQuickLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm"
                    >
                      <a
                        href={item.target}
                        className="h-full w-full flex flex-col items-center justify-center text-center p-2 hover:bg-white/10 rounded-2xl transition-colors"
                      >
                        <item.icon className="w-8 h-8 text-gold mb-1" />
                        <span className="text-[10px] font-medium text-white/90 leading-tight">
                          {item.label}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Gold accent decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gold/20 -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section id="our-values" className="py-20 px-4 bg-secondary/30 scroll-mt-24">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Values
            </h2>
            <Separator className="w-16 h-1 bg-gold rounded-full mx-auto" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 dark:bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-7 h-7 text-primary dark:text-gold" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="our-leadership" className="py-20 px-4 bg-background scroll-mt-24">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Leadership
            </h2>
            <p className="text-muted-foreground text-lg">
              Experienced leadership guiding EMIMOS Services forward.
            </p>
            <Separator className="w-16 h-1 bg-gold rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* CEO Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden bg-card border-border hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
                  <img
                    src={emilyPhoto}
                    alt="Emily Moseni - CEO"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                    Emily Moseni
                  </h3>
                  <p className="text-gold font-medium mb-1">Chief Executive Officer (CEO)</p>
                  <Separator className="w-12 h-0.5 bg-gold rounded-full mb-4" />
                  <div className="space-y-3 text-muted-foreground leading-relaxed text-sm md:text-base max-h-64 overflow-y-auto pr-2">
                    <p>
                      Emily Moseni is an accomplished business leader and the Chief Executive Officer of EMIMOS Services, where she drives the company's strategic vision, innovation, and service excellence. With extensive experience in executive leadership and organisational management, she has built a reputation for delivering results through clarity, professionalism, and purpose-driven leadership.
                    </p>
                    <p>
                      As CEO, Emily oversees the overall direction of EMIMOS Services, ensuring the company consistently delivers high-quality branding, design, digital advertising, event planning, and technology solutions. She is passionate about building strong teams, fostering creativity, and maintaining the highest standards of client service.
                    </p>
                    <p>
                      Her leadership style is defined by integrity, effective communication, and a commitment to long-term growth, positioning EMIMOS Services as a trusted partner for individuals and businesses alike.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* COO Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden bg-card border-border hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
                  <img
                    src={ernestPhoto}
                    alt="Ernest Mambwe - COO"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                    Ernest Mambwe
                  </h3>
                  <p className="text-gold font-medium mb-1">Chief Operating Officer (COO)</p>
                  <Separator className="w-12 h-0.5 bg-gold rounded-full mb-4" />
                  <div className="space-y-3 text-muted-foreground leading-relaxed text-sm md:text-base max-h-64 overflow-y-auto pr-2">
                    <p>
                      Ernest Mambwe is a seasoned operations and business leader with a strong background in strategic planning, operational management, and service delivery. As Chief Operating Officer at EMIMOS Services, he oversees the company's day-to-day operations, ensuring efficiency, quality, and consistency across all service lines.
                    </p>
                    <p>
                      Ernest plays a key role in aligning internal systems with the company's growth objectives, supporting teams to perform at their best while maintaining a strong client-focused approach. His experience spans leadership, coordination, and operational execution across multiple professional environments.
                    </p>
                    <p>
                      With a keen eye for detail and process improvement, Ernest helps drive EMIMOS Services' operational excellence and sustainable expansion.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose EMIMOS Section */}
      <section id="why-emimos" className="py-20 px-4 bg-secondary/30 scroll-mt-24">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Why Choose EMIMOS
            </h2>
            <Separator className="w-16 h-1 bg-gold rounded-full mx-auto" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <ImageHero
            imageSrc={ernestPhoto}
            imageAlt="Work with EMIMOS"
            title="Ready to work with a professional team you can trust?"
            subtitle="We are ready to support your next move with clear strategy and reliable delivery."
            minHeightClass="min-h-[280px]"
            actions={
              <>
                <Button
                  asChild
                  size="lg"
                  className="btn-gold-glow bg-gold hover:bg-gold-light text-primary-foreground dark:text-navy-900 font-semibold px-8"
                >
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-navy-900 hover:bg-white/90 border border-white/80 font-semibold px-8"
                >
                  <Link to="/services">
                    Order a Service
                  </Link>
                </Button>
              </>
            }
          />
        </div>
      </section>
    </AppLayout>
  );
};

export default About;
