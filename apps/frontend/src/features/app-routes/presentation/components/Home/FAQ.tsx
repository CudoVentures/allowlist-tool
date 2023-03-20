import React, { Fragment, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Link,
    Typography
} from '@mui/material';

import {
    LAYOUT_CONTENT_TEXT,
    SvgComponent
} from '../../../../../core/presentation/components/Layout/helpers';

import { FAQStyle } from './styles';

const faqArray = [
    {
        question: 'What is an Allowlist?',
        answer: ['Allowlists in the world of NFTs represent a list of wallet addresses that have acquired or been given specific minting (or other) rights to a certain NFT project. Depending on the NFT project, these rights provide different opportunities for the users on the Allowlist. Most commonly, this represents the option to mint one or multiple NFTs before their official public launch.', 'The way to get onto an Allowlist is specified by each NFT project. The creators of the project specify certain criteria. If you are able to join an Allowlist, it means that you have fulfilled all the requirements. Examples of such requirements include participating in a Discord server, following certain accounts on social media, etc.']
    },
    {
        question: 'Is it free to create an Allowlist with Cudos’ Allowlist Tool?',
        answer: [
            'Yes, creating an Allowlist with Cudos is completely free!',
            'Our goal is to create an easy and efficient way for creators to launch their NFT projects on the Cosmos ecosystem.', 'If you wish to support us, you can do so by giving us a follow on Twitter at @CUDOS',
            'That’s all.'
        ]
    },
    {
        question: 'What criteria can be set for an Allowlist created with the Cudos Allowlist Tool?',
        answer: [
            'If you wish to create an Allowlist for your NFT project you can add several specific requirements for your audience.',
            'You can require a follow of a specific Twitter account, interaction with a certain Twitter post, participation in a Discord server (you can also specify a role the user should have), and lastly - providing an email.',
            'You are free to choose which of these criteria you’d like to add for your Allowlist.'
        ]
    },
    {
        question: 'Why do I need to sign a message when connecting my wallet?',
        answer: [
            'The signature required when connecting your wallet is a form of authentication. This is the only way for us to know that you are the actual owner of the wallet you are connecting with. This signing transaction is absolutely free.'
        ]
    },
]

const FaqItem = ({ question, answer }: {
    question: string,
    answer: string[]
}) => {

    const [expanded, setExpanded] = useState<boolean>(false)

    const handleChange = () => {
        setExpanded(!expanded)
    }

    return (

        <Accordion
            sx={{ width: '100%' }}
            disableGutters elevation={0} expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                sx={{ height: '80px' }}
                expandIcon={
                    expanded ?
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.MinusIcon}
                            style={FAQStyle.expandIcon}
                        /> :
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.PlusIcon}
                            style={FAQStyle.expandIcon}
                        />
                }
            >
                <Typography
                    variant='h6'
                    fontWeight={700}
                >
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{ height: 'max-content' }}
            >
                <Divider sx={{ margin: '0px 0px 30px 0px', width: '100%' }} />
                <Box gap={1} display={'flex'} flexDirection={'column'}>
                    {answer.map((line, idx) => {
                        if (line.endsWith('@CUDOS')) {
                            const lines = line.split('@CUDOS')
                            return (
                                <Typography
                                    key={idx}
                                    textAlign={'justify'}
                                    variant='subtitle1'
                                    color='text.secondary'
                                >
                                    {lines[0]}
                                    <Link
                                        sx={{ textDecoration: 'none' }}
                                        href={"https://twitter.com/CUDOS_"}
                                        rel="noreferrer"
                                        target='Cudos Twitter Account'
                                    >
                                        @CUDOS
                                    </Link>
                                </Typography>
                            )
                        }
                        return <Typography
                            key={idx}
                            textAlign={'justify'}
                            variant='subtitle1'
                            color='text.secondary'
                        >
                            {line}
                        </Typography>
                    })}
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

const FAQ = () => {

    return (
        <Box id='FAQ' gap={1} sx={FAQStyle.containerBox}>
            <Typography marginBottom={5} variant='h4' fontWeight={400}>
                Frequently Asked Questions
            </Typography>
            {faqArray.map((FAQ, idx) => {
                return (
                    <Box
                        id='FaqItemHolder'
                        key={idx}
                        style={FAQStyle.FaqItemHolder}
                    >
                        <FaqItem question={FAQ.question} answer={FAQ.answer} />
                    </Box>
                )
            })}
        </Box>
    )
}

export default FAQ
