import React from 'react'

declare module '*.svg' {
  const content: any
  export default content
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    palette: {
      red: {
        main: React.CSSProperties['color']
        contrastText: React.CSSProperties['color']
      }
    }
  }

  interface ThemeOptions {
    palette: {
      red: {
        main: React.CSSProperties['color']
        contrastText: React.CSSProperties['color']
      }
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    red: {
      main: React.CSSProperties['color']
      contrastText: React.CSSProperties['color']
    }
  }
  interface PaletteOptions {
    red: {
      main: React.CSSProperties['color']
      contrastText: React.CSSProperties['color']
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCAL_AUTH_TOKEN?: string
    }
  }
}

export {}
