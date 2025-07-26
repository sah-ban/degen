import { NobleEd25519Signer, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import { Hex, fromHex } from "viem";

export const hubClient = getSSLHubRpcClient("hub-grpc.pinata.cloud");

export function getSigner(accountPrivateKey: Hex) {
    return new NobleEd25519Signer(fromHex(accountPrivateKey, "bytes"));
}