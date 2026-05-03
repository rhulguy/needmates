import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { mockCategories } from '@/data/mockCategories';
import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  type: z.enum(['need', 'offer', 'group', 'recommend', 'lend', 'connect']),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateNeedPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'need',
      category: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Submitting:", data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AppShell>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border-4 border-emerald-500 rounded-3xl p-12 max-w-lg w-full text-center shadow-2xl"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            <h1 className="text-4xl font-black mb-4">You're Live!</h1>
            <p className="text-xl text-muted-foreground mb-8">Your post is now visible to the local community. We'll notify you when someone responds.</p>
            <Link href="/feed">
              <Button size="lg" className="w-full text-lg h-16 rounded-2xl">
                See it in the Feed
              </Button>
            </Link>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-black mb-2">Post what you need</h1>
        <p className="text-xl text-muted-foreground mb-10">Turn your local problem into a community solution.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card border-2 border-border p-8 rounded-3xl shadow-sm">
          
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">What kind of post is this?</label>
            <Select {...register('type')}>
              <option value="need">I need something (Wanted)</option>
              <option value="offer">I can help with something (Offer)</option>
              <option value="group">Let's get a group together (Group Buy)</option>
              <option value="recommend">I need a recommendation</option>
              <option value="lend">I have something to lend</option>
              <option value="connect">I want to meet people (Connect)</option>
            </Select>
            {errors.type && <p className="text-destructive text-sm font-semibold">{errors.type.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Headline</label>
            <Input 
              {...register('title')} 
              placeholder="e.g. Who else wants a reliable window cleaner?" 
              className="text-lg h-14"
            />
            {errors.title && <p className="text-destructive text-sm font-semibold">{errors.title.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
            <Select {...register('category')}>
              <option value="">Select a category</option>
              {mockCategories.map(cat => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
              ))}
            </Select>
            {errors.category && <p className="text-destructive text-sm font-semibold">{errors.category.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">The Details</label>
            <Textarea 
              {...register('description')} 
              placeholder="Explain what you need, why, and any specific requirements. The more detail, the better the response."
              className="min-h-[150px] text-base"
            />
            {errors.description && <p className="text-destructive text-sm font-semibold">{errors.description.message}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full text-lg h-16 rounded-2xl" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post to Neighbourhood"}
          </Button>

        </form>
      </div>
    </AppShell>
  );
}
