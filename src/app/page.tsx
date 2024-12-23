import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Weather Statistics Dashboard
        </h1>
        <WeatherDashboard />
      </main>
    </div>
  );
}
