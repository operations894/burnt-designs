import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VERT = `attribute vec2 a_pos;
void main(){
  gl_Position=vec4(a_pos,0.,1.);
}`

const FRAG = `precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_glowIntensity;
uniform vec2 u_mouse;
uniform float u_speed;

#define PI 3.14159265359
#define MAX_STEPS 80

float hash(vec2 p){
  p=fract(p*vec2(443.897,441.423));
  p+=dot(p,p+19.19);
  return fract(p.x*p.y);
}

float noise(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i),hash(i+vec2(1,0)),f.x),
    mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),
    f.y
  );
}

float fbm(vec2 p){
  float v=0.0;
  float a=0.5;
  vec2 shift=vec2(100.0);
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
  for(int i=0;i<4;i++){
    v+=a*noise(p);
    p=rot*p*2.0+shift;
    a*=0.5;
  }
  return v;
}

vec3 automataGlow(vec2 p,float t){
  float n1=fbm(p*3.0+t*0.2);
  float n2=fbm(p*2.0-t*0.15+vec2(1.7,9.2));
  float n3=fbm(p*1.5+t*0.1+vec2(n1,n2));
  vec3 pattern=vec3(n1*n2,n2*n3,n1*n3);
  pattern=pow(pattern,vec3(1.5));
  vec3 cells=vec3(
    fbm(p*8.0+t*0.5),
    fbm(p*6.0+t*0.3+5.0),
    fbm(p*10.0+t*0.4+10.0)
  );
  pattern*=smoothstep(0.3,0.7,cells);
  return pattern;
}

float sdSphere(vec3 p,float r){
  return length(p)-r;
}

float scene(vec3 p,float t){
  return sdSphere(p,0.6+0.05*sin(t*0.8));
}

vec3 getNormal(vec3 p,float t){
  vec2 e=vec2(0.001,0.0);
  return normalize(vec3(
    scene(p+e.xyy,t)-scene(p-e.xyy,t),
    scene(p+e.yxy,t)-scene(p-e.yxy,t),
    scene(p+e.yyx,t)-scene(p-e.yyx,t)
  ));
}

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res.xy)/u_res.y;
  vec3 ro=vec3(0.0,0.0,2.5);
  vec3 rd=normalize(vec3(uv,-1.0));

  float angle=u_time*0.1*u_speed;
  float rc=cos(angle);
  float rs=sin(angle);
  rd.xy=mat2(rc,-rs,rs,rc)*rd.xy;

  float t=0.0;
  float dist=0.0;
  vec3 p=ro;
  bool hit=false;

  for(int i=0;i<MAX_STEPS;i++){
    if(hit) break;
    dist=scene(p,u_time);
    t+=dist;
    p=ro+rd*t;
    hit=dist<0.001||t>5.0;
  }

  vec3 col=vec3(0.04,0.02,0.01);

  if(hit){
    vec3 n=getNormal(p,u_time);
    vec3 viewDir=normalize(ro-p);
    vec3 lightDir=normalize(vec3(0.5,0.8,1.0));
    float dp=max(dot(n,lightDir),0.0);
    float sp=pow(max(dot(viewDir,reflect(-lightDir,n)),0.0),32.0);

    vec2 automataPos=p.xz*2.0+u_time*0.05;
    vec3 glow=automataGlow(automataPos,u_time);

    vec3 baseCol1=vec3(0.8,0.5,0.2);
    vec3 baseCol2=vec3(0.6,0.35,0.15);
    vec3 finalColor=mix(baseCol1,baseCol2,dp);

    vec3 glowColor=
      vec3(0.9,0.5,0.1)*glow.x*u_glowIntensity*1.2+
      vec3(0.7,0.3,0.5)*glow.y*u_glowIntensity*0.8+
      vec3(0.9,0.7,0.4)*glow.z*u_glowIntensity*0.6;
    finalColor+=glowColor;

    finalColor+=vec3(1.0,0.95,0.8)*sp*0.5;
    finalColor*=0.8+0.2*noise(p.xz*10.0);
    col+=finalColor;
  }

  float vf=1.0-dot(uv*0.8,uv*0.8);
  col*=0.5+vf*vf*0.5;
  col+=vec3(0.05,0.02,0.01)*sin(u_time*0.2)*0.5;
  col=col/(1.0+col);
  col=pow(col,vec3(0.4545));

  gl_FragColor=vec4(col,1.0);
}`

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function PatternStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog))
      return
    }

    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uGlowIntensity = gl.getUniformLocation(prog, 'u_glowIntensity')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uSpeed = gl.getUniformLocation(prog, 'u_speed')

    let mouseX = -1
    let mouseY = -1

    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = canvas.clientHeight - (e.clientY - rect.top)
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }

    window.addEventListener('resize', resize)
    resize()

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.uniform1f(uTime, performance.now() * 0.001)
      gl.uniform1f(uGlowIntensity, 1.5)
      gl.uniform1f(uSpeed, 0.5)
      gl.uniform2f(uMouse, mouseX, mouseY)
    }

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Entrance animations
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Canvas fade in
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Text stagger
      const textEls = textRef.current!.querySelectorAll('.animate-in')
      gsap.fromTo(
        textEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="custom-shop"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#1A0F08' }}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Text overlay */}
      <div
        ref={textRef}
        className="relative z-10 flex items-center"
        style={{
          minHeight: '80vh',
          padding: '10vh 8vw',
        }}
      >
        <div className="max-w-[400px]">
          <p className="animate-in label-section mb-4">CUSTOM SHOP</p>
          <h2
            className="animate-in font-heading font-light mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#FFFDF9',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Design your own burn pattern
          </h2>
          <p
            className="animate-in font-body mb-8"
            style={{
              fontSize: 16,
              color: 'rgba(255,253,249,0.7)',
              lineHeight: 1.7,
            }}
          >
            Upload an image or type a word. Our digital pyrography tool converts it into a
            procedural burn pattern using cellular automata — the same organic logic that guides
            our hand-burned pieces.
          </p>
          <button
            className="animate-in font-heading font-medium text-xs tracking-[0.1em] uppercase transition-colors duration-300 hover:bg-burnt-flame"
            style={{
              backgroundColor: '#FFFDF9',
              color: '#1A0F08',
              padding: '14px 36px',
              borderRadius: 2,
            }}
          >
            Try It Now
          </button>
        </div>
      </div>

      {/* Mobile: top text panel */}
      <style>{`
        @media (max-width: 768px) {
          #custom-shop .relative.z-10 {
            align-items: flex-start !important;
            padding-top: 6vh !important;
          }
          #custom-shop .relative.z-10 > div {
            background-color: rgba(26, 15, 8, 0.85);
            padding: 2rem;
            border-radius: 2px;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}