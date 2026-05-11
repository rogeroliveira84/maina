// Mulheres que Curam — landing page app

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#f5ede0", "#b08947", "#2a2317", "#c9a392"],
  "serifFont": "Cormorant Garamond",
  "showCountdown": true,
  "energiaLayout": "grid"
}/*EDITMODE-END*/;

const PALETTES = {
  terroso:  { bg: "#f5ede0", bgDeep: "#ebdfc9", paper: "#faf4e8", ink: "#2a2317", inkSoft: "#3d3322", gold: "#b08947", goldDeep: "#6b4a1c", rose: "#c9a392", line: "rgba(42,35,23,0.14)" },
  rose:     { bg: "#f7eee8", bgDeep: "#ecdfd5", paper: "#fbf3ed", ink: "#3a241c", inkSoft: "#4a2f25", gold: "#c9956f", goldDeep: "#7a4828", rose: "#d4a59a", line: "rgba(58,36,28,0.14)" },
  sage:     { bg: "#eef0e8", bgDeep: "#dde2d2", paper: "#f5f6ee", ink: "#1f2a1f", inkSoft: "#2c3a2b", gold: "#92a58a", goldDeep: "#36482e", rose: "#b8a589", line: "rgba(31,42,31,0.14)" },
  mistico:  { bg: "#1a1424", bgDeep: "#0f0b18", paper: "#221a2c", ink: "#f4ead8", inkSoft: "#d8c8b0", gold: "#e2c478", goldDeep: "#f0d68a", rose: "#c98aa8", line: "rgba(244,234,216,0.16)" },
  cosmos:   { bg: "#0b0a18", bgDeep: "#06050f", paper: "#16142a", ink: "#f4ecda", inkSoft: "#d6c8aa", gold: "#f0d68a", goldDeep: "#ffe9a8", rose: "#be82dc", line: "rgba(244,236,218,0.16)" }
};

const COSMIC_PALETTES = new Set(["mistico", "cosmos"]);

const SERIFS = {
  "Cormorant Garamond": "'Cormorant Garamond', serif",
  "Cormorant Infant":   "'Cormorant Infant', serif",
  "Cormorant SC":       "'Cormorant SC', serif",
  "Italiana":           "'Italiana', serif",
  "Marcellus":          "'Marcellus', serif"
};

// ─────────────────────────────── Countdown ───────────────────────────────

function useCountdown(targetISO) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetISO).getTime();
  const diff = Math.max(0, target - now.getTime());
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs, finished: diff === 0 };
}

function Countdown() {
  const { days, hours, mins, secs } = useCountdown("2026-06-13T09:00:00-03:00");
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="countdown">
      <div className="unit"><div className="num">{pad(days)}</div><div className="lbl">Dias</div></div>
      <div className="sep">·</div>
      <div className="unit"><div className="num">{pad(hours)}</div><div className="lbl">Horas</div></div>
      <div className="sep">·</div>
      <div className="unit"><div className="num">{pad(mins)}</div><div className="lbl">Min</div></div>
      <div className="sep">·</div>
      <div className="unit"><div className="num">{pad(secs)}</div><div className="lbl">Seg</div></div>
    </div>
  );
}

// ─────────────────────────────── Reveal on scroll ───────────────────────────────

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Synchronous visibility check — if already on-screen, reveal immediately.
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.95 && r.bottom > 0) {
      setShown(true);
      return;
    }
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } }),
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    // Safety net: if IO never fires (iframe/sandboxed contexts), reveal after 400ms.
    const t = setTimeout(reveal, 400);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);
  const cls = `reveal ${delay ? "d" + delay : ""} ${shown ? "in" : ""} ${className}`.trim();
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}

// ─────────────────────────────── WhatsApp ───────────────────────────────

const WHATSAPP = "https://wa.me/5511914522022?text=" + encodeURIComponent(
  "Olá! Quero garantir minha vaga no encontro Mulheres que Curam ✨"
);

const FORM_URL = "https://forms.gle/qTnJEaS5sbwzDV2D8";

