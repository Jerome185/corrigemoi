import Header from "@/components/Header";
import CorrectionBox from "@/components/CorrectionBox";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Corrige ton texte
        </h1>

        <CorrectionBox />
      </div>
    </main>
  );
}