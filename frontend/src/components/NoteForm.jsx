import { useState, useEffect } from 'react'

function NoteForm({ api, editingNote, setEditingNote, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [editingNote])

  const handleSubmit = async () => {
    if (!title.trim()) return alert('Title is required')

    const note = { title, content }

    if (editingNote) {
      await fetch(`${api}/${editingNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      })
      setEditingNote(null)
    } else {
      await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      })
    }

    setTitle('')
    setContent('')
    onSave()
  }

  const handleCancel = () => {
    setEditingNote(null)
    setTitle('')
    setContent('')
  }

  return (
    <div className="note-form">
      <h2>{editingNote ? 'Edit Note' : 'New Note'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="form-buttons">
        <button onClick={handleSubmit}>
          {editingNote ? 'Update' : 'Save'}
        </button>
        {editingNote && (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>
    </div>
  )
}

export default NoteForm