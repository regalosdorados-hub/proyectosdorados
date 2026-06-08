import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { supabase } from '@/lib/supabaseClient'

type PriceTier = {
  min_qty: number
  price: number
}

type ProductVariant = {
  color: string
  images: string[]
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
    { color: '', images: [], uploadFiles: [] },
  ])
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([{ min_qty: 1, price: 0 }])

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

        const loadedVariants: ProductVariant[] = Array.isArray(data.variants) && data.variants.length
          ? data.variants.map((variant: any) => ({
              color: String(variant.color ?? '').trim(),
              images: Array.isArray(variant.images) ? variant.images.filter(Boolean) : [],
              uploadFiles: [],
            }))
          : [{
              color: 'Sin color',
              images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
              uploadFiles: [],
            }]

        setVariants(loadedVariants.length ? loadedVariants : [{ color: '', images: [], uploadFiles: [] }])
        setPriceTiers(data.prices?.length ? data.prices : [{ min_qty: 1, price: data.price ?? 0 }])
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
    setVariants((current) => [...current, { color: '', images: [], uploadFiles: [] }])

  const removeVariant = (index: number) =>
    setVariants((current) => current.filter((_, idx) => idx !== index))

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

  const updatePriceTier = (index: number, field: 'min_qty' | 'price', value: number) => {
    setPriceTiers((current) =>
      current.map((tier, idx) => (idx === index ? { ...tier, [field]: value } : tier))
    )
  }

  const addPriceTier = () => setPriceTiers((current) => [...current, { min_qty: 1, price: 0 }])
  const removePriceTier = (index: number) => setPriceTiers((current) => current.filter((_, idx) => idx !== index))

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

      if (uploadError) {
        throw uploadError
      }

      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
      if (urlData?.publicUrl) {
        uploadedUrls.push(urlData.publicUrl)
      }
    }

    return uploadedUrls
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Guardar categoría si es nueva
      if (category && !existingCategories.includes(category)) {
        await supabase.from('categories').insert([{ name: category }])
      }

      const cleanVariants = variants
        .map((variant) => ({
          color: variant.color.trim() || 'Sin color',
          images: variant.images.filter(Boolean),
          uploadFiles: variant.uploadFiles,
        }))
        .filter((variant) => variant.color || variant.images.length || variant.uploadFiles.length)

      const initialVariants = cleanVariants.map((variant) => ({
        color: variant.color,
        images: variant.images,
      }))

      const cleanTiers = priceTiers
        .map((tier) => ({ min_qty: Number(tier.min_qty), price: Number(tier.price) }))
        .filter((tier) => tier.min_qty > 0 && tier.price > 0)
        .sort((a, b) => a.min_qty - b.min_qty)

      const productId = id || crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const payload = {
        id: productId,
        name,
        description,
        category,
        ref_code: refCode,
        featured,
        variants: initialVariants,
        images: initialVariants.flatMap((variant) => variant.images),
        prices: cleanTiers,
        updated_at: new Date(),
      }

      const { error: upsertError } = id
        ? await supabase.from('products').update(payload).eq('id', productId)
        : await supabase.from('products').insert([payload])

      if (upsertError) {
        throw upsertError
      }

      const hasFiles = cleanVariants.some((variant) => variant.uploadFiles.length > 0)
      if (hasFiles) {
        const finalVariants = await Promise.all(
          cleanVariants.map(async (variant) => {
            const uploadedUrls = await uploadVariantFiles(productId, variant)
            return {
              color: variant.color,
              images: [...variant.images, ...uploadedUrls],
            }
          })
        )

        const updatedPayload = {
          variants: finalVariants,
          images: finalVariants.flatMap((variant) => variant.images),
          updated_at: new Date(),
        }

        const { error: updateImagesError } = await supabase
          .from('products')
          .update(updatedPayload)
          .eq('id', productId)

        if (updateImagesError) {
          throw updateImagesError
        }
      }

      navigate('/admin/products')
    } catch (error: any) {
      alert(error?.message || 'Ocurrió un error al guardar el producto.')
    }

    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header con navegación */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin/products" 
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition shadow-sm"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">Administración</p>
              <h2 className="text-3xl font-playfair font-bold text-slate-950">{id ? 'Editar' : 'Nuevo'} Producto</h2>
            </div>
          </div>
          <div className="hidden sm:flex gap-3">
            <Link 
              to="/admin/products" 
              className="px-6 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-sm font-bold text-white hover:bg-slate-800 transition disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.1)]">
          <form onSubmit={handleSave} className="space-y-10">
            {/* Información Básica */}
            <section className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                Información General
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre del producto</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categoría</label>
                  <input
                    list="categories-list"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Elegí o escribí una nueva"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 transition"
                    required
                  />
                  <datalist id="categories-list">
                    {existingCategories.map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Código de Referencia (Ref)</label>
                  <input
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                    placeholder="Ej. G1, P3"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 transition"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Marcar como "Combo Destacado" (Aparece en el inicio)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 transition"
                  required
                />
              </div>
            </section>

            {/* Variantes */}
            <section className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Variantes y Colores
                </h3>
                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
                >
                  <Plus size={16} />
                  Agregar variante
                </button>
              </div>

              <div className="grid gap-6">
                {variants.map((variant, variantIndex) => (
                  <div key={variantIndex} className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 space-y-6">
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre del Color / Variante</label>
                        <input
                          value={variant.color}
                          onChange={(e) => updateVariantColor(variantIndex, e.target.value)}
                          placeholder="Ej. Rojo, Azul, Negro"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-400 transition"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(variantIndex)}
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Imágenes de la variante</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* Botón de subida */}
                        <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition group">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => addFilesToVariant(variantIndex, e.target.files)}
                            className="hidden"
                          />
                          <Plus size={24} className="text-slate-300 group-hover:text-amber-500" />
                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-amber-600">Subir</span>
                        </label>

                        {/* Imágenes existentes */}
                        {variant.images.map((imageUrl, imageIndex) => (
                          <div key={imageUrl} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group">
                            <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeVariantImage(variantIndex, imageIndex)}
                              className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}

                        {/* Archivos pendientes */}
                        {variant.uploadFiles.map((file, fileIndex) => (
                          <div key={fileIndex} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-amber-400 group">
                            <div className="h-full w-full bg-amber-50 flex items-center justify-center">
                              <ImageIcon size={24} className="text-amber-400" />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeVariantUploadFile(variantIndex, fileIndex)}
                              className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 size={20} />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-amber-400 py-1 px-2">
                              <p className="text-[8px] font-bold text-white truncate">{file.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Precios */}
            <section className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Escala de Precios
                </h3>
                <button
                  type="button"
                  onClick={addPriceTier}
                  className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
                >
                  <Plus size={16} />
                  Agregar nivel
                </button>
              </div>

              <div className="grid gap-4">
                {priceTiers.map((tier, index) => (
                  <div key={index} className="flex items-end gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cant. Mínima</label>
                        <input
                          type="number"
                          value={tier.min_qty}
                          min={1}
                          onChange={(e) => updatePriceTier(index, 'min_qty', Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-amber-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precio Unitario</label>
                        <input
                          type="number"
                          value={tier.price}
                          min={0}
                          onChange={(e) => updatePriceTier(index, 'price', Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePriceTier(index)}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end gap-4 pt-10 border-t border-slate-100">
              <Link 
                to="/admin/products" 
                className="px-8 py-4 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
              >
                Descartar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 rounded-full bg-slate-900 text-sm font-bold text-white hover:bg-slate-800 transition shadow-xl disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProductForm