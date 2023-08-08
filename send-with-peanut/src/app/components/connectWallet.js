"use client";
import { useEffect, useState } from "react";

export default function ConnectWallet() {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  return (
    <section className="mt-10">
      {!currentAccount && (
        <button
          onClick={connectWallet}
          className="bg-[#4e9e95] hover:bg-[#5aada3] px-12 py-4 text-lg text-slate-100 rounded-3xl uppercase"
        >
          Connect Wallet
        </button>
      )}
    </section>
  );
}
