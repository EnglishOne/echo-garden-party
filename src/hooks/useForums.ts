import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Forum = Tables<'forums'>;

export function useForums() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data, error } = await supabase
          .from('forums')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching forums:', error);
        } else {
          setForums(data || []);
        }
      } catch (error) {
        console.error('Error in fetchForums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  return { forums, loading };
}