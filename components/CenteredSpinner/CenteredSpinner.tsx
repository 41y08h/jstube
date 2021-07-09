import { FC } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {
  spacing?: number
}

const CenteredSpinner: FC<Props> = ({ spacing = 5 }) => (
  <div className={`grid justify-center py-${spacing}`}>
    <CircularProgress />
  </div>
)

export default CenteredSpinner
