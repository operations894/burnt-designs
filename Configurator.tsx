@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --ink: #1e1309;
    --cream: #fff6e8;
    --tan: #d6a15c;
    --gold: #f0b35b;
    --char: #2f1c0d;
    --smoke: #17110d;
    --muted: #7b6752;
    --panel: rgba(255,246,232,.86);
    --shadow: 0 24px 80px rgba(31,18,8,.22);
    --background: 36 100% 95%;
    --foreground: 24 43% 9%;
    --card: 36 60% 95%;
    --card-foreground: 24 43% 9%;
    --popover: 36 60% 95%;
    --popover-foreground: 24 43% 9%;
    --primary: 24 43% 9%;
    --primary-foreground: 36 100% 95%;
    --secondary: 36 50% 90%;
    --secondary-foreground: 24 43% 9%;
    --muted: 24 18% 40%;
    --muted-foreground: 24 18% 40%;
    --accent: 28 79% 44%;
    --accent-foreground: 36 100% 95%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 24 43% 9% / 0.12;
    --input: 24 43% 9% / 0.12;
    --ring: 28 79% 44%;
    --radius: 16px;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--ink);
    background:
      radial-gradient(circle at 10% 20%, rgba(240,179,91,.25), transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(139,85,39,.15), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(214,161,92,.08), transparent 70%),
      linear-gradient(135deg, #fff7ea 0%, #f1d1a0 45%, #c4a07a 100%);
    background-attachment: fixed;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: 'Inter', system-ui, sans-serif;
    letter-spacing: -0.05em;
    line-height: 0.95;
    color: var(--ink);
  }

  h1 { font-size: clamp(2.8rem, 8vw, 6.8rem); }
  h2 { font-size: clamp(2rem, 5vw, 4.2rem); }
  h3 { font-size: 1.55rem; margin: 18px 0 8px; }
}

@layer components {
  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.78rem;
    font-weight: 900;
    color: #683b15;
  }

  .brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(145deg, #9a5b23, #f7c471);
    display: grid;
    place-items: center;
    color: #241105;
    font-family: 'Rye', serif;
    font-size: 14px;
    flex-shrink: 0;
  }

  .glass-panel {
    background: rgba(255,246,232,0.86);
    border: 1px solid rgba(58,31,13,0.14);
    border-radius: 30px;
    box-shadow: 0 24px 80px rgba(31,18,8,0.22);
    backdrop-filter: blur(12px);
  }

  .dark-panel {
    color: #fff6e8;
    background: linear-gradient(135deg, rgba(35,19,8,0.94), rgba(91,49,18,0.94));
  }

  .dark-panel .eyebrow {
    color: #f0b35b;
  }

  .wood-slab-preview {
    position: relative;
    overflow: hidden;
    background: linear-gradient(90deg, #5d3216, #a1622e 23%, #744018 45%, #c18446 66%, #633415);
    box-shadow: inset 0 0 0 999px rgba(255,255,255,0.03), 0 24px 80px rgba(31,18,8,0.22);
  }

  .epoxy-river {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 44%;
    right: 44%;
    background: linear-gradient(180deg, rgba(255,255,255,0.72), #1d8bd1, rgba(4,36,61,0.85));
    transform: skewX(-10deg);
    filter: drop-shadow(0 0 16px rgba(29,139,209,0.8));
    pointer-events: none;
  }

  .burn-text {
    font-family: 'Rye', serif;
    color: rgba(22, 11, 5, 0.85);
    text-shadow: 0 1px 0 rgba(255,221,160,0.38);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    font-weight: 900;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #fff7ea;
    background: linear-gradient(135deg, #3a1f0d, #8b4c1c);
    border: none;
    border-radius: 999px;
    box-shadow: 0 24px 80px rgba(31,18,8,0.22);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 28px 90px rgba(31,18,8,0.3);
    filter: brightness(1.1);
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    font-weight: 900;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--ink);
    background: rgba(255,255,255,0.45);
    border: 1px solid rgba(54,31,12,0.22);
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .btn-ghost:hover {
    background: rgba(255,255,255,0.65);
    transform: translateY(-1px);
  }

  .form-input {
    width: 100%;
    border: 1px solid rgba(58,31,13,0.2);
    background: rgba(255,255,255,0.7);
    border-radius: 16px;
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--ink);
    transition: all 0.3s ease;
    outline: none;
  }

  .form-input:focus {
    border-color: #9a5b23;
    background: rgba(255,255,255,0.9);
    box-shadow: 0 0 0 3px rgba(154,91,35,0.15);
  }

  .form-label {
    display: block;
    font-weight: 700;
    font-size: 13px;
    color: var(--ink);
    margin-bottom: 6px;
  }

  .chat-bubble {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 200;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3a1f0d, #8b4c1c);
    color: #fff7ea;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(31,18,8,0.4);
    transition: all 0.3s ease;
    border: none;
  }

  .chat-bubble:hover {
    transform: scale(1.08);
  }
}

@layer utilities {
  .font-western { font-family: 'Rye', serif; }
  .font-classic { font-family: 'Cinzel', serif; }
  .font-stencil { font-family: 'Stardos Stencil', cursive; }
  .font-modern { font-family: 'Inter', sans-serif; }

  .text-shadow-warm {
    text-shadow: 0 1px 0 rgba(255,221,160,0.38);
  }
}