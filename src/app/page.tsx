import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect('/dashboard');

  return (
    <main className="flex flex-col gap-6 justify-center items-center text-center h-full max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold">Invoice Generator</h1>
      <Button asChild>
        <Link href="/dashboard">Sign In</Link>
      </Button>
    </main>
  );
}
