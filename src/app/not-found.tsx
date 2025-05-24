import Error404 from "@/components/Error404/error404";

export const metadata = {
  title: "404 - Сторінку не знайдено | RECO",
  description: "Сторінку не знайдено. Поверніться на головну сторінку RECO.",
};

export default function NotFound() {
  return (
    <div className="container">
      <Error404 />
    </div>
  );
}
