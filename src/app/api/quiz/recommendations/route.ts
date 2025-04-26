import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import reco from "@/../public/images/products/recoil.png";

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();
    console.log("Sending answers to backend:", answers);

    // Отправляем запрос к бэкенду для получения рекомендаций
    const response = await fetch(
      "https://reco-backend-two.onrender.com/api/quiz/recommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend response error:", {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      throw new Error(
        `Failed to fetch recommendations from backend: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Received data from backend:", data);

    // Преобразуем данные в нужный формат
    const recommendedProducts = data.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      photo: reco,
      photoProduct: reco,
      type: product.type,
      description: product.description,
      price: product.sizes[0]?.price || 0,
      badgeInfo: product.badgeInfo,
      isNew: product.isNewProduct,
      score: product.score || 0,
      volume: product.volume || "",
      sizes: product.sizes.reduce((acc: any, size: any) => {
        acc[size.size] = size.price;
        return acc;
      }, {})
    }));

    return NextResponse.json({ recommendedProducts });
  } catch (error) {
    console.error("Error processing quiz recommendations:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process quiz recommendations"
      },
      { status: 500 }
    );
  }
}
