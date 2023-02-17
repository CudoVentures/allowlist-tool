import React from "react";
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers";
import { COLORS_DARK_THEME } from "../../../../core/theme/colors";

export const menuStyles = {
  logoItem: {
    width: '24px',
    height: '24px',
    marginRight: '5px',
    color: 'white'
  }
}

export const summaryViewStyles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  linkHolder: {
    display: 'flex',
    alignItems: 'center'
  },
  editIconHolder: {
    width: '48px',
    height: '48px',
    padding: '12px',
    borderRadius: '50%',
    background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY,
    cursor: 'pointer',
    transition: 'opacity .3s ease-in-out',
    opacity: '0',
    visibility: 'hidden',
  },
}
export const allowListStyles = {
  title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  smallScreenGrid: {
    display: "grid",
    justifyItems: 'center',
    gridRowGap: '6rem'
  },
  grid: {
    justifyContent: "space-between",
    justifyItems: "stretch",
    display: "grid"
  },
  socialBoxHeader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  socialBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  smallScreenProfile: {
    gridRow: 1,
    gridColumn: 1,
    transform: "translate(40px, 60px)",
    backdropFilter: 'blur(16px)',
    border: "2px solid #F5FAFF",
    borderRadius: '16px',
    maxHeight: '400px',
    minHeight: '200px',
    maxWidth: '400px',
    minWidth: '200px',
    width: '20%',
    height: '20%',
    padding: '5px',
    alignSelf: 'end'
  },
  profile: {
    gridRow: 1,
    gridColumn: 1,
    transform: "translate(40px, 60px)",
    backdropFilter: 'blur(16px)',
    border: "2px solid #F5FAFF",
    borderRadius: '16px',
    maxHeight: '200px',
    minHeight: '200px',
    maxWidth: '200px',
    minWidth: '200px',
    width: 'auto',
    height: 'auto',
    padding: '5px',
    alignSelf: 'end'
  },
  smallScreenPanel: {
    alignItems: 'center',
    height: 'max-content',
    gridRow: 3,
    gridColumn: "1 / 3",
    display: 'flex',
    flexDirection: 'column',
    minWidth: '500px',
    maxWidth: '600px',
    padding: '48px',
    background: COLORS_DARK_THEME.PRIMARY_DARK_BLUE_80,
    borderRadius: '24px',
  },
  panel: {
    alignItems: 'center',
    height: 'max-content',
    gridRow: 2,
    gridColumn: 2,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '500px',
    maxWidth: '600px',
    padding: '48px',
    background: COLORS_DARK_THEME.PRIMARY_DARK_BLUE_80,
    borderRadius: '24px',
    transform: "translate(-40px, -60px)",
  },
  smallScreenDetails: {
    gridRow: 2,
    gridColumn: "1/3",
    minWidth: '400px',
    maxWidth: '600px',
  },
  details: {
    gridRow: 2,
    gridColumn: 1,
    padding: '100px 100px 0px 0px'
  },
  bannerImg: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    borderRadius: '16px'
  },
  banner: {
    gridRow: 1,
    gridColumn: "1 / 3",
    borderRadius: '16px',
    width: '100%',
    minHeight: '400px',
    marginTop: '-100px'
  },
  smallScreenBanner: {
    gridRow: 1,
    gridColumn: "1 / 3",
    borderRadius: '16px',
    width: '100%',
    maxHeight: '400px'
  },
  holder: {
    padding: '0rem 4rem 6rem 4rem',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHolder: {
    width: '100%',
    maxWidth: '1400px'
  },
}

export const allowlistPreviewStyles = {
  list: {
    lineHeight: 'normal',
    listStyleType: 'disc',
    pl: 2
  },
  listItem: {
    display: 'list-item',
    fontSize: '14px', padding: '1px'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '14px'
  },
  subTitle: {
    color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20,
    fontWeight: 600,
    fontSize: '14px'
  },
  holder: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '24px',
    width: '100%',
  },
}

export const generalStyles = {
  flexColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  holder: {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    borderRadius: '24px',
    width: '100%',
    background: COLORS_DARK_THEME.PRIMARY_DARK_BLUE_80
  },
  input: {
    border: '0.1px solid transparent',
    marginTop: '10px',
    padding: '16px 20px',
    borderRadius: '8px',
    width: '100%',
    background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY
  },
  titleIcons: {
    marginRight: '5px',
    width: '24px',
    height: '24px'
  },
}

