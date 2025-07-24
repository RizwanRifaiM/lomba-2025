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
    camera.position.z = 15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.3);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff88, 0.6, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Create central interactive model
    const centralGeometry = new THREE.IcosahedronGeometry(2, 1);
    const centralMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ff88,
      wireframe: false,
      transparent: true,
      opacity: 0.8
    });
    const centralModel = new THREE.Mesh(centralGeometry, centralMaterial);
    scene.add(centralModel);

    // Create scattered models
    const geometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.6),
      new THREE.DodecahedronGeometry(0.4),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.SphereGeometry(0.5, 8, 6)
    ];

    const colors = [0x00ff88, 0xff0088, 0x0088ff, 0xff8800, 0x8800ff];

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshPhongMaterial({ 
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6
      });
      const model = new THREE.Mesh(geometry, material);
      
      model.position.x = (Math.random() - 0.5) * 30;
      model.position.y = (Math.random() - 0.5) * 20;
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

      // Rotate central model based on mouse
      centralModel.rotation.x += 0.01 + mouseRef.current.y * 0.01;
      centralModel.rotation.y += 0.01 + mouseRef.current.x * 0.01;

      // Animate scattered models
      modelsRef.current.forEach((model, index) => {
        model.rotation.x += 0.005 * (index % 2 === 0 ? 1 : -1);
        model.rotation.y += 0.005 * (index % 3 === 0 ? 1 : -1);
        model.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      // Camera subtle movement
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y * 1 - camera.position.y) * 0.05;
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
  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-30"/>;
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
        <div className="min-h-screen bg-black text-white">
          <ThreeScene />
          <div className="relative z-10 max-w-4xl mx-auto pt-10 px-4">
            <Card className="p-4 bg-gray-900 border-gray-800">
              <CardTitle>Topik tidak ditemukan</CardTitle>
              <button 
                onClick={() => router.push('/komunitas')}
                className="mt-4 text-green-400 hover:text-green-300 transition-colors"
              >
                Kembali ke halaman utama
              </button>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <ThreeScene />
        <div className="relative z-10 max-w-4xl mx-auto pt-10 px-4">
          <Card className="mb-6 p-4 bg-gray-900 border-gray-800">
            <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
            <div className="text-sm text-gray-400">
              Dibuat oleh {topic.author} • {topic.views} views • {topic.posts} posts
            </div>
          </Card>
          
          <Card className="p-4 mb-4 bg-gray-900 border-gray-800">
            <div>Isi diskusi akan muncul di sini</div>
          </Card>
          
          <button 
            onClick={() => router.push(`/komunitas?sub=${searchParams.get('fromSub') || ''}`)}
            className="text-green-400 hover:text-green-300 transition-colors"
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
      <div className="min-h-screen bg-black text-white">
        <ThreeScene />
        <div className="relative z-10 max-w-4xl mx-auto pt-10 px-4">
          <Card className="mb-6 p-4">
            <CardTitle className="text-2xl mb-1">{decodedSub}</CardTitle>
            <span className="text-gray-400 text-base">
              {deskripsi[decodedSub] || `Diskusi dan saran seputar ${decodedSub}.`}
            </span>
          </Card>
          
          <div className="mb-2 flex justify-between items-center">
            <span className="font-semibold text-lg">Topik</span>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
              onClick={() => router.push('/komunitas/buat-topik')}
            >
              + Topik Baru
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {topik.map((t) => (
              <div 
                key={t.id}
                className="w-full p-4 border border-gray-700 rounded-lg hover:border-green-400 cursor-pointer transition-colors bg-gray-900/50"
                onClick={() => router.push(`/komunitas?topicId=${t.id}&fromSub=${encodeURIComponent(sub)}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-xs text-gray-400">by {t.author}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div>{t.posts} posts • {t.views} views</div>
                    <div className="text-gray-400">
                      Terakhir dibalas oleh <span className="text-green-400">{t.lastUser}</span>
                    </div>
                    <div>{t.lastReply}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => router.push('/komunitas')}
            className="mt-4 text-green-400 hover:text-green-300 transition-colors"
          >
            ← Kembali ke semua kategori
          </button>
        </div>
      </div>
    );
  }
 return (
  <div className="min-h-screen bg-black text-white">
    <ThreeScene />
    <div className="relative z-10 w-full p-6 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-2"> Forum Miaceh</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-6">


          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Tag Pilihan</h2>
            <div className="space-y-2">
              <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full inline-block mr-2">#frontend</div>
              <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full inline-block mr-2">#backend</div>
              <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full inline-block mr-2">#php</div>
              <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full inline-block">#javascript</div>
            </div>
          </Card>
          
          {/* User Teraktif Section */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">User Teraktif Hari ini</h2>
            <p className="text-gray-400 text-sm mb-3">Dihitung berdasarkan point belajar</p>
            <div className="space-y-3">
              {[
                "Hamiz Ghani",
                "Zenni Habibie",
                "Mulyo Anjang Jaya Kusuma",
                "Gabriella Apriliana",
                "Rudianto",
                "RIDHA ZULFAHMI"
              ].map((user, index) => (
                <div key={user} className="flex items-center gap-3">
                  <span className="text-green-400 w-6">{index + 1}</span>
                  <span>{user}</span>
                </div>
              ))}
              <div className="text-gray-400 text-sm">23/07/2023</div>
            </div>
          </Card>
        </div>
        
        <div className="flex-1 space-y-6">
  <Card className="p-4">
    <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold mb-4">Diskusi Terbaru</h2>

    <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition w-50 ml-12">
      + Tambah Kategori
    </button>
    </div>

  

    <div className="space-y-4">
      <div className="border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-1"><a href="/komunitas/1">Panduan menu Kelas</a></h3>
        <p className="text-gray-400 text-sm mb-2">
          Oleh Muhammad Aabid Asaduddin, 2 jam yang lalu, di room KelasFullstack
        </p>
        <p className="text-gray-300">
          230 topik • 1.234.567 views • 23/07/2025        </p>
      </div>

      <div className="border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-1"> <a href="/komunitas/1">Masukan dan saran</a></h3>
        <p className="text-gray-400 text-sm mb-2">
          Oleh Marcellinus Arlo Xavier Saputra, 7 jam yang lalu
        </p>
        <p className="text-gray-300">
            190 topik • 1.234.567 views • 23/07/2025
        </p>
      </div>
    </div>
  </Card>
</div>

      </div>
    </div>
  </div>
);
}