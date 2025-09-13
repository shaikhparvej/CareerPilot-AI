
import { config } from 'dotenv';
config({ path: '.env.local' });



import '@/ai/flows/grammar-check.ts';
import '@/ai/flows/topic-query-flow.ts';
import '@/ai/flows/validate-topic-flow.ts';
import '@/ai/flows/extempore-topic-flow.ts';

