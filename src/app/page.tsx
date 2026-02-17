import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wine,
  Package,
  Search,
  Heart,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-background via-background to-amber-950/20 py-24 px-4 md:py-32"
        aria-label="Hero"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container mx-auto max-w-6xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
          >
            The bartender&apos;s companion
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Master Your Bar
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            The go-to app for all of your bartending, barkeeping, and mixologist
            needs.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[180px]">
              <Link href="/sign-in">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[180px]">
              <Link href="/drinks">Explore Drinks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="border-t border-border/50 bg-muted/30 py-20 px-4"
        aria-label="Features"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to craft perfect cocktails
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From official recipes to smart inventory—run your bar like a pro.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
            <Card className="border-border/50 bg-card/80 backdrop-blur ">
              <CardHeader className="text-center items-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Wine className="h-6 w-6" />
                </div>
                <CardTitle>IBA Cocktail Database</CardTitle>
                <CardDescription>
                  Browse official cocktail recipes with detailed instructions and
                  ingredients.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader className="text-center items-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Package className="h-6 w-6" />
                </div>
                <CardTitle>Smart Inventory</CardTitle>
                <CardDescription>
                  Track your bar ingredients and see what&apos;s running low at a
                  glance.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader className="text-center items-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Search className="h-6 w-6" />
                </div>
                <CardTitle>What Can I Make?</CardTitle>
                <CardDescription>
                  Filter drinks based on ingredients you have on hand—never miss
                  a recipe.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader className="text-center items-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Save Favorites</CardTitle>
                <CardDescription>
                  Build your personal collection of go-to recipes for quick
                  access.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section
        className="py-20 px-4"
        aria-label="Trust indicators"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="justify-center grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <div>
                <p className="font-medium">100+ IBA Official Recipes</p>
                <p className="text-sm text-muted-foreground">
                  Curated, verified cocktail database
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Secure Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Your data protected with industry standards
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <p className="font-medium">Real-time Sync</p>
                <p className="text-sm text-muted-foreground">
                  Changes saved instantly across devices
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <div>
                <p className="font-medium">Works Everywhere</p>
                <p className="text-sm text-muted-foreground">
                  Web, mobile-friendly, always in sync
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="border-t border-border/50 bg-muted/30 py-20 px-4"
        aria-label="Call to action"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to elevate your bartending?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join bartenders and enthusiasts who craft with confidence.
          </p>
          <Button asChild size="lg" className="mt-8 min-w-[200px]">
            <Link href="/sign-in">Get Started Free</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to start · No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
