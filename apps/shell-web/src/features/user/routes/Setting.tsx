import { Link, useNavigate } from 'react-router-dom'

export const UserSetting = () => {
  const navigate = useNavigate()

  const toCenter = () => {
    navigate('/user/center')
  }
  return (
    <div>
      this is user setting
      <button onClick={toCenter}>to center</button>
    </div>
  )
}
