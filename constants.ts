import { Platform, Tone } from './types';

export const PLATFORMS = [
  { value: Platform.LinkedIn, label: 'LinkedIn', icon: '💼', color: 'text-blue-700' },
  { value: Platform.Instagram, label: 'Instagram', icon: '📸', color: 'text-pink-600' },
  { value: Platform.Twitter, label: 'Twitter (X)', icon: '🐦', color: 'text-sky-500' },
  { value: Platform.YouTube, label: 'YouTube Description', icon: '🎥', color: 'text-red-600' },
  { value: Platform.Blog, label: 'Blog Post Outline', icon: '📝', color: 'text-orange-600' },
];

export const TONES = [
  { value: Tone.Professional, label: 'Professional' },
  { value: Tone.Casual, label: 'Casual' },
  { value: Tone.Storytelling, label: 'Storytelling' },
  { value: Tone.Informative, label: 'Informative' },
  { value: Tone.Witty, label: 'Witty' },
  { value: Tone.Urgent, label: 'Urgent' },
];

export const SYSTEM_INSTRUCTION = `You are an expert digital marketing strategist and content optimization specialist.
Generate highly engaging, platform-optimized content with strong hooks,
clear structure, and high engagement potential.

Your output must be strictly formatted in Markdown.
Ensure you include the following sections exactly as headers:

## Hook
## Main Content
## Hashtags
## Call To Action
## SEO Keywords
## Best Posting Strategy
## Repurpose Suggestions
`;