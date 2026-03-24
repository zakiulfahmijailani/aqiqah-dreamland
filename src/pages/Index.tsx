import React, { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CoverSection from '@/components/CoverSection';
import BabyNamesSection from '@/components/BabyNamesSection';
import EventDetailsSection from '@/components/EventDetailsSection';
import MapsSection from '@/components/MapsSection';
import RSVPSection from '@/components/RSVPSection';
import BismillahCalligraphy from '@/components/BismillahCalligraphy';
import { MuslimBabyBoy, BabyQuran, FloatingBalloons } from '@/components/BabyIllustrations';
import MusicPlayer from '@/components/MusicPlayer';
import WishesSection from '@/components/WishesSection';
import ClosingSection from '@/components/ClosingSection';
import WaveDivider from '@/components/WaveDivider';

export default function Index() {
  const [coverOpen, setCoverOpen] = useState(false);

  return (
    <>
      <AnimatedBackground />
      {coverOpen && <ScrollProgressBar />}

      <CoverSection onOpen={() => setCoverOpen(true)} />

      {/* Main content — visible after cover opens */}
      <main className="relative z-10">
        <section
          className="px-6 py-20 text-center relative z-10"
          style={{ background: 'linear-gradient(135deg, #FFF5F7, #F0FFF4)' }}
        >
          {/* Bismillah Calligraphy */}
          <BismillahCalligraphy size="lg" color="#735c00" className="mb-8" />

          {/* Baby Illustrations */}
          <div className="flex justify-center items-end gap-6 my-6 opacity-70">
            <FloatingBalloons size={60} delay={0} />
            <MuslimBabyBoy size={80} delay={0.4} />
            <BabyQuran size={55} delay={0.8} />
          </div>

          {/* Hadith */}
          <blockquote className="italic text-gray-500 text-sm md:text-base mb-8 max-w-md mx-auto">
            &ldquo;Setiap anak tergadai dengan aqiqahnya.&rdquo;
            <br />
            <span className="text-xs not-italic">— HR. Ahmad, Abu Dawud, At-Tirmidzi</span>
          </blockquote>

          {/* Main text */}
          <div className="max-w-xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
            <p>
              Dengan penuh rasa syukur kehadirat Allah Subhanahu wa Ta&apos;ala
              atas segala nikmat dan karunia-Nya, kami mengumumkan
              dengan penuh kebahagiaan kelahiran putra kami.
            </p>
            <p>
              Sebagai wujud syukur dan mengikuti sunnah Rasulullah ﷺ,
              kami akan menyelenggarakan syukuran Aqiqah untuk
              putra tercinta kami.
            </p>
            <p>
              Dengan rendah hati, kami mengundang Bapak/Ibu/Saudara/i
              untuk hadir memberikan doa restu.
              Kehadiran dan doa Anda adalah kebahagiaan terbesar bagi kami.
            </p>
          </div>
        </section>

        <section><BabyNamesSection /></section>
        <WaveDivider fillColor="#FFF8E7" variant="sine" />
        <section><EventDetailsSection /></section>
        <WaveDivider fillColor="#E8F8FF" variant="hill" />
        <section><MapsSection /></section>
        <WaveDivider fillColor="#e8f5f0" variant="double" />
        <section><RSVPSection /></section>
        <WaveDivider fillColor="#F5F0FF" variant="sine" />
        <section><WishesSection /></section>
        <WaveDivider fillColor="#FFF5F7" variant="hill" />
        <section><ClosingSection /></section>
      </main>

      {/* Music player FAB */}
      {coverOpen && <MusicPlayer />}
    </>
  );
}
