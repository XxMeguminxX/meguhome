import { useState } from 'react'
import { config } from '../config'

function FallbackCharacter() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#4ECDC4] border-2 border-[#1a1a2e] rounded-2xl">
      <span className="text-[#1a1a2e] text-6xl">✦</span>
    </div>
  )
}

export default function CharacterPanel() {
  const [modalOpen, setModalOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { character } = config

  return (
    <>
      <div className="flex flex-col gap-3 bg-white/30 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-8 shadow-[4px_4px_0px_rgba(0,0,0,0.15)]">
        <p className="text-xs uppercase text-fuchsia-600 font-bold tracking-widest">
          {character.subtitle}
        </p>
        <h1 className="text-5xl font-black text-[#1a1a2e] leading-tight">
          {character.name}
        </h1>
        <p className="text-sm text-[#1a1a2e]/70 font-medium leading-relaxed max-w-xs">
          {character.description}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 w-fit px-6 py-2.5 rounded-full bg-[#FFE66D] border-2 border-[#1a1a2e] text-[#1a1a2e] text-sm font-black shadow-[4px_4px_0px_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a2e] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
        >
          Read More
        </button>

        <div className="mt-4 w-56" role="img" aria-label={character.name}>
          {imgError ? (
            <FallbackCharacter />
          ) : (
            <img
              src={character.imagePath}
              alt={character.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-[4px_4px_0px_#1a1a2e]"
            />
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            data-testid="modal-backdrop"
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md mx-4 border-2 border-[#1a1a2e] shadow-[6px_6px_0px_#1a1a2e]">
            <h2 className="text-2xl font-black text-[#1a1a2e] mb-4">
              {character.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">{character.readMoreContent}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 px-4 py-2 rounded-full bg-[#FF6B6B] border-2 border-[#1a1a2e] text-[#1a1a2e] text-sm font-black shadow-[3px_3px_0px_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#1a1a2e] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
