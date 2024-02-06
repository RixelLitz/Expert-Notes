export function NoteCard() {
  return (
    <button className="rounded-md text-left outline-none bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover: ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <h1 className="text-sm font-medium text-slate-300">Há 2 dias</h1>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        molestias a delectus, ea nostrum beatae ipsam aperiam? Quae, perferendis
        culpa inventore possimus iusto facere asperiores explicabo, nihil,
        commodi nam nisi. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Ipsum magnam quas dicta id aperiam dolorum suscipit nemo libero,
        quibusdam amet nam sapiente excepturi, delectus labore, quod iste veniam
        velit ut?
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  )
}
