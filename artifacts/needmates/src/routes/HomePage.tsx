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
      {/* HERO */}
      <section className="relative overflow-hidden bg-background pt-12 pb-20 md:pt-20 md:pb-32 border-b-4 border-border w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="min-w-0 w-full max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-5 md:mb-6 break-words"
            >
              Need something local? Find people nearby who can help.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed font-medium"
            >
              Post a need, join others with the same interest, get trusted recommendations, or invite local businesses to respond. Turn local interest into real action.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link href="/create">
                <Button size="lg" className="w-full sm:w-auto text-base md:text-lg rounded-2xl h-14 md:h-16 px-6 md:px-8 bg-primary hover:bg-primary/90 text-white">
                  Post a Need
                </Button>
              </Link>
              <Link href="/feed">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg rounded-2xl h-14 md:h-16 px-6 md:px-8 border-2">
                  Browse Local Needs
                </Button>
              </Link>
            </motion.div>

            {/* Mobile: compact need stack preview */}
            <div className="mt-10 lg:hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Live near you</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-3">
                {mockNeeds.slice(0, 3).map((need, i) => (
                  <motion.div
                    key={need.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Link href={`/need/${need.id}`}>
                      <div className="bg-card border-2 border-border rounded-2xl px-4 py-3 flex items-center justify-between gap-3 hover:border-primary/40 transition-colors cursor-pointer">
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate">{need.title}</p>
                          <p className="text-xs text-muted-foreground font-semibold">{need.locationLabel} · {need.interestedCount} interested</p>
                        </div>
                        <Icons.ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop stacked cards */}
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

      {/* CATEGORIES */}
      <section className="py-14 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">Explore by Category</h2>
              <p className="text-sm md:text-xl text-muted-foreground font-medium">Find what you need in your neighbourhood.</p>
            </div>
            <Link href="/feed">
              <Button variant="outline" className="hidden md:flex rounded-full">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
            {mockCategories.map((cat, i) => {
              const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
              return (
                <Link key={cat.id} href={`/feed?category=${cat.label}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border-2 border-border rounded-2xl md:rounded-3xl p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className={`w-11 h-11 md:w-14 md:h-14 ${cat.colour} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 leading-snug">{cat.label}</h3>
                    <p className="text-muted-foreground font-medium text-xs md:text-base">{cat.count} active needs</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/feed">
              <Button variant="outline" className="rounded-full">View All Needs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-24 bg-background border-b-2 border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black mb-3">How NeedMates works</h2>
            <p className="text-sm md:text-lg text-muted-foreground font-medium">Four simple ways to connect with your local community.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Icons.PlusCircle, colour: 'bg-primary/10 text-primary', step: '1', title: 'Post what you need', body: 'Take 60 seconds to describe your need, trade, or recommendation request.' },
              { icon: Icons.Users, colour: 'bg-emerald-500/10 text-emerald-600', step: '2', title: 'Others join in', body: 'Neighbours with the same need click "I need this too" to build group demand.' },
              { icon: Icons.ThumbsUp, colour: 'bg-orange-500/10 text-orange-500', step: '3', title: 'Trusted locals respond', body: 'Vouched community members offer help, recommendations, or local knowledge.' },
              { icon: Icons.Building2, colour: 'bg-blue-500/10 text-blue-500', step: '4', title: 'Businesses pitch in', body: 'Local businesses see real demand and offer group discounts directly to you.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-5 md:p-6 bg-card border-2 border-border rounded-2xl md:rounded-3xl"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 ${item.colour} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-5`}>
                  <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1.5">Step {item.step}</div>
                <h3 className="font-black text-base md:text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">Ready to get started?</h2>
          <p className="text-base md:text-2xl mb-8 md:mb-10 text-primary-foreground/80 font-medium">Join thousands of neighbours turning local demand into real action.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/create">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base md:text-xl h-14 md:h-16 px-8 md:px-10 rounded-full shadow-xl hover:scale-105 transition-transform">
                Post your first need
              </Button>
            </Link>
            <Link href="/feed">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-xl h-14 md:h-16 px-8 md:px-10 rounded-full border-2 border-white/30 text-white hover:bg-white/10">
                Browse the feed
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
