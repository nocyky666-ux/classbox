const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const existingCollections = await prisma.collection.count();
  if (existingCollections === 0) {
    await prisma.collection.createMany({
      data: [
        { name: "Unsorted", icon: "folder", color: "#B0B0B0" },
        { name: "Must watch", icon: "bolt", color: "#4ADE80" },
        { name: "Learning & Research", icon: "book", color: "#FFC700" },
        { name: "Coffee & Chill Spots", icon: "coffee", color: "#7ED957" },
        { name: "Travel plan", icon: "plane", color: "#FF4D8D" },
        { name: "Weekend Recipes", icon: "heart", color: "#7B61FF" },
      ],
    });

    const mustWatch = await prisma.collection.findFirst({ where: { name: "Must watch" } });
    const travel = await prisma.collection.findFirst({ where: { name: "Travel plan" } });

    if (mustWatch && travel) {
      await prisma.link.createMany({
        data: [
          { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", domain: "youtube.com", title: "Video tutorial keren", collectionId: mustWatch.id },
          { url: "https://www.airbnb.com", domain: "airbnb.com", title: "Sewa apartemen buat trip", collectionId: travel.id },
        ],
      });
    }
  }

  const trainerCount = await prisma.trainer.count();
  if (trainerCount === 0) {
    await prisma.trainer.create({
      data: {
        name: "Hillary Bale",
        email: "hill.bale@example.com",
        role: "JavaScript Trainer",
        bio: "Trainer JavaScript dengan pengalaman lebih dari 10 tahun di industri software development. Senang membantu orang belajar coding dan mengembangkan skill mereka.",
        photoUrl: "",
        yearsExp: 10,
        yearsTeach: 5,
        coursesQty: 12,
        rankLabel: "#1",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        experiences: {
          create: [
            { title: "Senior JavaScript Developer", company: "Firecracker Inc.", startDate: "Mei 2022", endDate: "Sekarang" },
            { title: "Senior JavaScript Developer", company: "Pro Property Maintenance", startDate: "Jan 2013", endDate: "Nov 2022" },
            { title: "Middle JavaScript Developer", company: "Cut Rite Lawn Care", startDate: "Mei 2012", endDate: "Nov 2013" },
          ],
        },
        reviews: {
          create: [
            { author: "Nicol W.", role: "Junior JavaScript Dev.", rating: 4.6, comment: "Progressnya kerasa banget cuma dalam seminggu! Bisa belajar dengan waktu singkat sesuai jadwal saya sendiri." },
            { author: "Stephanie N.", role: "Middle JavaScript Dev.", rating: 4.7, comment: "Suka banget cara ngajarnya, sabar dan kasih challenge yang pas buat ningkatin pemahaman konsep baru." },
            { author: "Vane F.", role: "Junior JavaScript Dev.", rating: 4.3, comment: "Pengalaman belajar yang keren. Interaktif banget, terutama pas belajar malam." },
          ],
        },
      },
    });

    await prisma.trainer.create({
      data: {
        name: "Marcus Reyna",
        email: "marcus.reyna@example.com",
        role: "Backend & Database Trainer",
        bio: "Fokus mengajar arsitektur backend, database design, dan best practice API. Percaya bahwa fundamental yang kuat bikin developer lebih percaya diri.",
        yearsExp: 8,
        yearsTeach: 3,
        coursesQty: 7,
        rankLabel: "#3",
        experiences: {
          create: [
            { title: "Backend Engineer", company: "Northwind Labs", startDate: "Jan 2020", endDate: "Sekarang" },
          ],
        },
        reviews: {
          create: [
            { author: "Dewi P.", role: "Backend Dev.", rating: 4.5, comment: "Penjelasan database-nya gampang dicerna, banyak studi kasus nyata." },
          ],
        },
      },
    });
  }

  console.log("Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
