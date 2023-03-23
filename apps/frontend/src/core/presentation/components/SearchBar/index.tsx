import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Fade, Input, MenuItem, Select, Typography } from "@mui/material"

import { RootState } from "../../../store"
import { initialState, SearchFilter, updateSearchState } from "../../../store/search"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../Layout/helpers"
import { COLORS_DARK_THEME } from "../../../theme/colors"

import { styles } from "./styles"
import { allowlistDetailsStyles } from "../../../../features/allowlists/presentation/components/styles"

const SearchBar = () => {

    const dispatch = useDispatch()
    const searchBar = useRef<HTMLInputElement>()
    const { searchTerms, appliedFilter, ascendingOrder } = useSelector((state: RootState) => state.searchState)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [displaySortingIcon, setDisplaySortingIcon] = useState<boolean>(true)

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

    const cleanUp = () => {
        dispatch(updateSearchState(initialState))
    }

    useEffect(() => {
        cleanUp()
        return () => cleanUp()
        //eslint-disable-next-line
    }, [])

    return (
        <Box
            gap={2}
            display={'flex'}
            alignItems={'center'}
            sx={{ width: '100%' }}
        >
            <Input
                startAdornment={<SvgComponent type={LAYOUT_CONTENT_TEXT.SearchIcon} style={{ color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20, marginRight: '10px' }} />}
                style={{ display: 'flex' }}
                ref={searchBar}
                disableUnderline
                placeholder="Search by Allowlist Name"
                sx={styles.searchBar}
                type="text"
                onChange={handleChange}
                value={searchTerms}
            />
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
                    return <MenuItem key={idx} value={filter}>{filter}</MenuItem>
                })}
            </Select>
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
        </Box>
    )
}

export default SearchBar
