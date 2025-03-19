import CharacterList from "./components/CharacterList.js";
// import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <CharacterList/>
      {/* <Footer/> */}
    </main>
  );
}
