export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          created_at: string
          slug: string
          category: string
          date: string
          author: string
          intro: string
          verdict: string
          winner: number | null
          car1_name: string
          car1_image: string
          car1_price: string
          car1_motor: string
          car1_effekt: string
          car1_acceleration: string
          car1_rackvidd: string
          car1_bagageutrymme: string
          car1_pros: string[]
          car1_cons: string[]
          car2_name: string
          car2_image: string
          car2_price: string
          car2_motor: string
          car2_effekt: string
          car2_acceleration: string
          car2_rackvidd: string
          car2_bagageutrymme: string
          car2_pros: string[]
          car2_cons: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          slug: string
          category: string
          date: string
          author: string
          intro: string
          verdict: string
          winner?: number | null
          car1_name: string
          car1_image: string
          car1_price: string
          car1_motor: string
          car1_effekt: string
          car1_acceleration: string
          car1_rackvidd: string
          car1_bagageutrymme: string
          car1_pros: string[]
          car1_cons: string[]
          car2_name: string
          car2_image: string
          car2_price: string
          car2_motor: string
          car2_effekt: string
          car2_acceleration: string
          car2_rackvidd: string
          car2_bagageutrymme: string
          car2_pros: string[]
          car2_cons: string[]
        }
        Update: {
          id?: string
          created_at?: string
          slug?: string
          category?: string
          date?: string
          author?: string
          intro?: string
          verdict?: string
          winner?: number | null
          car1_name?: string
          car1_image?: string
          car1_price?: string
          car1_motor?: string
          car1_effekt?: string
          car1_acceleration?: string
          car1_rackvidd?: string
          car1_bagageutrymme?: string
          car1_pros?: string[]
          car1_cons?: string[]
          car2_name?: string
          car2_image?: string
          car2_price?: string
          car2_motor?: string
          car2_effekt?: string
          car2_acceleration?: string
          car2_rackvidd?: string
          car2_bagageutrymme?: string
          car2_pros?: string[]
          car2_cons?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
