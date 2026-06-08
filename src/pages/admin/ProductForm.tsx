import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, Trash2, Plus, Image as ImageIcon, DollarSign } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { supabase } from '@/lib/supabaseClient'

type PriceTier = {
  min_qty: number
  price: number
}

type ProductVariant = {
  color: string
  images: string[]
  prices: PriceTier[]
  uploadFiles: File[]
}

const BUCKET_NAME = 'product-images'

const ProductForm: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [existingCategories, setExistingCategories] = useState<string[]>([])
  const [refCode, setRefCode] = useState('')
  const [featured, setFeatured] = useState(false)
  const [variants, setVariants] = useState<ProductVariant[]>([
    { color: '', images: [], prices: [{ min_qty: 1, price: 0 }], uploadFiles: [] },
  ])
  const [globalPrices, setGlobalPrices] = useState<PriceTier[]>([{ min_qty: 1, price: 0 }])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('name')
      if (data) setExistingCategories(data.map(c => c.name))
    }
    fetchCategories()

    if (!id) return

    const load = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (error) {
        console.error(error)
      } else if (data) {
        setName(data.name || '')
        setDescription(data.description || '')
        setCategory(data.category || '')
        setRefCode(data.ref_code || '')
        setFeatured(data.featured || false)
        setGlobalPrices(data.prices?.length ? data.prices : [{ min_qty: 1, price: 0 }])

        const loadedVariants: ProductVariant[] = Array.isArray(data.variants) && data.variants.length
          ? data.variants.map((variant: any) => ({
              color: String(variant.color ?? '').trim(),
              images: Array.isArray(variant.images) ? variant.images.filter(Boolean) : [],
              prices: variant.prices?.length ? variant.prices : [{ min_qty: 1, price: 0 }],
              uploadFiles: [],
            }))
          : [{
              color: 'Estándar',
              images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
              prices: [{ min_qty: 1, price: 0 }],
              uploadFiles: [],
            }]

        setVariants(loadedVariants)
      }
      setLoading(false)
    }

    load()
  }, [id])

  const updateVariantColor = (index: number, value: string) => {
    setVariants((current) =>
      current.map((variant, idx) => (idx === index ? { ...variant, color: value } : variant))
    )
  }

  const addVariant = () =>
    setVariants((current) => [...current, { color: '', images: [], prices: [{ min_qty: 1, price: 0 }], uploadFiles: [] }])

  const removeVariant = (index: number) =>
    setVariants((current) => current.filter((_, idx) => idx !== index))

  const updateVariantPrice = (vIdx: number, pIdx: number, field: 'min_qty' | 'price', value: number) => {
    setVariants((current) =>
      current.map((v, idx) => {
        if (idx !== vIdx) return v
        const newPrices = v.prices.map((p, i) => (i === pIdx ? { ...p, [field]: value } : p))
        return { ...v, prices: newPrices }
      })
    )
  }

  const addVariantPrice = (vIdx: number) => {
    setVariants((current) =>
      current.map((v, idx) => (idx === vIdx ? { ...v, prices: [...v.prices, { min_qty: 1, price: 0 }] } : v))
    )
  }

  const removeVariantPrice = (vIdx: number, pIdx: number) => {
    setVariants((current) =>
      current.map((v, idx) => (idx === vIdx ? { ...v, prices: v.prices.filter((_, i) => i !== pIdx) } : v))
    )
  }

  const addFilesToVariant = (index: number, files: FileList | null) => {
    if (!files) return
    const fileArray = Array.from(files)
    setVariants((current) =>
      current.map((variant, idx) =>
        idx === index
          ? { ...variant, uploadFiles: [...variant.uploadFiles, ...fileArray] }
          : variant
      )
    )
  }

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    setVariants((current) =>
      current.map((variant, idx) =>
        idx === variantIndex
          ? { ...variant, images: variant.images.filter((_, i) => i !== imageIndex) }
          : variant
      )
    )
  }

  const removeVariantUploadFile = (variantIndex: number, fileIndex: number) => {
    setVariants((current) =>
      current.map((variant, idx) =>
        idx === variantIndex
          ? { ...variant, uploadFiles: variant.uploadFiles.filter((_, i) => i !== fileIndex) }
          : variant
      )
    )
  }

  const sanitizeFolderName = (value: string) =>
    value.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '') || 'sin-color'

  const uploadVariantFiles = async (productId: string, variant: ProductVariant) => {
    const uploadedUrls: string[] = []
    const folder = sanitizeFolderName(variant.color)

    for (const file of variant.uploadFiles) {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `${productId}/${folder}/${fileName}`
      const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
        upsert: true,
      })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
      if (urlData?.publicUrl) uploadedUrls.push(urlData.publicUrl)
    }

    return uploadedUrls
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (category && !existingCategories.includes(category)) {
        await supabase.from('categories').insert([{ name: category }])
      }

      const productId = id || crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
      
      // Primero procesamos las variantes para limpiar datos y preparar el payload inicial
      const initialVariants = variants.map(v => ({
        color: v.color.trim() || 'Estándar',
        images: v.images.filter(Boolean),
        prices: v.prices.filter(p => p.min_qty > 0 && p.price > 0).sort((a, b) => a.min_qty - b.min_qty)
      }))

      const payload = {
        id: productId,
        name,
        description,
        category,
        ref_code: refCode,
        featured,
        variants: initialVariants,
        images: initialVariants.flatMap(v => v.images),
        prices: globalPrices.filter(p => p.min_qty > 0 && p.price > 0).sort((a, b) => a.min_qty - b.min_qty),
        updated_at: new Date(),
      }

      const { error: upsertError } = id
        ? await supabase.from('products').update(payload).eq('id', productId)
        : await supabase.from('products').insert([payload])

      if (upsertError) throw upsertError

      // Subida de archivos si existen
      const hasFiles = variants.some(v => v.uploadFiles.length > 0)
      if (hasFiles) {
        const finalVariants = await Promise.all(
          variants.map(async (v, idx) => {
            const uploadedUrls = await uploadVariantFiles(productId, v)
            return {
              ...initialVariants[idx],
              images: [...initialVariants[idx].images, ...uploadedUrls]
            }
          })
        )

        await supabase.from('products').update({
          variants: finalVariants,
          images: finalVariants.flatMap(v => v.images),
          updated_at: new Date()
        }).eq('id', productId)
      }

      navigate('/admin/products')
    } catch (error: any) {
      alert(error?.message || 'Error al guardar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/products" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition shadow-sm">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">Administración</p>
              <h2 className="text-3xl font-playfair font-bold text-slate-950">{id ? 'Editar' : 'Nuevo'} Producto</h2>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-sm font-bold text-white hover:bg-slate-800 transition disabled:opacity-50 shadow-xl">
              <Save size={18} />
              {loading ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                Información General
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400 transition" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categoría</label>
                  <input list="categories-list" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400 transition" required />
                  <datalist id="categories-list">{existingCategories.map(cat => <option key={cat} value={cat} />)}</datalist>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Descripción</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-[100px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400 transition" required />
              </div>
            </section>

            <section className="space-y-8 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Variantes y Precios Específicos
                </h3>
                <button type="button" onClick={addVariant} className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition">
                  <Plus size={16} /> Agregar variante / tipo
                </button>
              </div>

              <div className="space-y-8">
                {variants.map((variant, vIdx) => (
                  <div key={vIdx} className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 space-y-8">
                    <div className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre del Tipo / Formato / Color</label>
                        <input value={variant.color} onChange={(e) => updateVariantColor(vIdx, e.target.value)} placeholder="Ej. Vino Malbec, Vino Cabernet, Color Negro" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-amber-400 transition" required />
                      </div>
                      <button type="button" onClick={() => removeVariant(vIdx)} className="h-12 w-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Imágenes de variante */}
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Imágenes</label>
                        <div className="grid grid-cols-3 gap-3">
                          <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition">
                            <input type="file" multiple accept="image/*" onChange={(e) => addFilesToVariant(vIdx, e.target.files)} className="hidden" />
                            <Plus size={20} className="text-slate-300" />
                            <span className="text-[9px] font-bold text-slate-400">Subir</span>
                          </label>
                          {variant.images.map((img, iIdx) => (
                            <div key={iIdx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group">
                              <img src={img} className="h-full w-full object-cover" />
                              <button type="button" onClick={() => removeVariantImage(vIdx, iIdx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
                            </div>
                          ))}
                          {variant.uploadFiles.map((file, fIdx) => (
                            <div key={fIdx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-amber-400 flex items-center justify-center bg-amber-50">
                              <ImageIcon size={20} className="text-amber-400" />
                              <button type="button" onClick={() => removeVariantUploadFile(vIdx, fIdx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><Trash2 size={10} /></button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Precios de variante */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Escala de Precios para esta opción</label>
                          <button type="button" onClick={() => addVariantPrice(vIdx)} className="text-[10px] font-bold text-amber-600 hover:underline">+ Agregar nivel</button>
                        </div>
                        <div className="space-y-3">
                          {variant.prices.map((price, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100">
                              <div className="flex-1 flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400">Desde</span>
                                <input type="number" value={price.min_qty} onChange={(e) => updateVariantPrice(vIdx, pIdx, 'min_qty', Number(e.target.value))} className="w-16 text-center border-b border-slate-200 outline-none focus:border-amber-400 text-sm" />
                                <span className="text-[10px] font-bold text-slate-400">uds:</span>
                                <div className="flex-1 relative">
                                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                                  <input type="number" value={price.price} onChange={(e) => updateVariantPrice(vIdx, pIdx, 'price', Number(e.target.value))} className="w-full pl-4 border-b border-slate-200 outline-none focus:border-amber-400 text-sm font-bold" />
                                </div>
                              </div>
                              <button type="button" onClick={() => removeVariantPrice(vIdx, pIdx)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProductForm