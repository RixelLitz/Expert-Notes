import { ChangeEvent, useState } from "react"
import logo from "../assets/Logo.svg"
import { NewNoteCard } from "../components/new-notecard"
import { NoteCard } from "../components/note-card"
interface Note {
  id: string
  date: Date
  content: string
}
export function Notes() {
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes")
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })
  function oneNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem("notes", JSON.stringify(notesArray))
  }
  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id != id
    })
    setNotes(notesArray)
    localStorage.setItem("notes", JSON.stringify(notesArray))
  }
  function onNoteEdited(id: string, newContent: string) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        // Se o ID da nota corresponder ao ID fornecido, atualize o conteúdo
        return { ...note, content: newContent }
      }
      return note
    })

    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }
  const filteredNotes =
    search != ""
      ? notes.filter((notes) =>
          notes.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes
  return (
    <div className="mx-auto space-y-6 max-w-6xl my-12 px-5">
      <div className="flex gap-5 items-center">
        <img src={logo} alt="Logo Expert Note" />
        <h1 className="text-sm text-slate-600">
          Desenvolvido com ❤ por Rian B.
        </h1>
      </div>

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard oneNoteCreated={oneNoteCreated} />
        {filteredNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onNoteDeleted={onNoteDeleted}
              onNoteEdited={onNoteEdited}
            />
          )
        })}
      </div>
    </div>
  )
}
