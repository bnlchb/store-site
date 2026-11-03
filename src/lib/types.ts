import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';

// ============================================================
// Types applicatifs (documents) — mêmes shapes qu'auparavant
// (MongoDB) pour que frontend et API restent compatibles :
// `id` et `_id` portent tous deux l'identifiant de la ligne
// (sous forme de chaîne, comme les ObjectId d'avant).
// ============================================================

export type OrderStatus =
  | 'pending'
  | 'contacted'
  | 'printed'
  | 'delivering'
  | 'delivered'
  | 'finished';

export const VALID_ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'contacted',
  'printed',
  'delivering',
  'delivered',
  'finished',
];

export interface ProductImage {
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
}

export interface Product {
  id: string;
  _id: string; // kept for backward compatibility with existing frontend code
  name: string;
  description?: string;
  price: number;
  images: ProductImage[];
  sizes: string[];
  category?: string;
  isCustomizable: boolean;
  customPrice?: number;
  isActive: boolean;
  stock?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
}

export interface SettingsDoc {
  id: string;
  _id: string;
  productPrices: Record<string, number>;
  customTextPrice: number;
  shippingFees: Record<string, number>;
  discountCodes: DiscountCode[];
  defaultCurrency: 'MAD' | 'USD';
  exchangeRate: number;
  isOrderingEnabled: boolean;
  maintenanceMode: boolean;
  contactInfo: {
    whatsappNumber?: string;
    email?: string;
    address?: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  _id: string;
  orderId: string;
  customerInfo: {
    fullName: string;
    whatsappNumber: string;
    city: string;
    isTetouan: boolean;
  };
  productDetails: {
    productId: string | Product;
    size?: string;
    isCustom: boolean;
    customText?: string;
  };
  pricing: {
    basePrice: number;
    customFee: number;
    shippingFee: number;
    totalPrice: number;
    currency: string;
    exchangeRate: number;
  };
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityText {
  id: string;
  _id: string;
  text: string;
  category: string;
  isApproved: boolean;
  submittedBy: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// Réglages par défaut (utilisés si la ligne settings est absente)
// ============================================================

export const DEFAULT_SETTINGS: SettingsDoc = {
  id: '1',
  _id: '1',
  productPrices: {},
  customTextPrice: 15,
  shippingFees: {
    'Tetouan': 0,
    'Casablanca': 25,
    'Rabat': 20,
    'Marrakech': 30,
    'Fez': 25,
    'Agadir': 35,
    'Tangier': 15,
    'Meknes': 25,
    'Oujda': 30,
    'Kenitra': 20,
    'Safi': 30,
    'Mohammedia': 25,
    'Khouribga': 25,
    'Beni Mellal': 30,
    'El Jadida': 30,
    'Taza': 25,
    'Nador': 30,
    'Settat': 25,
    'Larache': 20,
    'Ksar El Kebir': 20,
  },
  discountCodes: [
    { code: 'ENSA10', type: 'percentage', value: 10, isActive: true },
    { code: 'OFFLINE5', type: 'fixed', value: 5, isActive: true },
  ],
  defaultCurrency: 'MAD',
  exchangeRate: 10,
  isOrderingEnabled: true,
  maintenanceMode: false,
  contactInfo: {
    whatsappNumber: '+212 6XX XXX XXX',
    email: 'contact@originalfit.ma',
    address: 'Maroc',
  },
  socialMedia: {
    instagram: '@the_original_fit',
    facebook: 'Originalfit',
    twitter: '@originalfit_ma',
  },
  createdAt: '',
  updatedAt: '',
};

// ============================================================
// Row mappers : snake_case (PostgreSQL) -> documents camelCase
// ============================================================

export function mapProductRow(row: any): Product {
  const id = String(row.id);
  return {
    id,
    _id: id,
    name: row.name,
    description: row.description ?? undefined,
    price: Number(row.price),
    images: (row.images ?? []) as ProductImage[],
    sizes: (row.sizes ?? []) as string[],
    category: row.category ?? undefined,
    isCustomizable: Boolean(row.is_customizable),
    customPrice:
      row.custom_price === null || row.custom_price === undefined
        ? undefined
        : Number(row.custom_price),
    isActive: Boolean(row.is_active),
    stock: Number(row.stock ?? 0),
    tags: (row.tags ?? []) as string[],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapSettingsRow(row: any): SettingsDoc {
  return {
    id: String(row.id),
    _id: String(row.id),
    productPrices: row.product_prices ?? {},
    customTextPrice: Number(row.custom_text_price ?? 0),
    shippingFees: row.shipping_fees ?? {},
    discountCodes: row.discount_codes ?? [],
    defaultCurrency: row.default_currency ?? 'MAD',
    exchangeRate: Number(row.exchange_rate ?? 10),
    isOrderingEnabled: row.is_ordering_enabled ?? true,
    maintenanceMode: row.maintenance_mode ?? false,
    contactInfo: row.contact_info ?? {},
    socialMedia: row.social_media ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapOrderRow(row: any, productsById?: Map<string, Product>): Order {
  const id = String(row.id);
  const ci = row.customer_info ?? {};
  const pd = row.product_details ?? {};
  const pr = row.pricing ?? {};

  const productRefRaw = pd.productId ?? pd.product_id;
  const loadedProduct = productsById?.get(String(productRefRaw));

  return {
    id,
    _id: id,
    orderId: row.order_id,
    customerInfo: {
      fullName: ci.fullName ?? ci.full_name ?? '',
      whatsappNumber: ci.whatsappNumber ?? ci.whatsapp_number ?? '',
      city: ci.city ?? '',
      isTetouan: Boolean(ci.isTetouan ?? ci.is_tetouan),
    },
    productDetails: {
      productId: loadedProduct ?? (productRefRaw != null ? String(productRefRaw) : ''),
      size: pd.size ?? undefined,
      isCustom: Boolean(pd.isCustom ?? pd.is_custom),
      customText: pd.customText ?? pd.custom_text ?? undefined,
    },
    pricing: {
      basePrice: Number(pr.basePrice ?? pr.base_price ?? 0),
      customFee: Number(pr.customFee ?? pr.custom_fee ?? 0),
      shippingFee: Number(pr.shippingFee ?? pr.shipping_fee ?? 0),
      totalPrice: Number(pr.totalPrice ?? pr.total_price ?? 0),
      currency: pr.currency ?? 'MAD',
      exchangeRate: Number(pr.exchangeRate ?? pr.exchange_rate ?? 10),
    },
    status: (row.status ?? 'pending') as OrderStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapCommunityTextRow(row: any): CommunityText {
  const id = String(row.id);
  return {
    id,
    _id: id,
    text: row.text,
    category: row.category,
    isApproved: Boolean(row.is_approved),
    submittedBy: row.submitted_by,
    usageCount: Number(row.usage_count ?? 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ============================================================
// Aides
// ============================================================

// Parse un identifiant provenant de l'URL en entier strict.
// Retourne null si invalide (équivalent 404).
export function parseId(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

// Convertit un payload entrant (camélisé) en ligne `products` pour Supabase.
// Utilisé par la création/modification de produits et par le seeder.
export function productInputToRow(body: any, isUpdate = false): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (!isUpdate || body.name !== undefined) row.name = body.name?.trim?.() ?? String(body.name).trim();
  if (!isUpdate || body.description !== undefined) row.description = body.description?.trim?.() || null;
  if (!isUpdate || body.price !== undefined) row.price = body.price;
  if (!isUpdate || body.images !== undefined) row.images = body.images || [];
  if (!isUpdate || body.sizes !== undefined) row.sizes = body.sizes || [];
  if (!isUpdate || body.category !== undefined) row.category = body.category?.trim?.() || null;
  if (!isUpdate || body.isCustomizable !== undefined) row.is_customizable = body.isCustomizable || false;
  if (!isUpdate || body.customPrice !== undefined) row.custom_price = body.customPrice || 0;
  if (body.isActive !== undefined) row.is_active = body.isActive;
  if (!isUpdate || body.stock !== undefined) row.stock = body.stock || 0;
  if (!isUpdate || body.tags !== undefined) row.tags = body.tags || [];
  if (isUpdate && !Object.keys(row).length) row.is_active = body.isActive !== undefined ? body.isActive : true;
  return row;
}

// Équivalent du `populate()` MongoDB : renvoie un sous-document produit léger.
export function productRef(product: Product, includePrice = false): Product {
  const base: any = {
    id: product.id,
    _id: product._id,
    name: product.name,
    images: product.images,
  };
  if (includePrice) base.price = product.price;
  return base as Product;
}

// Charge les produits référencés par plusieurs commandes (id -> Product).
export async function fetchProductsByIds(
  supabase: SupabaseClient,
  ids: string[],
): Promise<Map<string, Product>> {
  const map = new Map<string, Product>();
  const unique = Array.from(new Set(ids.filter(Boolean).map(String)));
  if (unique.length === 0) return map;
  const numericIds = unique.map((v) => Number(v)).filter((n) => Number.isInteger(n) && n > 0);
  if (numericIds.length === 0) return map;
  const { data, error } = await supabase.from('products').select('*').in('id', numericIds);
  if (!error && data) {
    for (const row of data) map.set(String(row.id), mapProductRow(row));
  }
  return map;
}

// Lit la ligne de réglages (id=1) ; la crée si absente (insertion des défauts).
// Si la création est bloquée (clé anon + RLS), renvoie les défauts constants.
export async function getSettings(): Promise<SettingsDoc> {
  const supabase = getSupabase();
  const { data } = await supabase.from('settings').select('*').eq('id', 1).maybeSingle();
  if (data) return mapSettingsRow(data);

  // Essaye de créer la ligne avec les valeurs par défaut de la table.
  const { data: created, error } = await supabase.from('settings').upsert({ id: 1 }).select().single();
  if (created) return mapSettingsRow(created);

  // Pas les droits d'insertion (clé anon) — renvoie les valeurs par défaut.
  return { ...DEFAULT_SETTINGS };
}
