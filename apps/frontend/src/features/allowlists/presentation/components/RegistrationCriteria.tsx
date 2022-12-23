import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Divider,
    FormControlLabel,
    FormGroup,
    Input,
    Switch,
    Typography
} from '@mui/material';

import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import { updateAllowlistObject } from '../../../../core/store/allowlist';
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { RootState } from '../../../../core/store';
import { addDiscordBot } from './helpers';

import {
    generalStyles,
    registrationCriteriaStyles
} from './styles';

const RegistrationCriteriaForm = (): JSX.Element => {

    const dispatch = useDispatch()
    const allowlistState = useSelector((state: RootState) => state.allowlistState)

    const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAllowlistObject({
            [e.target.value]: !e.target.checked ? '' : allowlistState[e.target.value],
            checkedFields: {
                ...allowlistState.checkedFields,
                [e.target.value]: e.target.checked
            }
        }))

        if (e.target.value === 'discord_server' && e.target.checked) {
            addDiscordBot()
        }
    }

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
                    <Box width='100%' id='allowlistTwitterAccountToFollowInput'>
                        <Box sx={registrationCriteriaStyles.titleSwitchHolder}>
                            <Typography display={'flex'} alignItems='center' fontWeight={600}>
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Twitter Page to Follow
                            </Typography>
                            <Switch value={'twitter_account_to_follow'} onChange={((e) => handleSwitch(e))} />
                        </Box>
                        <Input placeholder='Enter @TwitterPage' disableUnderline type='text'
                            disabled={!allowlistState.checkedFields['twitter_account_to_follow']}
                            sx={generalStyles.input}
                            value={allowlistState.twitter_account_to_follow}
                            onChange={(e) => dispatch(updateAllowlistObject({ twitter_account_to_follow: e.target.value }))}
                        />
                    </Box>
                    <Box width='100%' id='allowlistTweetInput'>
                        <Box sx={registrationCriteriaStyles.titleSwitchHolder}>
                            <Typography display={'flex'} alignItems='center' fontWeight={600}>
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Interact With Twitter Post
                            </Typography>
                            <Switch checked={allowlistState.checkedFields['tweet']} value={'tweet'} onChange={((e) => handleSwitch(e))} />
                        </Box>
                        <Input placeholder='https://twitter.com/...' disableUnderline type='text'
                            disabled={!allowlistState.checkedFields['tweet']}
                            sx={generalStyles.input}
                            value={allowlistState.tweet}
                            onChange={(e) => dispatch(updateAllowlistObject({ tweet: e.target.value }))}
                        />
                        <FormGroup>
                            <FormControlLabel
                                disabled={!allowlistState.tweet}
                                control={
                                    <Switch
                                        checked={allowlistState.checkedFields['tweet-to-like']}
                                        value={'tweet-to-like'}
                                        onChange={((e) => handleSwitch(e))}
                                    />
                                }
                                label="Like Post"
                            />
                            <FormControlLabel
                                disabled={!allowlistState.tweet}
                                control={
                                    <Switch
                                        checked={allowlistState.checkedFields['tweet-to-retweet']}
                                        value={'tweet-to-retweet'}
                                        onChange={((e) => handleSwitch(e))}
                                    />
                                }
                                label="Retweet Post"
                            />
                        </FormGroup>
                    </Box>
                    <Box width='100%' id='allowlistDiscordGroupToJoinInput'>
                        <Box sx={registrationCriteriaStyles.titleSwitchHolder}>
                            <Typography display={'flex'} alignItems='center' fontWeight={600}>
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Discord Group to Join
                            </Typography>
                            <Switch value={'discord_server'} onChange={((e) => handleSwitch(e))} />
                        </Box>
                        <Input placeholder='Enter Discord Group' disableUnderline type='text'
                            disabled={!allowlistState.checkedFields['discord_server']}
                            sx={generalStyles.input}
                            value={allowlistState.discord_server}
                            onChange={(e) => dispatch(updateAllowlistObject({ discord_server: e.target.value }))}
                        />
                    </Box>
                    <Box width='100%' id='allowlistDiscordGroupRoleInput'>
                        <Box sx={registrationCriteriaStyles.titleSwitchHolder}>
                            <Typography
                                color={!allowlistState.checkedFields['discord_server'] || !allowlistState.discord_server ? "#757575" : 'inherit'}
                                display={'flex'}
                                alignItems='center'
                                fontWeight={600}
                            >
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Discord Group Role
                            </Typography>
                            <Switch disabled={!allowlistState.checkedFields['discord_server'] || !allowlistState.discord_server} value={'server_role'} onChange={((e) => handleSwitch(e))} />
                        </Box>
                        <Input placeholder='Enter a Discord Role' disableUnderline type='text'
                            disabled={!allowlistState.checkedFields['server_role']}
                            sx={generalStyles.input}
                            value={allowlistState.server_role}
                            onChange={(e) => dispatch(updateAllowlistObject({ server_role: e.target.value }))}
                        />
                    </Box>
                    <Box id='AllowlistProvideEmailSwitch' sx={registrationCriteriaStyles.titleSwitchHolder}>
                        <Typography display={'flex'} alignItems='center' fontWeight={600}>
                            <SvgComponent
                                type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                                style={generalStyles.titleIcons}
                            />
                            Users to provide Email
                        </Typography>
                        <Switch value={'require_email'} onChange={((e) => dispatch(updateAllowlistObject({ require_email: e.target.checked })))} />
                    </Box>
                </Fragment>
            </Box>
        </Box>
    )
}

export default RegistrationCriteriaForm
