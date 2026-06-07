import React, { useState, useRef } from 'react';
import { Trash2, ArrowLeft, Upload, CheckCircle2, MessageSquare, Users, Building, ShoppingCart, Plus, User, Phone, Image as ImageIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Order State
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  
  // Personalization State
  const [addLogo, setAddLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("El logo no debe superar los 2MB");
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCheckout = async () => {
    // Validaciones
    if (!companyName || !representativeName || !contactNumber) {
      toast.error("Por favor completa los datos de contacto obligatorios");
      return;
    }

    if (addLogo && !logoFile) {
      toast.error("Por favor adjunta el logo de tu empresa");
      return;
    }

    setLoading(true);
    let uploadedLogoUrl = null;

    try {
      // 1. Subir Logo si existe
      if (addLogo && logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `order-logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, logoFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        uploadedLogoUrl = urlData.publicUrl;
      }

      // 2. Guardar Pedido en DB
      const orderData = {
        company_name: companyName,
        representative_name: representativeName,
        contact_number: contactNumber,
        logo_url: uploadedLogoUrl,
        items: cart,
        personalization_details: {
          message_type: messageType,
          common_message: commonMessage,
          recipients: recipients
        },
        total_price: totalPrice,
        status: 'pending'
      };

      const { error: dbError } = await supabase
        .from('orders')
        .insert([orderData]);

      if (dbError) throw dbError;

      // 3. Preparar mensaje de WhatsApp
      const waMessage = encodeURIComponent(
        `¡Hola! Acabo de registrar un pedido en Regalos Dorados.\n\n` +
        `*Datos de la Empresa:*\n` +
        `- Empresa: ${companyName}\n` +
        `- Representante: ${representativeName}\n` +
        `- Contacto: ${contactNumber}\n\n` +
        `*Resumen del Pedido:*\n` +
        cart.map(item => `- ${item.name} (${item.quantity} uds) - ${item.format}`).join('\n') +
        `\n\n*Total Estimado:* $${totalPrice.toLocaleString()}\n\n` +
        `*Personalización:*\n` +
        `- Logo adjunto: ${addLogo ? 'Sí (enviado al sistema)' : 'No'}\n` +
        `- Mensajes: ${messageType === 'common' ? 'General' : 'Individuales'}\n` +
        (messageType === 'common' ? `- Mensaje: ${commonMessage}` : `- Destinatarios: ${recipients.length}`)
      );

      window.open(`https://wa.me/5492901464534?text=${waMessage}`, '_blank');
      
      toast.success('Pedido registrado con éxito. Redirigiendo a WhatsApp...');
      clearCart();
      navigate('/');
    } catch (error: any) {
      console.error("Error processing order:", error);
      toast.error("Hubo un error al procesar tu pedido: " + error.message);
    } finally {
      setLoading(false);
    }
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

              {/* Contact Info Section */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Building size={20} className="text-amber-500" />
                  Datos de la Empresa
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre de la Empresa *</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ej: Tech Solutions S.A."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 outline-none focus:border-amber-400 transition"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Representante *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={representativeName}
                        onChange={(e) => setRepresentativeName(e.target.value)}
                        placeholder="Nombre y Apellido"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 outline-none focus:border-amber-400 transition"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp de Contacto *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="tel" 
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Ej: +54 9 351 1234567"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 outline-none focus:border-amber-400 transition"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalization Section */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-8">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ImageIcon size={20} className="text-amber-500" />
                  Personalización de Regalos
                </h2>

                <div className="space-y-6">
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
                      Incluir logo de mi empresa en los productos
                    </label>
                  </div>

                  {addLogo && (
                    <div className="space-y-4 animate-fade-in">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${logoPreview ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'}`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        {logoPreview ? (
                          <div className="relative inline-block">
                            <img src={logoPreview} alt="Logo Preview" className="h-32 w-auto rounded-lg shadow-md" />
                            <button 
                              onClick={(e) => { e.stopPropagation(); removeLogo(); }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Upload size={20} className="text-slate-400" />
                            </div>
                            <p className="text-sm font-bold text-slate-600">Haz clic para subir tu logo</p>
                            <p className="text-xs text-slate-400">PNG, JPG o SVG (Máx. 2MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
                      <p className="text-[10px] text-slate-400 italic">Ej: "Gracias {'{nombre}'} por ser parte de nuestro equipo."</p>
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
                  disabled={loading}
                  className="w-full bg-slate-900 text-white rounded-full py-5 font-bold text-sm shadow-xl hover:bg-slate-800 transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Finalizar por WhatsApp'
                  )}
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