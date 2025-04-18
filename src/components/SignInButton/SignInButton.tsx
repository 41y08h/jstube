import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button } from '@mui/material'

const SignInButton = () => {
  return (
    <Button
      variant='outlined'
      color='primary'
      startIcon={<AccountCircleIcon />}
      href={`/api/auth/google?state=${window.location}`}
    >
      Sign in
    </Button>
  )
}

export default SignInButton
