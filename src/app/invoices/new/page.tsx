'use client';

import Form from 'next/form';
import { type SyntheticEvent, useState } from 'react';
import { createAction } from '@/actions/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import SubmitButton from '@/components/SubmitButton';
import Container from '@/components/Container';

function CreateInvoice() {
  const [state, setState] = useState('ready');

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault();
      return;
    }
    setState('pending');
  }

  return (
    <main className="h-full">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center mt-10">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
          <Form
            action={createAction}
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <div>
              <Label
                htmlFor="name"
                className="block font-semibold text-sm mb-2"
              >
                Billing Name
              </Label>
              <Input id="name" name="name" type="text" />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block font-semibold text-sm mb-2"
              >
                Billing Email
              </Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div>
              <Label
                htmlFor="value"
                className="block font-semibold text-sm mb-2"
              >
                Value
              </Label>
              <Input id="value" name="value" type="text" />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="block font-semibold text-sm mb-2"
              >
                Description
              </Label>
              <Textarea id="description" name="description" />
            </div>
            <div>
              <SubmitButton />
            </div>
          </Form>
        </div>
      </Container>
    </main>
  );
}

export default CreateInvoice;
