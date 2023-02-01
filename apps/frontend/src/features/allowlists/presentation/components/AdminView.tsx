import React, { Fragment } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { getRegistrationCriteriaArray } from './helpers';
import { GET_ALLOWLIST_ENTRIES } from '../../../../core/api/calls';

import { allowlistPreviewStyles, allowListStyles, generalStyles } from './styles';

enum Format {
    JSON,
    CSV,
}

const AdminView = ({ props }: { props: FetchedAllowlist }) => {

    const exportEntries = async (format: Format) => {
        const res = await GET_ALLOWLIST_ENTRIES(props.id)
        if (format === Format.JSON) {
            downloadJSON(res.data);
        } else {
            downloadCSV(res.data);
        }
    };

    const downloadJSON = (data: any) => {
        downloadFile({
            data: JSON.stringify(data),
            fileName: 'users.json',
            fileType: 'text/json',
        });
    };

    const downloadCSV = (data: any[]) => {
        let headers = ['twitter_handle,discord_handle,address,email'];
        let usersCsv = data.reduce((acc, user) => {
            const { twitter_handle, discord_handle, address, email } = user;
            acc.push([twitter_handle, discord_handle, address, email].join(','));
            return acc;
        }, []);

        downloadFile({
            data: [...headers, ...usersCsv].join('\n'),
            fileName: 'users.csv',
            fileType: 'text/csv',
        });
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType });
        const a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    return (
        <Fragment>
            <Box sx={allowListStyles.title}>
                <Typography variant='h6' fontWeight={700}>
                    Registration Criteria
                </Typography>
            </Box>
            <Divider sx={{ width: '100%' }} />
            {getRegistrationCriteriaArray(props).map((FIELD, idx) => {
                return FIELD.isDisabled ? null : (
                    <Box key={idx} sx={{ alignSelf: 'flex-start' }}>
                        <Typography component={'div'} sx={allowlistPreviewStyles.title}>
                            {FIELD.icon}
                            {FIELD.title}
                        </Typography>
                        <Typography component={'div'} sx={allowlistPreviewStyles.subTitle}>
                            {FIELD.subtitle}
                        </Typography>
                    </Box>
                )
            })}
            <Divider sx={{ width: '100%' }} />
            <Box gap={2} sx={generalStyles.flexColumn}>
                <Button
                    variant="contained"
                    sx={{ height: '56px', width: '100%' }}
                    onClick={() => exportEntries(Format.CSV)}
                >
                    Export CSV
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.LinkIcon} style='default' />
                </Button>
                <Button
                    variant="contained"
                    sx={{ height: '56px', width: '100%' }}
                    onClick={() => exportEntries(Format.JSON)}
                >
                    Export JSON
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.LinkIcon} style='default' />
                </Button>
            </Box>


        </Fragment>
    )
}

export default AdminView