export const registrationCriteriaStyles = {
  titleSwitchHolder: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
}

export const allowlistDetailsStyles = {
  dropDownPlaceholder: {
    fontSize: '14px',
    fontWeight: 600,
    color: COLORS_DARK_THEME.SECONDARY_TEXT
  },
  enabledDropDownPlaceholder: {
    fontSize: '14px',
    fontWeight: 600
  },
  datesHolder: {
    alignItems: 'flex-end',
    display: 'flex',
    width: '100%'
  },
  dropIcon: {
    width: '24px',
    height: '24px',
    color: COLORS_DARK_THEME.PRIMARY_BLUE
  },
  dropZone: {
    backgroundBlendMode: 'overlay',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    border: "1px dashed #363E5A"
  },
  fileUploaderHolder: {
    borderRadius: '16px',
    marginTop: '10px',
    width: '250px',
    height: '250px'
  },
  bannerUploaderHolder: {
    borderRadius: '16px',
    marginTop: '10px',
    width: '100%',
    height: '190px'
  },
  tooltip: {
    cursor: 'pointer',
    color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50
  },
  dialogProps: {
    PaperProps: {
      sx: {
        background: COLORS_DARK_THEME.DARK_BACKGROUND
      }
    }
  },
  timePickerInput: {
    placeholder: "Pick up a time",
    startAdornment: <SvgComponent
      type={LAYOUT_CONTENT_TEXT.ClockIcon}
      style={{ width: '24px', height: '24px', marginRight: '10px', color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20 }}
    />,
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        border: 'none'
      },
      border: '0.1px solid transparent',
      borderRadius: '8px',
      background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY,
    }
  },
  datePickerInput: {
    placeholder: "Pick up a date",
    startAdornment: <SvgComponent
      type={LAYOUT_CONTENT_TEXT.CalendarIcon}
      style={{ width: '24px', height: '24px', marginRight: '10px', color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20 }}
    />,
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        border: 'none'
      },
      borderRadius: '8px',
      border: '0.1px solid transparent',
      background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY,
    }
  },
  dropdownIcon: {
    cursor: 'pointer',
    color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20
  },
  defaultDropDown: {
    fontWeight: 600,
    fontSize: '14px',
    marginTop: '10px',
    padding: '16px 20px',
    height: '64px',
    borderRadius: '8px',
    width: '100%',
    background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY,
    border: '0px',
    outline: '0px',
  },
  holder: {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    borderRadius: '24px',
    width: '100%',
    background: COLORS_DARK_THEME.PRIMARY_DARK_BLUE_80
  }
}

export const validationStyles = {
  invalidDatePickerInput: {
    ...allowlistDetailsStyles.datePickerInput,
    sx: {
      ...allowlistDetailsStyles.datePickerInput.sx,
      border: `0.1px solid ${COLORS_DARK_THEME.TESTNET_ORANGE}`
    }
  },
  invalidTimerPickerInput: {
    ...allowlistDetailsStyles.timePickerInput,
    sx: {
      ...allowlistDetailsStyles.timePickerInput.sx,
      border: `0.1px solid ${COLORS_DARK_THEME.TESTNET_ORANGE}`
    }
  },
  invalidInput: {
    ...generalStyles.input,
    border: `0.1px solid ${COLORS_DARK_THEME.TESTNET_ORANGE}`,
  },
  connectedInput: {
    ...generalStyles.input,
    border: `0.1px solid ${COLORS_DARK_THEME.PRIMARY_BLUE}`,
  },
  connectedTooltipProps: {
    tooltip: {
      sx: {
        marginTop: '-50px',
        background: 'transparent',
        color: COLORS_DARK_THEME.PRIMARY_BLUE
      },
    },
  },
  tooltipProps: {
    tooltip: {
      sx: {
        marginTop: '-50px',
        background: 'transparent',
        color: COLORS_DARK_THEME.TESTNET_ORANGE
      },
    },
  },
  tooltipPopper: {
    sx: {
      zIndex: '1'
    },
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -10]
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom-start'],
          flipVariations: false, // true by default
        },
      },
    ],
  }
}
