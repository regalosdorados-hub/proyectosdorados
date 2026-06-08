import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import NotFound from '@/pages/NotFound';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setStatus('unauthorized');
          return;
        }

        const { data: adminData } = await supabase
          .from('admins')
          .select('user_id')
          .eq('user_id', session.user.id)
          .single();

        if (adminData) {
          setStatus('authorized');
        } else {
          setStatus('unauthorized');
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setStatus('unauthorized');
      }
    };

    checkAdmin();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-10 w-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <NotFound />;
  }

  return <>{children}</>;
};

export default AdminGuard;