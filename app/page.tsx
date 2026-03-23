'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

// Scroll-triggered FadeUp using IntersectionObserver + framer-motion animate prop
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return
    const yOffset = -90
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .hero-fade {
          opacity: 0;
          transform: translateY(35px);
          animation: heroIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-fade-1 { animation-delay: 0.15s; }
        .hero-fade-2 { animation-delay: 0.35s; }
        .hero-fade-3 { animation-delay: 0.55s; }
        @keyframes heroIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .float-rocket {
          animation: floatUp 3s ease-in-out infinite;
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .btn-glow:hover {
          box-shadow: 0 0 22px rgba(59,130,246,0.45);
        }

        /* ══════════════════════════════════════
           MOBILE ONLY — max-width: 767px
           Desktop classes are completely untouched.
           All fixes done here via custom classes.
        ══════════════════════════════════════ */
        @media (max-width: 767px) {

          /* Global: all images responsive */
          img { max-width: 100%; height: auto; }

          /* ── Hero Section ── */
          /* Center the hero image (original has ml-12 which pushes right on mobile) */
          .hero-img-wrap { display: flex; justify-content: center; }
          .hero-img-wrap img { margin-left: 0 !important; width: 80vw; max-width: 320px; }

          /* Stack buttons vertically, full width */
          .hero-btns { flex-direction: column !important; width: 100%; }
          .hero-btns a { width: 100%; box-sizing: border-box; }

          /* ── About Section ── */
          /* Stack 2-col grid to single column */
          .about-grid { display: grid; grid-template-columns: 1fr !important; gap: 1.5rem !important; }

          /* Image boxes: remove large padding & fixed height that cuts image */
          .about-img-box { padding: 0.5rem !important; height: auto !important; }
          .about-img-box img { width: 100%; max-width: 320px; display: block; margin: 0 auto; }

          /* Our Vision: mobile me text pehle, image baad mein */
          .vision-img  { order: 2; }
          .vision-text { order: 1; }

          /* Services text: remove desktop left-shift */
          .services-wrap { margin-left: 0 !important; }

          /* ── Wings Section ── */
          /* Remove large side margins */
          .wings-inner { margin-left: 0 !important; margin-right: 0 !important; }

          /* Wings text: left-align properly inside container */
          .wings-inner h2,
          .wings-inner p  { word-break: break-word; }

          /* Stack wing posters vertically, remove desktop margin-left */
          .wings-posters { flex-direction: column !important; margin-left: 0 !important; width: 100% !important; align-items: center; }
          .wings-posters img { width: 100%; max-width: 320px; }

          /* ── Contact Section ── */
          /* Stack contact grid */
          .contact-grid { grid-template-columns: 1fr !important; }

          /* Icon + text row: align icon top so text doesn't overlap */
          .contact-item { align-items: flex-start; }
          .contact-item .icon-box { flex-shrink: 0; }
          .contact-item p { text-align: left !important; margin-top: 0.25rem; word-break: break-all; }

          /* Social links: center on mobile */
          .social-grid { justify-items: center; }

          /* ── Footer ── */
          .footer-logo img { width: 180px !important; margin: 0 auto; display: block; }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />

        {/* ─── Landing Section ─── */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="justify-center items-center text-center px-4">

            {/* DESKTOP: ml-12 preserved. MOBILE: hero-img-wrap centers it */}
            <div className="hero-fade hero-fade-1 hero-img-wrap">
              <img className='ml-12' src="img/intro.png" alt="Official Website Glactic Scholer Hub" />
            </div>

            <p className="hero-fade hero-fade-2 text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              ✨ Galactic Scholars Hub ✨ <br />
              🌟 "Empowering Every Seeker of Knowledge." 🌟
            </p>

            {/* DESKTOP: flex-row gap-4 preserved. MOBILE: hero-btns stacks them */}
            <div className="hero-fade hero-fade-3 hero-btns flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href='#wing'
                className="btn-glow bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                🚀 Learn More
              </a>
              <a
                href="#contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                🏷️ Seat Booking
              </a>
            </div>

          </div>
        </section>

        {/* ─── About Section ─── */}
        <section id="about" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">

            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                  🌌 ABOUT US
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  At Galactic Scholars Hub, we offer a galactic learning environment where students grow beyond limits. Our young and passionate teachers bring fresh energy to every class. Get high-level education at a low cost - because our mission is to uplift every student, especially those from economically weaker backgrounds.<br />
                  ⭐ [Learn. Grow. Shine like a Star.] ⭐
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                  🛰️ OUR SERVICES
                </h2>
                {/* DESKTOP: ml-120 preserved. MOBILE: services-wrap removes it */}
                <div className='services-wrap w-xl justify-center items-center ml-120'>
                  <p className="text-xl text-left text-gray-600 max-w-3xl mx-auto">
                    💫 ━━━━► Galactic Environment.<br />
                    💫 ━━━━► Fresh, Passionate teachers.<br />
                    💫 ━━━━► High-quality education at low cost.<br />
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Our Story — DESKTOP: md:grid-cols-2. MOBILE: about-grid makes it single col */}
            <div className="about-grid grid md:grid-cols-2 mt-2 gap-12 items-center">
              <FadeUp delay={0.1}>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">🌠 OUR STORY</h3>
                <p className="text-lg font-bold text-gray-600 mb-6 leading-relaxed">
                  Galactic Scholars Hub was born with a single dream - to make quality education affordable for all. We built a galactic learning space where students feel inspired, guided by young and passionate teachers who believe every learner can shine like a star.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                {/* DESKTOP: p-12 h-96 preserved. MOBILE: about-img-box overrides these */}
                <div className="about-img-box p-12 h-96 flex items-center justify-center">
                  <div className="text-white text-6xl float-rocket">
                    <img className='rounded-3xl' src="img/poster-01.jpeg" alt="" />
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Our Vision */}
            <div className="about-grid grid md:grid-cols-2 mt-2 gap-12 items-center">
              <div className="vision-img">
                <FadeUp delay={0.1}>
                  <div className="about-img-box p-12 h-96 flex items-center justify-center">
                    <div className="text-white text-6xl float-rocket">
                      <img className='rounded-3xl' src="img/poster-02.jpeg" alt="" />
                    </div>
                  </div>
                </FadeUp>
              </div>
              <div className="vision-text">
                <FadeUp delay={0.25}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">🔭 OUR VISION</h3>
                  <p className="text-lg font-bold text-gray-600 mb-6 leading-relaxed">
                    To provide high-level education at a low cost, empowering ecconomically weak students to reach higher levels of success.<br />
                    🌟 [Quality Learning for Every Dream.] 🌟
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* Our Mission */}
            <div className="about-grid grid md:grid-cols-2 mt-2 gap-12 items-center">
              <FadeUp delay={0.1}>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">🎯 OUR MISSION</h3>
                <p className="text-lg font-bold text-gray-600 mb-6 leading-relaxed">
                  To grow from tuition to coaching, to institute, to university - with your support - and simplify the education system for every learner.<br />
                  💡 [Together, we'll make learning simple and powerful.] 💡
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="about-img-box p-12 h-96 flex items-center justify-center">
                  <div className="text-white text-6xl float-rocket">
                    <img className='rounded-3xl' src="img/poster-03.jpeg" alt="" />
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>
        </section>

        {/* ─── Wings Section ─── */}
        <section id="wing" className="py-24 px-4 relative justify-center items-center">
          <FadeUp>
            {/* DESKTOP: ml-30 mr-30 preserved. MOBILE: wings-inner removes these margins */}
            <div className='wings-inner justify-center items-center text-center ml-30 mr-30'>
              <h3 className="text-3xl text-center font-bold text-gray-900 mb-6">Our Academy – Unique Features & Recognition System</h3>

              {/* Events & Program */}
              <h2 className='text-left text-2xl font-bold'>🎉 Events & Programs:</h2>
              <p className='text-xl text-left ml-10'>
                At our Academy, we believe that education is not limited to books.
                Therefore, two major events are organized in every academic session to encourage creativity,
                confidence, and leadership among students.
              </p>
              <p className='text-xl font-bold text-left ml-10'>Our events may include:</p>
              <p className='text-xl text-left ml-15'>
                &#9679; Academic Competitions <br />
                &#9679; Cultural & Personality Development Programs <br />
                &#9679; Debate & Quiz Competitions <br />
                &#9679; Motivational Seminars <br />
              </p>

              {/* Three level award */}
              <h2 className='text-left text-2xl font-bold'>🏆 Our Three-Level Award Ceremony System:</h2>
              <p className='text-xl text-left ml-10'>
                We proudly conduct three structured award ceremonies in every session
                to recognize discipline, attendance, performance, and character.
              </p>

              {/* Academic brand */}
              <h2 className='text-left text-2xl font-bold'>👑 Academy Brand Ambassador Program:</h2>
              <p className='text-xl text-left ml-10'>
                Every year, our Academy selects a Student Brand Ambassador.
              </p>
              <p className='text-xl font-bold text-left ml-10'>Selection Process:</p>
              <p className='text-xl text-left ml-15'>
                &#9679; Chosen from top performers of the Annual 3 Star Categories <br />
                &#9679; Must pass a personal Interview Round <br />
                &#9679; Evaluated on communication, leadership, confidence, and values <br />
              </p>
              <p className='text-xl font-bold text-left ml-10'>After successfully passing the interview:</p>
              <p className='text-xl text-left ml-15'>
                &#9679; The student is officially declared Academy Brand Ambassador <br />
                &#9679; Special facilities and privileges are provided <br />
                &#9679; Facilities may change every year depending on performance and policy <br />
              </p>
              <p className='text-xl font-bold text-left ml-10'>This program builds leadership and gives students real-life
                responsibility experience.</p>

              {/* Sponsorship policies */}
              <h2 className='text-left text-2xl font-bold'>🤝 Power Sponsorship Policy:</h2>
              <p className='text-xl font-bold text-left ml-10'>Our Academy believes in mutual growth and collaboration.</p>
              <p className='text-xl text-left ml-15'>
                &#9679; We proudly power sponsor different institutions and organizations <br />
                &#9679; In return, those institutions also support and promote our Academy <br />
                &#9679; * Sponsorship terms are decided mutually for academic and social growth <br />
              </p>
              <p className='text-xl font-bold text-left ml-10'>This helps us build a strong educational network and community presence.</p>

              {/* Wings Posters — DESKTOP: flex row ml-10 mt-20 preserved. MOBILE: wings-posters stacks them */}
              <div className='wings-posters flex w-xl gap-6 ml-10 mt-20'>
                <img className='rounded-2xl border-2 border-red-400' src="img/wings_01.png" alt="wing poster" />
                <img className='rounded-2xl border-2 border-red-400' src="img/wings_02.png" alt="wing poster" />
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ─── Contact Section ─── */}
        <section id="contact" className="py-24 px-4 bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">📬 Get In Touch</h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
                32-Rasool Nagar, Bhadauni Near by K.S.F Factory, Nawada PIN Code: 805110 Bihar  (India)
              </p>
            </FadeUp>

            {/* Contact column — DESKTOP: md:grid-cols-2. MOBILE: contact-grid stacks it */}
            <div className="contact-grid grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <FadeUp delay={0.2}>
                <div className="space-y-6">

                  <div className="contact-item flex items-start space-x-4">
                    <div className="icon-box w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="opacity-90 text-center font-bold mt-2">galacticscholarshub@gmail.com</p>
                    </div>
                  </div>

                  <div className="contact-item flex items-start space-x-4">
                    <div className="icon-box w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="opacity-90 text-center font-bold mt-2">+91 74799 52436</p>
                    </div>
                  </div>

                  <div className="contact-item flex items-start space-x-4">
                    <div className="icon-box w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                        <path d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.334 0 2.354.616 4.657 1.784 6.688L2.667 29.333l6.844-1.751a13.28 13.28 0 006.49 1.676h.006c7.363 0 13.333-5.97 13.333-13.334S23.37 2.667 16.001 2.667zm0 24.001h-.005a10.64 10.64 0 01-5.414-1.484l-.387-.23-4.06 1.038 1.084-3.958-.25-.407a10.61 10.61 0 01-1.628-5.67c0-5.876 4.78-10.656 10.66-10.656 2.847 0 5.52 1.11 7.534 3.123a10.57 10.57 0 013.122 7.534c-.002 5.877-4.782 10.656-10.656 10.656zm5.843-7.98c-.32-.16-1.89-.932-2.183-1.038-.293-.107-.507-.16-.72.16-.213.32-.826 1.038-1.014 1.252-.187.213-.373.24-.693.08-.32-.16-1.35-.497-2.572-1.584-.95-.847-1.592-1.893-1.78-2.213-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.732-.987-2.372-.26-.624-.524-.54-.72-.55-.187-.01-.4-.012-.613-.012-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.258 3.45 5.472 4.834.765.33 1.362.527 1.827.674.768.244 1.468.21 2.02.127.616-.092 1.89-.772 2.157-1.518.267-.747.267-1.387.187-1.518-.08-.133-.293-.213-.613-.373z" />
                      </svg>
                    </div>
                    <div>
                      <p className="opacity-90 text-center font-bold mt-2">+91 70611 43544</p>
                    </div>
                  </div>

                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className='social-grid grid gap-10 items-center justify-center'>
                  <a className='flex gap-3' href="https://www.instagram.com/galacticscholarshub?igsh=cmZieG1mbmc3N3Js">
                    <img className='w-10 bg-gray-500' src="img/instagram.png" alt="" />
                    <p className='font-bold text-center mt-2'>/galacticscholarshub</p>
                  </a>
                  <a className='flex gap-3' href="https://youtube.com/@galacticscholarshub?si=Glgby-gOts2llk0i">
                    <img className='w-10 bg-gray-500' src="img/youtube.webp" alt="" />
                    <p className='font-bold text-center'>/GalacticScholarsHub</p>
                  </a>
                  <a className='flex gap-3' href="https://www.facebook.com/share/1E5UMPM3TB/">
                    <img className='w-10 bg-gray-500' src="img/facebook.webp" alt="" />
                    <p className='font-bold text-center mt-2'>/galacticscholarshub</p>
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="bg-white text-gray-900 py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="footer-logo">
              <img src="img/glactic_logo_page-0001-removebg-preview.png" alt="GSH" />
            </div>
            <p className="text-gray-400 mb-6">
              © 2026. Galactic Scholars Hub Academy. | Powered By Galactic Scholars Hub Organization.
            </p>
          </div>
        </footer>

      </main>
    </>
  )
}