const GALERIA_PHOTOS = [
  { src: "images/local1.jpeg", alt: "Espaço Terra Luz — vista 1" },
  { src: "images/local2.jpeg", alt: "Espaço Terra Luz — vista 2" },
  { src: "images/local3.jpeg", alt: "Espaço Terra Luz — vista 3" },
  { src: "images/local4.jpeg", alt: "Espaço Terra Luz — vista 4" },
  { src: "images/local5.jpeg", alt: "Espaço Terra Luz — vista 5" },
  { src: "images/local6.jpeg", alt: "Espaço Terra Luz — vista 6" }
];

// ─────────────────────────────── Sections ───────────────────────────────

function Hero({ showCountdown }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-grain" />
      <div className="hero-inner">
        <Reveal>
          <div className="eyebrow">Encontro Holístico · 13 de Junho</div>
        </Reveal>

        <Reveal delay={1}>
          <h1>
            Mulheres<br/>
            <span className="accent">que</span> <em>Curam</em>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="lead" style={{ maxWidth: 640, margin: "0 auto" }}>
            Um encontro profundo de cura, reconexão e despertar do feminino.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="hero-meta">
            <div><span className="glyph">✦</span> 13 . 06 . 2026</div>
            <div><span className="glyph">◐</span> 09h às 16h</div>
            <div><span className="glyph">❋</span> Terra Luz</div>
          </div>
        </Reveal>

        {showCountdown && (
          <Reveal delay={4}>
            <Countdown />
          </Reveal>
        )}

        <Reveal delay={4}>
          <div>
            <a href={WHATSAPP} className="btn btn-lg" target="_blank" rel="noopener">
              Quero participar
              <span className="arrow">→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="scroll-cue">Desça</div>
    </section>
  );
}

function Sobre() {
  return (
    <section className="sobre" data-screen-label="02 Sobre">
      <div className="narrow">
        <Reveal><div className="eyebrow">Sobre o encontro</div></Reveal>
        <Reveal delay={1}><h2 style={{ margin: "20px 0 32px", fontStyle: "italic" }}>Um espaço para o <em>retorno</em> à sua essência.</h2></Reveal>
        <Reveal delay={2}>
          <p className="lead">
            Mulheres que Curam é um encontro criado para ativar, despertar e alinhar
            o seu feminino profundo.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 24 }}>
            Um espaço seguro onde você será conduzida por processos energéticos,
            emocionais e espirituais — trazendo cura, expansão e reconexão
            com sua essência.
          </p>
        </Reveal>
        <Reveal delay={4}>
          <div className="signature">— um chamado para o feminino sagrado.</div>
        </Reveal>
      </div>
    </section>
  );
}

const ENERGIAS = [
  {
    num: "I", glyph: "☾", name: "Cassandra", sub: "Voz · Sabedoria",
    desc: "O despertar da voz que um dia foi silenciada.",
    bullets: ["a sabedoria intuitiva", "a visão espiritual", "a verdade não ouvida", "a voz que foi silenciada"]
  },
  {
    num: "II", glyph: "✦", name: "Cerridwen", sub: "Caldeirão · Alquimia",
    desc: "Deusa celta da transformação, da sabedoria e da alquimia.",
    bullets: ["morte e renascimento", "transformação profunda", "o caldeirão sagrado", "a magia que dissolve o velho para fazer nascer o novo"]
  },
  {
    num: "III", glyph: "❀", name: "Pele", sub: "Fogo · Renascimento",
    desc: "Deusa do fogo, dos vulcões e do renascimento.",
    bullets: ["empoderamento", "força feminina", "coragem", "verdade", "libertação daquilo que não é mais você"]
  },
  {
    num: "IV", glyph: "❋", name: "Gaia", sub: "Terra · Propósito",
    desc: "Mãe Terra — o propósito e a conexão com a verdadeira essência.",
    bullets: ["enraizamento", "direção", "acolhimento", "conexão com a natureza", "propósito de vida"]
  }
];

function KeyVisual() {
  return (
    <section className="key-visual" data-screen-label="02b KeyVisual" aria-label="O chamado das mulheres que se curam">
      <Reveal>
        <figure className="key-visual-figure">
          <img
            src="images/hero.jpeg"
            alt="As deusas e o chamado das mulheres que se curam"
            loading="lazy"
          />
        </figure>
      </Reveal>
    </section>
  );
}

