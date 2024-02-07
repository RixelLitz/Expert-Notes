import logo from "./assets/Logo.svg"
import { NewNoteCard } from "./components/new-notecard"
import { NoteCard } from "./components/note-card"
const note = {
  date: new Date(),
  content: "Hello World",
}

export function App() {
  return (
    <div className="mx-auto space-y-6 max-w-6xl my-12">
      <img src={logo} alt="Logo Expert Note" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard note={note} />
      </div>
    </div>
  )
}
