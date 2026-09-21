import { useState, useEffect, useCallback, useRef } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

export default function CollectionCard() {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Returns null when the list could not be read, so callers keep the last known state.
  const fetchImages = useCallback(async (signal?: AbortSignal): Promise<string[] | null> => {
    try {
      const res = await fetch('/api/collection', { signal })
      return res.ok ? await res.json() : null
    } catch {
      return null
    }
  }, [])

  const refresh = useCallback(async () => {
    const list = await fetchImages()
    if (list) setImages(list)
  }, [fetchImages])

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

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    if (file.size > MAX_UPLOAD_BYTES) {
      setError('That image is over 10 MB. Pick a smaller one.')
      e.target.value = ''
      return
    }

    setUploading(true)
    try {
      const form = new FormData()
      form.append('image', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) throw new Error('upload failed')
      await refresh()
    } catch {
      setError('Upload failed. Try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function handleDelete(imagePath: string, e: MouseEvent) {
    e.stopPropagation()
    const filename = imagePath.split('/').pop()
    if (!filename) return

    setError(null)
    try {
      const res = await fetch(`/api/collection/${encodeURIComponent(filename)}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      setImages(prev => prev.filter(p => p !== imagePath))
    } catch {
      setError('Could not remove that image. Try again.')
    }
  }

  return (
    <>
      <section className="card reveal p-5" style={{ animationDelay: '150ms' }} aria-label="Collection">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-base font-bold text-ink">Collection</h2>
          <p className="text-2xs text-faint">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </p>
        </div>

        {images.length === 0 && !uploading && (
          <p className="mt-1 text-xs text-mute">Nothing here yet. Add the first one.</p>
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
              <button
                type="button"
                onClick={e => handleDelete(src, e)}
                aria-label="Remove image"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/60 text-white opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-tile border border-dashed border-line text-faint transition-colors hover:border-crimson hover:bg-crimson-tint hover:text-crimson disabled:cursor-wait"
          >
            {uploading ? (
              <svg className="h-5 w-5 animate-spin text-crimson" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
            <span className="text-2xs font-semibold">{uploading ? 'Uploading' : 'Add'}</span>
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-xs text-crimson">
            {error}
          </p>
        )}

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
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
