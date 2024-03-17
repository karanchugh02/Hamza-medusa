"use client"
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi'
import { bundlerActions, walletClientToSmartAccountSigner, ENTRYPOINT_ADDRESS_V06 } from 'permissionless'
import { pimlicoBundlerActions, pimlicoPaymasterActions, } from 'permissionless/actions/pimlico'
import { signerToSafeSmartAccount } from 'permissionless/accounts'
import { createSafeSmartAccount } from '../../lib/safe-4337/createAA';
import { sepolia } from 'viem/chains'
 

type safeAccountContextValue = {
    //These are NOT Type safe. Certainly need to be revisited
    authenticationStatus: any
    signer: any
    PublicClient: any
    bundlerClient: any
    pimlicoPaymasterClient: any
    walletClient: any
    safeAccount: any
    setAuthenticationStatus: (authenticationStatus: any) => void
    setSigner: (signer: any) => void
    setWalletClient: (walletClient: any) => void
    deploySafe: () => Promise<void>
    actuallyDeploySafe: () => Promise<void>
}

const initialState = {
    authenticationStatus: "unauthenticated",
    signer: null,
    PublicClient: null,
    bundlerClient: null,
    pimlicoPaymasterClient: null,
    walletClient: null,
    safeAccount: null,
    setAuthenticationStatus: (authenticationStatus: any) => {},
    setSigner: (signer: any) => {},
    setWalletClient: (walletClient: any) => {},
    deploySafe: async () => {},
    actuallyDeploySafe: async () => {}
}

const safeAccountContext = createContext<safeAccountContextValue>(initialState)

const useSafeAccountContext = () => {
    const context = useContext(safeAccountContext)
    if (!context) {
        throw new Error('useSafeAccountContext must be used within a SafeAccountProvider')
    }
    return context
}

const SafeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticationStatus, setAuthenticationStatus] = useState<any>(initialState.authenticationStatus)
    const [signer, setSigner] = useState<any>(initialState.signer)
    const [PublicClient, setPublicClient] = useState<any>(initialState.PublicClient)
    const [bundlerClient, setBundlerClient] = useState<any>(initialState.bundlerClient)
    const [pimlicoPaymasterClient, setPimlicoPaymasterClient] = useState<any>(initialState.pimlicoPaymasterClient)
    const [walletClient, setWalletClient] = useState<any>(initialState.walletClient)
    const [safeAccount, setSafeAccount] = useState<any>(initialState.safeAccount)

    

    // Create a Signer in the component

    // Initialize the Clients
    useEffect(() => {
        const initializeClient = async () => {
            try{
                const publicClient = await createPublicClient({
                    transport: http("https://rpc.ankr.com/eth_sepolia"),
                    chain: sepolia,
                });
                setPublicClient(publicClient)
                console.log("publicClient", publicClient)
            }catch(e){
                console.error("Error creating public client", e)
            }

            const PIMLICO_API_V1 = `https://api.pimlico.io/v1/gnosis/rpc?apikey=${process.env.PIMLICO_API_KEY}`

            const bundlerClient = await createClient({
            transport: http(PIMLICO_API_V1),
            chain: sepolia
            })
            .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
            .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06))

            setBundlerClient(bundlerClient)

            console.log("bundlerClient", bundlerClient)

            const PIMLICO_API_V2 = `https://api.pimlico.io/v2/gnosis/rpc?apikey=${process.env.PIMLICO_API_KEY
}`

            const pimlicoPaymasterClient = await createClient({
            transport: http(PIMLICO_API_V2),
            chain: sepolia
            }).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V06))

            setPimlicoPaymasterClient(pimlicoPaymasterClient)

            console.log("pimlicoPaymasterClient", pimlicoPaymasterClient)
            }
        initializeClient()
    }
    , [authenticationStatus])
    

    //need to implement resets when the wallet is disconnected and when the chain is changed
    const deploySafe = useCallback(async () => {
        if (walletClient) {
            const signer = walletClientToSmartAccountSigner(walletClient)
            setSigner(signer)
            try{
                const safeAccount = await signerToSafeSmartAccount(PublicClient, {
                    entryPoint: ENTRYPOINT_ADDRESS_V06,
                    signer: signer,
                    saltNonce: BigInt(0), // optional
                    safeVersion: "1.4.1",
                })
                setSafeAccount(safeAccount)
            }
            catch (e) {
                console.error("Error creating safe account", e)
            }
            
        }
    
    }, [walletClient])

    const actuallyDeploySafe = useCallback(async () => {
        console.log(walletClient);

        if (walletClient) {
            try{
                const signer = walletClientToSmartAccountSigner(walletClient)
                setSigner(signer); 
                
                await createSafeSmartAccount(signer);
            } catch (e) {
                console.error("Error deploying safe account", e)
            }
        }


    }, [] )

    const value = {
        authenticationStatus,
        signer,
        PublicClient,
        bundlerClient,
        pimlicoPaymasterClient,
        walletClient,
        safeAccount,
        setAuthenticationStatus,
        setSigner,
        setWalletClient,
        deploySafe,
        actuallyDeploySafe

    };

    return (
        <safeAccountContext.Provider value={value}>
            {children}
        </safeAccountContext.Provider>
    )

}

export { SafeContextProvider, useSafeAccountContext }