# Backend API avec Cache Intelligent Redis

## Installation

### 1. Installer les dépendances
```bash
cd backend
npm install
```

### 2. Démarrer le serveur
```bash
npm run dev
```

## Endpoints API

### GET /api/users/:id
Récupère un utilisateur par ID (1-4)

**Exemple:**
```bash
curl http://localhost:4000/api/users/1
```

**Réponse:**
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "company": "Romaguera-Crona",
  "source": "cache",
  "cachedAt": "2024-01-01T12:00:00.000Z"
}
```

**Headers:**
- `X-Cache-Status`: HIT | MISS | STALE | EXPIRED
- `X-Cache-Age`: Age du cache en secondes

### GET /api/cache/stats
Statistiques du cache

```bash
curl http://localhost:4000/api/cache/stats
```

### DELETE /api/cache/:userId
Invalider le cache pour un utilisateur

```bash
curl -X DELETE http://localhost:4000/api/cache/1
```

### DELETE /api/cache/clear
Vider tout le cache

```bash
curl -X DELETE http://localhost:4000/api/cache/clear
```

## Logique de Cache

- **staleTime: 30s** - Données fraîches
- **cacheTime: 5min** - Données en cache

### Comportement:
1. **0-30s**: Cache HIT - Retour instantané
2. **30s-5min**: Cache STALE - Retour du cache + refresh en arrière-plan
3. **>5min**: Cache EXPIRED - Fetch fresh data

## Test du système

```bash
# Première requête (MISS)
curl http://localhost:4000/api/users/1

# Deuxième requête immédiate (HIT)
curl http://localhost:4000/api/users/1

# Attendre 35s puis requêter (STALE)
curl http://localhost:4000/api/users/1

# Voir les stats
curl http://localhost:4000/api/cache/stats
```
