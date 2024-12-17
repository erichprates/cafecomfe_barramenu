export interface Interaction {
  id: number;
  likes: number;
  shares: number;
  created_at?: string | null;
}

export type InteractionResponse = {
  data: Interaction | null;
  error: any;
}