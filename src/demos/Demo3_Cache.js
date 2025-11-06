import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUser } from '../api';
import { useState } from 'react';

export default function Demo3_Cache() {
  const [userId, setUserId] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 30000
  });

  const handleUserClick = (id) => {
    if (id === userId) {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    }
    setUserId(id);
  };

  return (
    <div className="demo-section">
      <h3>Démonstration du Cache</h3>
      <div className="demo-controls">
        {[1, 2, 3, 4].map(id => (
          <button key={id} onClick={() => handleUserClick(id)}>
            Utilisateur {id}
          </button>
        ))}
      </div>
      {isFetching && <div className="loading">Récupération...</div>}
      {data && (
        <div className="data-display">
          <h4>{data.name}</h4>
          <p>Email: {data.email}</p>
          <p>Entreprise: {data.company?.name}</p>
        </div>
      )}
      <div className="highlight">
        Cliquez plusieurs fois sur le même utilisateur - les données viennent du cache!
      </div>
    </div>
  );
}
