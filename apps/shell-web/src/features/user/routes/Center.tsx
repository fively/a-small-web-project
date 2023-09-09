import { Link, useNavigate } from 'react-router-dom'
export const UserCenter = () => {
  const navigate = useNavigate()

  const toSetting = () => {
    navigate('/user/setting')
  }
  return (
    <div>
      this is user center
      <button onClick={toSetting}>to center</button>
    </div>
  )
}
