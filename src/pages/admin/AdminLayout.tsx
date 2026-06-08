import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Package, ShoppingBag, Globe, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const AdminLayout: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  const navItems = [
    { label: 'Productos', path: '/admin/products', icon: Package },
    { label: 'Pedidos', path: '/admin/orders', icon: ShoppingBag },
  ]

  const NavLinks = () => (
    <>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Gestión</p>
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
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
      </div>

      <div className="pt-8">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Acciones</p>
        <div className="space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
          >
            <Globe size={20} />
            Ver Sitio Público
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <Link to="/admin/products" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-slate-900" />
            </div>
            <span className="font-playfair font-bold text-xl">Admin Dorados</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <NavLinks />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 text-center">Regalos Dorados v1.0</p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Panel */}
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin/products" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-slate-900" />
            </div>
            <span className="font-playfair font-bold text-xl">Admin Dorados</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <NavLinks />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 md:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <span className="font-playfair font-bold text-lg">Admin Dorados</span>
            </div>
            <button onClick={handleLogout} className="text-slate-500 p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <LogOut size={20} />
            </button>
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