import { Suspense } from "react";
import ProductPageClient from "./ProductPageClient";

async function ProductPageContent({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductPageClient slug={slug} />;
}

export default function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="container flex items-center justify-center min-h-[50vh]">
          <div className="text-yellow-500 text-xl">Завантаження...</div>
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}
