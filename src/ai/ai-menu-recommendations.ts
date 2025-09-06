// src/ai/ai-menu-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized dish recommendations based on user preferences,
 * culinary trends, and real-time data.
 *
 * - getMenuRecommendations - A function that returns personalized menu recommendations.
 * - MenuRecommendationsInput - The input type for the getMenuRecommendations function.
 * - MenuRecommendationsOutput - The return type for the getMenuRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MenuRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user\u0027s dietary preferences, allergies, and favorite cuisines.'),
  culinaryTrends: z
    .string()
    .describe('Current culinary trends and popular dishes.'),
  realTimeData: z
    .string()
    .describe(
      'Real-time data such as the season, local ingredient availability, and time of day.'
    ),
});
export type MenuRecommendationsInput = z.infer<typeof MenuRecommendationsInputSchema>;

const MenuRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized dish recommendations based on the input data.'),
});
export type MenuRecommendationsOutput = z.infer<typeof MenuRecommendationsOutputSchema>;

export async function getMenuRecommendations(input: MenuRecommendationsInput): Promise<MenuRecommendationsOutput> {
  return menuRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'menuRecommendationsPrompt',
  input: {schema: MenuRecommendationsInputSchema},
  output: {schema: MenuRecommendationsOutputSchema},
  prompt: `You are a world-class chef specializing in creating personalized menu recommendations.

  Based on the user's preferences, current culinary trends, and real-time data, provide a list of dish recommendations.

  User Preferences: {{{userPreferences}}}
  Culinary Trends: {{{culinaryTrends}}}
  Real-Time Data: {{{realTimeData}}}

  Provide the recommendations in a concise and appealing manner.
  `,
});

const menuRecommendationsFlow = ai.defineFlow(
  {
    name: 'menuRecommendationsFlow',
    inputSchema: MenuRecommendationsInputSchema,
    outputSchema: MenuRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
