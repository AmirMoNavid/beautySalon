import Image from "next/image";
import Header from "./components/header";
import OwnerAndsalon from "./components/home/ownerAndsalon";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="w-full">
      <OwnerAndsalon />
    </div>
  );
}
