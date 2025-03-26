'use client';

import { SignIn } from '@clerk/nextjs';
import Container from '@/components/Container';
import { AnimatePresence, motion } from 'framer-motion';

export default function SignInPage() {
  return (
    <AnimatePresence>
      <motion.div transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}>
        <Container className="flex justify-center">
          <SignIn />
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}
