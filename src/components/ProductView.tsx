import React, { useEffect, useMemo, useState } from 'react'
import { X, Share2, Instagram, Minus, Plus } from 'lucide-react'
import { AspectRatio } from './ui/aspect-ratio'

type PriceTier = {
  min_qty: number
  price: number
}

type ProductFormat = {
  id: string
  name: string
  available: boolean
}

interface ProductProps {
  id: string
  name: string
  description: string
  price: number
  priceDiscount1?: number | null
  priceDiscount2?: number | null
  mainImage: string
  thumbnails: string[]
  images?: string[]
  prices?: PriceTier[]
  formats: ProductFormat[]
  category: string
  refCode?: string
}

interface ProductViewProps {
  product: ProductProps
  isOpen: boolean
  onClose: () => void
}

const ProductView: React.FC<ProductViewProps> = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.mainImage)
  const [gallery, setGallery] = useState<string[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedFormat, setSelectedFormat] = useState<string | null>(
    product.formats.length > 0 ? product.formats[0].id : null
  )

  const priceTiers = useMemo<PriceTier[]>(() => {
    if (product.prices?.length) {
      return [...product.prices]
        .filter((tier) => tier.min_qty > 0 && tier.price > 0)
        .sort((a, b) => a.min_qty - b.min_qty)
    }

    const legacyTiers: PriceTier[] = [{ min_qty: 1, price: product.price }]
    if (product.priceDiscount1 && product.priceDiscount1 > 0) {
      legacyTiers.push({ min_qty: 5, price: product.priceDiscount1 })
    }
    if (product.priceDiscount2 && product.priceDiscount2 > 0) {
      legacyTiers.push({ min_qty: 10, price: product.priceDiscount2 })
    }
    return legacyTiers
  }, [product])

  useEffect(() => {
    const images = [product.mainImage, ...(product.images ?? []), ...product.thumbnails]
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)

    setGallery(images)
    setSelectedImage(images[0] ?? product.mainImage)
    setQuantity(1)
    setSelectedFormat(product.formats.length > 0 ? product.formats[0].id : null)
  }, [product, isOpen])

  const getCurrentPrice = () => {
    const selected = [...priceTiers]
      .sort((a, b) => a.min_qty - b.min_qty)
      .filter((tier) => tier.min_qty <= quantity)
      .pop()
    return selected?.price ?? product.price
  }

  const getTotalPrice = () => getCurrentPrice() * quantity

  const getDiscountPercentage = () => {
    const currentPrice = getCurrentPrice()
    if (currentPrice >= product.price) return 0
    return Math.round((1 - currentPrice / product.price) * 100)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  const handleFormatChange = (formatId: string) => {
    setSelectedFormat(formatId)
  }

  const getWhatsAppLink = () => {
    const selectedFormatName = product.formats.find((format) => format.id === selectedFormat)?.name || ''
    const currentPrice = getCurrentPrice()
    const totalPrice = getTotalPrice()

    const message = encodeURIComponent(
      `Hola! Estoy interesado en el producto "${product.name}"${product.refCode ? ` (Ref: ${product.refCode})` : ''}.\n` +
        `Cantidad: ${quantity}\n` +
        `Formato: ${selectedFormatName}\n` +
        `Precio unitario: $${currentPrice.toLocaleString()}\n` +
        `Precio total: $${totalPrice.toLocaleString()}\n\n` +
        `¿Podrían confirmarme disponibilidad y tiempo de entrega?`
    )

    return `https://wa.me/5492901464534?text=${message}`
  }

  if (!isOpen) return null

  const currentPrice = getCurrentPrice()
  const totalPrice = getTotalPrice()
  const discountPercentage = getDiscountPercentage()

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal-content fade-in" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] p-6 md:p-8">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-[1.75rem] bg-white">
                <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
              </AspectRatio>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {gallery.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => handleImageClick(image)}
                  className={`overflow-hidden rounded-[1.25rem] border p-0.5 transition ${selectedImage === image ? 'border-amber-500' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <img src={image} alt={`${product.name} miniatura`} className="h-16 w-full object-cover rounded-[1rem]" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-500 font-bold">{product.category}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 leading-tight break-words">{product.name}</h2>
                  {product.refCode && <p className="mt-1 text-xs text-slate-500">Ref: {product.refCode}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href="https://instagram.com/regalosdorados" target="_blank" rel="noreferrer" className="rounded-full bg-slate-100 p-2.5 text-slate-700 transition hover:bg-slate-200">
                    <Instagram size={18} />
                  </a>
                  <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="rounded-full bg-slate-100 p-2.5 text-slate-700 transition hover:bg-slate-200">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">Precio unitario</p>
                  <p className="mt-1 text-xl font-bold text-slate-950 truncate">${currentPrice.toLocaleString()}</p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">Total estimado</p>
                  <p className="mt-1 text-xl font-bold text-slate-950 truncate">${totalPrice.toLocaleString()}</p>
                </div>
              </div>

              {discountPercentage > 0 && (
                <div className="mt-4 rounded-[1.25rem] bg-emerald-50 px-4 py-2 text-[11px] font-bold text-emerald-700">
                  ¡{discountPercentage}% OFF aplicado por cantidad!
                </div>
              )}

              <p className="mt-6 text-sm text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Cantidad</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:shadow-sm transition"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 bg-transparent text-center text-sm font-bold text-slate-950 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:shadow-sm transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {priceTiers.length > 1 ? 'El precio se ajusta automáticamente según la cantidad.' : 'Precio fijo por unidad.'}
                  </p>
                </div>
              </div>
              
              {priceTiers.length > 1 && (
                <div className="mt-4 space-y-1.5">
                  {priceTiers.map((tier) => (
                    <div key={tier.min_qty} className={`flex justify-between text-[11px] px-2 ${quantity >= tier.min_qty ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      <span>{tier.min_qty}+ unidades</span>
                      <span>${tier.price.toLocaleString()} c/u</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {product.formats.length > 0 && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider mb-4">Formato / Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.formats.map((format) => (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => format.available && handleFormatChange(format.id)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${selectedFormat === format.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'} ${!format.available ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={!format.available}
                    >
                      {format.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-green-600 px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              Consultar disponibilidad en WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView