import { SxProps, Tab, Tabs, Theme, useTheme } from '@mui/material'

export default function ChannelTabs() {
  const theme = useTheme()
  const tabSxProp: SxProps<Theme> = {
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize,
    color: 'black',
  }
  return (
    <Tabs value={0}>
      <Tab sx={tabSxProp} label='Home' />
      <Tab sx={tabSxProp} label='Playlists' />
    </Tabs>
  )
}
