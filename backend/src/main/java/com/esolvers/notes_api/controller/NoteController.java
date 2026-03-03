package com.esolvers.notes_api.controller;

import com.esolvers.notes_api.model.Note;
import com.esolvers.notes_api.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/active")
    public ResponseEntity<List<Note>> getActiveNotes() {
        return ResponseEntity.ok(noteService.getActiveNotes());
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        return ResponseEntity.ok(noteService.getArchivedNotes());
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        return ResponseEntity.ok(noteService.createNote(note));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        return ResponseEntity.ok(noteService.updateNote(id, note));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Note> toggleArchive(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.toggleArchive(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{noteId}/categories/{categoryId}")
    public ResponseEntity<Note> addCategory(
            @PathVariable Long noteId,
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(noteService.addCategoryToNote(noteId, categoryId));
    }

    @DeleteMapping("/{noteId}/categories/{categoryId}")
    public ResponseEntity<Note> removeCategory(
            @PathVariable Long noteId,
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(noteService.removeCategoryFromNote(noteId, categoryId));
    }

    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<List<Note>> getNotesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(noteService.getNotesByCategory(categoryId));
    }
}
