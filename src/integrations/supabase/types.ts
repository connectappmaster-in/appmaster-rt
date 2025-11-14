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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      asset_transactions: {
        Row: {
          amount: number
          asset_id: string
          created_at: string
          id: string
          transaction_date: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
        }
        Insert: {
          amount: number
          asset_id: string
          created_at?: string
          id?: string
          transaction_date: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
        }
        Update: {
          amount?: number
          asset_id?: string
          created_at?: string
          id?: string
          transaction_date?: string
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "asset_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          additional_depreciation_eligible: boolean | null
          applicable_law: Database["public"]["Enums"]["applicable_law"]
          asset_category: string
          asset_name: string
          created_at: string
          depreciation_method: Database["public"]["Enums"]["depreciation_method"]
          depreciation_rate: number
          id: string
          multi_shift_use: number | null
          original_cost: number
          purchase_date: string
          residual_value_pct: number | null
          updated_at: string
          useful_life: number
          user_id: string
        }
        Insert: {
          additional_depreciation_eligible?: boolean | null
          applicable_law: Database["public"]["Enums"]["applicable_law"]
          asset_category: string
          asset_name: string
          created_at?: string
          depreciation_method: Database["public"]["Enums"]["depreciation_method"]
          depreciation_rate: number
          id?: string
          multi_shift_use?: number | null
          original_cost: number
          purchase_date: string
          residual_value_pct?: number | null
          updated_at?: string
          useful_life: number
          user_id: string
        }
        Update: {
          additional_depreciation_eligible?: boolean | null
          applicable_law?: Database["public"]["Enums"]["applicable_law"]
          asset_category?: string
          asset_name?: string
          created_at?: string
          depreciation_method?: Database["public"]["Enums"]["depreciation_method"]
          depreciation_rate?: number
          id?: string
          multi_shift_use?: number | null
          original_cost?: number
          purchase_date?: string
          residual_value_pct?: number | null
          updated_at?: string
          useful_life?: number
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      depreciation_schedules: {
        Row: {
          accumulated_depreciation: number
          additional_depreciation: number | null
          additions: number | null
          asset_id: string
          closing_value: number
          created_at: string
          depreciation: number
          disposals: number | null
          financial_year: string
          id: string
          opening_value: number
          year_number: number
        }
        Insert: {
          accumulated_depreciation: number
          additional_depreciation?: number | null
          additions?: number | null
          asset_id: string
          closing_value: number
          created_at?: string
          depreciation: number
          disposals?: number | null
          financial_year: string
          id?: string
          opening_value: number
          year_number: number
        }
        Update: {
          accumulated_depreciation?: number
          additional_depreciation?: number | null
          additions?: number | null
          asset_id?: string
          closing_value?: number
          created_at?: string
          depreciation?: number
          disposals?: number | null
          financial_year?: string
          id?: string
          opening_value?: number
          year_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "depreciation_schedules_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_save_interval: number | null
          company_address: string | null
          company_logo_url: string | null
          company_name: string | null
          created_at: string
          currency_symbol: string | null
          default_depreciation_method:
            | Database["public"]["Enums"]["depreciation_method"]
            | null
          default_residual_value_pct: number | null
          enable_additional_depreciation: boolean | null
          enable_multi_shift: boolean | null
          fy_start_day: number | null
          fy_start_month: number | null
          id: string
          theme_mode: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_save_interval?: number | null
          company_address?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          created_at?: string
          currency_symbol?: string | null
          default_depreciation_method?:
            | Database["public"]["Enums"]["depreciation_method"]
            | null
          default_residual_value_pct?: number | null
          enable_additional_depreciation?: boolean | null
          enable_multi_shift?: boolean | null
          fy_start_day?: number | null
          fy_start_month?: number | null
          id?: string
          theme_mode?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_save_interval?: number | null
          company_address?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          created_at?: string
          currency_symbol?: string | null
          default_depreciation_method?:
            | Database["public"]["Enums"]["depreciation_method"]
            | null
          default_residual_value_pct?: number | null
          enable_additional_depreciation?: boolean | null
          enable_multi_shift?: boolean | null
          fy_start_day?: number | null
          fy_start_month?: number | null
          id?: string
          theme_mode?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
    }
    Enums: {
      applicable_law: "Companies Act" | "Income Tax Act" | "Both"
      depreciation_method: "SLM" | "WDV"
      transaction_type: "Addition" | "Disposal"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      applicable_law: ["Companies Act", "Income Tax Act", "Both"],
      depreciation_method: ["SLM", "WDV"],
      transaction_type: ["Addition", "Disposal"],
    },
  },
} as const
