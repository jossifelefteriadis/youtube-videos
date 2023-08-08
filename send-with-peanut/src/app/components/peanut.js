"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";

import ConnectWallet from "./connectWallet";

function Peanut() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [signer, setSigner] = useState(null);
  //   const [chainId, setChainId] = useState(null);
  const [amount, setAmount] = useState();
  const [link, setLink] = useState(
    "https://peanut.to/claim?c=5&v=v3&i=243&p=xChtaH9t3ONAZczD&t=sdk"
  );
  const [linkStatus, setLinkStatus] = useState(null);
  //   const [isConnected, setIsConnected] = useState(false);
  const [claimTx, setClaimTx] = useState(null);
  //   const [warningMessage, setWarningMessage] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
    // if (window.ethereum) {
    //   console.log("hej1");
    //   window.ethereum.on("accountsChanged", function (accounts) {
    //     if (accounts.length !== 0) {
    //       console.log("hej2");

    //       setIsConnected(true);
    //       connectWallet();
    //     } else {
    //       console.log("hej3");

    //       setIsConnected(false);
    //       setSigner(null);
    //     }
    //   });

    //   window.ethereum.on("chainChanged", function (chainId) {
    //     console.log("hej4");

    //     console.log("chainChanged", chainId);
    //     if (chainId !== "0x5") {
    //       console.log("hej5");

    //       setWarningMessage("Please switch to Goerli network");
    //     } else {
    //       console.log("hej6");

    //       setWarningMessage(null);
    //     }
    //     connectWallet();
    //   });
    // }
  }, [currentAccount]);

  //   const connectWallet = async () => {
  //     if (isConnected) return;
  //     if (typeof window.ethereum !== "undefined") {
  //       window.ethereum.enable();
  //       const provider = new ethers.BrowserProvider(window.ethereum, "any");
  //       const signer = await provider.getSigner();

  //       // check chainId, if not goerli, show warning
  //       const network = await signer.provider.getNetwork();
  //       const chainId = network.chainId;
  //       if (chainId !== "0x5" && chainId !== 5 && chainId !== BigInt(5)) {
  //         setWarningMessage("Please switch to Goerli network");
  //       } else {
  //         setWarningMessage(null);
  //       }

  //       setSigner(signer);
  //       setIsConnected(true);
  //       setChainId((await provider.getNetwork()).chainId);
  //       console.log(signer.address, (await provider.getNetwork()).chainId);
  //     } else {
  //       alert("Please install MetaMask!");
  //     }
  //   };

  const checkIfWalletIsConnected = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const provider = new ethers.BrowserProvider(window.ethereum, "any");
      const signer = await provider.getSigner();
      const account = accounts[0];
      setCurrentAccount(account);
      setSigner(signer);
      //   setIsConnected(true);
      //   setChainId((await provider.getNetwork()).chainId);
    } else {
      console.log("No authorized account found");
    }
  };

  const createLink = async () => {
    if (!signer) throw new Error("Connect wallet first");
    const network = await signer.provider.getNetwork();
    const chainId = network.chainId;

    window.signer = signer;

    const { link, txReceipt } = await peanut.createLink({
      signer: signer,
      chainId: chainId,
      tokenAmount: amount,
      tokenType: 0, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
      verbose: true,
    });
    setLink(link);
  };

  const claimLink = async () => {
    if (!signer || !link) return;
    const claimTx = await peanut.claimLink({ signer: signer, link: link });
    setClaimTx(claimTx);
  };

  const checkLinkStatus = async () => {
    if (!signer || !link) throw new Error("signer or link is not set");
    try {
      // setLinkStatus({ claimed: true, deposit: null})
      const { claimed, deposit } = await peanut.getLinkStatus({
        signer: signer,
        link: link,
      });
      setLinkStatus(claimed);
    } catch (error) {
      console.error("Failed to check link status", error);
    }
  };

  return (
    <section className="w-4/6 h-4/6 flex justify-center">
      {!currentAccount && <ConnectWallet />}
      {currentAccount && (
        <section className="w-full h-full flex bg-[#4e9e95] mt-10 p-2 border-2 border-[#4e9e95] rounded">
          <section className="w-1/2">
            <section className="h-14 flex justify-center items-center">
              <section>
                <label htmlFor="amount" className="mr-2 text-lg">
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in ETH"
                  className="w-40 h-8 text-slate-900 text-right placeholder:text-slate-900 placeholder:text-sm placeholder:text-left placeholder:pl-2 outline-none"
                />
                <button
                  onClick={createLink}
                  className="w-40 h-8 bg-slate-100 hover:bg-slate-900 text-slate-900 hover:text-slate-100 font-semibold ml-4 px-6 border-2 border-slate-900 uppercase"
                >
                  Create link
                </button>
              </section>
            </section>
            <section className="flex justify-center mt-4">
              <button
                onClick={claimLink}
                className="w-2/3 h-14 bg-slate-100 hover:bg-black text-black text-lg hover:text-slate-100 font-semibold px-6 border-2 border-black uppercase"
              >
                Claim link
              </button>
            </section>
            <section className="mt-4">
              {claimTx && (
                <section className="flex flex-col items-center">
                  <p className="border-b-2 mb-2">CLAIM TX HASH</p>
                  <p>
                    <Link
                      href={`https://goerli.etherscan.io/tx/${claimTx.hash}`}
                      target="_blank"
                    >
                      {claimTx.hash.slice(0, 6)}...{claimTx.hash.slice(60)}
                    </Link>
                  </p>
                </section>
              )}
            </section>
          </section>
          <section className="w-1/2 flex justify-center border-l">
            <section className="p-4">
              <section>
                <section>
                  {link && (
                    <section className="h-20 flex flex-col items-center">
                      <h2 className="border-b-2 mb-2">SHARE THIS CLAIM LINK</h2>
                      <p>{link}</p>
                    </section>
                  )}
                </section>
                <section className="flex flex-col items-center mt-6">
                  <p className="border-b-2 mb-2">CHECK CLAIM STATUS</p>
                  <button
                    onClick={checkLinkStatus}
                    className="h-10 bg-slate-100 hover:bg-black text-black hover:text-slate-100 font-semibold mb-2 px-6 border-2 border-black uppercase"
                  >
                    Check Status
                  </button>
                  {linkStatus !== null && (
                    <section>
                      <p className="text-lg">
                        Link is claimed: {linkStatus.toString()}
                      </p>
                    </section>
                  )}
                </section>
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}

export default Peanut;
