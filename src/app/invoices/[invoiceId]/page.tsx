import { auth } from '@clerk/nextjs/server';
import { and, eq, isNull } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { db } from '@/db';
import { Customers, Invoices } from '@/db/schema';
import Invoice from '@/components/Invoice';

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { userId, orgId } = await auth();

  if (!userId) return;

  const { invoiceId } = await params;

  if (isNaN(parseInt(invoiceId))) {
    throw new Error('Invalid Invoice ID');
  }

  let result: {
    invoices: typeof Invoices.$inferSelect;
    customers: typeof Customers.$inferSelect;
  }[];

  if (orgId) {
    result = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, parseInt(invoiceId)),
          eq(Invoices.organizationId, orgId)
        )
      )
      .limit(1);
  } else {
    result = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, parseInt(invoiceId)),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!result) notFound();

  const invoice = {
    ...result[0].invoices,
    customer: result[0].customers,
  };

  return <Invoice invoice={invoice} />;
}
