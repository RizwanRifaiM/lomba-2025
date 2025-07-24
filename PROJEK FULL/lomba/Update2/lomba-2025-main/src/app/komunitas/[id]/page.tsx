"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Command, CommandInput } from "@/components/ui/command";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

type Category = {
  title: string;
  desc: string;
  subs: string[];
};

type Topic = {
  title: string;
  views: number;
  firstWord: string;
};

type ForumTopic = {
  title: string;
  author: string;
  posts: number;
  views: number;
  lastReply: string;
  lastUser: string;
  id: number;
};

const materi: Category[] = [
  {
    title: "Matematika",
    desc: "Diskusi dan saran tentang matematika, rumus, dan penerapannya.",
    subs: ["Geometri", "Trigonometri", "Aljabar"],
  },
  {
    title: "Bahasa Indonesia",
    desc: "Bahas tata bahasa, membaca, dan menulis dalam Bahasa Indonesia.",
    subs: ["Tata Bahasa", "Membaca", "Menulis"],
  },
  {
    title: "Bahasa Inggris",
    desc: "Diskusi grammar, speaking, dan listening Bahasa Inggris.",
    subs: ["Grammar", "Speaking", "Listening"],
  },
  {
    title: "Bahasa Jepang",
    desc: "Belajar kanji, hiragana, dan percakapan Jepang.",
    subs: ["Kanji", "Hiragana", "Percakapan"],
  },
  {
    title: "Sastra",
    desc: "Forum puisi, prosa, dan drama.",
    subs: ["Puisi", "Prosa", "Drama"],
  },
  {
    title: "Fisika",
    desc: "Diskusi mekanika, optik, dan termodinamika.",
    subs: ["Mekanika", "Optik", "Termodinamika"],
  },
  {
    title: "Kimia",
    desc: "Bahas kimia organik, anorganik, dan biokimia.",
    subs: ["Organik", "Anorganik", "Biokimia"],
  },
  {
    title: "Biologi",
    desc: "Diskusi botani, zoologi, dan genetika.",
    subs: ["Botani", "Zoologi", "Genetika"],
  },
  {
    title: "Ekonomi",
    desc: "Forum ekonomi mikro, makro, dan pembangunan.",
    subs: ["Mikro", "Makro", "Pembangunan"],
  },
  {
    title: "Geografi",
    desc: "Diskusi geografi fisik, manusia, dan lingkungan.",
    subs: ["Fisik", "Manusia", "Lingkungan"],
  },
  {
    title: "Sejarah",
    desc: "Bahas sejarah Indonesia, dunia, dan peradaban.",
    subs: ["Indonesia", "Dunia", "Peradaban"],
  },
  {
    title: "Sosiologi",
    desc: "Diskusi interaksi, kelompok, dan perubahan sosial.",
    subs: ["Interaksi", "Kelompok", "Perubahan Sosial"],
  },
  {
    title: "Teknologi",
    desc: "Forum komputer, internet, dan AI.",
    subs: ["Komputer", "Internet", "AI"],
  },
  {
    title: "Agama",
    desc: "Diskusi agama Islam, Kristen, Hindu.",
    subs: ["Islam", "Kristen", "Hindu"],
  },
  {
    title: "Kesenian",
    desc: "Forum musik, tari, dan lukis.",
    subs: ["Musik", "Tari", "Lukis"],
  },
  {
    title: "Olahraga",
    desc: "Diskusi sepak bola, basket, dan renang.",
    subs: ["Sepak Bola", "Basket", "Renang"],
  },
];

const topikViews: Topic[] = [
  { title: "Geometri Dasar", views: 120, firstWord: "Geometri" },
  { title: "Tata Bahasa", views: 110, firstWord: "Tata Bahasa" },
  { title: "AI(Artificial Intellegence)", views: 100, firstWord: "AI" },
  { title: "Puisi Modern", views: 90, firstWord: "Puisi" },
  { title: "Mekanika Klasik", views: 80, firstWord: "Mekanika" },
];

