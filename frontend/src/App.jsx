import { useState, useEffect } from 'react'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import './App.css'

function App() {
  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [categories, setCategories] = useState([])
  const [showArchived, setShowArchived] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [filterCategory, setFilterCategory] = useState(null)

  const API = 'http://localhost:8080/api/notes'
  const CAT_API = 'http://localhost:8080/api/categories'

  const fetchAll = async () => {
    const [activeRes, archivedRes, catRes] = await Promise.all([
      fetch(`${API}/active`),
      fetch(`${API}/archived`),
      fetch(CAT_API)
    ])
    setActiveNotes(await activeRes.json())
    setArchivedNotes(await archivedRes.json())
    setCategories(await catRes.json())
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    await fetch(CAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory.trim() })
    })
    setNewCategory('')
    fetchAll()
  }

  const handleDeleteCategory = async (id) => {
    await fetch(`${CAT_API}/${id}`, { method: 'DELETE' })
    if (filterCategory === id) setFilterCategory(null)
    fetchAll()
  }

  const getFilteredNotes = () => {
    const notes = showArchived ? archivedNotes : activeNotes
    if (!filterCategory) return notes
    return notes.filter(note =>
      note.categories?.some(cat => cat.id === filterCategory)
    )
  }

  return (
    <div className="app">
      <h1>📝 Notes App</h1>

      <NoteForm
        api={API}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        onSave={fetchAll}
      />

      {/* Category Manager */}
      <div className="category-section">
        <div className="category-input">
          <input
            type="text"
            placeholder="New category..."
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
          />
          <button onClick={handleAddCategory}>+ Add</button>
        </div>

        <div className="category-filters">
          <span
            className={`category-tag ${!filterCategory ? 'active' : ''}`}
            onClick={() => setFilterCategory(null)}
          >
            All
          </span>
          {categories.map(cat => (
            <span key={cat.id} className="category-filter-item">
              <span
                className={`category-tag ${filterCategory === cat.id ? 'active' : ''}`}
                onClick={() => setFilterCategory(filterCategory === cat.id ? null : cat.id)}
              >
                {cat.name}
              </span>
              <span
                className="category-delete"
                onClick={() => handleDeleteCategory(cat.id)}
              >✕</span>
            </span>
          ))}
        </div>
      </div>

      <div className="tabs">
        <button onClick={() => setShowArchived(false)}
          className={!showArchived ? 'active' : ''}>
          Active Notes ({filterCategory
            ? activeNotes.filter(n => n.categories?.some(c => c.id === filterCategory)).length
            : activeNotes.length})
        </button>
        <button onClick={() => setShowArchived(true)}
          className={showArchived ? 'active' : ''}>
          Archived Notes ({filterCategory
            ? archivedNotes.filter(n => n.categories?.some(c => c.id === filterCategory)).length
            : archivedNotes.length})
        </button>
      </div>

      <NoteList
        notes={getFilteredNotes()}
        categories={categories}
        api={API}
        api={API}
        onEdit={setEditingNote}
        onRefresh={fetchAll}
      />
    </div>
  )
}

export default App