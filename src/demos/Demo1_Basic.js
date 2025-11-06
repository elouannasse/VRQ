import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api';

export default function Demo1_Basic() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  if (isLoading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error.message}</div>;

  return (
    <div className="demo-section">
      <h3>Liste des utilisateurs</h3>
      {data?.slice(0, 3).map(user => (
        <div key={user.id} className="user-card">
          <strong>{user.name}</strong> - {user.email}
        </div>
      ))}
    </div>
  );
}
