import React, { useState } from 'react';
import { Trash2, ArrowLeft, Upload, CheckCircle2, MessageSquare, Users, Building, ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();
  
  // Personalization State
  const [addLogo, setAddLogo] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [messageType, setMessageType] = useState<'common' | 'individual'>('common');
  const [commonMessage, setCommonMessage] = useState('');
  const [recipients, setRecipients] = useState<{ name: string; message: string }[]>([]);

  const handleAddRecipient = () => {
    setRecipients([...recipients, { name: '', message: '' }]);
  };

  const updateRecipient = (index: number, field: 'name' | 'message', value: string) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    const message = encodeURIComponent(
      `¡Hola! Quiero confirmar mi pedido de Regalos Dorados.\n\n` +
      `*Resumen del Pedido:*\n` +
      cart.map(item => `- ${item.name} (${item.quantity} uds) - ${item.format}`).join('\n') +
      `\n\n*Total Estimado:* $${totalPrice.toLocaleString()}\n\n` +
      `*Personalización:*\n` +
      `- Empresa: ${companyName || 'No especificada'}\n` +
      `- Logo: ${addLogo ? 'Sí' : 'No'}\n` +
      `- Mensajes: ${messageType === 'common' ? 'General' : 'Individuales'}\n` +
      (messageType === 'common' ? `- Mensaje: ${commonMessage}` : `- Destinatarios: ${recipients.length}`)
    );

    window.open(`https://wa.me/5492901464534?text=${message}`, '_blank');
    toast.success('Redirigiendo a WhatsApp para finalizar tu pedido');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-32 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-slate-300" />
            </div>
            <h1 className="text-2xl font-playfair font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-slate-500 mb-8">Parece que aún no has seleccionado ningún combo para tu equipo.</p>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
              Volver al catálogo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-full transition">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-playfair font-bold">Tu Pedido</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Items & Personalization */}
            <div className="lg:col-span-2 space-y-8">
              {/* Items List */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-amber-500" />
                  Productos seleccionados
                </h2>
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-6 flex gap-4 md:gap-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{item.category} • {item.format}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">Cant: {item.quantity}</span>
                          <span className="font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalization Section */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-8">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Building size={20} className="text-amber-500" />
                  Personalización Corporativa
                </h2>

                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nombre de la Empresa</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej: Tech Solutions S.A."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <input 
                      type="checkbox" 
                      id="addLogo"
                      checked={addLogo}
                      onChange={(e) => setAddLogo(e.target.checked)}
                      className="w-5 h-5 rounded border-amber-300 text-amber-500 focus:ring-amber-400"
                    />
                    <label htmlFor="addLogo" className="text-sm font-bold text-amber-900 cursor-pointer flex items-center gap-2">
                      <Upload size={16} />
                      Agregar logo personalizado en los regalos
                    </label>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <MessageSquare size={18} className="text-amber-500" />
                    Mensajes de Agradecimiento
                  </h3>

                  <div className="flex gap-4 mb-6">
                    <button 
                      onClick={() => setMessageType('common')}
                      className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold border transition ${messageType === 'common' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                    >
                      Mismo mensaje para todos
                    </button>
                    <button 
                      onClick={() => setMessageType('individual')}
                      className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold border transition ${messageType === 'individual' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                    >
                      Mensajes individuales
                    </button>
                  </div>

                  {messageType === 'common' ? (
                    <div className="space-y-2">
                      <textarea 
                        value={commonMessage}
                        onChange={(e) => setCommonMessage(e.target.value)}
                        placeholder="Escribe el mensaje que irá en todos los regalos. Puedes usar {nombre} para personalizar."
                        className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400 transition text-sm"
                      />
                      <p className="text-[10px] text-slate-400 italic">Ej: "Gracias {nombre} por ser parte de nuestro equipo."</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lista de Destinatarios</span>
                        <button 
                          onClick={handleAddRecipient}
                          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                        >
                          <Plus size={14} /> Agregar persona
                        </button>
                      </div>
                      
                      {recipients.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl">
                          <Users size={24} className="text-slate-200 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">Aún no has agregado destinatarios.</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {recipients.map((recipient, index) => (
                          <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="flex gap-3">
                              <input 
                                type="text" 
                                value={recipient.name}
                                onChange={(e) => updateRecipient(index, 'name', e.target.value)}
                                placeholder="Nombre del colaborador"
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400"
                              />
                              <button 
                                onClick={() => removeRecipient(index)}
                                className="p-2 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <textarea 
                              value={recipient.message}
                              onChange={(e) => updateRecipient(index, 'message', e.target.value)}
                              placeholder="Mensaje personalizado..."
                              className="w-full h-20 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 sticky top-24">
                <h2 className="text-lg font-bold mb-6">Resumen</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({totalItems} productos)</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Personalización</span>
                    <span className="text-emerald-600 font-medium">Bonificado</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Envío</span>
                    <span className="text-xs">A coordinar</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                    <span className="font-bold text-slate-900">Total Estimado</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">${totalPrice.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">+ IVA</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-slate-900 text-white rounded-full py-5 font-bold text-sm shadow-xl hover:bg-slate-800 transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Finalizar por WhatsApp
                </button>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Factura A disponible
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Envíos a todo el país
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;