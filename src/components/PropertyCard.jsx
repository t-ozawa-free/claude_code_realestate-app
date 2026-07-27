// 家賃(円)を「12.0万円」のような表示形式に整形する
function formatRent(rent) {
  return (rent / 10000).toLocaleString('ja-JP', { maximumFractionDigits: 1 }) + '万円'
}

function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="property-rent">家賃: {formatRent(property.rent)}</p>
      <p className="property-area">エリア: {property.area}</p>
      <p className="property-layout">間取り: {property.layout}</p>
      <div className="property-card-actions">
        <button type="button" className="secondary-button" onClick={onEdit}>
          編集
        </button>
        <button type="button" className="danger-button" onClick={onDelete}>
          削除
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
