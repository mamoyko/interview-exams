import dotenv from 'dotenv';
dotenv.config();

export const API_BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';
export const CACHE_DURATION_HOURS = parseInt(process.env.CACHE_DURATION_HOURS || '24') * 3600000;
