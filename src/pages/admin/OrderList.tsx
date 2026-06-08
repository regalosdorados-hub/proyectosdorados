import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { supabase } from '@/lib/supabaseClient'
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Building, 
  User, 
  Phone,
  ChevronDown,
  ChevronUp,
  Package,
  Download,
  Image as ImageIcon
} from 'lucide-react'
import { toast } from 'sonner'

type Order = {
  id: string
  company_name: string
  representative_name: string
  contact_number: string
  logo_url: string | null
  items: any[]
  personalization_details: any
  total_price: number
  status: string
  created_at: string
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error(error)
      toast.error("Error al cargar los pedidos")
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      toast.error("Error al actualizar el estado")
    } else {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
      toast.success("Estado actualizado")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 uppercase tracking-wider"><Clock size={12} /> Pendiente</span>
      case 'completed':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider"><CheckCircle2 size={12} /> Completado</span>
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 uppercase tracking-wider"><XCircle size={12} /> Cancelado</span>
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 uppercase tracking-wider">{status}</span>
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-600">Panel Admin</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-950">Pedidos</h1>
        <p className="mt-2 text-slate-600">Gestiona las solicitudes de cotización y pedidos de empresas.</p>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm text-center">
          <div className="h-10 w-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Cargando pedidos...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-slate-300" />
          </div>
          <p className="text-slate-600 font-medium">No hay pedidos registrados todavía.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className={`rounded-[2rem] border transition-all duration-300 bg-white shadow-sm overflow-hidden ${
                expandedOrder === order.id ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-200'
              }`}
            >
              {/* Header */}
              <div 
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Building size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{order.company_name}</h3>
                    <p className="text-xs text-slate-500">
                      {new Date(order.created_at).toLocaleDateString('es-AR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
                    <p className="font-bold text-slate-900">${order.total_price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    {expandedOrder === order.id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedOrder === order.id && (
                <div className="px-6 pb-8 pt-2 border-t border-slate-50 animate-fade-in">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contacto</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <User size={16} className="text-slate-400" />
                          <span>{order.representative_name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Phone size={16} className="text-slate-400" />
                          <span>{order.contact_number}</span>
                        </div>
                        <a 
                          href={`https://wa.me/${order.contact_number.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:underline"
                        >
                          <ExternalLink size={14} /> Contactar por WhatsApp
                        </a>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Productos</h4>
                      <div className="space-y-3">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                              <Package size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900 truncate">{item.name}</p>
                              <p className="text-[10px] text-slate-500">{item.quantity} uds • {item.format}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personalization */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Personalización</h4>
                      <div className="rounded-2xl bg-slate-50 p-4 text-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-slate-600">
                            <span className="font-bold text-slate-900">Logo:</span> {order.logo_url ? '✅ Cargado' : '❌ No adjunto'}
                          </p>
                          {order.logo_url && (
                            <a 
                              href={order.logo_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:underline"
                            >
                              <Download size={12} /> Descargar
                            </a>
                          )}
                        </div>
                        <p className="text-slate-600">
                          <span className="font-bold text-slate-900">Mensajes:</span> {order.personalization_details?.message_type === 'common' ? 'General' : 'Individuales'}
                        </p>
                        {order.personalization_details?.common_message && (
                          <p className="text-slate-500 italic text-xs border-t border-slate-200 pt-2">
                            "{order.personalization_details.common_message}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Cambiar estado:</p>
                      <button 
                        onClick={() => updateStatus(order.id, 'pending')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${order.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        Pendiente
                      </button>
                      <button 
                        onClick={() => updateStatus(order.id, 'completed')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${order.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        Completado
                      </button>
                      <button 
                        onClick={() => updateStatus(order.id, 'cancelled')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${order.status === 'cancelled' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        Cancelado
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default OrderList