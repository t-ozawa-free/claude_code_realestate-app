import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// 未ログインの場合はログイン画面へリダイレクトする
function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="loading">読み込み中...</div>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
