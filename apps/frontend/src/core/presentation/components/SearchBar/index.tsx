import React, { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Divider, Fade, Input, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material"
import { CancelRounded } from '@mui/icons-material'
import { getCosmosNetworkPrettyName } from "cudosjs"

import { RootState } from "../../../store"
import { SearchFilter, updateSearchState } from "../../../store/search"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../Layout/helpers"
import { COLORS } from "../../../theme/colors"

import { styles } from "./styles"
import { validationStyles } from "../../../../features/allowlists/presentation/components/styles"
import { headerStyles } from "../Layout/styles"

const SearchBar = ({ networks, displayDataLength }: { networks: string[], displayDataLength: number }) => {

    const dispatch = useDispatch()
    const searchBar = useRef<HTMLInputElement>()
    const chainSelector = useRef<HTMLDivElement>()
    const hide = useRef<HTMLDivElement>()
    const { searchTerms, appliedFilter, ascendingOrder, chainFilter, activeSearch } = useSelector((state: RootState) => state.searchState)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [displaySortingIcon, setDisplaySortingIcon] = useState<boolean>(true)
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
    const [showChainSelectorCloseIcon, setChainSelectorCloseIcon] = useState<boolean>(false)
    const [chainSelectorPlaceholder, setChainSelectorPlaceholder] = useState<string>('')
    const [chainSelectorOpen, setChainSelectorOpen] = useState<boolean>(false)

    const [showSearchBarCloseIcon, setShowSearchBarCloseIcon] = useState<boolean>(false)
    const [expandSearchBar, setExpandSearchBar] = useState<boolean>(false)
    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState<string>('')

    const invalidSearch = expandSearchBar && !displayDataLength && !!searchTerms

    const estimateStringWidth = (string: string, fontSize: string) => {
        const element = document.createElement('span');
        element.innerHTML = string;
        element.style.fontSize = fontSize;
        document.body.appendChild(element);
        const width = element.getBoundingClientRect().width;
        document.body.removeChild(element);
        return width;
    }

    const hasScrollbar = () => {
        return document.documentElement.scrollHeight > document.documentElement.clientHeight;
    };

    useEffect(() => {
        if (!hasScrollbar()) {
            const footer = document.getElementById('footer')
            footer.style.marginRight = invalidSearch ? '-4px' : '0px'
        }
    }, [invalidSearch])

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

    //CHAIN SELECTOR
    const handleNetworkFilterChange = (e: SelectChangeEvent<string>, child: React.ReactNode) => {
        if (hide.current) {
            hide.current.style.opacity = '0'
        }
        const width = estimateStringWidth(e.target.value, '16px');
        dispatch(updateSearchState({ chainFilter: e.target.value }));
        setTimeout(() => {
            chainSelector.current.style.width = `${width + 80}px`;

        }, 200);
        setTimeout(() => {
            hide.current.style.opacity = '1'
        }, 600)
    }

    const handleExpandChainSelector = () => {
        if (!chainSelectorOpen) {
            chainSelector.current.style.width = '195px'
            setTimeout(() => {
                setChainSelectorCloseIcon(true)
                setChainSelectorPlaceholder('Select Network')
                setChainSelectorOpen(true)
            }, 300)
        }
    }

    const handleShrinkChainSelector = () => {
        dispatch(updateSearchState({ chainFilter: '' }))
        setChainSelectorPlaceholder('')
        setChainSelectorCloseIcon(false)
        setChainSelectorOpen(false)
        setTimeout(() => {
            chainSelector.current.style.width = '48px'
        }, 100)
    }

    //SEARCH BAR
    const handleSearchBarTransitionEnd = () => {
        if (expandSearchBar) {
            searchBar.current?.click()
            setShowSearchBarCloseIcon(true)
            setSearchBarPlaceholder('Search by Allowlist Name/Creator')
        }
    }

    const handleExpandSearchBar = () => {
        setExpandSearchBar(true)
    }

    const handleShrinkSearchBar = () => {
        if (expandSearchBar) {
            setExpandSearchBar(false)
            setShowSearchBarCloseIcon(false)
            setTimeout(() => {
                dispatch(updateSearchState({
                    searchTerms: '',
                    activeSearch: false
                }))
            }, 300)
        }
    }

    useEffect(() => {
        if (!showSearchBarCloseIcon) {
            setSearchBarPlaceholder('')
            handleShrinkSearchBar()
        }

        //eslint-disable-next-line
    }, [showSearchBarCloseIcon])

    return (
        <Box sx={{ gap: '12px', display: 'flex', alignItems: 'center' }}>
            <Tooltip
                placement='bottom-start'
                PopperProps={validationStyles.searchBarTooltipPopper}
                componentsProps={validationStyles.tooltipProps}
                open={invalidSearch}
                title={'No Search Results'}
            >
                <Box
                    onTransitionEnd={handleSearchBarTransitionEnd}
                    onClick={handleExpandSearchBar}
                    gap={'10px'}
                    display={'flex'}
                    alignItems={'center'}
                    sx={styles.searchBar(expandSearchBar, invalidSearch, '315px')}
                >
                    <Box sx={{ display: 'flex', marginLeft: '-7px' }}>
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.SearchIcon}
                            style={{ color: COLORS.STEEL_GRAY[20] }}
                        />
                    </Box>
                    <Input
                        ref={searchBar}
                        disableUnderline
                        placeholder={searchBarPlaceholder}
                        type="text"
                        onChange={handleChange}
                        value={searchTerms}
                        sx={{ width: '100%', display: 'flex' }}
                        endAdornment={showSearchBarCloseIcon ?
                            <Box onClick={() => setShowSearchBarCloseIcon(false)}>
                                <CancelRounded sx={styles.cancelIcon} />
                            </Box>
                            : null}
                    />
                </Box>
            </Tooltip>
            <Box
                ref={chainSelector}
                onClick={handleExpandChainSelector}
                gap={'10px'}
                display={'flex'}
                alignItems={'center'}
                style={{ pointerEvents: invalidSearch ? 'none' : 'auto' }}
                sx={styles.chainSelector}
            >
                <Box onClick={chainSelectorOpen ? () => setDropDownOpen(true) : null} sx={{ display: 'flex', marginLeft: '-9px' }}>
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.GlobusIcon}
                        style={{ color: invalidSearch ? '#88898c' : COLORS.STEEL_GRAY[20] }}
                    />
                </Box>
                <Select
                    ref={hide}
                    disabled={invalidSearch || !networks.length}
                    MenuProps={styles.chainSelectorDropoDownMenuProps}
                    disableUnderline
                    displayEmpty
                    variant='standard'
                    open={dropDownOpen}
                    onOpen={() => setDropDownOpen(true)}
                    onClose={() => setDropDownOpen(false)}
                    renderValue={() =>
                        !!chainFilter ?
                            <Fragment>
                                <Tooltip title={getCosmosNetworkPrettyName(chainFilter) ? `ID: ${chainFilter}` : ''}>
                                    <Box> {getCosmosNetworkPrettyName(chainFilter) ? getCosmosNetworkPrettyName(chainFilter) : chainFilter} </Box>
                                </Tooltip>
                            </Fragment>
                            :
                            <Typography sx={styles.dropDownPlaceholder}>{chainSelectorPlaceholder}</Typography>
                    }
                    sx={styles.chainSelectorDropDown}
                    value={chainFilter}
                    onChange={handleNetworkFilterChange}
                    IconComponent={() => null}
                    endAdornment={showChainSelectorCloseIcon && chainSelectorOpen ?
                        <Box marginLeft={'-24px'} onClick={handleShrinkChainSelector}>
                            <CancelRounded sx={{ ...styles.cancelIcon, color: invalidSearch ? '#88898c' : COLORS.STEEL_GRAY[40] }} />
                        </Box>
                        : null}
                >
                    {networks.map((network, idx) => {
                        return <MenuItem
                            key={idx + network}
                            sx={styles.menuItem}
                            value={network}
                        >
                            <Tooltip
                                placement="right-end"
                                title={getCosmosNetworkPrettyName(network) ? `ID: ${network}` : ''}
                                children={<Box>{getCosmosNetworkPrettyName(network) ? getCosmosNetworkPrettyName(network) : network} </Box>}
                            />
                        </MenuItem>
                    })}
                </Select>
            </Box>
            <Divider orientation="vertical" sx={headerStyles.divider} />
            <Box
                id="sortingOrderBox"
                sx={styles.sortingOrder}
                style={{ pointerEvents: invalidSearch ? 'none' : 'auto' }}
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
                            style={{ color: invalidSearch ? '#88898c' : !!appliedFilter ? 'inherit' : COLORS.STEEL_GRAY[80] }}
                        />
                    </Box>
                </Fade>
            </Box>
            <Select
                disabled={invalidSearch}
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
                    style={{
                        color: invalidSearch ? '#88898c' : COLORS.STEEL_GRAY[20],
                        pointerEvents: invalidSearch ? 'none' : 'auto'
                    }}
                    sx={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }}
                    onClick={() => setFilterOpen(true)}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                        style={{ cursor: 'pointer' }}
                    />
                </Box>}
            >
                {Object.values(SearchFilter).map((filter, idx) => {
                    return <MenuItem sx={styles.menuItem} key={idx + filter} value={filter}>{filter}</MenuItem>
                })}
            </Select>
        </Box>
    )
}

export default SearchBar
