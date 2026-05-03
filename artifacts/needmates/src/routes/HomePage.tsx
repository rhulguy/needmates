import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Link } from "wouter";
import { NeedCard } from "@/components/needs/NeedCard";
import { mockNeeds } from "@/data/mockNeeds";
import { mockCategories } from "@/data/mockCategories";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const featuredNeeds = mockNeeds.slice(0, 5);

  return (
    <AppShell>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32 border-b-4 border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Need something local? Find people nearby who can help.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium"
            >
              Post a need, join others with the same interest, get trusted recommendations, or invite local businesses to respond. Turn local interest into real action.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/create">
                <Button size="lg" className="w-full sm:w-auto text-lg rounded-2xl h-16 px-8 bg-primary hover:bg-primary/90 text-white">
                  Post a Need
                </Button>
              </Link>
              <Link href="/feed">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg rounded-2xl h-16 px-8 border-2">
                  Browse Local Needs
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="relative h-[600px] hidden lg:block perspective-1000">
            {featuredNeeds.map((need, i) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, x: 100, y: 50, rotateZ: 10 }}
                animate={{ opacity: 1, x: 0, y: i * 40, rotateZ: (i - 2) * 4 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
                className="absolute top-10 left-10 right-10 origin-bottom-right"
                style={{ zIndex: 10 - i }}
              >
                <div className="pointer-events-none transform shadow-2xl">
                  <NeedCard need={need} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black mb-4">Explore by Category</h2>
              <p className="text-xl text-muted-foreground font-medium">Find exactly what you're looking for in your neighbourhood.</p>
            </div>
            <Link href="/feed">
              <Button variant="outline" className="hidden md:flex rounded-full">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockCategories.map((cat, i) => {
              const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
              return (
                <Link key={cat.id} href={`/feed?category=${cat.label}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border-2 border-border rounded-3xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className={`w-14 h-14 ${cat.colour} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{cat.label}</h3>
                    <p className="text-muted-foreground font-medium">{cat.count} active needs</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-5xl font-black mb-6">Ready to get started?</h2>
          <p className="text-2xl mb-10 text-primary-foreground/80 font-medium">Join thousands of neighbours turning local demand into real action.</p>
          <Link href="/create">
            <Button size="lg" variant="secondary" className="text-xl h-16 px-10 rounded-full shadow-xl hover:scale-105 transition-transform">
              Post your first need
            </Button>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
