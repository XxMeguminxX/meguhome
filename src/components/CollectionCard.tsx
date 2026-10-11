import { useState, useEffect, useCallback } from 'react'

export default function CollectionCard() {
  const [images, setImages] = useState<string[]>([])
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Returns null when the list could not be read, so callers keep the last known state.
  const fetchImages = useCallback(async (signal?: AbortSignal): Promise<string[] | null> => {
    try {
      const res = await fetch('/api/collection', { signal })
      return res.ok ? await res.json() : null
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchImages(controller.signal).then(list => {
      if (list) setImages(list)
    })
    return () => controller.abort()
  }, [fetchImages])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <section className="card reveal p-5" style={{ animationDelay: '150ms' }} aria-label="Collection">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-base font-bold text-ink">Collection</h2>
          <p className="text-2xs text-faint">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </p>
        </div>

        {images.length === 0 && (
          <p className="mt-1 text-xs text-mute">Nothing here yet.</p>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map(src => (
            <div key={src} className="group relative">
              <button
                type="button"
                onClick={() => setLightbox(src)}
                className="block aspect-square w-full overflow-hidden rounded-tile bg-paper transition-shadow hover:shadow-lift"
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-card object-contain" />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
              autoFocus
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-white shadow-lift"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
