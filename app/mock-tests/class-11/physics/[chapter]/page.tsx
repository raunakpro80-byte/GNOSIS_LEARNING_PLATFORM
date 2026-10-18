import { notFound } from "next/navigation";
import Gnosis from "@/components/Gnosis";
import { PublicMockChapter } from "@/components/PublicMockTests";
import { mockCatalog } from "@/lib/mock-bank";
import { publicMockChapterNumber } from "@/lib/public-mock-routes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata = {
  title: "Class 11 Physics Chapter Mock Test | GNOSIS",
};
export default async function Page({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const chapter = publicMockChapterNumber((await params).chapter);
  if (chapter === null) notFound();
  const catalog = await mockCatalog({
    className: "11",
    subject: "physics",
    chapter,
  });
  return <Gnosis publicMockContent={<PublicMockChapter catalog={catalog} />} />;
}
