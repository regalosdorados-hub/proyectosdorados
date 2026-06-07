import React, { useEffect, useMemo, useState } from 'react'
import { X, Share2, Instagram, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react'
import { AspectRatio } from './ui/aspect-ratio'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

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
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState<string>(product.mainImage)
  const [gallery, setGallery] = useState<string[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [isExpanded, setIsExpanded] = useState(false)
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
    setIsExpanded(false)
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

  const handleAddToCart = () => {
    const formatName = product.formats.find(f => f.id === selectedFormat)?.name || 'Estándar'
    
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.mainImage,
      price: getCurrentPrice(),
      quantity: quantity,
      format: formatName,
      category: product.category
    })
    
    onClose()
    navigate('/cart')
  }

  if (!isOpen) return null

  const currentPrice = getCurrentPrice()
  const totalPrice = getTotalPrice()
  const isLongDescription = product.description.length > 160

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal-content fade-in max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="grid gap-8 md:grid-cols-[1fr_1fr] p-6 md:p-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-3 shadow-sm">
                <AspectRatio ratio={1} className="overflow-hidden rounded-[2rem] bg-white">
                  <img src={selectedImage} alt={product.name} className="h-full w-full object-cover" />
                </AspectRatio>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {gallery.map((image) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${selectedImage === image ? 'border-amber-500' : 'border-transparent bg-slate-50'}`}
                  >
                    <img src={image} alt="Miniatura" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-slate-50/50 p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Descripción del producto</h3>
              <div className="relative">
                <p className={`text-sm text-slate-600 leading-relaxed ${!isExpanded && isLongDescription ? 'line-clamp-3' : ''}`}>
                  {product.description}
                </p>
                {isLongDescription && (
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
                  >
                    {isExpanded ? (
                      <><ChevronUp size={14} /> Ver menos</>
                    ) : (
                      <><ChevronDown size={14} /> Ver más</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">{product.category}</span>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-amber-500 transition"><Instagram size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-amber-500 transition"><Share2 size={18} /></button>
                  </div>
                </div>
                <h2 className="text-3xl font-playfair font-bold text-slate-900 leading-tight">{product.name}</h2>
                {product.refCode && <p className="text-xs text-slate-400 mt-1">Referencia: {product.refCode}</p>}
              </div>

              <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precio Unitario</p>
                    <p className="text-2xl font-bold text-slate-900">${currentPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Estimado</p>
                    <p className="text-2xl font-bold text-amber-600">${totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Cantidad</h4>
                    {priceTiers.length > 1 && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        Descuentos por volumen activos
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1.5">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-100 transition"
                      >
                        <Minus size={18} />
                      </button>
                      <input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 bg-transparent text-center text-lg font-bold text-slate-900 outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-100 transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] text-slate-400 leading-tight">
                        Ajusta la cantidad para ver cómo cambia el precio unitario automáticamente.
                      </p>
                    </div>
                  </div>

                  {priceTiers.length > 1 && (
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {priceTiers.map((tier) => (
                        <div 
                          key={tier.min_qty} 
                          className={`rounded-2xl border p-3 text-center transition ${quantity >= tier.min_qty ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-white'}`}
                        >
                          <p className={`text-[9px] font-bold uppercase ${quantity >= tier.min_qty ? 'text-amber-600' : 'text-slate-400'}`}>{tier.min_qty}+ uds</p>
                          <p className={`text-sm font-bold ${quantity >= tier.min_qty ? 'text-amber-700' : 'text-slate-600'}`}>${tier.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {product.formats.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Seleccionar Formato / Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.formats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => format.available && setSelectedFormat(format.id)}
                        className={`rounded-full border px-5 py-2 text-xs font-bold transition ${selectedFormat === format.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'} ${!format.available ? 'opacity-40 cursor-not-allowed' : ''}`}
                        disabled={!format.available}
                      >
                        {format.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10">
              <button
                onClick={handleAddToCart}
                className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 py-5 text-sm font-bold text-white shadow-xl transition hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart size={20} className="transition-transform group-hover:-translate-y-1" />
                Agregar al carrito
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
                Envío a todo el país • Factura A disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView