import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'
import PropertyForm from '../components/PropertyForm'
import PropertyCard from '../components/PropertyCard'

function PropertyList() {
  const { user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  // 編集対象の物件。nullの場合は新規登録フォームとして扱う
  const [editingProperty, setEditingProperty] = useState(null)

  // 自分が登録した物件の一覧を取得する(RLSにより自分の物件のみ返る)
  const fetchProperties = async () => {
    setLoading(true)
    setErrorMessage('')

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    setLoading(false)

    if (error) {
      setErrorMessage('物件の取得に失敗しました: ' + error.message)
      return
    }

    setProperties(data)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // 物件を新規登録する
  const handleCreate = async (values) => {
    const { error } = await supabase.from('properties').insert({
      name: values.name,
      rent: Number(values.rent),
      area: values.area,
      layout: values.layout,
      user_id: user.id,
    })

    if (error) {
      setErrorMessage('物件の登録に失敗しました: ' + error.message)
      return
    }

    setShowForm(false)
    await fetchProperties()
  }

  // 物件を更新する
  const handleUpdate = async (values) => {
    const { error } = await supabase
      .from('properties')
      .update({
        name: values.name,
        rent: Number(values.rent),
        area: values.area,
        layout: values.layout,
      })
      .eq('id', editingProperty.id)

    if (error) {
      setErrorMessage('物件の更新に失敗しました: ' + error.message)
      return
    }

    setEditingProperty(null)
    setShowForm(false)
    await fetchProperties()
  }

  // 物件を削除する
  const handleDelete = async (id) => {
    const confirmed = window.confirm('この物件を削除しますか?')
    if (!confirmed) return

    const { error } = await supabase.from('properties').delete().eq('id', id)

    if (error) {
      setErrorMessage('物件の削除に失敗しました: ' + error.message)
      return
    }

    await fetchProperties()
  }

  const handleFormSubmit = (values) => {
    return editingProperty ? handleUpdate(values) : handleCreate(values)
  }

  const startCreate = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  const startEdit = (property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const cancelForm = () => {
    setEditingProperty(null)
    setShowForm(false)
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          {user && <p className="user-email">{user.email} でログイン中</p>}
        </div>
        <div className="property-header-actions">
          <button type="button" className="primary-button" onClick={startCreate}>
            物件を登録
          </button>
          <button type="button" className="logout-button" onClick={() => signOut()}>
            ログアウト
          </button>
        </div>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {showForm && (
        <PropertyForm initialValues={editingProperty} onSubmit={handleFormSubmit} onCancel={cancelForm} />
      )}

      {loading ? (
        <p className="loading-text">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty-text">登録されている物件がありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => startEdit(property)}
              onDelete={() => handleDelete(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertyList
