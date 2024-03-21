"use client"; 

import {Box, Flex, Heading, Button, Text, Grid, SimpleGrid} from '@chakra-ui/react';
import {FaArrowRight} from "react-icons/fa6";
import Image from 'next/image'
import vr from '../../../../../public/hero/hero_1.png';
import headphones from '../../../../../public/hero/hero_5.png';
import balloons from '../../../../../public/hero/hero_10.png';
import swiggle from '../../../../../public/hero/hero_9.png';
import twizzler from '../../../../../public/hero/hero_8.png';
import watch from '../../../../../public/hero/hero_7.png';
import coin_1 from '../../../../../public/hero/hero_6.png';
import coin_2 from '../../../../../public/hero/hero_4.png';
import coin_3 from '../../../../../public/hero/hero_3.png';
import coin_4 from '../../../../../public/hero/hero_2.png';
import coin_5 from '../../../../../public/hero/coin_5.png';
import coin_6 from '../../../../../public/hero/coin_6.png';

import TransactionContainer from "../../../../app/components/Transaction/TransactionContainer";

import { useState, useEffect } from "react"
import { getCustomer } from '@lib/data';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

const Hero = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });

    useEffect(() => {
        getCustomer().then((customer) => {
            setLoggedIn(customer?.has_account ? true : false);
        }).catch(() => { console.log("hero: customer not found") });
    }, []);
    
    return (
        <>
        <Flex maxW="100%" bg="black" p={5}>
            <Box
                p={5}
                mx={12}
                borderRadius="2xl"
                boxShadow="lg"
                marginLeft={{ lg: 4 }}
                marginRight={{ lg: 4 }}
                flex="1" width="70%" bg="#2C272D">
                <Box
                    p={5}
                    m={6}
                    borderRadius="2xl"
                    boxShadow="lg"
                    marginLeft={{lg: 4}}
                    marginRight={{lg: 4}}
                    flex="1" bg="black"
                    position="relative" // Add this line
                >

                <Box flex="1" ml={12}>
                            <Text fontSize="4xl" color="white" textAlign="left">
                                Buy & Sell <br/>
                                Products Using <br/>
                                <Box as="span" fontWeight="bold">Crypto</Box> as a <br/>
                                Community
                            </Text>
                            <Text fontSize="xl" m={2}>
                                By The
                                <Box as="span" fontWeight="bold"> People </Box>
                                <Box as="span" display="inline-flex" alignItems="center"><FaArrowRight
                                    className="ml-1 mr-2"
                                    fontSize={15}/></Box>
                                For The<Box as="span" fontWeight="bold"> People</Box>
                                <br/>
                                Using Blockchain Tech
                            </Text>
                            <Button fontWeight="italic"
                                    size='lg'
                                    bg="transparent"
                                    color="white"
                                    borderRadius="full"
                                    onClick={connect}
                                    border="2px" // Sets the border width
                                    borderColor="whiteAlpha.600">Connect wallet <Box as="span" m={2}/> <FaArrowRight/>
                            </Button>
                        </Box>
                        <Box flex="1" className="hidden md:block">
                            <Box position="absolute" top={0} right={0} overflow="hidden">
                                <Image
                                    width={200} // Set the width
                                    height={300} // Set the height
                                    src={balloons.src} alt="Image Balloons"/>
                            </Box>
                            <Box zIndex={2} position="absolute" top={70} right={300} overflow="hidden">
                                <Image width={200} height={300} src={vr.src} alt="Image description"/>
                            </Box>
                            <Box position="absolute" zIndex={1} top={190} right={210} overflow="hidden">
                                <Image width={110} height={110} src={headphones.src} alt="Image description"/>
                            </Box>
                            <Box position="absolute" zIndex={1} top={180} right={180} overflow="hidden">
                                <Image width={80} height={80} src={coin_3.src} alt="Image description"/>
                            </Box>
                            <Box position="absolute" zIndex={1} top={250} right={150} overflow="hidden">
                                <Image width={80} height={80} src={coin_2.src} alt="Image description"/>
                            </Box>
                            <Box position="absolute" zIndex={1} top={55} right={225} overflow="hidden">
                                <Image width={120} height={120} src={coin_4.src} alt="Image description"/>
                            </Box>
                            <Box position="absolute" top={100} right={440} zIndex={1} overflow="hidden">
                                <Image
                                    width={110} // Set the width
                                    height={110} // Set the height
                                    src={swiggle.src} alt="Image Balloons"/>
                            </Box>
                            <Box position="absolute" top={50} right={450} zIndex={1} overflow="hidden">
                                <Image
                                    width={110} // Set the width
                                    height={110} // Set the height
                                    src={coin_5.src} alt="Image Balloons"/>
                            </Box>
                            <Box position="absolute" top={290} right={440} zIndex={1} overflow="hidden">
                                <Image
                                    width={90} // Set the width
                                    height={140} // Set the height
                                    src={twizzler.src} alt="Image Balloons"/>
                            </Box>
                            <Box position="absolute" top={150} right={530} zIndex={1} overflow="hidden">
                                <Image
                                    width={130} // Set the width
                                    height={130} // Set the height
                                    src={coin_1.src} alt="Image Balloons"/>
                            </Box>
                            <Box position="absolute" top={250} right={520} overflow="hidden">
                                <Image
                                    width={50} // Set the width
                                    height={45} // Set the height
                                    src={watch.src} alt="Image Balloons"/>
                            </Box>
                            <Box position="absolute" top={200} right={570} overflow="hidden">
                                <Image
                                    width={50} // Set the width
                                    height={45} // Set the height
                                    src={coin_6.src} alt="Image Balloons"/>
                            </Box>

                        </Box>
                </Box>
            </Box>
        </Flex>
        </>
    )
}

export default Hero;