const deskripsi: Record<string, string> = {
  Geometri: "Diskusi dan saran seputar geometri, rumus, dan penerapannya.",
  Trigonometri: "Pembahasan tentang trigonometri, fungsi, dan soal-soal.",
  Aljabar: "Tempat berbagi tentang aljabar, persamaan, dan tips belajar.",
  "Tata Bahasa": "Diskusi tata bahasa Indonesia, struktur kalimat, dan ejaan.",
  Membaca: "Tips dan saran meningkatkan kemampuan membaca.",
  Menulis: "Forum menulis kreatif dan akademik.",
  Grammar: "Diskusi grammar bahasa Inggris, tenses, dan latihan.",
  Speaking: "Latihan speaking dan tips percaya diri.",
  Listening: "Berbagi sumber listening dan latihan.",
  Kanji: "Belajar kanji Jepang bersama.",
  Hiragana: "Diskusi huruf hiragana dan penggunaannya.",
  Percakapan: "Latihan percakapan bahasa Jepang.",
  Puisi: "Forum puisi, kritik, dan apresiasi.",
  Prosa: "Diskusi prosa, cerpen, dan novel.",
  Drama: "Pembahasan drama dan teater.",
};

const topikDummy: Record<string, ForumTopic[]> = {
  Geometri: [
    { title: "Cara cepat menghitung luas segitiga", author: "Andi", posts: 12, views: 120, lastReply: "2 jam lalu", lastUser: "Budi", id: 1234561 },
    { title: "Diskusi teorema Pythagoras", author: "Citra", posts: 8, views: 90, lastReply: "1 jam lalu", lastUser: "Dewi", id: 1234562 },
    { title: "Soal HOTS geometri SMA", author: "Eka", posts: 5, views: 60, lastReply: "30 menit lalu", lastUser: "Fajar", id: 1234563 },
  ],
  Trigonometri: [
    { title: "Fungsi sinus dan cosinus", author: "Gilang", posts: 10, views: 80, lastReply: "3 jam lalu", lastUser: "Hana", id: 1234564 },
    { title: "Latihan soal identitas trigonometri", author: "Ika", posts: 7, views: 70, lastReply: "2 jam lalu", lastUser: "Joko", id: 1234565 },
  ],
  Aljabar: [
    { title: "Tips menyelesaikan persamaan kuadrat", author: "Kiki", posts: 15, views: 150, lastReply: "1 jam lalu", lastUser: "Lina", id: 1234566 },
    { title: "Diskusi polinomial", author: "Mira", posts: 6, views: 55, lastReply: "20 menit lalu", lastUser: "Nina", id: 1234567 },
  ],
};

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const modelsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create subtle floating models
    const geometries = [
      new THREE.TetrahedronGeometry(0.3),
      new THREE.OctahedronGeometry(0.4),
      new THREE.SphereGeometry(0.3, 8, 6)
    ];

    const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshPhongMaterial({ 
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.1
      });
      const model = new THREE.Mesh(geometry, material);
      
      model.position.x = (Math.random() - 0.5) * 40;
      model.position.y = (Math.random() - 0.5) * 30;
      model.position.z = (Math.random() - 0.5) * 10;
      
      model.rotation.x = Math.random() * Math.PI;
      model.rotation.y = Math.random() * Math.PI;
      
      scene.add(model);
      modelsRef.current.push(model);
    }

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate scattered models
      modelsRef.current.forEach((model, index) => {
        model.rotation.x += 0.002 * (index % 2 === 0 ? 1 : -1);
        model.rotation.y += 0.002 * (index % 3 === 0 ? 1 : -1);
        model.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.01;
      });

      // Camera subtle movement
      camera.position.x += (mouseRef.current.x * 1 - camera.position.x) * 0.02;
      camera.position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 bg-gray-100" />;
};

