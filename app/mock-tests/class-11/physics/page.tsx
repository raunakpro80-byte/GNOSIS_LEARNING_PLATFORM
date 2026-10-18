import Gnosis from "@/components/Gnosis";
import { PublicMockIndex } from "@/components/PublicMockTests";
import { mockCatalog } from "@/lib/mock-bank";
import { publicPhysicsMockChapters } from "@/lib/public-mock-routes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata = { title: "Class 11 Physics Mock Tests | GNOSIS" };
export default async function Page() {
  const catalogs = await Promise.all(
    publicPhysicsMockChapters.map((chapter) =>
      mockCatalog({
        className: "11",
        subject: "physics",
        chapter: chapter.number,
      }),
    ),
  );
  return <Gnosis publicMockContent={<PublicMockIndex catalogs={catalogs} />} />;
}
