import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Typography
} from '@mui/material';

import {
    LAYOUT_CONTENT_TEXT,
    SvgComponent
} from '../../../../../core/presentation/components/Layout/helpers';

import { FAQStyle } from './styles';

const faqArray = [
    { question: 'Frequently Asked Question', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
    { question: 'Frequently Asked Question', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
    { question: 'Frequently Asked Question', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
    { question: 'Frequently Asked Question', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
]

const FaqItem = ({ question, answer }: {
    question: string,
    answer: string
}) => {

    const [expanded, setExpanded] = useState<boolean>(false)

    const handleChange = () => {
        setExpanded(!expanded)
    }

    return (

        <Accordion
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
                <Typography
                    textAlign={'left'}
                    variant='subtitle1'
                    color='text.secondary'
                >
                    {answer}
                </Typography>
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
