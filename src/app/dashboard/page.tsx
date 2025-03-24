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

function Dashboard() {
  return (
    <main className="flex flex-col gap-6 justify-center my-16 max-w-6xl mx-auto">
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
            <TableHead className="w-[100px] text-left p-4">Date</TableHead>
            <TableHead className="text-left p-4">Customer</TableHead>
            <TableHead className="text-left p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left p-4">
              <span className="font-semibold">10/31/2024</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="font-semibold">James Fry</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="">fry@gmail.com</span>
            </TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="text-right p-4">
              <span className="">$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}

export default Dashboard;
