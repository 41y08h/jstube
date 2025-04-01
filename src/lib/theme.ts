'use client'
import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#606060',
    },
    // red: {
    //   main: red[500],
    //   contrastText: '#fff',
    // },
  },
})

export default theme
