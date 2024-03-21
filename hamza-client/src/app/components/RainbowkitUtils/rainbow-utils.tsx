import { getDefaultWallets, darkTheme } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig } from "wagmi"
import { mainnet, optimismSepolia, sepolia } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

const PROJECT_ID = "aba29725308468c8020e93258c08236e"

export const darkThemeConfig = darkTheme({
  accentColor: "#94D42A",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
})
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimismSepolia, mainnet, sepolia],
  [
    alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "VrVSe8y0T1pBnrwgzgFr2vtHl9Dtj3Fn",
    }),
    jsonRpcProvider({
      rpc: () => {
        return {
          http: `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "VrVSe8y0T1pBnrwgzgFr2vtHl9Dtj3Fn"}`,
        }
      },
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "op_sep",
  projectId: PROJECT_ID,
  chains,
})
// Config in v1.x.wagmi Client in 2.x.wagmi?
export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})
