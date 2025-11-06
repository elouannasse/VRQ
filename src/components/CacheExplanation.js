export default function CacheExplanation() {
  return (
    <div className="cache-explanation">
      <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Fonctionnement du Cache</h3>
      
      <div className="cache-steps">
        <div className="cache-step">
          <div className="step-icon">1</div>
          <h4>Première requête</h4>
          <p>Vérification du cache Redis</p>
          <div className="step-badge cache-miss">Cache Miss</div>
        </div>
        
        <div className="cache-arrow">→</div>
        
        <div className="cache-step">
          <div className="step-icon">2</div>
          <h4>Récupération</h4>
          <p>Fetch depuis la base de données</p>
          <div className="step-badge db-fetch">500ms</div>
        </div>
        
        <div className="cache-arrow">→</div>
        
        <div className="cache-step">
          <div className="step-icon">3</div>
          <h4>Stockage</h4>
          <p>Sauvegarde dans Redis</p>
          <div className="step-badge cache-store">Cached</div>
        </div>
        
        <div className="cache-arrow">→</div>
        
        <div className="cache-step">
          <div className="step-icon">4</div>
          <h4>Requêtes suivantes</h4>
          <p>Retour instantané du cache</p>
          <div className="step-badge cache-hit">5ms</div>
        </div>
      </div>

      <div className="cache-timeline">
        <h4>Cycle de vie du cache</h4>
        <div className="timeline-bar">
          <div className="timeline-segment fresh">
            <span>Fresh (0-30s)</span>
            <div className="segment-label">staleTime</div>
          </div>
          <div className="timeline-segment stale">
            <span>Stale (30s-5min)</span>
            <div className="segment-label">Refetch en arrière-plan</div>
          </div>
          <div className="timeline-segment expired">
            <span>Expired (&gt;5min)</span>
            <div className="segment-label">cacheTime</div>
          </div>
        </div>
      </div>

      <div className="cache-metrics">
        <div className="metric-card">
          <div className="metric-value">99%</div>
          <div className="metric-label">Cache Hit Rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">100x</div>
          <div className="metric-label">Plus rapide</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">-99%</div>
          <div className="metric-label">Requêtes DB</div>
        </div>
      </div>

      <div className="cache-status-legend">
        <div className="status-item">
          <span className="status-dot fresh-dot"></span>
          <span>Données fraîches</span>
        </div>
        <div className="status-item">
          <span className="status-dot stale-dot"></span>
          <span>Données obsolètes</span>
        </div>
        <div className="status-item">
          <span className="status-dot expired-dot"></span>
          <span>Données expirées</span>
        </div>
      </div>
    </div>
  );
}
