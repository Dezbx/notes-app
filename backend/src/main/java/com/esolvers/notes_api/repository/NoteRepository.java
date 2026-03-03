package com.esolvers.notes_api.repository;

import com.esolvers.notes_api.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchivedFalse();
    List<Note> findByArchivedTrue();
}
