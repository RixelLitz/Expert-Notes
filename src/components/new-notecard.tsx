import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"
let speechRecognition: SpeechRecognition | null = null
interface NewNoteCardProps {
  oneNoteCreated: (content: string) => void
}

export function NewNoteCard({ oneNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [content, setContent] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleStartEditor() {
    setShouldShowOnBoarding(false)
  }
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    // pega os dados digitados na textarea
    setContent(event.target.value)
    if (event.target.value === "") {
      setShouldShowOnBoarding(true)
    }
  }
  function handleSaveNote(event: FormEvent) {
    // Salva a nota quando é enviado um submit no form
    event.preventDefault()
    if (content === "") {
      console.log("negado")
      return toast.error("Você não pode adicionar uma nota vazia.")
    }
    oneNoteCreated(content)
    setContent("")
    toast.success("Nota criada com sucesso!")
    setShouldShowOnBoarding(true)
    setDialogOpen(false)
  }
  function handleStartRecording() {
    const isSpeechRecognitionAPIAvaible = // verificação se a api de gravação de voz é suportada no navegador do usuario
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window
    if (!isSpeechRecognitionAPIAvaible) {
      alert("Infelizmente seu navegador não suporta a API de gravação de voz.")
      return
    }
    setIsRecording(true)
    setShouldShowOnBoarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = "pt-BR"
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, "")
      setContent(transcription)
    }
    speechRecognition.onerror = (event) => {
      console.error(event)
    }
    speechRecognition.start()
  }
  function handleStopRecording() {
    setIsRecording(false)
    if (speechRecognition != null) {
      speechRecognition.stop()
    }
  }
  function handleCloseDialog() {
    //Usado para reset quando fecha o dialog.
    setShouldShowOnBoarding(true)
    setContent("")
  }

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={() => {
        setDialogOpen(!dialogOpen)
        handleCloseDialog()
      }}
    >
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 text-left flex flex-col gap-3 hover:ring-2 hover: ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <h1 className="text-sm font-medium text-slate-200">Adicionar nota</h1>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <button
            onClick={handleCloseDialog}
            className={`absolute text-sm left-0 top-0 p-1.5 text-slate-400 hover:text-slate-100 ${
              shouldShowOnBoarding ? "hidden" : "block"
            }`}
          >
            Voltar
          </button>
          <form className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h1 className="text-sm font-medium mt-5 text-slate-300">
                Adicionar nota
              </h1>
              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando uma nota em áudio
                  </button>{" "}
                  ou se preferir utilize{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type="button"
                className=" flex items-center justify-center gap-2 w-full bg-slate-900 py-4 text-center text-sm text-white outline-none font-medium hover:bg-indigo-700"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando... (Clique p/ interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full bg-indigo-600 py-4 text-center text-sm text-white outline-none font-medium hover:bg-indigo-700"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
