import InfoPageClient from "./InfoPageClient";

export default async function InfoPage({
  params
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  return <InfoPageClient pageId={pageId} />;
}
