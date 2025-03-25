import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col gap-6 justify-center items-center text-center h-full max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold">Invoice Generator</h1>
      <Button asChild>
        <Link href="/dashboard">Sign In</Link>
      </Button>
    </main>
  );
}
