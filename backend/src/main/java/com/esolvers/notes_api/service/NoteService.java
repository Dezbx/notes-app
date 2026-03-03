package com.esolvers.notes_api.service;

import com.esolvers.notes_api.model.Category;
import com.esolvers.notes_api.model.Note;
import com.esolvers.notes_api.repository.CategoryRepository;
import com.esolvers.notes_api.repository.NoteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final CategoryRepository categoryRepository;

    public NoteService(NoteRepository noteRepository, CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchivedFalse();
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchivedTrue();
    }

    public List<Note> getNotesByCategory(Long categoryId) {
        return noteRepository.findByArchivedFalse().stream()
                .filter(note -> note.getCategories().stream()
                        .anyMatch(cat -> cat.getId().equals(categoryId)))
                .collect(Collectors.toList());
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note updatedNote) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        note.setTitle(updatedNote.getTitle());
        note.setContent(updatedNote.getContent());
        return noteRepository.save(note);
    }

    public Note toggleArchive(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        note.setArchived(!note.isArchived());
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        noteRepository.deleteById(id);
    }

    public Note addCategoryToNote(Long noteId, Long categoryId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        note.getCategories().add(category);
        return noteRepository.save(note);
    }

    public Note removeCategoryFromNote(Long noteId, Long categoryId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        note.getCategories().removeIf(cat -> cat.getId().equals(categoryId));
        return noteRepository.save(note);
    }
}