// app/policy/[pageId]/page.tsx

import { infoPages } from "@/constants/policy";
import InfoSection from "@/components/InfoSection/InfoSection";

interface InfoPageProps {
  params: { pageId: string };
}

export default function InfoPage({ params }: InfoPageProps) {
  const { pageId } = params;

  // Находим нужную страницу по pageId
  const pageData = infoPages.find((page) => page.id === pageId);

  if (!pageData) {
    return <p>Page not found!</p>;
  }

  return (
    <div className="container">
      <InfoSection title={pageData.title} content={pageData.content} />
    </div>
  );
}
