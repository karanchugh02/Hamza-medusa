
import "dotenv/config"
import { useEffect, useState } from "react";

//wagmi and viem imports
import { sepolia } from "viem/chains"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount, useContractEvent, usePublicClient, useWalletClient } from "wagmi";
import { Address, concat, createClient, createPublicClient, encodeFunctionData, Hash, http, parseEther, getContract  } from "viem"

//permissionless
import { getAccountNonce, createSmartAccountClient, ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_ADDRESS_V06, bundlerActions, getSenderAddress, signUserOperationHashWithECDSA, UserOperation, walletClientToSmartAccountSigner } from "permissionless"
import { signerToSafeSmartAccount } from "permissionless/accounts"
import { createPimlicoBundlerClient, createPimlicoPaymasterClient } from "permissionless/clients/pimlico"
import  { SafeContextProvider, useSafeAccountContext } from "../../contexts/SafeContext"


//Contract Context
import counterabi from "../../../lib/counter"
const counterAddress = process.env.COUNTER_CONTRACT_ADDRESS as `0x${string}`;

//UI
import { Flex, Button } from '@chakra-ui/react';
import { set } from "lodash";
import { use } from "chai";

// //Pimlico Consts
// const apiKey = "dfc7d1e4-804b-41dc-9be5-57084b57ea73";
// const paymasterUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${apiKey}`;




const ButtonContainer = () => {
    const { setWalletClient, actuallyDeploySafe, walletClient, safeAccount } = useSafeAccountContext();
    const { data: currentWallet } = useWalletClient();
    setWalletClient(currentWallet);
    const [ clicker, setClicker ] = useState<boolean>(false);


    useEffect(() => {
        
        actuallyDeploySafe();
        console.log("safeAccount", safeAccount);
    }, [walletClient, clicker]);


    // const { data: WalletClient } = useWalletClient();

    // console.log("WalletClient", WalletClient);

    // const publicClient = createPublicClient({
    //     transport: http("https://rpc.ankr.com/eth_sepolia"),
    // });

    // console.log("publicClient", publicClient);
    
    // const paymasterClient = createPimlicoPaymasterClient({
    //     transport: http(paymasterUrl),
    //     entryPoint: ENTRYPOINT_ADDRESS_V07,
    // });

    // console.log ("paymasterClient", paymasterClient);

    // useEffect(() => {
    //     const fetchSafeAccount = async () => {
    //         if (WalletClient) {
    //             const signer = walletClientToSmartAccountSigner(WalletClient);
    //             console.log ("signer", signer);
    
    //             try{
    //                 const safeAccount = await signerToSafeSmartAccount(publicClient, {
    //                     entryPoint: ENTRYPOINT_ADDRESS_V06,
    //                     signer: signer,
    //                     saltNonce: BigInt(0), // optional
    //                     safeVersion: "1.4.1",
    //                 });
        
    //                 setSafeAccount(safeAccount);
    //             } catch (e) {
    //                 console.error("Error creating safe account", e);
    //             }
    //         }
    //     };
    
    //     fetchSafeAccount();
    //     console.log("safeAccount", safeAccount);

    // },[WalletClient, clicker])

    

        // const smartAccountClient = createSmartAccountClient({
        //     account: safeAccount,
        //     entryPoint: ENTRYPOINT_ADDRESS_V06,
        //     chain: sepolia,
        //     bundlerTransport: http("https://api.pimlico.io/v1/sepolia/rpc?apikey=API_KEY"),
        //     middleware: {
        //         gasPrice: async () => (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
        //         sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
        //     },
        // })

    

    const handleClick = async () => {
        if (clicker) {
            setClicker(false);
        }else {
            setClicker(true);
        }
    }   

    // const IncrementNumber = () =>  {
    //     const { config, error } = usePrepareContractWrite({
    //         address: counterAddress,
    //         abi: counterabi,
    //         functionName: "increment",
    //         args: []
    //     })
        
    //     const { write, data } = useContractWrite(config);

    //     function increment() { 
    //         write?.();
    //     }

    //     const { isLoading, isSuccess } = useWaitForTransaction({
    //         hash: data?.hash,
    //         onSettled() {
    //             console.log("Transaction complete");
    //         }
    //     })

    // }

    // const [number, setNumber] = useState<string>("");

    // const {address } = useAccount();
    // useEffect(() => {

    //     console.log("address", address);

    //     publicClient.getBlockNumber().then( blocknumber => {
    //         publicClient.getContractEvents({
    //             address: counterAddress,
    //             abi: counterabi,
    //             eventName: "NumberChanged",
    //             fromBlock: blocknumber - BigInt(1000),
    //             toBlock: "latest"
    //         }).then(events => {
    //             console.log("events", events);
    //         })
    //     })

    // }, [clicker]);
    
    return (
        <Flex justify="center" align="center" m={4}>
            <Button onClick={handleClick}>Click me</Button>
            {/* <Button onClick={IncrementNumber}>Click me Also</Button> */}
            {/* <p>{address}</p> */}
        </Flex>
    );
};

export default ButtonContainer;