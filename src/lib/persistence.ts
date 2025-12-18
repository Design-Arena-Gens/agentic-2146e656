import { getSupabaseClient } from "./supabase";
import type { ForgeBlueprint } from "./types";

const TABLE = "forge_blueprints";

export const persistBlueprint = async (blueprint: ForgeBlueprint) => {
  const client = getSupabaseClient();
  if (!client) return { persisted: false };

  try {
    const { error } = await client.from(TABLE).insert({
      blueprint,
      brand_name: blueprint.brief.brandName,
      industry: blueprint.architect.industry,
      created_at: blueprint.createdAt,
    });

    if (error) {
      console.warn("Supabase insert failed", error);
      return { persisted: false };
    }

    return { persisted: true };
  } catch (error) {
    console.warn("Supabase persistence error", error);
    return { persisted: false };
  }
};