function Energias() {
  return (
    <section className="energias" data-screen-label="03 Energias">
      <div className="container">
        <div className="header">
          <Reveal><div className="eyebrow">Energias canalizadas</div></Reveal>
          <Reveal delay={1}><h2>Quatro <em>frequências</em> que serão ativadas.</h2></Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ maxWidth: 580, margin: "20px auto 0" }}>
              Cada uma conduz uma camada da jornada — da intuição ao aterramento.
            </p>
          </Reveal>
        </div>

        <div className="energias-grid">
          {ENERGIAS.map((e, i) => (
            <Reveal key={e.name} delay={Math.min(i + 1, 4)} className="energy">
              <div className="num">{e.num}</div>
              <div className="glyph">{e.glyph}</div>
              <div className="name">
                {e.name}
                <small>{e.sub}</small>
              </div>
              <div className="desc">{e.desc}</div>
              {e.bullets && (
                <ul className="energy-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const VIVENCIAS = [
  "Processos de cura energética",
  "Ativações do feminino sagrado",
  "Liberação emocional",
  "Conexão espiritual profunda",
  "Dinâmicas em grupo",
  "Momentos de integração e expansão",
  "Esfera da Prosperidade"
];

function Viver() {
  return (
    <section className="viver" data-screen-label="04 Vivencias">
      <div className="container">
        <div className="viver-text">
          <Reveal><div className="eyebrow">A vivência</div></Reveal>
          <Reveal delay={1}><h2>O que você <em>vai viver</em>.</h2></Reveal>
          <Reveal delay={2}>
            <p>
              Uma jornada conduzida com cuidado — onde corpo, emoção e espírito
              se encontram em movimento. Cada etapa abre uma camada da sua presença.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <p style={{ marginTop: 20, fontStyle: "italic", color: "var(--gold-deep)" }}>
              Venha como você é. Saia inteira.
            </p>
          </Reveal>
        </div>

        <ul className="viver-list">
          {VIVENCIAS.map((v, i) => (
            <Reveal as="li" key={v} delay={Math.min(i + 1, 4)}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="dot-sm" />
              {v}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SobreVoce() {
  return (
    <section className="sobre-voce" data-screen-label="05 Sobre voce">
      <div className="container">
        <Reveal>
          <div className="portrait">
            <img
              src="images/adriana1.jpeg"
              alt="Adriana Resende, terapeuta holística, sentada com tigela tibetana"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div>
          <Reveal delay={1}><div className="eyebrow">Quem conduz</div></Reveal>
          <Reveal delay={2}><h2>Uma <em>mão</em> para o seu retorno.</h2></Reveal>
          <Reveal delay={3}>
            <p className="lead">
              Sou terapeuta holística. Trabalho com energia, cura vibracional,
              ervas, alquimia e expansão da consciência.
            </p>
          </Reveal>
          <Reveal delay={4}>
            <p>
              Minha missão é conduzir mulheres ao despertar do seu poder interior —
              trazendo reconexão, leveza e transformação. Cada encontro é um
              fio entre o que você foi, é, e está prestes a se tornar.
            </p>
          </Reveal>
          <Reveal delay={4}>
            <div className="sign-name">— Adriana Resende</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Info() {
  return (
    <section className="info" data-screen-label="06 Info">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <Reveal><div className="eyebrow">Informações práticas</div></Reveal>
          <Reveal delay={1}><h2>Tudo que você precisa <em>saber</em>.</h2></Reveal>
          <Reveal delay={2}><p className="lead" style={{ maxWidth: 560, margin: "20px auto 0" }}>
            Reservado para um pequeno círculo de mulheres.
          </p></Reveal>
        </div>

        <div className="info-grid">
          <Reveal delay={1} className="info-cell">
            <div className="k">Data</div>
            <div className="v">13 . 06<small>sábado</small></div>
          </Reveal>
          <Reveal delay={2} className="info-cell">
            <div className="k">Horário</div>
            <div className="v">09—16h<small>dia inteiro</small></div>
          </Reveal>
          <Reveal delay={3} className="info-cell">
            <div className="k">Local</div>
            <div className="v">Terra Luz<small>espaço acolhedor</small></div>
          </Reveal>
          <Reveal delay={4} className="info-cell">
            <div className="k">Vagas</div>
            <div className="v">Limitadas<small>círculo pequeno</small></div>
          </Reveal>
        </div>

        <Reveal delay={4}>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua+Uba%C3%ADra%2C+70V+-+Indian%C3%B3polis%2C+S%C3%A3o+Paulo+-+SP%2C+04517-140"
            target="_blank"
            rel="noopener"
            className="info-address"
          >
            <span className="info-address-k">Endereço</span>
            <span className="info-address-v">
              Rua Ubaíra, 70V — Indianópolis · São Paulo — SP · 04517-140
            </span>
            <span className="info-address-cue">Ver no mapa <span className="arrow">→</span></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Galeria() {
  return (
    <section className="galeria" data-screen-label="07 Galeria">
      <div className="container">
        <div className="galeria-header">
          <Reveal><div className="eyebrow">O espaço</div></Reveal>
          <Reveal delay={1}>
            <h2>
              <em>Terra Luz</em> — onde a vivência acontece.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ maxWidth: 560, margin: "20px auto 0" }}>
              Um espaço acolhedor preparado para receber o seu retorno.
            </p>
          </Reveal>
        </div>

        <div className="galeria-grid">
          {GALERIA_PHOTOS.map((photo, i) => (
            <Reveal key={i} delay={Math.min(i + 1, 4)} className="galeria-cell">
              {photo.src ? (
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              ) : (
                <div className="galeria-placeholder" aria-label={photo.alt}>
                  <span className="galeria-ph-glyph">❋</span>
                  <span className="galeria-ph-label">foto {String(i + 1).padStart(2, "0")}</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inscricao() {
  return (
    <section className="cta inscricao" data-screen-label="08 Inscricao">
      <div className="narrow">
        <Reveal><div className="eyebrow">Inscrição</div></Reveal>
        <Reveal delay={1}>
          <h2>
            O chamado das mulheres<br/>
            que <em>se curam</em>.
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="lead">
            Há momentos em que a alma pede um espaço para respirar.
            Talvez seja agora.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <a href={FORM_URL} className="btn btn-lg" target="_blank" rel="noopener">
            Quero me inscrever
            <span className="arrow">→</span>
          </a>
        </Reveal>
        <Reveal delay={4}>
          <div className="cta-foot">
            Inscrição pelo <strong>formulário</strong> · Vagas limitadas ·{" "}
            <a href={WHATSAPP} target="_blank" rel="noopener" className="cta-foot-link">
              dúvidas pelo WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="mark">Mulheres que Curam</div>
      <div>13 . 06 . 2026 · Terra Luz</div>
    </footer>
  );
}

// ─────────────────────────────── App ───────────────────────────────

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.terroso;
  const root = document.documentElement;
  Object.entries(p).forEach(([k, v]) => {
    const css = "--" + k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    root.style.setProperty(css, v);
  });
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // palette as a key for now stored in palette array form to keep flexible
  // We'll store palette name in tweaks instead — simpler.
  const [paletteName, setPaletteName] = React.useState("cosmos");

  React.useEffect(() => {
    applyPalette(paletteName);
    document.body.classList.toggle("cosmic", COSMIC_PALETTES.has(paletteName));
  }, [paletteName]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--serif", SERIFS[t.serifFont] || SERIFS["Cormorant Garamond"]);
  }, [t.serifFont]);

  return (
    <>
      <Hero showCountdown={t.showCountdown} />
      <Sobre />
      <KeyVisual />
      <Energias />
      <Viver />
      <SobreVoce />
      <Info />
      <Galeria />
      <Inscricao />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Paleta" />
        <TweakRadio
          label="Atmosfera"
          value={paletteName}
          options={[
            { value: "terroso", label: "Terroso" },
            { value: "rose",    label: "Rosé" },
            { value: "sage",    label: "Sage" },
            { value: "mistico", label: "Místico" },
            { value: "cosmos",  label: "Cosmos" }
          ]}
          onChange={setPaletteName}
        />

        <TweakSection label="Tipografia" />
        <TweakSelect
          label="Fonte serifada"
          value={t.serifFont}
          options={Object.keys(SERIFS)}
          onChange={(v) => setTweak("serifFont", v)}
        />

        <TweakSection label="Elementos" />
        <TweakToggle
          label="Contador regressivo"
          value={t.showCountdown}
          onChange={(v) => setTweak("showCountdown", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
