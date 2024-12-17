// Atualizar tipos existentes
export interface Database {
  public: {
    Tables: {
      // ... tipos existentes ...
      favorites: {
        Row: {
          id: number;
          user_id: string;
          devotional_day: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          devotional_day: number;
          created_at?: string;
        };
      };
      notes: {
        Row: {
          id: number;
          user_id: string;
          devotional_day: number;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          devotional_day: number;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reading_history: {
        Row: {
          id: number;
          user_id: string;
          devotional_day: number;
          read_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          devotional_day: number;
          read_at?: string;
        };
      };
    };
  };
}