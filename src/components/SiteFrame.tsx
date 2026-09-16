import React from 'react';
import { Project } from '../types';

/**
 * Preview-ul unui proiect din grilă: captura reală a site-ului live, într-un cadru
 * de browser. La hover imaginea se derulează prin toată pagina — nu e o poză de
 * atmosferă, e chiar site-ul, iar bara din dreapta se mișcă întocmai ca un scrollbar.
 *
 * Capturile din `public/work/shots/` au TOATE 1200x3833 px; pe asta se bazează
 * `--shot-travel` din index.css. Vezi README-ul din folder înainte să înlocuiești una.
 *
 * Pe touch nu există hover, așa că rămâne cadrul cu hero-ul site-ului — tot o
 * dovadă, doar fără derulare.
 */
export const SiteFrame: React.FC<{ project: Project }> = ({ project }) => {
  const host = project.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? `${project.id}.ro`;
  const live = project.status === 'live';

  return (
    <div className="frame" style={{ ['--shot-tint' as string]: project.color }}>
      {/* bara de browser */}
      <div className="frame__bar">
        <span className="frame__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span className="frame__url">{host}</span>

        <span className={`frame__status ${live ? 'is-live' : ''}`}>{live ? 'Live' : 'În lucru'}</span>
      </div>

      {/* fereastra propriu-zisă */}
      <div className="frame__screen">
        <img
          src={project.shot}
          alt={`Site-ul ${project.title}, captură de pe ${host}`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={3833}
          className="frame__shot"
        />

        {/* scrollbar-ul: coboară odată cu pagina, ca într-un browser adevărat */}
        <span className="frame__track" aria-hidden="true">
          <i className="frame__thumb" />
        </span>
      </div>
    </div>
  );
};
