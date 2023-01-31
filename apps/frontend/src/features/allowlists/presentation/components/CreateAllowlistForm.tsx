import React, { Fragment, useEffect, useState } from 'react';
import { Box, Divider, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chains } from 'chain-registry';
import { FileUploader } from "react-drag-drop-files";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import { RootState } from '../../../../core/store';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { acceptedImgTypes, BaseURL, FormField, getStartAdornment } from './helpers';
import { updateAllowlistObject } from '../../../../core/store/allowlist';
import { setBlobToB64Img } from '../../../../core/utilities/ProjectUtils';
import CreationField from './CreationField';

import { allowlistDetailsStyles, generalStyles } from './styles';

const CreateAllowlistForm = () => {

  const dispatch = useDispatch()
  const [availableChainIDs, setAvailableChainIDs] = useState<string[]>([])
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  const [bannerPreview, setBannerPreview] = useState<string>('')
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const allowlistState = useSelector((state: RootState) => state.allowlistState)

  useEffect(() => {
    if (allowlistState.banner_image) {
      setBlobToB64Img(allowlistState.banner_image, setBannerPreview)
      return
    }
    setBannerPreview('')
  }, [allowlistState.banner_image])

  useEffect(() => {
    if (allowlistState.image) {
      setBlobToB64Img(allowlistState.image, setAvatarPreview)
      return
    }
    setAvatarPreview('')
  }, [allowlistState.image])

  useEffect(() => {
    if (allowlistState.end_time && allowlistState.end_date) {

      const endDate = new Date(allowlistState.end_date)
      const endTime = new Date(allowlistState.end_time)
      const newDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes(),
      )
      dispatch(updateAllowlistObject({
        end_period: newDate
      }))
    }

  }, [allowlistState.end_time, allowlistState.end_date])

  useEffect(() => {
    const cosmosChainIDs = chains.map((chain) => {
      return chain.chain_id
    })

    if (cosmosChainIDs) {
      const sortedChainIDs = cosmosChainIDs
        .sort((a, b) => a
          .localeCompare(b, undefined, { sensitivity: 'base' }))
      setAvailableChainIDs(sortedChainIDs)
      return
    }

    setAvailableChainIDs([])
  }, [])

  return (
    <Box id='createAllowlistForm' width='100%'>
      <Box
        id='allowlistDetails'
        gap={4}
        sx={generalStyles.holder}
      >
        <Box width='100%' sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight={700}>
            Allowlist Details
          </Typography>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Fragment>
          <CreationField
            type={FormField.name}
            text='Allowlist Name'
            placeholder='Enter Allowlist Name'
          />
          <CreationField
            type={FormField.url}
            text='Custom URL'
            startAdornment={getStartAdornment(`${window.location.origin.replace('https://' || 'http://', '')}/`)}
          />
          <CreationField
            type={FormField.description}
            text='Description'
            placeholder='Enter Description'
          />
          <Box id='allowlistCosmosBlockchainIDInput'>
            <Typography fontWeight={600}>Cosmos Blockchain ID</Typography>
            <Select
              disabled
              disableUnderline
              displayEmpty
              variant='standard'
              open={dropDownOpen}
              onOpen={() => setDropDownOpen(true)}
              onClose={() => setDropDownOpen(false)}
              renderValue={() =>
                allowlistState.cosmos_chain_id ?
                  allowlistState.cosmos_chain_id :
                  <Typography sx={allowlistDetailsStyles.dropDownPlaceholder}>Select a chain</Typography>
              }
              sx={allowlistDetailsStyles.defaultDropDown}
              value={allowlistState.cosmos_chain_id}
              onChange={(e) => dispatch(updateAllowlistObject({ cosmos_chain_id: e.target.value }))}
              IconComponent={() => <Fragment></Fragment>
                // <Box
                //   sx={{ transform: dropDownOpen ? 'rotate(180deg)' : 'none' }}
                //   onClick={() => setDropDownOpen(true)}
                // >
                // <SvgComponent
                //   type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                //   style={allowlistDetailsStyles.dropdownIcon}
                // />
                // </Box>
              }
            >
              <MenuItem
                key={allowlistState.cosmos_chain_id}
                value={allowlistState.cosmos_chain_id}
              >
                {allowlistState.cosmos_chain_id}
              </MenuItem>
              {/* {availableChainIDs.map((CHAIN_ID, idx) => {
                return <MenuItem key={idx} value={CHAIN_ID}>{CHAIN_ID}</MenuItem>
              })} */}
            </Select>
          </Box>
          <CreationField
            type={FormField.website}
            text='Website URL'
            placeholder='Enter Website URL'
            svgIcon={<SvgComponent
              type={LAYOUT_CONTENT_TEXT.GlobusIcon}
              style={generalStyles.titleIcons}
            />}
          />
          <CreationField
            type={FormField.discord_url}
            text='Discord Server URL'
            startAdornment={getStartAdornment(BaseURL.discord_server)}
            svgIcon={<SvgComponent
              style={generalStyles.titleIcons}
              type={LAYOUT_CONTENT_TEXT.DiscordIcon}
            />}
          />
          <CreationField
            type={FormField.twitter_account}
            text='Twitter Account'
            startAdornment={getStartAdornment(BaseURL.twitter_acc)}
            svgIcon={<SvgComponent
              type={LAYOUT_CONTENT_TEXT.TwitterIcon}
              style={generalStyles.titleIcons}
            />}
          />
          <Box id='allowlistProfileImageInput'>
            <Typography fontWeight={600}>Profile Image</Typography>
            <Typography
              variant='subtitle2'
              color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
            >
              This image will be used as profile image on your allowlist page. 350 x 350 recommended.
            </Typography>
            <Box sx={allowlistDetailsStyles.fileUploaderHolder}>
              <FileUploader
                handleChange={(file: Blob) => dispatch(updateAllowlistObject({ image: file }))}
                types={acceptedImgTypes}
                children={
                  <Box
                    gap={2}
                    sx={{
                      ...allowlistDetailsStyles.dropZone,
                      backgroundImage: avatarPreview ?
                        `url(${avatarPreview}), linear-gradient(#1B2031, #1B2031)` : 'none'
                    }}
                  >
                    <SvgComponent
                      type={LAYOUT_CONTENT_TEXT.PlusIcon}
                      style={allowlistDetailsStyles.dropIcon}
                    />
                    <Typography
                      fontWeight={600}
                      variant='subtitle2'
                      color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
                    >
                      Browse or Drop Here
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
          <Box id='allowlistBannerImageInput'>
            <Typography fontWeight={600}>Banner Image</Typography>
            <Typography
              variant='subtitle2'
              color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
            >
              This image will appear at the top of your allow list page. 1400 x 400 px recommended.            </Typography>
            <Box sx={allowlistDetailsStyles.bannerUploaderHolder}>
              <FileUploader
                handleChange={(file: Blob) => dispatch(updateAllowlistObject({ banner_image: file }))}
                types={acceptedImgTypes}
                children={
                  <Box
                    gap={2}
                    sx={{
                      ...allowlistDetailsStyles.dropZone,
                      backgroundImage: bannerPreview ?
                        `url(${bannerPreview}), linear-gradient(#1B2031, #1B2031)` : 'none'
                    }}
                  >
                    <SvgComponent
                      type={LAYOUT_CONTENT_TEXT.PlusIcon}
                      style={allowlistDetailsStyles.dropIcon}
                    />
                    <Typography
                      fontWeight={600}
                      variant='subtitle2'
                      color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
                    >
                      Browse or Drop Here
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
          <Box gap={2} id='datesHolder' sx={allowlistDetailsStyles.datesHolder}>
            <Box id='allowlistRegistrationEndDateInput' sx={{ width: '50%' }}>
              <Box marginBottom='8px' gap={1} display='flex' alignItems='flex-start'>
                <Typography fontWeight={600}> Registration End Date </Typography>
                <Tooltip
                  placement='right'
                  followCursor
                  title={'Tooltip text'}
                  children={<Box><SvgComponent
                    type={LAYOUT_CONTENT_TEXT.InfoIcon}
                    style={allowlistDetailsStyles.tooltip}
                  /></Box>}
                />
              </Box>
              <MobileDatePicker
                DialogProps={allowlistDetailsStyles.dialogProps}
                InputProps={allowlistDetailsStyles.datePickerInput}
                value={allowlistState.end_date ?? null}
                onChange={(newValue) => dispatch(updateAllowlistObject({ end_date: newValue }))}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            <Box id='allowlistRegistrationEndTimeInput' sx={{ width: '50%' }}>
              <Typography marginBottom='10px' fontWeight={600}> Registration End Time </Typography>
              <MobileTimePicker
                DialogProps={allowlistDetailsStyles.dialogProps}
                InputProps={allowlistDetailsStyles.timePickerInput}
                value={allowlistState.end_time ?? null}
                onChange={(newValue: any) => dispatch(updateAllowlistObject({ end_time: newValue }))}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </Box>
          </Box>
        </Fragment>
      </Box>
    </Box>
  );
};

export default CreateAllowlistForm;
