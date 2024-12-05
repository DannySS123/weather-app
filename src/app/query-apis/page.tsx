import QueryAPIs from "@/components/QueryApis";

export default function QueryAPIsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Query Weather APIs
        </h1>
        <QueryAPIs />
      </main>
    </div>
  );
}
