import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Demo1_Basic from './demos/Demo1_Basic';
import Demo2_Mutations from './demos/Demo2_Mutations';
import Demo3_Cache from './demos/Demo3_Cache';
import CodeBlock from './components/CodeBlock';
import CacheExplanation from './components/CacheExplanation';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const slides = [
    {
      title: "React Query (TanStack Query)",
      subtitle: "La bibliothèque ultime pour la gestion des données asynchrones",
      content: (
        <>
          <div style={{ textAlign: 'center', margin: '60px 0' }}>
            <h1>React Query</h1>
            <p style={{ fontSize: '1.5em', color: '#666', marginTop: '20px' }}>
              Simplifiez la gestion de vos données serveur dans React
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '60px' }}>
            <div className="highlight">
              <h3>Pourquoi React Query?</h3>
              <ul>
                <li>Cache automatique</li>
                <li>Synchronisation en arrière-plan</li>
                <li>Gestion d'état simplifiée</li>
              </ul>
            </div>
            <div className="highlight">
              <h3>Cas d'usage</h3>
              <ul>
                <li>Appels API REST</li>
                <li>GraphQL</li>
                <li>Données temps réel</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Problématique",
      content: (
        <>
          <h2>Sans React Query</h2>
          <CodeBlock code={`function Users() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // Pas de cache, pas de retry, 
  // pas de synchronisation...
}`} />
          <div className="highlight">
            <strong>Problèmes:</strong> Code répétitif, pas de cache, gestion manuelle des états, pas de retry automatique
          </div>
        </>
      )
    },
    {
      title: "Solution avec React Query",
      content: (
        <>
          <h2>Avec React Query</h2>
          <CodeBlock code={`import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  // C'est tout!
}`} />
          <div className="highlight">
            <strong>Avantages:</strong> Code minimal, cache automatique, retry intelligent, synchronisation, devtools
          </div>
        </>
      )
    },
    {
      title: "Concepts Clés",
      content: (
        <>
          <h2>Concepts Fondamentaux</h2>
          
          <h3>1. Query Key</h3>
          <CodeBlock code={`// Identifiant unique pour le cache
queryKey: ['users']
queryKey: ['user', userId]
queryKey: ['posts', { status: 'published' }]`} />

          <h3>2. Query Function</h3>
          <CodeBlock code={`// Fonction qui retourne une Promise
queryFn: () => fetch('/api/users').then(r => r.json())
queryFn: fetchUsers
queryFn: async () => await api.get('/users')`} />

          <h3>3. États</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            <span className="badge badge-info">isLoading</span>
            <span className="badge badge-info">isFetching</span>
            <span className="badge badge-success">isSuccess</span>
            <span className="badge badge-warning">isError</span>
          </div>
        </>
      )
    },
    {
      title: "Démonstration 1: Query de Base",
      content: (
        <>
          <h2>useQuery - Exemple Pratique</h2>
          <CodeBlock code={`const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});`} />
          <Demo1_Basic />
        </>
      )
    },
    {
      title: "Mutations",
      content: (
        <>
          <h2>useMutation - Modifier les Données</h2>
          <CodeBlock code={`const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries(['posts']);
  }
});

mutation.mutate({ title: 'Nouveau post' });`} />
          <Demo2_Mutations />
        </>
      )
    },
    {
      title: "Démonstration 2: Cache",
      content: (
        <>
          <h2>Système de Cache Intelligent</h2>
          <CodeBlock code={`const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 30000, // 30 secondes
  cacheTime: 300000  // 5 minutes
});`} />
          <CacheExplanation />
          <Demo3_Cache />
        </>
      )
    },
    {
      title: "Options Avancées",
      content: (
        <>
          <h2>Configuration Avancée</h2>
          
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
                <th>Valeur par défaut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>staleTime</code></td>
                <td>Durée avant que les données soient considérées obsolètes</td>
                <td>0</td>
              </tr>
              <tr>
                <td><code>cacheTime</code></td>
                <td>Durée de conservation en cache</td>
                <td>5 minutes</td>
              </tr>
              <tr>
                <td><code>retry</code></td>
                <td>Nombre de tentatives en cas d'échec</td>
                <td>3</td>
              </tr>
              <tr>
                <td><code>refetchOnWindowFocus</code></td>
                <td>Rafraîchir au focus de la fenêtre</td>
                <td>true</td>
              </tr>
              <tr>
                <td><code>enabled</code></td>
                <td>Activer/désactiver la query</td>
                <td>true</td>
              </tr>
            </tbody>
          </table>
        </>
      )
    },
    {
      title: "Patterns Utiles",
      content: (
        <>
          <h2>Patterns et Bonnes Pratiques</h2>
          
          <h3>1. Query Dépendante</h3>
          <CodeBlock code={`const { data: user } = useQuery(['user', userId], fetchUser);
const { data: posts } = useQuery(
  ['posts', userId],
  fetchPosts,
  { enabled: !!user }
);`} />

          <h3>2. Pagination</h3>
          <CodeBlock code={`const { data } = useQuery(
  ['posts', page],
  () => fetchPosts(page),
  { keepPreviousData: true }
);`} />

          <h3>3. Infinite Scroll</h3>
          <CodeBlock code={`const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage
});`} />
        </>
      )
    },
    {
      title: "Optimistic Updates",
      content: (
        <>
          <h2>Mises à Jour Optimistes</h2>
          <p>Mettre à jour l'UI immédiatement avant la réponse du serveur</p>
          
          <CodeBlock code={`const mutation = useMutation({
  mutationFn: updatePost,
  onMutate: async (newPost) => {
    // Annuler les requêtes en cours
    await queryClient.cancelQueries(['posts']);
    
    // Sauvegarder l'état précédent
    const previous = queryClient.getQueryData(['posts']);
    
    // Mise à jour optimiste
    queryClient.setQueryData(['posts'], old => 
      [...old, newPost]
    );
    
    return { previous };
  },
  onError: (err, newPost, context) => {
    // Rollback en cas d'erreur
    queryClient.setQueryData(['posts'], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['posts']);
  }
});`} />
        </>
      )
    },
    {
      title: "DevTools",
      content: (
        <>
          <h2>React Query DevTools</h2>
          
          <div className="highlight">
            <h3>Installation</h3>
            <CodeBlock code={`import { ReactQueryDevtools } from 
  '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>`} />
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Fonctionnalités:</h3>
            <ul>
              <li>Visualiser toutes les queries et leur état</li>
              <li>Inspecter le cache</li>
              <li>Forcer le refetch</li>
              <li>Invalider le cache</li>
              <li>Voir les timings</li>
            </ul>
          </div>

          <div className="success" style={{ marginTop: '30px' }}>
            Les DevTools sont actifs dans cette présentation! Regardez en bas à droite.
          </div>
        </>
      )
    },
    {
      title: "Comparaison",
      content: (
        <>
          <h2>React Query vs Alternatives</h2>
          
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th>React Query</th>
                <th>Redux + RTK Query</th>
                <th>SWR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taille du bundle</td>
                <td>~13kb</td>
                <td>~45kb</td>
                <td>~5kb</td>
              </tr>
              <tr>
                <td>Cache automatique</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
              </tr>
              <tr>
                <td>DevTools</td>
                <td>Excellent</td>
                <td>Bon</td>
                <td>Non</td>
              </tr>
              <tr>
                <td>Optimistic Updates</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
              </tr>
              <tr>
                <td>Infinite Queries</td>
                <td>Oui</td>
                <td>Non</td>
                <td>Oui</td>
              </tr>
              <tr>
                <td>Courbe d'apprentissage</td>
                <td>Moyenne</td>
                <td>Élevée</td>
                <td>Faible</td>
              </tr>
            </tbody>
          </table>
        </>
      )
    },
    {
      title: "Cas d'Usage Réels",
      content: (
        <>
          <h2>Cas d'Usage dans le Monde Réel</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            <div className="demo-section">
              <h3>E-commerce</h3>
              <ul>
                <li>Catalogue produits</li>
                <li>Panier d'achat</li>
                <li>Historique commandes</li>
                <li>Recherche en temps réel</li>
              </ul>
            </div>

            <div className="demo-section">
              <h3>Réseaux Sociaux</h3>
              <ul>
                <li>Feed d'actualités</li>
                <li>Notifications</li>
                <li>Messages</li>
                <li>Profils utilisateurs</li>
              </ul>
            </div>

            <div className="demo-section">
              <h3>Dashboards</h3>
              <ul>
                <li>Métriques temps réel</li>
                <li>Graphiques</li>
                <li>Rapports</li>
                <li>Analytics</li>
              </ul>
            </div>

            <div className="demo-section">
              <h3>Applications SaaS</h3>
              <ul>
                <li>Gestion de projets</li>
                <li>CRM</li>
                <li>Outils collaboratifs</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Avantages et Inconvénients",
      content: (
        <>
          <h2>Avantages</h2>
          <div className="success">
            <ul>
              <li>Réduction drastique du code boilerplate</li>
              <li>Performance optimale avec le cache intelligent</li>
              <li>Synchronisation automatique des données</li>
              <li>DevTools puissants pour le debugging</li>
              <li>Pas besoin de Redux pour les données serveur</li>
              <li>API intuitive et facile à apprendre</li>
              <li>Fonctionne avec n'importe quelle API</li>
            </ul>
          </div>

          <h2 style={{ marginTop: '40px' }}>Inconvénients</h2>
          <div className="highlight">
            <ul>
              <li>Courbe d'apprentissage pour les concepts avancés</li>
              <li>Spécialisé pour les données serveur uniquement</li>
              <li>Configuration initiale nécessaire</li>
              <li>Debugging peut être complexe au début</li>
            </ul>
          </div>
        </>
      )
    },
    {
      title: "Installation et Setup",
      content: (
        <>
          <h2>Installation</h2>
          
          <CodeBlock language="bash" code={`# NPM
npm install @tanstack/react-query

# Yarn
yarn add @tanstack/react-query

# DevTools (optionnel)
npm install @tanstack/react-query-devtools`} />

          <h3 style={{ marginTop: '30px' }}>Configuration de Base</h3>
          <CodeBlock code={`import { QueryClient, QueryClientProvider } from 
  '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}`} />
        </>
      )
    },
    {
      title: "Ressources et Conclusion",
      content: (
        <>
          <h2>Ressources</h2>
          <div className="demo-section">
            <ul style={{ fontSize: '1.1em' }}>
              <li>Documentation officielle: <code>tanstack.com/query</code></li>
              <li>Tutoriels vidéo: YouTube - "TanStack Query"</li>
              <li>Discord communautaire</li>
              <li>Blog officiel avec exemples</li>
              <li>GitHub: <code>TanStack/query</code></li>
            </ul>
          </div>

          <h2 style={{ marginTop: '40px' }}>Conclusion</h2>
          <div className="highlight">
            <p style={{ fontSize: '1.2em', lineHeight: '2' }}>
              React Query est devenu un <strong>standard de l'industrie</strong> pour la gestion 
              des données serveur dans React. Il simplifie considérablement le développement 
              et améliore l'expérience utilisateur grâce à son système de cache intelligent.
            </p>
          </div>

          <div className="success" style={{ marginTop: '30px', textAlign: 'center', fontSize: '1.3em' }}>
            <strong>Utilisé par des milliers d'entreprises dans le monde!</strong>
          </div>
        </>
      )
    },
    {
      title: "Questions?",
      content: (
        <>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1 style={{ fontSize: '4em' }}>?</h1>
            <h2 style={{ marginTop: '40px' }}>Questions & Réponses</h2>
            <p style={{ fontSize: '1.3em', marginTop: '40px', color: '#666' }}>
              Merci de votre attention!
            </p>
            <div style={{ marginTop: '60px', fontSize: '1.2em' }}>
              <p>Contact</p>
              <p>Liens utiles</p>
              <p>Code source de la présentation</p>
            </div>
          </div>
        </>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="presentation">
        <button onClick={toggleFullscreen} className="fullscreen-btn" title="Plein écran (F11)">
          ⛶
        </button>
        <div className="slide">
          {slides[currentSlide].content}
          <div className="slide-number">
            Slide {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
