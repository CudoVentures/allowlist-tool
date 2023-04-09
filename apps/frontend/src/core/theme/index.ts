import { darkScrollbar } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { fontSize, fontWeight } from '@mui/system'

import CustomBit from '../../public/fonts/CustomBit.woff'
import { COLORS } from './colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '',
      main: COLORS.LIGHT_BLUE[90],
      dark: ''
    },
    secondary: {
      light: '',
      main: COLORS.STEEL_GRAY[80],
      dark: ''
    },
    background: {
      default: COLORS.DARK_BLUE[100],
      paper: COLORS.DARK_BLUE[100]
    },
    text: {
      primary: COLORS.LIGHT_BLUE[10],
      secondary: COLORS.STEEL_GRAY[40]
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
          background: COLORS.LIGHT_BLUE[50]
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          background: 'transparent',
          fontWeight: 700,
          borderRadius: '26px',
          textTransform: 'none',
          color: COLORS.LIGHT_BLUE[10],
          padding: '16px 24px 16px 24px',
        },
        containedPrimary: {
          fontWeight: 700,
          borderRadius: '26px',
          background: COLORS.LIGHT_BLUE[90],
          color: COLORS.LIGHT_BLUE[10],
          padding: '16px 24px 16px 24px',
          textTransform: 'none',
          '&:hover': {
            background: COLORS.LIGHT_BLUE[80]
          },
          '&:click': {
            background: COLORS.LIGHT_BLUE[70]
          },
          '&:disabled': {
            background: COLORS.STEEL_GRAY[90],
            color: COLORS.STEEL_GRAY[50]
          }
        },
        containedSecondary: {
          borderRadius: '26px',
          background: COLORS.STEEL_GRAY[90],
          color: COLORS.LIGHT_BLUE[10],
          padding: '16px 24px 16px 24px',
          textTransform: 'none',
          '&:hover': {
            background: COLORS.STEEL_GRAY[90]
          },
          '&:click': {
            background: COLORS.STEEL_GRAY[70]
          },
          '&:disabled': {
            color: COLORS.STEEL_GRAY[50]
          }
        },
        textPrimary: {
          color: COLORS.LIGHT_BLUE[10],
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
        input: {
          '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: COLORS.STEEL_GRAY[20],
            opacity: 1,
            fontSize: '14px',
            fontWeight: 600
          }
        },
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
          },
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        'body': {
          overflowY: 'scroll',
        },
        'body::-webkit-scrollbar': {
          width: '4px',
          backgroundColor: 'transparent',
        },
        'body::-webkit-scrollbar-thumb': {
          borderRadius: '2px',
          backgroundColor: 'transparent',
        },
        html: {
          ...darkScrollbar({
            track: 'transparent',
            thumb: COLORS.STEEL_GRAY[40],
            active: 'transparent'
          }),
          '*::-webkit-scrollbar': {
            width: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: COLORS.STEEL_GRAY[40],
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
          background: COLORS.STEEL_GRAY[100],
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
          background: COLORS.STEEL_GRAY[90],
          color: COLORS.STEEL_GRAY[40]
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
          background: COLORS.STEEL_GRAY[90],
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
          background: COLORS.STEEL_GRAY[90],
          borderRadius: '30px',
          fontSize: '12px',
          fontWeight: 600,
          minHeight: '34px',
          height: '34px',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            background: COLORS.LIGHT_BLUE[90],
            transition: 'background .3s ease-in-out'
          }
        }
      }
    }
  },
  custom: {
    backgrounds: {
      light: COLORS.STEEL_GRAY[90],
      primary: COLORS.STEEL_GRAY[100],
      dark: COLORS.DARK_BLUE[100]
    }
  }
})

export default theme
