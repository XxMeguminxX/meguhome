import { useState, useEffect, useRef } from 'react'

export default function CollectionCard() {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const res = await fetch('/api/collection')
      if (res.ok) setImages(await res.json())
    } catch {}
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const form = new FormData()
      form.append('image', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (res.ok) await fetchImages()
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function handleDelete(imagePath: string, e: React.MouseEvent) {
    e.stopPropagation()
    const filename = imagePath.split('/').pop()!
    await fetch(`/api/collection/${filename}`, { method: 'DELETE' })
    setImages(prev => prev.filter(p => p !== imagePath))
  }

  return (
    <>
      <div className="card p-4 animate-fade-up delay-150">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[40px] font-black leading-none font-display" style={{ color: '#1a2a3a' }}>
              {String(images.length).padStart(2, '0')}.
            </p>
            <p className="text-[13px] font-black" style={{ color: '#1a2a3a' }}>Megu Collection</p>
            <p className="text-[11px] font-semibold" style={{ color: '#B07878' }}>Arch Wizard Album</p>
          </div>

          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F4F5D] transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #F7C964, #F5D048)', boxShadow: '0 3px 10px rgba(247,201,100,0.45)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-[10px] overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-md relative group"
              onClick={() => setLightbox(src)}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              {/* Delete button on hover */}
              <button
                onClick={e => handleDelete(src, e)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}

          {/* Upload button */}
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-[10px] flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.03] border-2 border-dashed"
            style={{ borderColor: uploading ? '#C24448' : '#EDD8D4' }}
            onMouseEnter={e => { if (!uploading) { (e.currentTarget).style.borderColor = '#C24448'; (e.currentTarget).style.background = '#fdf0f0' } }}
            onMouseLeave={e => { if (!uploading) { (e.currentTarget).style.borderColor = '#EDD8D4'; (e.currentTarget).style.background = 'transparent' } }}
          >
            {uploading ? (
              <svg className="w-5 h-5 animate-spin" style={{ color: '#C24448' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
              </svg>
            ) : (
              <>
                <svg className="w-5 h-5" style={{ color: '#C8A0A0' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span className="text-[9px] font-bold" style={{ color: '#C8A0A0' }}>Upload</span>
              </>
            )}
          </button>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full text-white flex items-center justify-center"
              style={{ background: '#C24448' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
