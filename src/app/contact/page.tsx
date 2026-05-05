'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { submitContact } from '@/lib/api'; // ✅ IMPORT ADDED

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // ✅ LOADING STATE

  const image = PlaceHolderImages.find((img) => img.id === 'contact_hero');
  const imageUrl =
    image?.imageUrl || 'https://picsum.photos/seed/contact/1200/600';
  const imageHint = image?.imageHint || 'contact abstract';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // ✅ UPDATED SUBMIT FUNCTION
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const res = await submitContact(values);

      toast({
        title: 'Message Sent!',
        description:
          res?.message ||
          "Thanks for reaching out. We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error(error);

      toast({
        title: 'Error',
        description: 'Failed to send message. Try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <Button asChild variant="ghost" className="mb-8 -ml-4 rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </Button>

            <div className="bg-card p-4 sm:p-6 md:p-12 rounded-3xl shadow-lg">

              <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline mb-4 leading-tight">
                  Contact Us
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Have a question or want to work with us? Drop us a message.
                </p>
              </header>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                <Image
                  src={imageUrl}
                  alt="Contact Us"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="text-center -mt-8 mb-12">
                <span className="inline-block bg-secondary text-secondary-foreground/80 text-xs px-3 py-1 rounded-full">
                  Image Credit: Unsplash
                </span>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what's on your mind..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="
                        rounded-full 
                        bg-[#DBDBDB] 
                        text-black 
                        hover:bg-[#EC1B25] 
                        hover:text-white 
                        transition-all 
                        duration-300 
                        ease-out 
                        transform 
                        hover:scale-105
                        active:scale-95
                      "
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                </form>
              </Form>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}