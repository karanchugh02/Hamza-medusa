'use client'
import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Card,
    Heading,
    Text,
    Flex,
    Icon,
} from '@chakra-ui/react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaQuoteRight } from 'react-icons/fa'

const FAQSection = () => {
    return (
        <Box bg="black" p={5} className="w-full font-sora">
            <Card
                direction={{ base: 'column', md: 'row' }}
                overflow="hidden"
                minHeight="500"
                variant="outline"
                bg="#2C272D"
                justifyContent="center"
                alignItems="center"
                borderRadius="2xl"
                marginLeft={{ lg: 4 }}
                marginRight={{ lg: 4 }}
            >
                <Flex>
                    <Box minW="700px" flex="1">
                        <Heading
                            color="white"
                            mb={4}
                            fontSize={{ base: '3xl', md: '4xl' }}
                        >
                            Got questions? <br />
                            We've got answers.
                        </Heading>
                        <Text
                            color="white"
                            fontSize={{ base: 'md', md: 'lg' }}
                            opacity={0.7}
                        >
                            Everything you need to know about the product and
                            billing.
                        </Text>
                    </Box>

                    <Box flex="1">
                        <Accordion minW="700px">
                            <Box maxW="700px" borderBottom="2px solid white">
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            _expanded={{
                                                bg: 'blue.900',
                                                color: 'white',
                                            }}
                                        >
                                            <Box
                                                color="white"
                                                flex="1"
                                                textAlign="left"
                                            >
                                                Is there a free trial available?
                                            </Box>
                                            <Icon
                                                color="white"
                                                as={CiCirclePlus}
                                                boxSize={8}
                                            />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel color="white" pb={4}>
                                        Yes, you can try us for free for 30
                                        days. If you want, we'll provide you
                                        with a free, personalized 30-minute
                                        onboarding call to get you up and
                                        running as soon as possible.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>

                            {/* Can I change my plan later? */}
                            <Box maxW="700px" borderBottom="2px solid white">
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            _expanded={{
                                                bg: 'blue.900',
                                                color: 'white',
                                            }}
                                        >
                                            <Box
                                                color="white"
                                                flex="1"
                                                textAlign="left"
                                            >
                                                Can I change my plan later?
                                            </Box>
                                            <Icon
                                                color="white"
                                                as={CiCirclePlus}
                                                boxSize={8}
                                            />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel color="white" pb={4}>
                                        Absolutely! You're free to upgrade or
                                        downgrade your plan at any time through
                                        your account settings.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>

                            {/* Can other info be added to an invoice? */}
                            <Box maxW="700px" borderBottom="2px solid white">
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            _expanded={{
                                                bg: 'blue.900',
                                                color: 'white',
                                            }}
                                        >
                                            <Box
                                                color="white"
                                                flex="1"
                                                textAlign="left"
                                            >
                                                Can other info be added to an
                                                invoice?
                                            </Box>
                                            <Icon
                                                color="white"
                                                as={CiCirclePlus}
                                                boxSize={8}
                                            />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel color="white" pb={4}>
                                        Yes, our invoicing system is highly
                                        customizable, allowing you to add
                                        additional information as needed.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>

                            {/* How do I change my account email? */}
                            <Box maxW="700px" borderBottom="2px solid white">
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            _expanded={{
                                                bg: 'blue.900',
                                                color: 'white',
                                            }}
                                        >
                                            <Box
                                                color="white"
                                                flex="1"
                                                textAlign="left"
                                            >
                                                How do I change my account
                                                email?
                                            </Box>
                                            <Icon
                                                color="white"
                                                as={CiCirclePlus}
                                                boxSize={8}
                                            />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel color="white" pb={4}>
                                        To change your account email, visit the
                                        account settings page and follow the
                                        instructions for updating your email
                                        address.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>

                            {/* How does billing work? */}
                            <Box maxW="700px" borderBottom="0">
                                {' '}
                                {/* Last item, no bottom border */}
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton
                                            _expanded={{
                                                bg: 'blue.900',
                                                color: 'white',
                                            }}
                                        >
                                            <Box
                                                color="white"
                                                flex="1"
                                                textAlign="left"
                                            >
                                                How does billing work?
                                            </Box>
                                            <Icon
                                                color="white"
                                                as={CiCirclePlus}
                                                boxSize={8}
                                            />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel color="white" pb={4}>
                                        Billing occurs on a monthly basis. You
                                        will be charged the plan rate
                                        established at the time of signing up,
                                        with the option to change plans at any
                                        time.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>
                        </Accordion>
                    </Box>
                </Flex>
            </Card>
        </Box>
    )
}

export default FAQSection
