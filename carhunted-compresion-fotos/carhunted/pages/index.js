import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { BRANDS, MODELS, ICONIC_LINKS, ICONIC_EXTRA } from '../lib/carsData';
import { grantCarXp, grantXp, xpNeededForLevel, rewardForLevel } from '../lib/xpSystem';
import { CoinIcon, KeyCommonIcon, KeyEpicIcon, KeyLegendaryIcon, LockIcon, CheckIcon } from '../lib/icons';
import { MISSIONS } from '../lib/missions';
import { compressImage } from '../lib/imageCompress';

export default function Home() {
  const [session, setSession] = useState(undefined); // undefined = cargando, null = sin sesión

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>CarHunted</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {session === undefined && <div style={{ padding: 40, textAlign: 'center', color: '#8a8d93' }}>Cargando...</div>}
      {session === null && <AuthScreen />}
      {session && <App session={session} />}
    </>
  );
}

/* ---------------- LOGIN / REGISTRO ---------------- */
function AuthScreen() {
  const [mode, setMode] = useState('login'); // login | signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMsg({ type: 'error', text: error.message });
      else setMsg({ type: 'ok', text: 'Cuenta creada. Revisa tu email para confirmarla y luego inicia sesión.' });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ type: 'error', text: error.message });
    }
    setLoading(false);
  }

  return (
    <main>
      <div className="auth-wrap">
        <h2>🏁 CarHunted</h2>
        <p className="sub">{mode === 'login' ? 'Inicia sesión para ver tu garaje' : 'Crea tu cuenta de cazador'}</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
          <label>Contraseña</label>
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="mínimo 6 caracteres" />
          <button className="submit" disabled={loading} type="submit">
            {loading ? 'Un momento...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>
        {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
        <div className="toggle">
          {mode === 'login' ? (
            <>¿Aún no tienes cuenta? <button onClick={() => { setMode('signup'); setMsg(null); }}>Regístrate</button></>
          ) : (
            <>¿Ya tienes cuenta? <button onClick={() => { setMode('login'); setMsg(null); }}>Inicia sesión</button></>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------------- APP PRINCIPAL (usuario logueado) ---------------- */
function App({ session }) {
  const user = session.user;
  const [view, setView] = useState('marcas');
  const [currentBrand, setCurrentBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [garage, setGarage] = useState({}); // { modelId: { photo_url, brand_id, name, created_at } }
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState(null); // { level, xp, coins, keys_common, keys_epic, keys_legendary }
  const [rewardToast, setRewardToast] = useState(null); // { xpGained, levelUps }
  const [claimedMissions, setClaimedMissions] = useState({}); // { missionId: true }

  useEffect(() => {
    loadGarage();
    loadProfile();
    loadClaimedMissions();
  }, []);

  async function loadClaimedMissions() {
    const { data, error } = await supabase
      .from('claimed_missions')
      .select('mission_id')
      .eq('user_id', user.id);
    if (!error && data) {
      const map = {};
      data.forEach(row => { map[row.mission_id] = true; });
      setClaimedMissions(map);
    }
  }

  async function claimMission(mission) {
    if (!profile || claimedMissions[mission.id]) return;
    const { error: insertError } = await supabase
      .from('claimed_missions')
      .insert({ user_id: user.id, mission_id: mission.id });
    if (insertError) return; // ya reclamada o error de red, no hacemos nada más

    setClaimedMissions(prev => ({ ...prev, [mission.id]: true }));

    const r = mission.reward;
    const result = grantXp(profile, r.xp || 0);
    const level = result.level;
    const xp = result.xp;
    const coins = result.coins + r.coins;
    const keys_common = result.keys_common + r.keys_common;
    const keys_epic = result.keys_epic + r.keys_epic;
    const keys_legendary = result.keys_legendary + r.keys_legendary;

    setProfile({ level, xp, coins, keys_common, keys_epic, keys_legendary, avatar_id: profile.avatar_id });
    await supabase
      .from('profiles')
      .update({ level, xp, coins, keys_common, keys_epic, keys_legendary })
      .eq('user_id', user.id);

    if (result.levelUps.length > 0) {
      setRewardToast({ xpGained: result.xpGained, levelUps: result.levelUps });
      setTimeout(() => setRewardToast(null), 3500);
    }
  }

  async function loadGarage() {
    const { data, error } = await supabase
      .from('garage_cars')
      .select('model_id, brand_id, name, photo_url, created_at')
      .eq('user_id', user.id);
    if (!error && data) {
      const map = {};
      data.forEach(row => { map[row.model_id] = row; });
      setGarage(map);
    }
  }

  async function loadProfile() {
    const { data, error } = await supabase
      .from('profiles')
      .select('level, xp, coins, keys_common, keys_epic, keys_legendary, avatar_id')
      .eq('user_id', user.id)
      .single();
    if (!error && data) {
      setProfile(data);
    } else {
      // Si por lo que sea no existe todavía (usuario muy antiguo), lo creamos
      const { data: created } = await supabase
        .from('profiles')
        .insert({ user_id: user.id })
        .select('level, xp, coins, keys_common, keys_epic, keys_legendary, avatar_id')
        .single();
      if (created) setProfile(created);
    }
  }

  async function awardXp(isIconic) {
    if (!profile) return;
    const result = grantCarXp(profile, isIconic);
    const { level, xp, coins, keys_common, keys_epic, keys_legendary, xpGained, levelUps } = result;
    setProfile({ level, xp, coins, keys_common, keys_epic, keys_legendary, avatar_id: profile.avatar_id });
    await supabase
      .from('profiles')
      .update({ level, xp, coins, keys_common, keys_epic, keys_legendary })
      .eq('user_id', user.id);
    if (levelUps.length > 0) {
      setRewardToast({ xpGained, levelUps });
      setTimeout(() => setRewardToast(null), 3500);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function goBrand(brandId) {
    setCurrentBrand(brandId);
    setSelectedModel(null);
    setView('marcas');
  }

  function goBrandsRoot() {
    setCurrentBrand(null);
    setSelectedModel(null);
  }

  async function capturarCoche(brandId, model, file) {
    const yaLoTenias = !!garage[model.id]; // si ya lo tenías, no vuelve a dar XP, solo actualiza la foto
    setUploading(true);
    try {
      const compressed = await compressImage(file); // reduce el peso ~90% antes de subir
      const path = `${user.id}/${model.id}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('car-photos')
        .upload(path, compressed, { upsert: true, contentType: 'image/jpeg' });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('car-photos').getPublicUrl(path);
      const photoUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase.from('garage_cars').upsert({
        user_id: user.id,
        model_id: model.id,
        brand_id: brandId,
        name: model.name,
        photo_url: photoUrl,
      }, { onConflict: 'user_id,model_id' });
      if (dbError) throw dbError;

      setGarage(prev => ({ ...prev, [model.id]: { model_id: model.id, brand_id: brandId, name: model.name, photo_url: photoUrl } }));

      if (!yaLoTenias) {
        const isIconic = !!ICONIC_LINKS[model.id];
        await awardXp(isIconic);
      }
    } catch (err) {
      alert('No se pudo subir la foto: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <div className="mark">C</div>
          <div>
            <span>CARHUNTED</span>
            <small>CAZA · COLECCIONA · PRESUME</small>
          </div>
        </div>
        <nav>
          <button className={view === 'marcas' ? 'active' : ''} onClick={() => { setView('marcas'); }}>Marcas</button>
          <button className={view === 'misiones' ? 'active' : ''} onClick={() => { setView('misiones'); goBrandsRoot(); }}>Misiones</button>
          <button className={view === 'iconicos' ? 'active' : ''} onClick={() => { setView('iconicos'); goBrandsRoot(); }}>Icónicos</button>
          <button className={view === 'garaje' ? 'active' : ''} onClick={() => { setView('garaje'); goBrandsRoot(); }}>Garaje</button>
        </nav>
        <div className="userbox">
          <span>{user.email}</span>
          <button onClick={handleLogout}>Salir</button>
        </div>
      </header>

      {profile && <Hud profile={profile} onOpenProgress={() => { setView('progreso'); goBrandsRoot(); }} />}
      {rewardToast && <RewardToast toast={rewardToast} />}

      <main>
        {view === 'marcas' && !currentBrand && <BrandsView onSelectBrand={goBrand} />}
        {view === 'marcas' && currentBrand && (
          <ModelsView
            brandId={currentBrand}
            garage={garage}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            onBack={goBrandsRoot}
            onUpload={capturarCoche}
            uploading={uploading}
          />
        )}
        {view === 'iconicos' && <IconicosView garage={garage} />}
        {view === 'progreso' && profile && <ProgresoView profile={profile} onBack={() => setView('marcas')} />}
        {view === 'misiones' && (
          <MisionesView garage={garage} claimedMissions={claimedMissions} onClaim={claimMission} />
        )}
        {view === 'garaje' && <GarajeView garage={garage} />}
      </main>

      <footer>CarHunted · tus fotos se guardan en tu cuenta de Supabase</footer>
    </>
  );
}

function BrandsView({ onSelectBrand }) {
  return (
    <>
      <div className="section-title">
        <span className="num">01</span><h2>Elige una marca</h2>
        <p>{BRANDS.length} marcas disponibles</p>
      </div>
      <div className="brand-grid">
        {BRANDS.map(b => (
          <div className="brand-card" key={b.id} onClick={() => onSelectBrand(b.id)}>
            <div className="brand-badge">{b.badge}</div>
            <div className="name">{b.name}</div>
            <div className="count">{MODELS[b.id].length} modelos</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ModelsView({ brandId, garage, selectedModel, setSelectedModel, onBack, onUpload, uploading }) {
  const brand = BRANDS.find(b => b.id === brandId);
  const models = MODELS[brandId];
  const activeModel = models.find(m => m.id === selectedModel);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && activeModel) onUpload(brandId, activeModel, file);
    e.target.value = '';
  }

  return (
    <>
      <button className="back-btn" onClick={onBack}>← Volver a marcas</button>
      <div className="section-title">
        <span className="num">02</span><h2>{brand.badge} {brand.name}</h2>
        <p>Selecciona el coche que has cazado</p>
      </div>
      <div className="model-grid">
        {models.map(m => {
          const captured = garage[m.id];
          const isIconic = !!ICONIC_LINKS[m.id];
          return (
            <div
              key={m.id}
              className={`model-card ${selectedModel === m.id ? 'selected' : ''}`}
              onClick={() => setSelectedModel(m.id)}
            >
              <div className="model-photo">
                {isIconic && <div className="iconic-flag">ICÓNICO</div>}
                {captured ? <img src={captured.photo_url} alt={m.name} /> : <div className="placeholder-icon">🚗</div>}
                {captured && <div className="stamp">CAZADO</div>}
              </div>
              <div className="model-info">
                <div className="name">{m.name}</div>
                <div className="chassis">{m.chassis}</div>
              </div>
            </div>
          );
        })}
      </div>

      {activeModel && (
        <div className="upload-panel">
          <div className="txt">
            <div className="t">{activeModel.name} seleccionado</div>
            <div className="s">Sube la foto que le has hecho al coche para guardarlo en tu garaje</div>
          </div>
          <div>
            <label className="upload-btn" htmlFor="fileInput">{uploading ? 'Subiendo...' : 'Subir foto'}</label>
            <input id="fileInput" type="file" accept="image/*" capture="environment" disabled={uploading} onChange={handleFileChange} />
          </div>
        </div>
      )}
    </>
  );
}

function IconicosView({ garage }) {
  const items = Object.entries(ICONIC_LINKS).map(([modelId, info]) => {
    const model = MODELS[info.brand].find(m => m.id === modelId);
    const captured = garage[modelId];
    return (
      <div className="model-card" key={modelId}>
        <div className="model-photo">
          <div className="iconic-flag">ICÓNICO</div>
          {captured ? <img src={captured.photo_url} alt={info.label} /> : <div className="placeholder-icon">🚗</div>}
          {captured && <div className="stamp">CAZADO</div>}
        </div>
        <div className="model-info">
          <div className="name">{info.label}</div>
          <div className="chassis">{model.chassis}</div>
        </div>
      </div>
    );
  });

  const extra = ICONIC_EXTRA.map(x => (
    <div className="model-card" key={x.id} style={{ opacity: 0.45, cursor: 'default' }}>
      <div className="model-photo"><div className="placeholder-icon">🚗</div></div>
      <div className="model-info">
        <div className="name">{x.label}</div>
        <div className="chassis">{x.note}</div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="section-title">
        <span className="num">★</span><h2>Coches icónicos</h2>
        <p>Se marcan solos al cazarlos desde Marcas</p>
      </div>
      <div className="model-grid">{items}{extra}</div>
    </>
  );
}

/* ---------------- HUD (monedas, llaves, barra de nivel) ---------------- */
function Hud({ profile, onOpenProgress }) {
  const needed = xpNeededForLevel(profile.level);
  const pct = Math.min(100, Math.round((profile.xp / needed) * 100));
  return (
    <div className="hud">
      <div className="hud-row">
        <div className="hud-chip coins"><CoinIcon /> <span>{profile.coins}</span></div>
        <div className="hud-chip key-common"><KeyCommonIcon /> <span>{profile.keys_common}</span></div>
        <div className="hud-chip key-epic"><KeyEpicIcon /> <span>{profile.keys_epic}</span></div>
        <div className="hud-chip key-legendary"><KeyLegendaryIcon /> <span>{profile.keys_legendary}</span></div>
      </div>
      <button className="hud-xp-banner" onClick={onOpenProgress} title="Ver progreso">
        <div className="hud-level-badge">{profile.level}</div>
        <div className="hud-xp-track">
          <div className="hud-xp-fill" style={{ width: pct + '%' }}></div>
          <div className="hud-xp-label">{profile.xp}/{needed} XP</div>
        </div>
        <div className="hud-xp-arrow">›</div>
      </button>
    </div>
  );
}

function RewardToast({ toast }) {
  const totalKeysCommon = toast.levelUps.reduce((s, l) => s + l.keys_common, 0);
  const totalKeysEpic = toast.levelUps.reduce((s, l) => s + l.keys_epic, 0);
  const totalKeysLegendary = toast.levelUps.reduce((s, l) => s + l.keys_legendary, 0);
  const totalCoins = toast.levelUps.reduce((s, l) => s + l.coins, 0);
  const finalLevel = toast.levelUps[toast.levelUps.length - 1].level;
  return (
    <div className="reward-toast">
      <div className="rt-title">¡Nivel {finalLevel}! 🎉</div>
      <div className="rt-items">
        <span><CoinIcon size={16} /> +{totalCoins}</span>
        {totalKeysCommon > 0 && <span><KeyCommonIcon size={16} /> +{totalKeysCommon}</span>}
        {totalKeysEpic > 0 && <span><KeyEpicIcon size={16} /> +{totalKeysEpic}</span>}
        {totalKeysLegendary > 0 && <span><KeyLegendaryIcon size={16} /> +{totalKeysLegendary}</span>}
      </div>
    </div>
  );
}

/* ---------------- PROGRESO: camino de niveles horizontal, tipo Star Park ---------------- */
function ProgresoView({ profile, onBack }) {
  const totalToShow = Math.max(profile.level + 12, 20);
  const levels = Array.from({ length: totalToShow }, (_, i) => i + 1);
  const needed = xpNeededForLevel(profile.level);
  const pct = Math.min(100, Math.round((profile.xp / needed) * 100));
  const wave = [0, -22, -34, -22, 0, 22, 34, 22]; // ondulación tipo camino de Brawl

  return (
    <>
      <button className="back-btn" onClick={onBack}>← Volver</button>
      <div className="section-title">
        <span className="num">🏁</span><h2>Carretera del cazador</h2>
        <p>Nivel {profile.level} · {profile.xp}/{needed} XP</p>
      </div>
      <div className="road-park">
        <div className="road-deco">
          {Array.from({ length: 10 }).map((_, i) => (
            <span className="deco-tree" key={'t' + i} style={{ left: (i * 11 + 3) + '%', top: i % 2 === 0 ? '10%' : '78%' }}>🌳</span>
          ))}
          {['#ff5c5c', '#5cc8ff', '#ffd75c', '#7ee08a'].map((c, i) => (
            <span className="deco-car" key={'c' + i} style={{ left: (i * 24 + 8) + '%', top: i % 2 === 0 ? '4%' : '85%', background: c }} />
          ))}
        </div>
        <div className="road-h-track">
          <div className="road-h-line" />
          {levels.map((lvl, i) => {
            const reward = rewardForLevel(lvl);
            const status = lvl < profile.level ? 'done' : lvl === profile.level ? 'current' : 'locked';
            const offsetY = wave[i % wave.length];
            return (
              <div className="road-h-node" style={{ transform: `translateY(${offsetY}px)` }} key={lvl}>
                <div className={`road-node-card ${status}`}>
                  {status === 'done' && <div className="road-check"><CheckIcon size={16} /></div>}
                  <div className="road-node-level">{lvl}</div>
                  {status === 'current' && (
                    <div className="road-node-ring">
                      <div className="road-node-ring-fill" style={{ height: pct + '%' }} />
                    </div>
                  )}
                  {status === 'locked' && <div className="road-lock"><LockIcon size={16} /></div>}
                  <div className="road-node-reward">
                    {reward.keys_legendary > 0 ? <KeyLegendaryIcon size={16} /> :
                     reward.keys_epic > 0 ? <KeyEpicIcon size={16} /> :
                     reward.keys_common > 0 ? <KeyCommonIcon size={16} /> :
                     <CoinIcon size={16} />}
                    <span>{reward.keys_legendary > 0 ? 1 : reward.keys_epic > 0 ? 1 : reward.keys_common > 0 ? 1 : reward.coins}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------------- MISIONES ---------------- */
function MisionesView({ garage, claimedMissions, onClaim }) {
  return (
    <>
      <div className="section-title">
        <span className="num">🎯</span><h2>Misiones</h2>
        <p>Completa desafíos y reclama tu recompensa</p>
      </div>
      <div className="mission-list">
        {MISSIONS.map((m) => {
          const progress = Math.min(m.progress(garage), m.target);
          const done = progress >= m.target;
          const claimed = !!claimedMissions[m.id];
          const pct = Math.round((progress / m.target) * 100);
          return (
            <div className={`mission-card ${claimed ? 'claimed' : done ? 'ready' : ''}`} key={m.id}>
              <div className="mission-info">
                <div className="mission-title">{m.title}</div>
                <div className="mission-desc">{m.description}</div>
                <div className="mission-track">
                  <div className="mission-track-fill" style={{ width: pct + '%' }} />
                  <span className="mission-track-label">{progress}/{m.target}</span>
                </div>
              </div>
              <div className="mission-rewards">
                <span><CoinIcon size={15} /> {m.reward.coins}</span>
                {m.reward.keys_common > 0 && <span><KeyCommonIcon size={15} /> {m.reward.keys_common}</span>}
                {m.reward.keys_epic > 0 && <span><KeyEpicIcon size={15} /> {m.reward.keys_epic}</span>}
                {m.reward.keys_legendary > 0 && <span><KeyLegendaryIcon size={15} /> {m.reward.keys_legendary}</span>}
              </div>
              <button
                className="mission-claim"
                disabled={!done || claimed}
                onClick={() => onClaim(m)}
              >
                {claimed ? 'Reclamada' : done ? 'Reclamar' : 'En curso'}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function GarajeView({ garage }) {
  const entries = Object.entries(garage);
  if (entries.length === 0) {
    return (
      <>
        <div className="section-title"><span className="num">🏁</span><h2>Tu garaje</h2></div>
        <div className="empty">Todavía no has cazado ningún coche.<br />Ve a &quot;Marcas&quot;, elige un modelo y sube una foto.</div>
      </>
    );
  }
  return (
    <>
      <div className="section-title">
        <span className="num">🏁</span><h2>Tu garaje</h2>
        <p>{entries.length} coche(s) cazado(s)</p>
      </div>
      <div className="model-grid">
        {entries.map(([id, c]) => {
          const brand = BRANDS.find(b => b.id === c.brand_id);
          return (
            <div className="model-card" key={id}>
              <div className="model-photo">
                {ICONIC_LINKS[id] && <div className="iconic-flag">ICÓNICO</div>}
                <img src={c.photo_url} alt={c.name} />
                <div className="stamp">CAZADO</div>
              </div>
              <div className="model-info">
                <div className="name">{brand?.badge} {c.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
