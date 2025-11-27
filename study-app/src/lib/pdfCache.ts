// PDF Caching system using IndexedDB for persistent storage

const DB_NAME = 'StudyAppPDFs'
const DB_VERSION = 1
const STORE_NAME = 'pdfs'

interface CachedPDF {
  filename: string
  data: ArrayBuffer
  size: number
  cachedAt: number
}

export interface PDFInfo {
  filename: string
  size: number
  cachedAt: number
}

class PDFCache {
  private db: IDBDatabase | null = null
  private initPromise: Promise<void> | null = null

  async init(): Promise<void> {
    if (this.db) return
    if (this.initPromise) return this.initPromise

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'filename' })
        }
      }
    })

    return this.initPromise
  }

  async get(filename: string): Promise<ArrayBuffer | null> {
    await this.init()
    if (!this.db) return null

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(filename)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const result = request.result as CachedPDF | undefined
        if (result?.data) {
          // Clone the ArrayBuffer to avoid detached buffer issues
          const clonedBuffer = result.data.slice(0)
          resolve(clonedBuffer)
        } else {
          resolve(null)
        }
      }
    })
  }

  async set(filename: string, data: ArrayBuffer): Promise<void> {
    await this.init()
    if (!this.db) return

    // Clone the buffer before storing
    const clonedData = data.slice(0)

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put({
        filename,
        data: clonedData,
        size: clonedData.byteLength,
        cachedAt: Date.now()
      } as CachedPDF)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async has(filename: string): Promise<boolean> {
    await this.init()
    if (!this.db) return false

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getKey(filename)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result !== undefined)
    })
  }

  async clear(): Promise<void> {
    await this.init()
    if (!this.db) return

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async delete(filename: string): Promise<void> {
    await this.init()
    if (!this.db) return

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(filename)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getAllCached(): Promise<string[]> {
    await this.init()
    if (!this.db) return []

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAllKeys()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result as string[])
    })
  }

  async getAllInfo(): Promise<PDFInfo[]> {
    await this.init()
    if (!this.db) return []

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const items = request.result as CachedPDF[]
        resolve(items.map(item => ({
          filename: item.filename,
          size: item.size,
          cachedAt: item.cachedAt
        })))
      }
    })
  }

  async getCacheSize(): Promise<number> {
    await this.init()
    if (!this.db) return 0

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const items = request.result as CachedPDF[]
        const totalSize = items.reduce((acc, item) => acc + (item.size || 0), 0)
        resolve(totalSize)
      }
    })
  }

  async getCacheCount(): Promise<number> {
    await this.init()
    if (!this.db) return 0

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.count()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }
}

export const pdfCache = new PDFCache()

// Get the base URL for assets (handles both dev and production)
const getBaseUrl = () => import.meta.env.BASE_URL || '/'

// Utility to fetch and cache a PDF
export async function fetchAndCachePDF(filename: string): Promise<ArrayBuffer> {
  // Check cache first
  const cached = await pdfCache.get(filename)
  if (cached) {
    console.log(`[PDF Cache] Hit: ${filename}`)
    return cached
  }

  // Fetch from server
  console.log(`[PDF Cache] Miss: ${filename}, fetching...`)
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}pdfs/${encodeURIComponent(filename)}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch PDF: ${filename}`)
  }

  const data = await response.arrayBuffer()
  
  // Cache for later
  await pdfCache.set(filename, data)
  console.log(`[PDF Cache] Cached: ${filename}`)
  
  // Return a fresh clone
  return data.slice(0)
}

// Get size of a remote PDF without downloading it fully
export async function getPDFSize(filename: string): Promise<number> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}pdfs/${encodeURIComponent(filename)}`, {
      method: 'HEAD'
    })
    const contentLength = response.headers.get('content-length')
    return contentLength ? parseInt(contentLength, 10) : 0
  } catch {
    return 0
  }
}

// Format bytes to human readable
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
