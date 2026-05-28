function App() {
  return (
    <div className="font-sans">
      <HeroSection />
      <SectionTwo />
      <SectionThree />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b1120]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=1920&q=80"
          alt="Industrial facility"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120]/80 via-[#0b1120]/90 to-[#0b1120]"></div>
      </div>

      <div className="absolute top-20 right-20 w-64 h-64 border-2 border-[#FFD700]/20 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-40 left-20 w-48 h-48 border border-[#0891B2]/30 rotate-45"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-[#0891B2] text-xs font-bold uppercase tracking-widest mb-4">Critical Minerals Infrastructure</p>
        <div className="w-10 h-1 bg-[#FFD700] mb-6"></div>
        <h1
          className="font-bold text-white uppercase leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.8rem, 10vw, 6rem)", letterSpacing: "-0.02em" }}
        >
          CLEAN SMART<br />
          <span className="text-[#64748B]">REFINING</span>
        </h1>
        <p className="text-[#94A3B8] text-lg font-light max-w-xl leading-relaxed">
          Industrial-scale refinement of pure-grade critical minerals — enabled by our{" "}
          <span className="text-[#FFD700] font-black">SYNHUBS™</span> network and breakthrough{" "}
          <span className="text-[#FFD700] font-black">SYNCORE™</span> technology
        </p>
        <div className="flex gap-4 mt-10">
          <button className="bg-[#FFD700] text-[#0b1120] font-bold uppercase tracking-widest px-8 py-3 text-sm hover:bg-[#FFD700]/90 transition-colors">
            SECURE CAPACITY
          </button>
          <button className="border border-[#FFD700]/40 text-[#FFD700] font-bold uppercase tracking-widest px-8 py-3 text-sm hover:border-[#FFD700] transition-colors">
            EXPLORE SYNCORE™
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionTwo() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]">
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-full z-0 opacity-10"
        style={{
          background: `
            linear-gradient(135deg, transparent 40%, rgba(255,215,0,0.08) 50%, transparent 60%),
            linear-gradient(45deg, transparent 40%, rgba(8,145,178,0.06) 50%, transparent 60%)
          `,
        }}
      ></div>

      <div className="absolute -top-24 -right-24 w-96 h-96 border border-[#FFD700]/10 rotate-45"></div>
      <div className="absolute -top-12 -right-12 w-72 h-72 border border-[#FFD700]/15 rotate-45"></div>
      <div className="absolute bottom-20 left-0 w-80 h-2 bg-gradient-to-r from-[#FFD700]/20 to-transparent -skew-y-6"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-[#0891B2] text-xs font-bold uppercase tracking-widest mb-4">Our Technology</p>
        <div className="w-10 h-1 bg-[#FFD700] mb-6"></div>
        <h2
          className="font-bold text-white uppercase leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          SYNCORE™<br />
          <span className="text-[#FFD700]">TECHNOLOGY</span>
        </h2>
        <p className="text-[#94A3B8] text-lg font-light max-w-xl leading-relaxed">
          Breakthrough refining technology delivering pure-grade critical minerals at industrial scale.
        </p>
      </div>
    </section>
  );
}

function SectionThree() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1E293B]">
      <div
        className="absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] border-2 border-[#FFD700]/8 rotate-45"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-[360px] h-[360px] bg-[#FFD700]/[0.03] rotate-45"></div>

      <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-[0.06]"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.05) 60px,
              rgba(255,255,255,0.05) 62px
            )
          `,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-[#0891B2] text-xs font-bold uppercase tracking-widest mb-4">Our Network</p>
        <div className="w-10 h-1 bg-[#FFD700] mb-6"></div>
        <h2
          className="font-bold text-white uppercase leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          SYNHUBS™<br />
          <span className="text-[#FFD700]">NETWORK</span>
        </h2>
        <p className="text-[#94A3B8] text-lg font-light max-w-xl leading-relaxed">
          Distributed refining infrastructure — strategically positioned across critical mineral supply chains.
        </p>
      </div>
    </section>
  );
}

export default App;
