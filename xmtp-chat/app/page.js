"use client";
import Header from "./components/header";
import LoggedIn from "./components/loggedIn";

export default function Home() {
  return (
    <main className="bg-slate-100 text-slate-800 flex min-h-screen flex-col items-center">
      <Header />
      <LoggedIn />
    </main>
  );
}
