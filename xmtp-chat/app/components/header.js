import ConnectWallet from "./connectWallet";

export default function Header() {
  return (
    <section className="w-full h-14 flex justify-between items-center px-8 border border-b">
      <h1 className="text-lime-600 text-2xl font-semibold">
        <span className="bg-lime-600 px-2 text-slate-100">XMTP</span> Chat
      </h1>
      <ConnectWallet />
    </section>
  );
}
