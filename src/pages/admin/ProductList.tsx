import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import { supabase } from '@/lib/supabaseClient'

type Product = {
  id: string
  name: string
  category?: string
  images?: string[]
  variants?: Array<{ color: string; images: string[] }>
  prices?: Array<{ min_qty: number; price: number }>
  description?: string
}

const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '-'
  return `$${Number(value).toLocaleString('es-AR')}`
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error(error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      alert(error.message)
    } else {
      setProducts((current) => current.filter((product) => product.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-500">Panel Admin</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950">Productos</h1>
          <p className="mt-2 text-slate-600">Gestiona tu catálogo, actualiza imágenes y precios por cantidad desde aquí.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Nuevo producto
        </Link>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] text-center text-slate-600">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] text-center text-slate-600">
          No hay productos registrados todavía.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <article key={product.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.15)]">
              <div className="grid gap-4 lg:grid-cols-[140px_minmax(0,1fr)]">
                <div className="h-40 overflow-hidden rounded-3xl bg-slate-100">
                  {product.variants?.[0]?.images?.[0] || product.images?.[0] ? (
                    <img
                      src={product.variants?.[0]?.images?.[0] || product.images?.[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">Sin imagen</div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">{product.name}</h2>
                      <p className="text-sm text-slate-500">{product.category || 'Sin categoría'}</p>
                    </div>
                    <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">ADMIN</div>
                  </div>
                  <p className="text-sm leading-6 text-slate-600 line-clamp-3">{product.description || 'Descripción no disponible.'}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Precio base</p>
                      <p className="mt-2 text-lg font-semibold">{formatCurrency(product.prices?.[0]?.price)}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Niveles</p>
                      <p className="mt-2 text-lg font-semibold">{product.prices?.length ?? 0}</p>
                    </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Variantes</p>
                      <p className="mt-2 text-lg font-semibold">{product.variants?.length ?? 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/admin/products/${product.id}/edit`}
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default ProductList
