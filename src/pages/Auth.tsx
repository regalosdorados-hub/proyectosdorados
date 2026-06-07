import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { supabase } from '@/lib/supabaseClient'

const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signError } = await supabase.auth.signInWithPassword({ email, password })
    if (signError) {
      setError(signError.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (!user) {
      setError('No se encontró usuario')
      setLoading(false)
      return
    }

    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', user.id)
      .single()

    if (adminError) {
      setIsAdmin(false)
    } else if (adminData) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="pt-28 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 shadow-2xl shadow-slate-900/10">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Administración</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Acceso de administrador</h1>
              <p className="mt-3 text-base text-slate-600">
                Ingresa con tu cuenta de administrador para gestionar el catálogo de productos.
              </p>
            </div>

            {isAdmin === true ? (
              <div className="rounded-3xl border border-amber-300/20 bg-amber-100/70 p-6 text-slate-900">
                <h2 className="text-2xl font-semibold mb-3">Bienvenido</h2>
                <p className="text-slate-700 mb-4">Ya estás autenticado como administrador.</p>
                <a href="/admin/products" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                  Ir a catálogo
                </a>
              </div>
            ) : (
              <form onSubmit={signIn} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Contraseña</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200"
                      required
                    />
                  </div>
                </div>

                {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
                {isAdmin === false && <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">No tienes permisos de administrador.</div>}

                <div className="text-right text-sm text-slate-600">
                  <a href="/auth/recovery" className="font-semibold text-amber-500 hover:text-amber-600">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Validando...' : 'Ingresar'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Auth
