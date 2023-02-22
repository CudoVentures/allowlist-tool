import { COLORS_DARK_THEME } from "../../../../core/theme/colors"

export const createAllowlistStyles = {
    holder: {
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHolder: {
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 4rem 8rem 4rem',
        maxWidth: '900px'
    },
}

export const generalStyles = {
    swiperSlide: {
        display: 'flex',
        justifyContent: 'center'
    },
    plusIconBackground: {
        background: COLORS_DARK_THEME.PRIMARY_BLUE,
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center'
    },
    clocIcon: {
        width: '24px',
        height: '24px',
        marginRight: '10px',
        color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20
    },
    avatar: {
        transform: "translateY(-70%)",
        backdropFilter: 'blur(16px)',
        border: "2px solid #F5FAFF",
        borderRadius: '16px',
        padding: '5px',
        minWidth: "128px",
        minHeight: "128px",
        width: "128px",
        height: "128px",
        objectFit: "fill" as 'fill'
    },
    banner: {
        borderRadius: '12px',
        width: "100%",
        minHeight: "210px",
        objectFit: "cover" as 'cover'
    },
    imgHolder: {
        position: 'relative',
        flexDirection: 'column',
        display: 'flex',
        height: '270px',
        alignItems: 'center'
    },
    swipersHolder: {
        width: '100%',
        padding: '4rem 4rem 6rem 4rem',
        display: 'flex',
        flexDirection: 'column'
    },
    swiper: {
        width: '100%',
        height: '100%',
        padding: '5px 0px 50px 0px'
    },
    createBox: {
        "&:hover": {
            transform: 'scale(1.025)'
        },
        transition: "transform 0.5s ease, top 0.5s ease",
        textAlign: 'center',
        padding: '16px 16px 24px 16px',
        cursor: 'pointer',
        justifyContent: 'center',
        marginLeft: '5px',
        background: 'transparent',
        border: "1px dashed #363E5A",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
        minHeight: '320px',
        width: '300px',
        height: '320px',
        borderRadius: '16px',
    },
    swiperDataBox: {
        "&:hover": {
            transform: 'scale(1.025)'
        },
        justifyContent: 'center',
        transition: "transform 0.5s ease, top 0.5s ease",
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 16px 24px 16px',
        width: '300px',
        height: '320px',
        borderRadius: '16px',
        background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100
    },
    swiperCard: {
        marginTop: '5px',
        borderRadius: '10px',
        paddingTop: '0',
        backgroundColor: 'rgba(99, 109, 143, 0.1)',
        height: '140px',
        width: '420px'
    },
    spinner: {
        width: '80px',
        height: '80vh',
        display: 'flex',
        alignSelf: 'center'
    }
}

export const swiperBreakpoints = () => {
    return {
        850: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1560: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        2000: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        2300: {
            slidesPerView: 5,
            spaceBetween: 20
        },
        2700: {
            slidesPerView: 6,
            spaceBetween: 20
        },
        3100: {
            slidesPerView: 7,
            spaceBetween: 20
        },
        3600: {
            slidesPerView: 8,
            spaceBetween: 20
        }
    }
}
