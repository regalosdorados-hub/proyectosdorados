import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Package, ShoppingBag, Globe, LogOut, LayoutDashboard } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const AdminLayout: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  const navItems = [
    { label: 'Productos', path: '/admin/products', icon: Package },
    { label: 'Pedidos', path: '/admin/orders', icon: ShoppingBag },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <Link to="/admin/products" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-slate-900" />
            </div>
            <span className="font-playfair font-bold text-xl">Admin Dorados</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Gestión</p>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-amber-500 text-slate-900 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}

          <div className="pt-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Acciones</p>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
            >
              <Globe size={20} />
              Ver Sitio Público
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-2"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 text-center">Regalos Dorados v1.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 md:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <span className="font-playfair font-bold text-lg">Admin Dorados</span>
            <button onClick={handleLogout} className="text-slate-500"><LogOut size={20} /></button>
          </div>
        </header>
        <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout