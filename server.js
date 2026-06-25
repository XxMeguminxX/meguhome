import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

const COLLECTION_DIR = path.join(__dirname, 'public', 'archwizardcollection')
if (!fs.existsSync(COLLECTION_DIR)) fs.mkdirSync(COLLECTION_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: COLLECTION_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed'))
  },
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// GET - list all images
app.get('/api/collection', (req, res) => {
  const files = fs.readdirSync(COLLECTION_DIR)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort((a, b) => {
      const statA = fs.statSync(path.join(COLLECTION_DIR, a)).mtimeMs
      const statB = fs.statSync(path.join(COLLECTION_DIR, b)).mtimeMs
      return statB - statA
    })
    .map(f => `/archwizardcollection/${f}`)
  res.json(files)
})

// POST - upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ path: `/archwizardcollection/${req.file.filename}` })
})

// DELETE - remove image
app.delete('/api/collection/:filename', (req, res) => {
  const filePath = path.join(COLLECTION_DIR, req.params.filename)
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' })
  fs.unlinkSync(filePath)
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`)
})
