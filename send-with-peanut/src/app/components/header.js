import Image from "next/image";

import PeanutLogo from "../../assets/peanut-logo.png";

export default function Header() {
  return (
    <section className="bg-[#d698be] w-full h-24 flex justify-between items-center px-8">
      <Image src={PeanutLogo} alt="Peanut Logo" width={200} height={100} />
    </section>
  );
}
