import Container from '@/components/Container';
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="font-bold">
              <Link href="/dashboard">Invoice Generator</Link>
            </p>
            <span className="text-slate-300">/</span>
            <SignedIn>
              <span className="-ml-2">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </span>
            </SignedIn>
          </div>
          <div className="flex gap-6 items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
