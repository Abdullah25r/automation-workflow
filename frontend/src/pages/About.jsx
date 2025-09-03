import React, { useState, useEffect, useRef } from 'react';

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set up canvas and particles
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create sound wave particles
    class SoundWaveParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.amplitude = Math.random() * 15 + 5;
        this.frequency = Math.random() * 0.05 + 0.02;
        this.phase = Math.random() * Math.PI * 2;
        this.color = `rgba(100, 200, 255, ${Math.random() * 0.3 + 0.1})`;
        this.time = 0;
      }
      
      update() {
        this.time += 0.05;
        
        // Wave movement
        this.x += this.speedX;
        this.y += this.speedY + Math.sin(this.time * this.frequency + this.phase) * 0.5;
        
        // Boundary check
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        // Draw sound wave lines
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        
        // Create wave pattern
        for (let i = 0; i < 3; i++) {
          const waveX = this.x + (i * 10);
          const waveY = this.y + Math.sin(this.time * this.frequency + this.phase + i * 0.5) * this.amplitude;
          ctx.lineTo(waveX, waveY);
        }
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size / 2;
        ctx.stroke();
        
        // Draw particle center
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push(new SoundWaveParticle());
      }
    };
    
    initParticles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            const alpha = 0.2 * (1 - distance/120);
            ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero Section with Sound Wave Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Interactive Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)' }}
        />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">About</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">AirPods</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The future of personal audio is coming soon. Join us on our journey to revolutionize wireless listening.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:-translate-y-1">
            Join Waitlist
          </button>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0a0a0a] to-transparent"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="text-gray-400">Our</span> Vision
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We're building the next generation of wireless earbuds because we believe everyone deserves exceptional audio quality without compromise.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Our team of audio engineers and designers are working tirelessly to create AirPods that will set new standards in sound quality, comfort, and seamless integration.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                While we're not yet on the market, our passion for perfecting every detail drives us forward every day.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-8 shadow-2xl border border-[#333]">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-[#333]">
                    <div className="text-4xl font-bold text-blue-400 mb-2">0</div>
                    <div className="text-gray-400">Products Sold</div>
                  </div>
                  <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-[#333]">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">1</div>
                    <div className="text-gray-400">Country</div>
                  </div>
                  <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-[#333]">
                    <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
                    <div className="text-gray-400">Team Members</div>
                  </div>
                  <div className="text-center p-6 bg-[#0a0a0a] rounded-xl border border-[#333]">
                    <div className="text-4xl font-bold text-green-400 mb-2">2024</div>
                    <div className="text-gray-400">Launch Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="text-gray-400">Coming</span> Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">High-Fidelity Audio</h3>
                  <p className="text-gray-400">Custom-built drivers will deliver rich bass and crisp highs across a wide range of volumes.</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">All-Day Battery</h3>
                  <p className="text-gray-400">Expected to provide up to 24 hours of listening time with the charging case and quick charge capability.</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Adaptive EQ</h3>
                  <p className="text-gray-400">Planned to automatically tune music to the shape of your ear for a rich, consistent experience.</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Spatial Audio</h3>
                  <p className="text-gray-400">Immersive sound technology in development to surround you from every direction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Join Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Be among the first to experience our AirPods when we launch. Sign up for updates and early access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-4 bg-[#1a1a1a] border border-[#333] rounded-full text-white focus:outline-none focus:border-blue-500 w-64"
            />
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:-translate-y-1 whitespace-nowrap">
              Get Updates
            </button>
          </div>
          <p className="text-gray-500 mt-6 text-sm">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;