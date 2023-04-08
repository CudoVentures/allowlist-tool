import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Divider, Fade, Input, MenuItem, Select, Typography } from "@mui/material"
import { CancelRounded } from '@mui/icons-material'

import { RootState } from "../../../store"
import { initialState, SearchFilter, updateSearchState } from "../../../store/search"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../Layout/helpers"
import { COLORS_DARK_THEME } from "../../../theme/colors"

import { styles } from "./styles"
import { allowlistDetailsStyles } from "../../../../features/allowlists/presentation/components/styles"
import { headerStyles } from "../Layout/styles"

const SearchBar = () => {

    const dispatch = useDispatch()
    const searchBar = useRef<HTMLInputElement>()
    const { searchTerms, appliedFilter, ascendingOrder } = useSelector((state: RootState) => state.searchState)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [displaySortingIcon, setDisplaySortingIcon] = useState<boolean>(true)
    const [showCloseIcon, setShowCloseIcon] = useState<boolean>(false)
    const [expand, setExpand] = useState<boolean>(false)
    const [placeholder, setPlaceholder] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(updateSearchState({
            searchTerms: event.target.value as string
        }))
    }

    const handleOrder = () => {
        setDisplaySortingIcon(false)
        setTimeout(() => {
            dispatch(updateSearchState({ ascendingOrder: !ascendingOrder }))
            setDisplaySortingIcon(true)
        }, 150)
    }

    const handleTransitionEnd = () => {
        if (expand) {
            searchBar.current?.click()
            setShowCloseIcon(true)
            setPlaceholder('Search by Allowlist Name')
        }
    }

    const handleExpand = () => {
        setExpand(true)
    }

    const handleShrink = () => {
        if (expand) {
            setExpand(false)
            setShowCloseIcon(false)
            setTimeout(() => {
                dispatch(updateSearchState({
                    searchTerms: '',
                    activeSearch: false
                }))
            }, 300)
        }
    }

    useEffect(() => {
        if (!showCloseIcon) {
            setPlaceholder('')
            handleShrink()
        }

        //eslint-disable-next-line
    }, [showCloseIcon])

    return (
        <Box sx={{ gap: '12px', display: 'flex', alignItems: 'center' }}>
            <Box
                onTransitionEnd={handleTransitionEnd}
                onClick={handleExpand}
                gap={2}
                display={'flex'}
                alignItems={'center'}
                sx={{ ...styles.searchBar, width: expand ? "300px" : '48px' }}
            >
                <Box sx={{ display: 'flex', marginLeft: '-7px' }}>
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.SearchIcon}
                        style={{ color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20 }}
                    />
                </Box>
                <Input
                    ref={searchBar}
                    disableUnderline
                    placeholder={placeholder}
                    type="text"
                    onChange={handleChange}
                    value={searchTerms}
                    sx={{ width: '100%', display: 'flex' }}
                    endAdornment={showCloseIcon ?
                        <Box onClick={() => setShowCloseIcon(false)}>
                            <CancelRounded sx={styles.cancelIcon} />
                        </Box>
                        : null}
                />
            </Box>
            <Divider orientation="vertical" sx={headerStyles.divider} />
            <Box
                id="sortingOrderBox"
                sx={styles.sortingOrder}
                onClick={() => !!appliedFilter ? handleOrder() : null}
            >
                <Fade in={displaySortingIcon} timeout={150}>
                    <Box sx={{
                        transform: !ascendingOrder ? 'rotateX(180deg)' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    >
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.SortingIcon}
                            style={{ color: !!appliedFilter ? 'inherit' : COLORS_DARK_THEME.PRIMARY_BLUE_DISABLED }}
                        />
                    </Box>
                </Fade>
            </Box>
            <Select
                MenuProps={styles.filterDropoDownMenuProps}
                disableUnderline
                displayEmpty
                variant='standard'
                open={filterOpen}
                onOpen={() => setFilterOpen(true)}
                onClose={() => setFilterOpen(false)}
                renderValue={() =>
                    appliedFilter ?
                        appliedFilter :
                        <Typography sx={styles.dropDownPlaceholder}>Sort By</Typography>
                }
                sx={styles.filterDropDown}
                value={appliedFilter || ''}
                onChange={(e) => dispatch(updateSearchState({ appliedFilter: e.target.value }))}
                IconComponent={() => <Box
                    sx={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }}
                    onClick={() => setFilterOpen(true)}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                        style={allowlistDetailsStyles.dropdownIcon}
                    />
                </Box>}
            >
                {Object.values(SearchFilter).map((filter, idx) => {
                    return <MenuItem sx={styles.menuItem} key={idx} value={filter}>{filter}</MenuItem>
                })}
            </Select>
        </Box>
    )
}

export default SearchBar
