"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { DrinkDetail } from "@/components/drinks/DrinkDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DrinkDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const drink = useQuery(api.drinks.getBySlug, { slug });

  if (drink === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full rounded-lg mb-6" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (!drink) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Drink not found</h2>
        <p className="text-muted-foreground mb-4">
          The drink you&apos;re looking for doesn&apos;t exist or hasn&apos;t been added yet.
        </p>
        <Button asChild variant="outline">
          <Link href="/drinks">Back to Drinks</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DrinkDetail drink={drink} />
    </div>
  );
}
