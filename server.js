import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

const COLLECTION_DIR = path.join(__dirname, 'public', 'archwizardcollection')
const IMAGE_RE = /\.(jpe?g|png|gif|webp)$/i
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

fs.mkdirSync(COLLECTION_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: COLLECTION_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') && IMAGE_RE.test(file.originalname)) cb(null, true)
    else cb(new Error('Only jpg, png, gif, and webp images are allowed'))
  },
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

/** Resolve a user-supplied name to a path that cannot escape COLLECTION_DIR. */
function resolveInCollection(name) {
  const safe = path.basename(name)
  if (!safe || safe.startsWith('.') || !IMAGE_RE.test(safe)) return null
  const full = path.join(COLLECTION_DIR, safe)
  return full.startsWith(COLLECTION_DIR + path.sep) ? full : null
}

// Newest first.
app.get('/api/collection', (req, res) => {
  try {
    const files = fs
      .readdirSync(COLLECTION_DIR, { withFileTypes: true })
      .filter(entry => entry.isFile() && IMAGE_RE.test(entry.name))
      .map(entry => ({
        name: entry.name,
        mtime: fs.statSync(path.join(COLLECTION_DIR, entry.name)).mtimeMs,
      }))
      .sort((a, b) => b.mtime - a.mtime)
      .map(entry => `/archwizardcollection/${encodeURIComponent(entry.name)}`)
    res.json(files)
  } catch (err) {
    console.error('Failed to list collection:', err)
    res.status(500).json({ error: 'Could not read the collection' })
  }
})

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.status(201).json({ path: `/archwizardcollection/${encodeURIComponent(req.file.filename)}` })
})

app.delete('/api/collection/:filename', (req, res) => {
  const filePath = resolveInCollection(req.params.filename)
  if (!filePath) return res.status(400).json({ error: 'Invalid filename' })

  try {
    fs.unlinkSync(filePath)
  } catch (err) {
    if (err.code === 'ENOENT') return res.status(404).json({ error: 'Not found' })
    console.error('Failed to delete image:', err)
    return res.status(500).json({ error: 'Could not delete the image' })
  }
  res.json({ ok: true })
})

// Turn multer / upload failures into JSON instead of Express' default HTML page.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 10 MB or smaller' : err.message
    return res.status(413).json({ error: message })
  }
  console.error(err)
  res.status(400).json({ error: err.message || 'Request failed' })
})

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`)
})
