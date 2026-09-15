import { prisma } from "@/lib/prisma";
import { CollectionsGrid } from "@/components/linkvault/CollectionsGrid";
import { QuickAddBar } from "@/components/linkvault/QuickAddBar";
import { IconLinkButton } from "@/components/ui/IconButton";
import { IconBack, IconSettings } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export default async function LinkVaultPage() {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { links: true } } },
  });

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-yolk pb-16">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-bubblegum/25 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-md px-5 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <IconLinkButton href="/" label="Kembali ke BrutalHub">
            <IconBack size={18} />
          </IconLinkButton>
          <IconLinkButton href="/linkvault/settings" label="Pengaturan">
            <IconSettings size={18} />
          </IconLinkButton>
        </div>

        <Reveal>
          <h1 className="font-display text-3xl font-bold leading-tight">
            Save now.
            <br />
            Find anytime.
          </h1>
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <QuickAddBar
            collections={collections.map((c) => ({ id: c.id, name: c.name }))}
          />
        </Reveal>

        <h2 className="mb-3 mt-8 font-display text-lg font-bold">My Collections</h2>

        {collections.length === 0 ? (
          <p className="text-sm text-ink/60">
            Belum ada koleksi. Buat koleksi pertamamu di bawah.
          </p>
        ) : null}

        <CollectionsGrid collections={collections} />
      </div>
    </main>
  );
}
