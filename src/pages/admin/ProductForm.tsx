import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  const [refCode, setRefCode] = useState('')
  const [featured, setFeatured] = useState(false)
  const [variants, setVariants] = useState<ProductVariant[]>([
    { color: '', images: [], uploadFiles: [] },
  ])
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([{ min_qty: 1, price: 0 }])

  useEffect(() => {
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
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-500">Administración</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">{id ? 'Editar' : 'Nuevo'} producto</h2>
            <p className="mt-2 text-slate-600">Define nombre, categorías (tags), variantes y si es un combo destacado.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Nombre del producto</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Categorías / Tags (Separados por coma)</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ej: Día del Padre, Premium, Gastronomía"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Código de Referencia (Ref)</label>
                <input
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value)}
                  placeholder="Ej. G1, P3"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <div className="flex items-center gap-3 pt-8">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                </div>
                <label htmlFor="featured" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  Marcar como "Combo Destacado" (Aparece en el inicio)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-3 w-full min-h-[140px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                required
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">Variantes por color</h3>
                  <p className="text-sm text-slate-500">Cada variante puede tener varias imágenes.</p>
                </div>
                <button
                  type="button"
                  onClick={addVariant}
                  className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  Agregar variante
                </button>
              </div>

              <div className="space-y-6">
                {variants.map((variant, variantIndex) => (
                  <div key={variantIndex} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="grid gap-4 md:grid-cols-[1fr_70px] items-end">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700">Color / Variante</label>
                        <input
                          value={variant.color}
                          onChange={(e) => updateVariantColor(variantIndex, e.target.value)}
                          placeholder="Ej. Rojo, Azul, Negro"
                          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(variantIndex)}
                        className="rounded-full bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700">Subir imágenes</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => addFilesToVariant(variantIndex, e.target.files)}
                          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        />
                      </div>

                      {variant.uploadFiles.length > 0 && (
                        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
                          <p className="text-sm font-semibold text-amber-700">Imágenes nuevas pendientes</p>
                          <ul className="mt-3 space-y-2 text-sm text-slate-700">
                            {variant.uploadFiles.map((file, fileIndex) => (
                              <li key={`${file.name}-${fileIndex}`} className="flex items-center justify-between gap-3">
                                <span>{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeVariantUploadFile(variantIndex, fileIndex)}
                                  className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600"
                                >
                                  Quitar
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {variant.images.length > 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-sm font-semibold text-slate-700">Imágenes guardadas</p>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {variant.images.map((imageUrl, imageIndex) => (
                              <div key={imageUrl} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
                                <img src={imageUrl} alt={`${variant.color} ${imageIndex + 1}`} className="h-32 w-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeVariantImage(variantIndex, imageIndex)}
                                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white opacity-80 transition hover:opacity-100"
                                >
                                  Eliminar
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">Precios por cantidad</h3>
                  <p className="text-sm text-slate-500">Configura diferentes precios para rangos de cantidad.</p>
                </div>
                <button
                  type="button"
                  onClick={addPriceTier}
                  className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  Agregar precio
                </button>
              </div>
              <div className="space-y-4">
                {priceTiers.map((tier, index) => (
                  <div key={index} className="grid gap-4 md:grid-cols-[130px_1fr_70px] items-end">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">Cantidad mínima</label>
                      <input
                        type="number"
                        value={tier.min_qty}
                        min={1}
                        onChange={(e) => updatePriceTier(index, 'min_qty', Number(e.target.value))}
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">Precio unitario</label>
                      <input
                        type="number"
                        value={tier.price}
                        min={0}
                        onChange={(e) => updatePriceTier(index, 'price', Number(e.target.value))}
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePriceTier(index)}
                      className="mt-2 rounded-full bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Guardando...' : 'Guardar producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProductForm