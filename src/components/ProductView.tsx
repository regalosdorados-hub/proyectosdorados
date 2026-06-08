import React, { useEffect, useMemo, useState } from 'react'
import { X, Share2, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react'
import { AspectRatio } from './ui/aspect-ratio'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { Slider } from './ui/slider'
import { toast } from 'sonner'

type PriceTier = {
  min_qty: number
  price: number
}

type ProductFormat = {
  id: string
  name: string
  available: boolean
  prices?: PriceTier[]
}

interface ProductProps {
  id: string
  name: string
  description: string
  price: number
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

  // Calculamos los niveles de precio basados en la variante seleccionada
  const priceTiers = useMemo<PriceTier[]>(() => {
    const variant = product.formats.find(f => f.id === selectedFormat)
    
    // Si la variante tiene sus propios precios, los usamos. Si no, usamos los globales del producto.
    let tiers = (variant?.prices && variant.prices.length > 0) 
      ? [...variant.prices] 
      : (product.prices && product.prices.length > 0) ? [...product.prices] : [{ min_qty: 1, price: product.price }]

    return tiers
      .filter((tier) => tier.min_qty > 0 && tier.price > 0)
      .sort((a, b) => a.min_qty - b.min_qty)
  }, [product, selectedFormat])

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

  const currentPrice = useMemo(() => {
    const selected = [...priceTiers]
      .filter((tier) => tier.min_qty <= quantity)
      .pop()
    return selected?.price ?? (priceTiers[0]?.price || product.price)
  }, [quantity, priceTiers, product.price])

  const totalPrice = useMemo(() => currentPrice * quantity, [currentPrice, quantity])

  const handleAddToCart = () => {
    const formatName = product.formats.find(f => f.id === selectedFormat)?.name || 'Estándar'
    
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.mainImage,
      price: currentPrice,
      quantity: quantity,
      format: formatName,
      category: product.category
    })
    
    onClose()
    navigate('/cart')
  }

  if (!isOpen) return null

  const isLongDescription = product.description.length > 160
  const maxSliderQty = 100

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal-content fade-in max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white" onClick={onClose}>
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
                  <button key={image} onClick={() => setSelectedImage(image)} className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${selectedImage === image ? 'border-amber-500' : 'border-transparent bg-slate-50'}`}>
                    <img src={image} alt="Miniatura" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-100 bg-slate-50/50 p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Descripción</h3>
              <p className={`text-sm text-slate-600 leading-relaxed ${!isExpanded && isLongDescription ? 'line-clamp-3' : ''}`}>{product.description}</p>
              {isLongDescription && (
                <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition">
                  {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">{product.category}</span>
                <h2 className="text-3xl font-playfair font-bold text-slate-900 leading-tight">{product.name}</h2>
              </div>

              {product.formats.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Seleccionar Opción / Tipo</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.formats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => format.available && setSelectedFormat(format.id)}
                        className={`rounded-full border px-5 py-2 text-xs font-bold transition ${selectedFormat === format.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
                      >
                        {format.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Cantidad</h4>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-6 w-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><Minus size={14} /></button>
                      <span className="text-lg font-bold text-slate-900 w-8 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(maxSliderQty, quantity + 1))} className="h-6 w-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><Plus size={14} /></button>
                    </div>
                  </div>
                  
                  <Slider value={[quantity]} onValueChange={(vals) => setQuantity(vals[0])} max={maxSliderQty} min={1} step={1} className="py-4" />

                  <div className="mt-8 grid grid-cols-3 gap-2">
                    {priceTiers.map((tier) => (
                      <div key={tier.min_qty} className={`rounded-2xl border p-3 text-center transition ${quantity >= tier.min_qty ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-white'}`}>
                        <p className={`text-[9px] font-bold uppercase ${quantity >= tier.min_qty ? 'text-amber-600' : 'text-slate-400'}`}>{tier.min_qty}+ uds</p>
                        <p className={`text-sm font-bold ${quantity >= tier.min_qty ? 'text-amber-700' : 'text-slate-600'}`}>${tier.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button onClick={handleAddToCart} className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 py-5 text-sm font-bold text-white shadow-xl transition hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]">
                <ShoppingCart size={20} />
                Agregar al carrito
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">Envío en Ciudad de Córdoba • Factura A disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView