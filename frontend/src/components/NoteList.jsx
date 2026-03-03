import CategoryManager from './CategoryManager'

function NoteList({ notes, categories, api, onEdit, onRefresh }) {

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return
    await fetch(`${api}/${id}`, { method: 'DELETE' })
    onRefresh()
  }

  const handleToggleArchive = async (id) => {
    await fetch(`${api}/${id}/archive`, { method: 'PATCH' })
    onRefresh()
  }

  if (notes.length === 0) {
    return <p className="empty">No notes here yet!</p>
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h3>{note.title}</h3>
            <span className="note-date">
              {new Date(note.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <p>{note.content}</p>
          <CategoryManager
            categories={categories}
            noteId={note.id}
            noteCategories={note.categories || []}
            api={api}
            onRefresh={onRefresh}
          />
          <div className="note-buttons">
            <button onClick={() => onEdit(note)}>✏️ Edit</button>
            <button onClick={() => handleToggleArchive(note.id)}>
              {note.archived ? '📤 Unarchive' : '📥 Archive'}
            </button>
            <button onClick={() => handleDelete(note.id)} className="delete">
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NoteList