export default function Komunitas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sub = searchParams.get('sub');
  const topicId = searchParams.get('topicId');

  // Handle topic detail view
  if (topicId) {
    const topic = Object.values(topikDummy)
      .flat()
      .find(t => t.id.toString() === topicId);
    
    if (!topic) {
      return (
        <div className="min-h-screen bg-gray-50">
          <ThreeScene />
          <div className="relative z-10 max-w-4xl mx-auto pt-10 px-4">
            <Card className="p-6 bg-white shadow-md">
              <CardTitle className="text-gray-800">Topik tidak ditemukan</CardTitle>
              <button 
                onClick={() => router.push('/komunitas')}
                className="mt-4 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Kembali ke halaman utama
              </button>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-100">
        <ThreeScene />
        <div className="relative z-10 max-w-4xl mx-auto pt-10 px-4">
          <Card className="mb-6 p-6 bg-white shadow-md">
            <CardTitle className="text-2xl mb-2 text-gray-800">{topic.title}</CardTitle>
            <div className="text-sm text-gray-600">
              Dibuat oleh {topic.author} • {topic.views} views • {topic.posts} posts
            </div>
          </Card>
          
          <Card className="p-6 mb-4 bg-white shadow-md">
            <div className="text-gray-700">Isi diskusi akan muncul di sini</div>
          </Card>
          
          <button 
            onClick={() => router.push(`/komunitas?sub=${searchParams.get('fromSub') || ''}`)}
            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            ← Kembali ke daftar topik
          </button>
        </div>
      </div>
    );
  }

  // Handle subcategory view
  if (sub) {
    const decodedSub = decodeURIComponent(sub);
    const topik = topikDummy[decodedSub] || [
      { 
        title: `Belum ada topik di ${decodedSub}`, 
        author: "-", 
        posts: 0, 
        views: 0, 
        lastReply: "-", 
        lastUser: "-",
        id: 0
      },
    ];

    return (
      <div className="min-h-screen bg-gray-100">
        <ThreeScene />
        <div className="relative z-10 max-w-4xl mx-auto pt-10 px-4">
          <Card className="mb-6 p-6 bg-white shadow-md">
            <CardTitle className="text-2xl mb-1 text-gray-800">{decodedSub}</CardTitle>
            <span className="text-gray-600 text-base">
              {deskripsi[decodedSub] || `Diskusi dan saran seputar ${decodedSub}.`}
            </span>
          </Card>
          
          <div className="mb-4 flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-900">Topik</span>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              onClick={() => router.push('/komunitas/buat-topik')}
            >
              + Topik Baru
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {topik.map((t) => (
              <div 
                key={t.id}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200"
                onClick={() => router.push(`/komunitas?topicId=${t.id}&fromSub=${encodeURIComponent(sub)}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{t.title}</div>
                    <div className="text-xs text-gray-500">by {t.author}</div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>{t.posts} posts • {t.views} views</div>
                    <div>
                      Terakhir dibalas oleh <span className="text-blue-600">{t.lastUser}</span>
                    </div>
                    <div>{t.lastReply}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => router.push('/komunitas')}
            className="mt-6 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            ← Kembali ke semua kategori
          </button>
        </div>
      </div>
    );
  }

  // Main view (no sub or topicId parameter)
  return (
    <div className="min-h-screen bg-gray-100">
      <ThreeScene />
      <div className="relative z-10 w-full p-6">
        <div className="max-w-7xl mx-auto">
          <Command className="mb-8 max-w-2xl mx-auto">
            <CommandInput 
              className="h-12 text-base" 
              placeholder="Cari topik pembelajaran..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/komunitas?search=${encodeURIComponent(e.currentTarget.value)}`);
                }
              }}
            />
          </Command>
          
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Popular Topics Sidebar */}
            <div className="w-full lg:w-80 lg:min-w-[20rem]">
              <Card className="p-6 sticky top-6">
                <CardTitle className="mb-6 text-xl text-gray-900">📈 Topik Populer</CardTitle>
                <div className="flex flex-col gap-4">
                  {topikViews.map((topik, i) => (
                    <div 
                      key={topik.title} 
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border-l-4 border-blue-100 hover:border-blue-400"
                      onClick={() => router.push(`/komunitas?sub=${encodeURIComponent(topik.firstWord)}`)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {i + 1}
                        </span>
                        <span className="text-gray-900 font-medium">
                          {topik.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {topik.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Categories Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materi.map((mat) => (
                  <Card key={mat.title} className="p-6 h-full group hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {mat.title.charAt(0)}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                          {mat.title}
                        </CardTitle>
                      </div>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                        {mat.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mat.subs.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => router.push(`/komunitas?sub=${encodeURIComponent(sub)}`)}
                            className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors text-sm border border-blue-200 hover:border-blue-300"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}