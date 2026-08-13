import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Evolution from '../components/Evolution';
import Stack from '../components/Stack';
import BuildWithAI from '../components/BuildWithAI';
import Cohorts from '../components/Cohorts';
import BuilderOfTheCohort from '../components/BuilderOfTheCohort';
import WhyTuringWings from '../components/WhyTuringWings';
import Footer from '../components/Footer';
import ReferralEmailModal from '../components/ReferralEmailModal';
import { referralService } from '../services/referral';
import { setReferralCode, isEmailCaptured } from '../utils/referralStorage';

export default function ReferralHandlerPage() {
  const { creatorCode } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validatedCode, setValidatedCode] = useState('');

  useEffect(() => {
    async function handleReferral() {
      if (!creatorCode) return;

      const code = creatorCode.trim().toUpperCase();

      try {
        const response = await referralService.validateCreator(code);

        if (response.success || response.data?.valid) {
          const creatorName = response.data?.creatorName || '';
          setReferralCode(code, creatorName);
          setValidatedCode(code);

          // Trigger email popup if email has not been captured yet
          if (!isEmailCaptured()) {
            setIsModalOpen(true);
          }
        }
      } catch (err) {
        console.warn('[ReferralHandlerPage] Invalid creator code:', err);
        // Fallback: still preserve referral code if backend offline/dev mode
        setReferralCode(code);
        setValidatedCode(code);
        if (!isEmailCaptured()) {
          setIsModalOpen(true);
        }
      }
    }

    handleReferral();
  }, [creatorCode]);

  return (
    <main className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#22C55E] selection:text-black relative">
      <Navbar />
      <Hero />
      <Evolution />
      <Stack />
      <BuildWithAI />
      <Cohorts />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BuilderOfTheCohort />
      </div>
      <WhyTuringWings />
      <Footer />

      {/* Referral Email Capture Modal */}
      <ReferralEmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        creatorCode={validatedCode || creatorCode}
      />
    </main>
  );
}
