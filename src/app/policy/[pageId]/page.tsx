import { Suspense } from "react";
import InfoPageClient from "./InfoPageClient";

async function InfoPageContent({
  params
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  return <InfoPageClient pageId={pageId} />;
}

export default function InfoPage({
  params
}: {
  params: Promise<{ pageId: string }>;
}) {
  return (
    <Suspense fallback={<p>Завантаження...</p>}>
      <InfoPageContent params={params} />
    </Suspense>
  );
}
