"use client"
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function HomePage() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const mainObjectRef = useRef(null);
  const floatingObjectsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 0.8, 100);
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.6, 100);
    pointLight2.position.set(10, -5, -10);
    scene.add(pointLight2);

    // Create placeholder geometry for main object
    const mainGeometry = new THREE.IcosahedronGeometry(2, 2);
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00ffff,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 0.1,
      transparent: true,
      opacity: 0.9
    });
    
    const mainObject = new THREE.Mesh(mainGeometry, mainMaterial);
    mainObject.castShadow = true;
    mainObject.receiveShadow = true;
    scene.add(mainObject);
    mainObjectRef.current = mainObject;

    // Create floating objects
    const floatingGeometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.4),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.ConeGeometry(0.3, 0.8, 8),
      new THREE.TorusGeometry(0.3, 0.1, 8, 16),
      new THREE.CylinderGeometry(0.2, 0.4, 0.6, 6)
    ];

    const floatingMaterials = [
      new THREE.MeshPhysicalMaterial({ color: 0xff6b6b, metalness: 0.5, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({ color: 0x4ecdc4, metalness: 0.6, roughness: 0.2 }),
      new THREE.MeshPhysicalMaterial({ color: 0x45b7d1, metalness: 0.4, roughness: 0.4 }),
      new THREE.MeshPhysicalMaterial({ color: 0xf9ca24, metalness: 0.3, roughness: 0.5 }),
      new THREE.MeshPhysicalMaterial({ color: 0x6c5ce7, metalness: 0.7, roughness: 0.1 }),
      new THREE.MeshPhysicalMaterial({ color: 0xa55eea, metalness: 0.5, roughness: 0.3 })
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = floatingGeometries[Math.floor(Math.random() * floatingGeometries.length)];
      const material = floatingMaterials[Math.floor(Math.random() * floatingMaterials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);
      
      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      scene.add(mesh);
      floatingObjectsRef.current.push({
        mesh,
        initialPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2
      });
    }

    camera.position.z = 8;
    camera.position.y = 2;
    setIsLoaded(true);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = (time) => {
      if (mainObjectRef.current) {
        mainObjectRef.current.rotation.y += 0.005;
        mainObjectRef.current.rotation.x = mouseRef.current.y * 0.3;
        mainObjectRef.current.rotation.z = mouseRef.current.x * 0.2;
      }

      floatingObjectsRef.current.forEach((obj, index) => {
        obj.mesh.rotation.x += obj.rotationSpeed.x;
        obj.mesh.rotation.y += obj.rotationSpeed.y;
        obj.mesh.rotation.z += obj.rotationSpeed.z;
        
        obj.mesh.position.y = obj.initialPosition.y + Math.sin(time * obj.floatSpeed + obj.floatOffset) * 0.5;
        obj.mesh.position.x = obj.initialPosition.x + Math.cos(time * obj.floatSpeed * 0.7 + obj.floatOffset) * 0.3;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="fixed inset-0" />
      // Tambahkan z-index lebih rendah pada canvas:
      <div ref={mountRef} className="fixed inset-0 z-0" />
      {/* UI Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">


        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center pt-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6">
                Selamat Datang
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                di Platform E-Learning Masa Depan
              </p>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Jelajahi dunia pembelajaran interaktif dengan teknologi 3D yang memukau. 
                Tingkatkan skill Anda dengan pengalaman belajar yang tak terlupakan.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a href="/e-learning">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transform hover:scale-105 transition-all duration-300 border border-indigo-400/20">
                Mulai Belajar
              </button>
              </a>

            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-500 group hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Pembelajaran Interaktif</h3>
                <p className="text-white/80 leading-relaxed">Teknologi 3D untuk pengalaman belajar yang imersif dan menarik</p>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-500 group hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Teknologi Modern</h3>
                <p className="text-white/80 leading-relaxed">Platform terdepan dengan fitur-fitur canggih untuk pembelajaran optimal</p>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-500 group hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Kualitas Terbaik</h3>
                <p className="text-white/80 leading-relaxed">Konten berkualitas tinggi dari instruktur berpengalaman</p>
              </div>
            </div>
          </div>
        </main>

        {/* Premium Package Slider */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-white text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Paket Premium</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Starter', price: '299', features: ['10 Kursus', '3D Models Basic', 'Forum Support', 'Certificate'], color: 'from-indigo-500/20 to-purple-500/20', border: 'indigo-400/30' },
                { name: 'Professional', price: '599', features: ['50 Kursus', '3D Models Pro', 'Priority Support', 'Advance Certificate'], color: 'from-purple-500/20 to-pink-500/20', border: 'purple-400/30' },
                { name: 'Enterprise', price: '999', features: ['Unlimited Kursus', '3D Models Premium', '1-on-1 Mentoring', 'Expert Certificate'], color: 'from-pink-500/20 to-indigo-500/20', border: 'pink-400/30' },
                { name: 'Ultimate', price: '1599', features: ['All Access', 'Custom 3D Models', 'Dedicated Support', 'Master Certificate'], color: 'from-indigo-500/20 to-purple-600/20', border: 'indigo-500/40' }
              ].map((pkg, i) => (
                <div key={i} className={`bg-gradient-to-br ${pkg.color} backdrop-blur-xl border border-${pkg.border} rounded-3xl p-8 hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-500 group`}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Rp {pkg.price}</span>
                      <span className="text-white/70">.000</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="text-white/80 flex items-center justify-center">
                          <span className="text-indigo-400 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105">
                      Pilih Paket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Reviews */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-white text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Testimoni Pengguna</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Johnson", rating: 5, comment: "Platform terbaik untuk belajar! Pengalaman 3D nya luar biasa." },
                { name: "Ahmad Rahman", rating: 5, comment: "Kursus yang sangat interaktif dan mudah dipahami. Sangat recommended!" },
                { name: "Lisa Chen", rating: 4, comment: "Fitur 3D membuat belajar jadi lebih menyenangkan dan engaging." },
                { name: "David Smith", rating: 5, comment: "Instruktur profesional dan materi yang selalu update. Perfect!" },
                { name: "Maria Garcia", rating: 5, comment: "Interface yang modern dan user-friendly. Belajar jadi lebih efektif." },
                { name: "Robert Wilson", rating: 4, comment: "Teknologi yang canggih dan konten berkualitas tinggi. Impressed!" }
              ].map((review, i) => (
                <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 transition-all duration-500 group hover:transform hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">{review.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{review.name}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, star) => (
                          <span key={star} className={`text-xl ${star < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 italic leading-relaxed">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Collaborations */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-white text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Partner Kolaborasi</span>
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex space-x-12 animate-marquee">
                {['Microsoft', 'Google', 'Apple', 'Meta', 'Amazon', 'Tesla', 'Netflix', 'Adobe', 'Spotify', 'Uber'].map((company, i) => (
                  <div key={i} className="flex-shrink-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-10 py-6 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 transition-all duration-300">
                    <span className="text-white font-bold text-xl whitespace-nowrap">{company}</span>
                  </div>
                ))}
                {['Microsoft', 'Google', 'Apple', 'Meta', 'Amazon', 'Tesla', 'Netflix', 'Adobe', 'Spotify', 'Uber'].map((company, i) => (
                  <div key={`duplicate-${i}`} className="flex-shrink-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-10 py-6 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 transition-all duration-300">
                    <span className="text-white font-bold text-xl whitespace-nowrap">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-white text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Hubungi Kami</span>
            </h2>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Informasi Kontak</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-lg">📧</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Email</p>
                        <p className="text-white/80">evanpplgb@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-lg">📱</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Telepon</p>
                        <p className="text-white/80">+62 858 7715 8827</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-lg">📍</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Alamat</p>
                        <p className="text-white/80">Solo, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h3>
                  <form className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Nama Lengkap" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                    <textarea 
                      placeholder="Pesan Anda" 
                      rows="4" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                    ></textarea>
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105">
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>


        <footer className="relative z-10 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-xl border-t border-white/20 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">MiAch</h3>
            </div>
            <p className="text-white/70 mb-6">Platform pembelajaran masa depan dengan teknologi yang revolusioner</p>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="text-white/70 hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-indigo-400 transition-colors">Support</a>
            </div>
            <p className="text-white/60">© 2025 MiAch. Semua hak dilindungi undang-undang.</p>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      

      {!isLoaded && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Tunggu Memulai</p>
          </div>
        </div>
      )}
    </div>
  );
}