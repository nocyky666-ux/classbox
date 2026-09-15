import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CollectionIcon } from "@/components/linkvault/CollectionIcon";
import { LinkRow } from "@/components/linkvault/LinkRow";
import { QuickAddBar } from "@/components/linkvault/QuickAddBar";
import { IconLinkButton } from "@/components/ui/IconButton";
import { IconBack } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export default async function CollectionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = await prisma.collection.findUnique({
    where: { id: params.id },
    include: { links: { orderBy: { createdAt: "desc" } } },
  });

  if (!collection) notFound();

  return (
    <main className="min-h-[100dvh] bg-cream pb-16">
      <div className="mx-auto max-w-md px-5 pt-8">
        <IconLinkButton href="/linkvault" label="Kembali ke koleksi" className="mb-6">
          <IconBack size={18} />
        </IconLinkButton>

        <Reveal className="mb-6 flex items-center gap-3">
          <CollectionIcon icon={collection.icon} color={collection.color} />
          <div>
            <h1 className="font-display text-2xl font-bold">{collection.name}</h1>
            <p className="text-sm text-ink/50">
              {collection.links.length} link{collection.links.length === 1 ? "" : "s"}
            </p>
          </div>
        </Reveal>

        <QuickAddBar
          collections={[{ id: collection.id, name: collection.name }]}
          defaultCollectionId={collection.id}
        />

        <div className="mt-6 rounded-xl2 border-3 border-ink bg-white p-4 shadow-brut">
          {collection.links.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink/50">
              Belum ada link di sini. Tempel link pertama di atas.
            </p>
          ) : (
            collection.links.map((link) => (
              <LinkRow
                key={link.id}
                link={{ ...link, createdAt: link.createdAt.toISOString() }}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
