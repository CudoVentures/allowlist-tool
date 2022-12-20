import { darkScrollbar } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import CustomBit from '../../public/fonts/CustomBit.woff'
import { COLORS_DARK_THEME } from './colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '',
      main: COLORS_DARK_THEME.PRIMARY_BLUE,
      dark: ''
    },
    secondary: {
      light: '',
      main: COLORS_DARK_THEME.SECONDARY_DARK,
      dark: ''
    },
    background: {
      default: COLORS_DARK_THEME.DARK_BACKGROUND,
      paper: COLORS_DARK_THEME.DARK_BACKGROUND
    },
    text: {
      primary: COLORS_DARK_THEME.PRIMARY_TEXT,
      secondary: COLORS_DARK_THEME.SECONDARY_TEXT
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 14
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '0.9rem, 1.2rem',
          fontSize: '0.9rem',
          '&:before': {
            border: 'none'
          },
          '&:focus': {
            background: 'transparent'
          }
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none'
        },
        root: {
          fontSize: '14px'
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.MuiPaper-root": {
            borderRadius: "32px",
          },
          padding: '10px 10px 10px 20px',
          background: COLORS_DARK_THEME.PRIMARY_DARK_BLUE_50
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          background: 'transparent',
          fontWeight: 700,
          textTransform: 'none',
          color: 'white',
          padding: '16px 24px 16px 24px',
        },
        containedPrimary: {
          fontWeight: 700,
          borderRadius: '26px',
          background: COLORS_DARK_THEME.PRIMARY_BLUE,
          color: 'white',
          padding: '16px 24px 16px 24px',
          textTransform: 'none',
          '&:hover': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE_HOVER
          },
          '&:click': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE_CLICK
          },
          '&:disabled': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE_DISABLED
          }
        },
        containedSecondary: {
          borderRadius: '26px',
          background: COLORS_DARK_THEME.SECONDARY_BLUE,
          color: 'red',
          padding: '16px 24px 16px 24px',
          textTransform: 'none',
          '&:hover': {
            background: COLORS_DARK_THEME.SECONDARY_BLUE_HOVER
          },
          '&:click': {
            background: COLORS_DARK_THEME.SECONDARY_BLUE_CLICK
          },
          '&:disabled': {
            background: COLORS_DARK_THEME.SECONDARY_BLUE_DISABLED
          }
        },
        textPrimary: {
          color: COLORS_DARK_THEME.PRIMARY_BLUE,
          fontWeight: 700,
          textTransform: 'none',
          '&:hover': {
            textDecoration: 'underline 2px',
            background: 'none'
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
          {
            display: 'none'
          },
          '& input:-internal-autofill-selected':
          {
            WebkitBoxShadow: '0 0 0 30px rgb(40, 49, 78) inset !important',
            WebkitTextFillColor: 'white !important',
            caretColor: 'white !important'
          },
          '& input[type=number]': {
            MozAppearance: 'textfield'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          ...darkScrollbar({
            track: 'transparent',
            thumb: COLORS_DARK_THEME.SECONDARY_TEXT,
            active: 'transparent'
          }),
          '*::-webkit-scrollbar': {
            width: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: COLORS_DARK_THEME.SECONDARY_TEXT,
            borderRadius: '2px'
          }
        },
        '@font-face': {
          fontFamily: 'CudosBit',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `url(${CustomBit}) format('woff')`,
          unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          minWidth: 'max-content',
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.PRIMARY_BACKGROUND,
          boxShadow: 'none',
          borderRadius: '5px',
          borderCollapse: 'collapse',
          overflow: 'hidden'
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          border: 'none',
          background: 'transparent'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
          color: COLORS_DARK_THEME.SECONDARY_TEXT
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
          background: 'transparent',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
          borderRadius: '30px',
          minHeight: '34px',
          height: '34px'
        },
        indicator: {
          display: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
          borderRadius: '30px',
          fontSize: '12px',
          fontWeight: 600,
          minHeight: '34px',
          height: '34px',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE,
            transition: 'background .3s ease-in-out'
          }
        }
      }
    }
  },
  custom: {
    backgrounds: {
      light: COLORS_DARK_THEME.LIGHT_BACKGROUND,
      primary: COLORS_DARK_THEME.PRIMARY_BACKGROUND,
      dark: COLORS_DARK_THEME.DARK_BACKGROUND
    }
  }
})

export default theme
