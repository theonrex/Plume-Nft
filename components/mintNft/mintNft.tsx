import React, { useEffect, useState, useRef } from "react";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { contract } from "@/consts/parameters";
import styles from "./mintNft.module.css";
import ConnectWalletButton from "@/components/connectWalletBtn";
import Image from "next/image";
import YellowImage from "../../public/images/cisar yellow.png";
import { FaEye } from "react-icons/fa";
import {
  useNextTokenIdToMint,
  useNftName,
  useBalanceOf,
  getClaimConditionById,
  useTokenuri,
  useOwnedNfts,
} from "@/hooks";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import ColorThief from "colorthief";

const convertIpfsToHttp = (ipfsUri: string | undefined) => {
  if (ipfsUri && ipfsUri.startsWith("ipfs://")) {
    return ipfsUri.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return ipfsUri;
};

export default function MintNft() {
  const [metadata, setMetadata] = useState<any>(null);
  const [ownedNFTs, setOwnedNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bgGradient, setBgGradient] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const activeAccount = useActiveAccount();
  const {
    mutate: sendTransaction,
    isError,
    isPending,
    isSuccess,
    error,
  } = useSendTransaction();

  // console.log("isError", error);
  const owner = activeAccount?.address || "";

  const { data: nftNmae, isLoading } = useNftName();
  const { data: NextTokenIdToMint } = useNextTokenIdToMint();
  const { getClaimConditionByIdData } = getClaimConditionById();
  const nextTokenId = NextTokenIdToMint ? Number(NextTokenIdToMint) : undefined;
  const { data: Tokenuri } = useTokenuri({ NextTokenIdToMint: nextTokenId });
  const { data: BalanceOf } = useBalanceOf(owner);

  // console.log("useOwnedNfts", ownedNFTs);

  useEffect(() => {
    const fetchMetadata = async () => {
      const url = convertIpfsToHttp(Tokenuri);
      if (url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          data.image = convertIpfsToHttp(data.image);
          setMetadata(data);
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      }
    };

    fetchMetadata();
  }, [Tokenuri]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const { ownedNFTs } = await useOwnedNfts(owner);
        const filteredNFTs = ownedNFTs.items.filter(
          (nft: { token: { address: string } }) =>
            nft.token.address === "0xa0EB5036bd9b0284c64175ac0264Be96a82ca90c"
        );
        setOwnedNFTs(filteredNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [owner]);

  useEffect(() => {
    if (metadata && imgRef.current) {
      const colorThief = new ColorThief();
      const img = imgRef.current;

      img.onload = () => {
        const colors = colorThief.getPalette(img, 2);
        const gradient = `linear-gradient(135deg, rgb(${colors[0].join(
          ","
        )}), rgb(${colors[1].join(",")}))`;
        setBgGradient(gradient);
      };

      // Ensure the image has been loaded for colorThief to work
      if (img.complete) {
        img.onload(null as unknown as Event);
      }
    }
  }, [metadata]);

  const mintNft = () => {
    if (owner) {
      const transaction = claimTo({
        contract,
        to: owner,
        quantity: BigInt(1), // Convert to bigint
      });
      sendTransaction(transaction);
    } else {
      toast.error("Owner is undefined");
    }
  };

  const pricePerToken = getClaimConditionByIdData?.pricePerToken
    ? ethers.formatEther(getClaimConditionByIdData.pricePerToken)
    : "";

  const startTimestamp = getClaimConditionByIdData?.startTimestamp
    ? new Date(
        Number(BigInt(getClaimConditionByIdData.startTimestamp) * BigInt(1000))
      ).toLocaleDateString()
    : "";

  useEffect(() => {
    if (isError) {
      toast.error(`Transaction failed ${error.message}`);
    } else if (isSuccess) {
      toast.success("Transaction successful");
    } else if (isPending) {
      toast.info("Transaction pending");
    }
  }, [isError, isPending, isSuccess]);

  return (
    <div>
      <ToastContainer />
      <div className={styles.Signin}>
        <div className={styles.Signin_Img}>
          <Image
            src={YellowImage}
            alt="Sign In image"
            width={600}
            height={600}
          />
        </div>
        <div className={styles.SignIn_Detials}>
          <h1>
            MINT <span>3D printed</span>
            <br /> miniature model
          </h1>
          <h3>
            Unveil the grandeur and legacy of ancient Rome with Caesar, an
            exclusive NFT that captures the essence of one of history's most
            iconic figures. This digital masterpiece portrays Julius Caesar in
            all his imperial glory, with intricate details that bring to life
            the power, wisdom, and ambition that defined his era.
          </h3>
          <div className={styles.ConnectButton}>
            <button className={styles.Mint_NFT} onClick={mintNft}>
              {isPending ? "Loading" : "Mint NFT"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.mint_absolute}>
        <div className={styles.mint_div}>
          <div className={styles.mint_details}>
            <h1> {nftNmae ? nftNmae : ""} </h1>
            <ul>
              <li>
                <b>Total Suppy </b>
                <span>
                  {NextTokenIdToMint ? NextTokenIdToMint.toString() : ""}
                </span>
              </li>
              <li>
                <b> Balance</b> {BalanceOf}
                <span>{BalanceOf ? BalanceOf.toString() : "0"}</span>
              </li>
              <li>
                <b> Base Price</b>
                <span>{pricePerToken ? `${pricePerToken} Eth` : ""}</span>
              </li>
              <li>
                <b> Mint Date</b>{" "}
                <span> {startTimestamp ? startTimestamp : ""}</span>{" "}
              </li>
            </ul>
          </div>{" "}
          {metadata && (
            <div
              className={styles.NftImg}
              style={{ background: bgGradient || "defaultBackgroundColor" }}
            >
              <img
                ref={imgRef}
                src={metadata?.image}
                alt="NFT image"
                crossOrigin="anonymous"
                style={{ display: "none" }}
              />
              <Image
                src={metadata?.image}
                alt="NFT image"
                width={600}
                height={600}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
