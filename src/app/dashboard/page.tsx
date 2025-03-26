import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';

import { db } from '@/db';
import { and, eq, isNull } from 'drizzle-orm';
import { Customers, Invoices } from '@/db/schema';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

async function Dashboard() {
  const { userId, orgId } = await auth();

  if (!userId) return;

  let results: {
    invoices: typeof Invoices.$inferSelect;
    customers: typeof Customers.$inferSelect;
  }[];

  if (orgId) {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(eq(Invoices.organizationId, orgId));
  } else {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(and(eq(Invoices.userId, userId), isNull(Invoices.organizationId)));
  }

  const invoices = results?.map(({ invoices, customers }) => {
    return {
      ...invoices,
      customer: customers,
    };
  });

  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto mt-10">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-left">Invoices</h1>
        <Button asChild variant="ghost">
          <Link href="/invoices/new">
            Create invoice <CirclePlus />
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(result => {
            return (
              <TableRow key={result.id}>
                <TableCell className="font-medium text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block p-4 font-semibold"
                  >
                    {new Date(result.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block p-4 font-semibold"
                  >
                    {result.customer.name}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link className="block p-4" href={`/invoices/${result.id}`}>
                    {result.customer.email}
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link className="block p-4" href={`/invoices/${result.id}`}>
                    <Badge
                      className={cn(
                        'rounded-full capitalize',
                        result.status === 'open' && 'bg-blue-500',
                        result.status === 'paid' && 'bg-green-600',
                        result.status === 'void' && 'bg-zinc-700',
                        result.status === 'uncollectible' && 'bg-red-600'
                      )}
                    >
                      {result.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block p-4 font-semibold"
                  >
                    ${(result.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

export default Dashboard;
