import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Footer from './Footer'
import Header from './Header'
import { layoutStyles } from './styles'

const footerHeight = 50

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight - footerHeight,
    })

    const resizeHanlder = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setWindowSize({
            width: width,
            height: height - footerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHanlder);

        return () => {
            window.removeEventListener('resize', resizeHanlder);
        }
    }, [])

    return (
        <Box id='appWrapper' sx={layoutStyles.appWrapper} >
            <Header />
            <Box minHeight={`${windowSize.height}px`} sx={layoutStyles.contentHolder}>
                <Box
                    id='contentWrapper'
                    marginTop={10}
                    sx={layoutStyles.contentWrapper}>
                    {children}
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default Layout
