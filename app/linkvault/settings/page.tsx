import { prisma } from "@/lib/prisma";
import { ManageCollections } from "@/components/linkvault/ManageCollections";
import { IconLinkButton } from "@/components/ui/IconButton";
import { IconBack } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export default async function LinkVaultSettingsPage() {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { links: true } } },
  });

  return (
    <main className="min-h-[100dvh] bg-cream pb-16">
      <div className="mx-auto max-w-md px-5 pt-8">
        <IconLinkButton href="/linkvault" label="Kembali" className="mb-6">
          <IconBack size={18} />
        </IconLinkButton>

        <Reveal>
          <h1 className="mb-1 font-display text-2xl font-bold">Pengaturan</h1>
          <p className="mb-6 text-sm text-ink/60">
            Ubah nama atau hapus koleksi. Menghapus koleksi akan menghapus semua link di
            dalamnya.
          </p>
        </Reveal>

        {collections.length === 0 ? (
          <p className="text-sm text-ink/50">Belum ada koleksi.</p>
        ) : (
          <ManageCollections collections={collections} />
        )}
      </div>
    </main>
  );
}
