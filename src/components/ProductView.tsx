import React, { useEffect, useMemo, useState } from 'react'
import { X, Share2, Instagram } from 'lucide-react'
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
  }, [product])

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
    setQuantity(newQuantity)
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
        `Precio unitario: $${currentPrice.toFixed(2)}\n` +
        `Precio total: $${totalPrice.toFixed(2)}\n\n` +
        `¿Podrían confirmarme disponibilidad y tiempo de entrega?`
    )

    return `https://wa.me/5492901464534?text=${message}`
  }

  const getShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  }

  if (!isOpen) return null

  const currentPrice = getCurrentPrice()
  const totalPrice = getTotalPrice()
  const discountPercentage = getDiscountPercentage()

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal-content fade-in">
        <button
          className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] p-6 md:p-8">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-[1.75rem] bg-white">
                <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
              </AspectRatio>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {gallery.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => handleImageClick(image)}
                  className={`overflow-hidden rounded-[1.5rem] border p-0.5 transition ${selectedImage === image ? 'border-amber-500' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <img src={image} alt={`${product.name} miniatura`} className="h-20 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-500">{product.category}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-slate-950">{product.name}</h2>
                  {product.refCode && <p className="mt-2 text-sm text-slate-500">Ref: {product.refCode}</p>}
                </div>
                <div className="flex gap-2">
                  <a href="https://instagram.com/regalosdorados" target="_blank" rel="noreferrer" className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200">
                    <Instagram size={20} />
                  </a>
                  <button onClick={() => window.open(getShareLink(), '_blank')} className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Precio actual</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">${currentPrice.toFixed(2)}</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Total</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">${totalPrice.toFixed(2)}</p>
                </div>
              </div>

              {discountPercentage > 0 && (
                <div className="rounded-[1.75rem] bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Descuento aplicado: {discountPercentage}% OFF por la cantidad seleccionada.
                </div>
              )}

              <p className="mt-6 text-slate-600 leading-7">{product.description}</p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-950">Selecciona cantidad</h3>
                <p className="text-sm text-slate-500">El precio cambia según el rango elegido.</p>
              </div>
              <div className="grid gap-3">
                {priceTiers.map((tier) => (
                  <button
                    key={`${tier.min_qty}-${tier.price}`}
                    type="button"
                    onClick={() => handleQuantityChange(tier.min_qty)}
                    className={`rounded-3xl border px-4 py-3 text-left transition ${quantity === tier.min_qty ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Desde {tier.min_qty} unidad{tier.min_qty > 1 ? 'es' : ''}</p>
                        <p className="text-sm text-slate-500">${tier.price.toFixed(2)} c/u</p>
                      </div>
                      {quantity === tier.min_qty && <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">Seleccionado</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {product.formats.length > 0 && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-950">Formato</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.formats.map((format) => (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => format.available && handleFormatChange(format.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedFormat === format.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'} ${!format.available ? 'cursor-not-allowed opacity-50' : ''}`}
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
              className="block rounded-[2rem] bg-green-600 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Consultar precio y disponibilidad en WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView
