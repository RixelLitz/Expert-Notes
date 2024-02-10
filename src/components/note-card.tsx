import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { X } from "lucide-react"
import { Pen } from "lucide-react"
import { ArrowLeftFromLine } from "lucide-react"

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }
  onNoteDeleted: (id: string) => void
  onNoteEdited: (id: string, newContent: string) => void
}

export function NoteCard({ note, onNoteDeleted, onNoteEdited }: NoteCardProps) {
  const [newContent, setNewContent] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false) // Adiciona estado para controlar a edição

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen)
        setIsEditing(false) // Ao fechar o dialog, redefine o estado de edição
      }}
    >
      <Dialog.Trigger className="rounded-md text-left flex flex-col outline-none bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <h1 className="text-sm font-medium text-slate-300 first-letter:uppercase">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </h1>

        <button onClick={() => setIsEditing(true)}>
          <Pen className="absolute top-0 right-0 m-2 size-5 text-slate-400" />
        </button>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed md:left-1/2 inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <button onClick={() => setIsEditing(true)}>
              <Pen
                className={`${
                  isEditing ? "hidden" : "block"
                } absolute top-0 left-0 m-2 size-5 text-red  text-slate-400 hover:text-slate-100`}
              />
            </button>
            <button onClick={() => setIsEditing(false)}>
              <ArrowLeftFromLine
                className={`${
                  isEditing ? "block" : "hidden"
                } absolute top-0 left-0 m-2 size-5 text-slate-400 hover:text-slate-100`}
              />
            </button>
            <h1 className="text-sm font-medium text-slate-300 mt-5 first-letter:uppercase">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </h1>
            <div className={`${isEditing ? "hidden" : "block"}`}>
              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            </div>

            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Novo conteúdo da nota..."
              className={`w-full h-20 bg-slate-800 text-slate-300 border border-slate-600 rounded-md p-2 outline-none resize-none ${
                isEditing ? "" : "hidden"
              }`}
            />
          </div>
          <button
            onClick={() => {
              onNoteEdited(note.id, newContent)
              setIsDialogOpen(false) // Fecha o dialog após a edição
            }}
            type="button"
            className={`${
              isEditing ? "w-full" : "hidden"
            } bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group`}
          >
            Salvar Edição
          </button>
          <button
            onClick={() => onNoteDeleted(note.id)}
            type="button"
            className={`${
              isEditing ? "hidden" : "w-full"
            } w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group`}
          >
            Deseja{" "}
            <span className="text-red-500 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
