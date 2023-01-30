import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Divider,
    FormControlLabel,
    FormGroup,
    Switch,
    Typography
} from '@mui/material';

import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import { updateAllowlistObject } from '../../../../core/store/allowlist';
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { RootState } from '../../../../core/store';
import { addDiscordBot, BaseURL, FormField, getStartAdornment } from './helpers';
import CreationField from './CreationField';

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
            //TODO: Need an endpoint from the BE to handle it
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
                    <CreationField
                        type={FormField.twitter_account_to_follow}
                        text='Twitter Account to Follow'
                        startAdornment={getStartAdornment(BaseURL.twitter_acc)}
                        svgIcon={<SvgComponent
                            type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                            style={generalStyles.titleIcons}
                        />}
                        switchElement={<Switch
                            checked={allowlistState.checkedFields['twitter_account_to_follow']}
                            value={'twitter_account_to_follow'}
                            onChange={((e) => handleSwitch(e))}
                        />}
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
                            switchElement={<Switch
                                checked={allowlistState.checkedFields['tweet']}
                                value={'tweet'}
                                onChange={((e) => handleSwitch(e))}
                            />
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
                        startAdornment={getStartAdornment(BaseURL.discord_server)}
                        svgIcon={<SvgComponent
                            style={generalStyles.titleIcons}
                            type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                        />}
                        switchElement={<Switch
                            checked={allowlistState.checkedFields['discord_server']}
                            value={'discord_server'}
                            onChange={((e) => handleSwitch(e))}
                        />}
                        isDisabled={!allowlistState.checkedFields['discord_server']}
                    />
                    <CreationField
                        type={FormField.server_role}
                        text='Discord Server Role'
                        placeholder='Enter a Server Role'
                        svgIcon={<SvgComponent
                            style={generalStyles.titleIcons}
                            type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                        />}
                        switchElement={<Switch
                            checked={allowlistState.checkedFields['server_role']}
                            disabled={!allowlistState.checkedFields['discord_server'] || !allowlistState.discord_server} value={'server_role'}
                            onChange={((e) => handleSwitch(e))}
                        />}
                        isDisabled={!allowlistState.checkedFields['server_role']}
                    />
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
            </Box>
        </Box>
    )
}

export default RegistrationCriteriaForm
