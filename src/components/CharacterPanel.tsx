import { useState } from 'react'
import { config } from '../config'

function FallbackCharacter() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-lavender-100 rounded-2xl">
      <span className="text-lavender-400 text-6xl">✦</span>
    </div>
  )
}

export default function CharacterPanel() {
  const [modalOpen, setModalOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { character } = config

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-lavender-400">
          {character.subtitle}
        </p>
        <h1 className="font-serif text-5xl font-bold text-gray-800 leading-tight">
          {character.name}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          {character.description}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 w-fit px-5 py-2 rounded-full bg-lavender-500 text-white text-sm font-medium hover:bg-lavender-400 transition-colors"
        >
          Read More
        </button>

        <div className="relative w-48 h-64 mt-4">
          {imgError ? (
            <FallbackCharacter />
          ) : (
            <img
              src={character.imagePath}
              alt={character.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-xl"
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
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">
              {character.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">{character.readMoreContent}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 px-4 py-2 rounded-full bg-lavender-500 text-white text-sm hover:bg-lavender-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
