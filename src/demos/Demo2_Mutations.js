import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api';

export default function Demo2_Mutations() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, body: 'Contenu du post', userId: 1 });
  };

  return (
    <div className="demo-section">
      <h3>Créer un nouveau post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du post"
          style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Création...' : 'Créer'}
        </button>
      </form>
      {mutation.isSuccess && <div className="success">Post créé avec succès!</div>}
      {mutation.isError && <div className="error">Erreur: {mutation.error.message}</div>}
    </div>
  );
}
