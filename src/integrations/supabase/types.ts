export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      articulos: {
        Row: {
          archivado: boolean
          categoria: string
          created_at: string
          data: Json
          estado: string
          fecha: string
          id: string
          orden: number
          slug: string
          titulo: string
          updated_at: string
        }
        Insert: {
          archivado?: boolean
          categoria?: string
          created_at?: string
          data?: Json
          estado?: string
          fecha?: string
          id?: string
          orden?: number
          slug: string
          titulo: string
          updated_at?: string
        }
        Update: {
          archivado?: boolean
          categoria?: string
          created_at?: string
          data?: Json
          estado?: string
          fecha?: string
          id?: string
          orden?: number
          slug?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      desarrollos: {
        Row: {
          archivado: boolean
          created_at: string
          data: Json
          destacado: boolean
          estado: string
          id: string
          nombre: string
          orden: number
          slug: string
          updated_at: string
        }
        Insert: {
          archivado?: boolean
          created_at?: string
          data?: Json
          destacado?: boolean
          estado?: string
          id?: string
          nombre: string
          orden?: number
          slug: string
          updated_at?: string
        }
        Update: {
          archivado?: boolean
          created_at?: string
          data?: Json
          destacado?: boolean
          estado?: string
          id?: string
          nombre?: string
          orden?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      estilo_vida: {
        Row: {
          archivado: boolean
          created_at: string
          fuente: string | null
          id: string
          imagen: string | null
          orden: number
          texto: string | null
          titulo: string
          updated_at: string
          url: string
        }
        Insert: {
          archivado?: boolean
          created_at?: string
          fuente?: string | null
          id?: string
          imagen?: string | null
          orden?: number
          texto?: string | null
          titulo: string
          updated_at?: string
          url: string
        }
        Update: {
          archivado?: boolean
          created_at?: string
          fuente?: string | null
          id?: string
          imagen?: string | null
          orden?: number
          texto?: string | null
          titulo?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activo: boolean
          created_at: string
          email: string
          id: string
          nombre: string | null
        }
        Insert: {
          activo?: boolean
          created_at?: string
          email: string
          id: string
          nombre?: string | null
        }
        Update: {
          activo?: boolean
          created_at?: string
          email?: string
          id?: string
          nombre?: string | null
        }
        Relationships: []
      }
      propiedades: {
        Row: {
          archivada: boolean
          categoria: string
          created_at: string
          data: Json
          desarrollo_id: string | null
          destacada: boolean
          estado: string
          id: string
          nombre: string
          orden: number
          slug: string
          updated_at: string
        }
        Insert: {
          archivada?: boolean
          categoria: string
          created_at?: string
          data?: Json
          desarrollo_id?: string | null
          destacada?: boolean
          estado?: string
          id?: string
          nombre: string
          orden?: number
          slug: string
          updated_at?: string
        }
        Update: {
          archivada?: boolean
          categoria?: string
          created_at?: string
          data?: Json
          desarrollo_id?: string | null
          destacada?: boolean
          estado?: string
          id?: string
          nombre?: string
          orden?: number
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "propiedades_desarrollo_fk"
            columns: ["desarrollo_id"]
            isOneToOne: false
            referencedRelation: "desarrollos"
            referencedColumns: ["id"]
          },
        ]
      }
      site_content: {
        Row: {
          data: Json
          key: string
          updated_at: string
        }
        Insert: {
          data?: Json
          key: string
          updated_at?: string
        }
        Update: {
          data?: Json
          key?: string
          updated_at?: string
        }
        Relationships: []
      }
      suscriptores: {
        Row: {
          created_at: string
          email: string
          id: string
          origen: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          origen?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          origen?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          archivado: boolean
          created_at: string
          duracion: string | null
          fecha: string | null
          id: string
          orden: number
          titulo: string
          updated_at: string
          youtube_id: string
        }
        Insert: {
          archivado?: boolean
          created_at?: string
          duracion?: string | null
          fecha?: string | null
          id?: string
          orden?: number
          titulo: string
          updated_at?: string
          youtube_id: string
        }
        Update: {
          archivado?: boolean
          created_at?: string
          duracion?: string | null
          fecha?: string | null
          id?: string
          orden?: number
          titulo?: string
          updated_at?: string
          youtube_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
