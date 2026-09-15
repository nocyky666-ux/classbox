import {
  IconFolder,
  IconBolt,
  IconBook,
  IconCoffee,
  IconPlane,
  IconHeart,
  IconStar,
  IconMusic,
} from "@/components/icons";

const ICONS = {
  folder: IconFolder,
  bolt: IconBolt,
  book: IconBook,
  coffee: IconCoffee,
  plane: IconPlane,
  heart: IconHeart,
  star: IconStar,
  music: IconMusic,
} as const;

export function CollectionIcon({
  icon,
  color,
  size = "md",
}: {
  icon: string;
  color: string;
  size?: "sm" | "md";
}) {
  const IconComp = ICONS[icon as keyof typeof ICONS] ?? IconFolder;
  const dim = size === "sm" ? "h-10 w-10" : "h-14 w-14";

  return (
    <div
      className={`flex ${dim} shrink-0 items-center justify-center rounded-xl border-3 border-ink shadow-brut-sm`}
      style={{ backgroundColor: color }}
    >
      <IconComp size={size === "sm" ? 18 : 24} />
    </div>
  );
}

export const ICON_OPTIONS = Object.keys(ICONS);
