// src/types/Product.ts

// Базовий інтерфейс для всіх продуктів
export interface BaseProduct {
  id: string | number; // Підтримує string (phones.json) і number (products.json)
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId?: string;
  itemId?: string; // Додано для products.json
  name: string;
  price?: number;
  priceDiscount?: number;
  priceRegular?: number;
  fullPrice?: number;
  image?: string;
  images?: string[];
  color: string;
  colorsAvailable?: string[];
  capacity?: string;
  capacityAvailable?: string[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  year?: number;
  camera?: string;
  zoom?: string;
  cell?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
}

// Інтерфейс для телефонів та планшетів
export interface SmartDevice extends BaseProduct {
  category: 'phones' | 'tablets';
  capacity: string;
  capacityAvailable: string[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

// Інтерфейс для аксесуарів
export interface Accessory extends BaseProduct {
  category: 'accessories';
}

// Універсальний тип продукту
export type Product = SmartDevice | Accessory;

// Тип для детального відображення продукту
export interface ProductDetails extends BaseProduct {
  description: {
    title: string;
    text: string[];
  }[];
  images: string[];
}

// Тип для списку продуктів
export interface ProductInList {
  id: string | number; // Підтримує обидва формати
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId?: string;
  itemId?: string; // Для products.json
  name: string;
  priceRegular?: number; // Для phones.json
  priceDiscount?: number; // Для phones.json
  fullPrice?: number; // Для products.json
  price?: number; // Для products.json
  colorsAvailable?: string[];
  color: string;
  capacityAvailable?: string[];
  capacity?: string;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  year?: number;
  images?: string[]; // Для phones.json
  image?: string; // Для products.json
  camera?: string;
  zoom?: string;
  cell?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
}
