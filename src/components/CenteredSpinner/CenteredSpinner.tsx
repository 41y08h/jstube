import { CircularProgress } from '@mui/material'
import { FC } from 'react'

interface Props {
  spacing?: number
}

const CenteredSpinner: FC<Props> = ({ spacing = 5 }) => (
  <div className={`grid justify-center py-${spacing}`}>
    <CircularProgress />
  </div>
)

export default CenteredSpinner
