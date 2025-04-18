import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button } from '@mui/material'

const SignInButton = () => (
  <Button
    variant='outlined'
    color='primary'
    startIcon={<AccountCircleIcon />}
    href='/login'
  >
    Sign in
  </Button>
)

export default SignInButton
