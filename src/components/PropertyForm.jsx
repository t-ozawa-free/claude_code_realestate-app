import { useState } from 'react'

// 物件の新規登録・編集で共通利用する入力フォーム
function PropertyForm({ initialValues, onSubmit, onCancel }) {
  const isEditMode = Boolean(initialValues)

  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    await onSubmit({ name, rent, area, layout })
    setSubmitting(false)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? '物件を編集' : '物件を新規登録'}</h2>

      <label htmlFor="name">物件名</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="rent">家賃(円)</label>
      <input
        id="rent"
        type="number"
        value={rent}
        onChange={(event) => setRent(event.target.value)}
        min="0"
        required
      />

      <label htmlFor="area">エリア名</label>
      <input
        id="area"
        type="text"
        value={area}
        onChange={(event) => setArea(event.target.value)}
        required
      />

      <label htmlFor="layout">間取り</label>
      <input
        id="layout"
        type="text"
        value={layout}
        onChange={(event) => setLayout(event.target.value)}
        placeholder="例: 1LDK"
        required
      />

      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : isEditMode ? '更新する' : '登録する'}
        </button>
        <button type="button" className="secondary-button" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  )
}

export default PropertyForm
