import
React,
{
    Fragment,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Divider,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Select,
    Switch,
    Typography
} from '@mui/material';

import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import { updateAllowlistObject } from '../../../../core/store/allowlist';
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { RootState } from '../../../../core/store';
import { BaseURL, FormField, getStartAdornment } from './helpers';
import CreationField from './CreationField';
import useSocialMedia from '../../../../core/utilities/CustomHooks/useSocialMedia';
import { emptyGuildInfo, DISCORD_SERVER_ROLES, SOCIAL_MEDIA } from '../../../../../../common/interfaces';
import { updateUser } from '../../../../core/store/user';

import {
    allowlistDetailsStyles,
    generalStyles,
    registrationCriteriaStyles
} from './styles';

const RegistrationCriteriaForm = (): JSX.Element => {

    const dispatch = useDispatch()
    const allowlistState = useSelector((state: RootState) => state.allowlistState)
    const { connectedSocialMedia, connectedAddress } = useSelector((state: RootState) => state.userState)
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
    const { addDiscordBot, connectSocialMedia } = useSocialMedia()

    const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAllowlistObject({
            [e.target.value]: !e.target.checked ? '' : allowlistState[e.target.value],
            checkedFields: {
                ...allowlistState.checkedFields,
                [e.target.value]: e.target.checked
            }
        }))

        if (e.target.value === 'discord_server') {

            if (e.target.checked) {
                addDiscordBot()
            } else {
                dispatch(updateUser({
                    connectedSocialMedia: {
                        twitter: connectedSocialMedia.twitter,
                        discord: {
                            id: connectedSocialMedia.discord.id,
                            userName: connectedSocialMedia.discord.userName,
                            guild: emptyGuildInfo
                        }
                    }
                }))
            }

        }

    }

    const TwitterBtn = useCallback(() => {
        return <Button
            disabled={!connectedAddress}
            variant="contained"
            sx={{ height: '38px', width: '104px' }}
            onClick={() => connectSocialMedia(SOCIAL_MEDIA.twitter)}
        >
            Connect
        </Button>
    }, [connectedAddress, connectedSocialMedia.twitter.userName])

    const DiscordBtn = useCallback(() => {
        return <Button
            disabled={!connectedAddress}
            variant="contained"
            sx={{ height: '38px', width: '104px' }}
            onClick={() => connectSocialMedia(SOCIAL_MEDIA.discord)}
        >
            Connect
        </Button>
    }, [connectedAddress, connectedSocialMedia.discord.userName])

    useEffect(() => {
        if (connectedSocialMedia.discord.guild.inviteCode) {
            dispatch(updateAllowlistObject({
                discord_server: connectedSocialMedia.discord.guild.inviteCode
            }))
        }
    }, [connectedSocialMedia.discord.guild.inviteCode])

    return (
        <Box id='registrationCriteriaForm' width='100%'>
            <Box
                id='registrationCriteria'
                gap={4}
                sx={generalStyles.holder}
            >
                <Box>
                    <Typography variant='h6' fontWeight={700}>
                        Registration Criteria
                    </Typography>
                    <Typography variant='subtitle2' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                        You must choose at least one of the following criterias.
                    </Typography>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Fragment>
                    <CreationField
                        type={FormField.twitter_account_to_follow}
                        text='Twitter Account to Follow'
                        startAdornment={getStartAdornment(BaseURL.twitter_acc)}
                        svgIcon={<SvgComponent
                            type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                            style={generalStyles.titleIcons}
                        />}
                        switchElement={connectedSocialMedia.twitter.userName ?
                            <Switch
                                checked={allowlistState.checkedFields['twitter_account_to_follow']}
                                value={'twitter_account_to_follow'}
                                onChange={((e) => handleSwitch(e))}
                            /> :
                            <TwitterBtn />
                        }
                        isDisabled={!allowlistState.checkedFields['twitter_account_to_follow']}
                    />
                    <Fragment>
                        <CreationField
                            type={FormField.tweet}
                            text='Interact With Twitter Post'
                            placeholder={`${BaseURL.twitter_acc}...`}
                            svgIcon={<SvgComponent
                                type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                                style={generalStyles.titleIcons}
                            />}
                            switchElement={connectedSocialMedia.twitter.userName ?
                                <Switch
                                    checked={allowlistState.checkedFields['tweet']}
                                    value={'tweet'}
                                    onChange={((e) => handleSwitch(e))}
                                /> :
                                <TwitterBtn />
                            }
                            isDisabled={!allowlistState.checkedFields['tweet']}
                        />
                        <FormGroup>
                            <FormControlLabel
                                disabled={!allowlistState.tweet}
                                control={
                                    <Switch
                                        checked={allowlistState.checkedFields['tweet_to_like']}
                                        value={'tweet_to_like'}
                                        onChange={((e) => handleSwitch(e))}
                                    />
                                }
                                label="Like Post"
                            />
                            <FormControlLabel
                                disabled={!allowlistState.tweet}
                                control={
                                    <Switch
                                        checked={allowlistState.checkedFields['tweet_to_retweet']}
                                        value={'tweet_to_retweet'}
                                        onChange={((e) => handleSwitch(e))}
                                    />
                                }
                                label="Retweet Post"
                            />
                        </FormGroup>
                    </Fragment>
                    <CreationField
                        type={FormField.discord_server}
                        text='Discord Server to Join'
                        placeholder='Connect a server'
                        svgIcon={<SvgComponent
                            style={generalStyles.titleIcons}
                            type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                        />}
                        switchElement={connectedSocialMedia.discord.userName ?
                            <Switch
                                checked={allowlistState.checkedFields['discord_server']}
                                value={'discord_server'}
                                onChange={((e) => handleSwitch(e))}
                            /> :
                            <DiscordBtn />
                        }
                        isDisabled={true}
                    />
                    <Box id='allowlistServerRoleInput'>
                        <Box display='flex'>
                            <SvgComponent
                                style={generalStyles.titleIcons}
                                type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                            />
                            <Typography fontWeight={600}>Discord Server Role</Typography>
                        </Box>
                        <Select
                            disabled={!allowlistState.checkedFields['discord_server'] || !allowlistState.discord_server}
                            disableUnderline
                            displayEmpty
                            variant='standard'
                            open={dropDownOpen}
                            onOpen={() => setDropDownOpen(true)}
                            onClose={() => setDropDownOpen(false)}
                            renderValue={() =>
                                connectedSocialMedia.discord.guild.guildRoles[allowlistState.server_role] ?
                                    connectedSocialMedia.discord.guild.guildRoles[allowlistState.server_role] :
                                    <Typography sx={allowlistState.checkedFields['discord_server'] && allowlistState.discord_server ?
                                        allowlistDetailsStyles.enabledDropDownPlaceholder :
                                        allowlistDetailsStyles.dropDownPlaceholder}
                                    >
                                        @everyone
                                    </Typography>
                            }
                            sx={allowlistDetailsStyles.defaultDropDown}
                            value={allowlistState.server_role}
                            onChange={(e) => dispatch(updateAllowlistObject({ server_role: e.target.value }))}
                            IconComponent={() => <Box
                                sx={{
                                    pointerEvents: allowlistState.checkedFields['discord_server'] &&
                                        allowlistState.discord_server ? 'auto' : 'none',
                                    transform: dropDownOpen ? 'rotate(180deg)' : 'none'
                                }}
                                onClick={() => setDropDownOpen(true)}
                            >
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                                    style={allowlistDetailsStyles.dropdownIcon}
                                />
                            </Box>}
                        >
                            {connectedSocialMedia.discord.guild.guildRoles ?
                                Object.entries(connectedSocialMedia.discord.guild.guildRoles).map(([key, value], idx) => {
                                    return <MenuItem key={idx} value={key}>{value}</MenuItem>
                                }) :
                                <MenuItem
                                    key={DISCORD_SERVER_ROLES.default}
                                    value={DISCORD_SERVER_ROLES.default}
                                >
                                    {DISCORD_SERVER_ROLES.default}
                                </MenuItem>
                            }
                        </Select>
                    </Box>
                    <Box id='AllowlistProvideEmailSwitch' sx={registrationCriteriaStyles.titleSwitchHolder}>
                        <Typography display={'flex'} alignItems='center' fontWeight={600}>
                            <SvgComponent
                                type={LAYOUT_CONTENT_TEXT.EnvelopIcon}
                                style={generalStyles.titleIcons}
                            />
                            Users to provide Email
                        </Typography>
                        <Switch checked={allowlistState.require_email} value={'require_email'} onChange={((e) => dispatch(updateAllowlistObject({ require_email: e.target.checked })))} />
                    </Box>
                </Fragment>
            </Box >
        </Box >
    )
}

export default RegistrationCriteriaForm
