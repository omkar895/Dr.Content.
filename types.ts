export enum Platform {
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  YouTube = 'YouTube',
  Blog = 'Blog'
}

export enum Tone {
  Professional = 'Professional',
  Casual = 'Casual',
  Storytelling = 'Storytelling',
  Informative = 'Informative',
  Witty = 'Witty',
  Urgent = 'Urgent'
}

export interface ContentRequest {
  topic: string;
  platform: Platform;
  audience: string;
  tone: Tone;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  result: string | null;
}