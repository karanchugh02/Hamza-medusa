import React from 'react';
import {Grid, Box, HStack, Button, Flex} from '@chakra-ui/react';
import StoreTemplate from "@modules/store/templates"
import fire from '../../../../../public/fire.png'
import gift from '../../../../../public/gift.png'
import game from '../../../../../public/games.png'
import laptop from '../../../../../public/electronics.png'
import collections from '../../../../../public/collections.png'
import coinbase from '../../../../../public/coinbase.png'
import metamask from '../../../../../public/metamask.png'
import rainbow from '../../../../../public/rainbow.jpeg'
import wallet from '../../../../../public/wallet.png'
import arrow from '../../../../../public/Vector.png'
// TODO: We need to get CORS working such that
// We can import the products by Category, etc...
import Image from 'next/image'

const RecommendedItems = () => {

    return (
        <Flex maxW="100%" bg="black" p={5}>
            <Box
                p={5}
                mx={12}
                bgGradient="linear(to-l, #53594A 70%, #2C272D 100%)" // This creates a gradient from right to left
                borderRadius="2xl"
                boxShadow="lg"
                marginLeft={{ lg: 4 }}
                marginRight={{ lg: 4 }}
                flex="1" width="70%" bg="#2C272D">
                <HStack justifyContent="space-around" mx={12} my={6}>
                    <Box
                        color="whitesmoke"
                        fontWeight="bold"
                        fontSize="2xl"
                        textAlign="center"
                    >
                        CONNECT YOUR <br/>
                        FAVORITE WALLET
                    </Box>
                    <Image className="mr-4" src={arrow} alt={"Img of arrow"} width={22} height={22}/>

                    <Button fontWeight="italic"
                            size='md'
                            bg="transparent"
                            color="white"
                            borderRadius="full"
                            border="1px" // Sets the border width
                            borderColor="whiteAlpha.600"
                    >
                        <Image className="mr-2" src={coinbase} alt={"Img of coinbase"} width={22} height={22}/>
                        Coinbase</Button>
                    <Button fontWeight="italic"
                            size='md'
                            bg="transparent"
                            color="white"
                            borderRadius="full"
                            border="1px" // Sets the border width
                            borderColor="whiteAlpha.600"
                    >
                        <Image className="mr-2" src={metamask} alt={"Img of a game"} width={22} height={22}/>

                        Metamask</Button>
                    <Button fontWeight="italic"
                            size='md'
                            bg="transparent"
                            color="white"
                            borderRadius="full"
                            border="1px" // Sets the border width
                            borderColor="whiteAlpha.600"
                    >
                        <Image className="mr-2" src={rainbow} alt={"Img of a laptop"} width={22} height={22}/>
                        Rainbowkit</Button>
                    <Button fontWeight="italic"
                            size='md'
                            bg="transparent"
                            color="white"
                            borderRadius="full"
                            border="1px" // Sets the border width
                            borderColor="whiteAlpha.600"
                    >
                        <Image className="mr-2" src={wallet} alt={"Img of a collections"} width={22} height={22}/>
                        Wallet Connect</Button>
                </HStack>
                <Box
                    height="1px"
                    bg="whiteAlpha.600"
                    opacity="0.5"
                    width="full"
                    borderRadius="full"
                />
                <HStack justifyContent="space-around" mx={12} my={6}>
                    <Button fontWeight="italic" bg="white"
                            size='lg'
                            color="black"
                            borderRadius="full">
                        <Image className="mr-2" src={fire} alt={"Img of a fire"} width={22} height={22}/>
                        Best Sellers</Button>
                    <Button fontWeight="italic" bg="black"
                            size='lg'
                            color="white"
                            borderRadius="full">
                        <Image className="mr-2" src={gift} alt={"Img of a gift"} width={22} height={22}/>
                        Gift Cards</Button>
                    <Button fontWeight="italic" bg="black"
                            size='lg'
                            color="white"
                            borderRadius="full">
                        <Image className="mr-2" src={game} alt={"Img of a game"} width={22} height={22}/>

                        Games</Button>
                    <Button fontWeight="italic" bg="black"
                            size='lg'
                            color="white"
                            borderRadius="full">
                        <Image className="mr-2" src={laptop} alt={"Img of a laptop"} width={22} height={22}/>
                        Electronics</Button>
                    <Button fontWeight="italic" bg="black"
                            size='lg'
                            color="white"
                            borderRadius="full">
                        <Image className="mr-2" src={collections} alt={"Img of a collections"} width={22} height={22}/>
                        Collectible</Button>
                </HStack>
                <StoreTemplate/>
            </Box>
        </Flex>
    );
};

export default RecommendedItems;
