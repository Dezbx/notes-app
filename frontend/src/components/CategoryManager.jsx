function CategoryManager({ categories, noteId, noteCategories, api, onRefresh }) {

  const handleAdd = async (categoryId) => {
    await fetch(`${api}/${noteId}/categories/${categoryId}`, {
      method: 'POST'
    })
    onRefresh()
  }

  const handleRemove = async (categoryId) => {
    await fetch(`${api}/${noteId}/categories/${categoryId}`, {
      method: 'DELETE'
    })
    onRefresh()
  }

  const noteCategoryIds = noteCategories.map(c => c.id)

  return (
    <div className="category-manager">
      {categories.map(cat => {
        const isAdded = noteCategoryIds.includes(cat.id)
        return (
          <span
            key={cat.id}
            className={`category-tag ${isAdded ? 'active' : ''}`}
            onClick={() => isAdded ? handleRemove(cat.id) : handleAdd(cat.id)}
          >
            {isAdded ? '✕ ' : '+ '}{cat.name}
          </span>
        )
      })}
    </div>
  )
}

export default CategoryManager