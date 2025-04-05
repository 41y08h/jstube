import { AppBar, Paper, Tab, Tabs } from '@mui/material'

export default function ChannelTabs() {
  return (
    <AppBar position='static' className='shadow-none'>
      <Paper square elevation={0}>
        <Tabs value={0} aria-label='simple tabs example'>
          <Tab label='Home' />
          <Tab label='Videos' />
          <Tab label='Playlists' />
          <Tab label='Community' />
          <Tab label='Channels' />
          <Tab label='About' />
        </Tabs>
      </Paper>
    </AppBar>
  )
}
