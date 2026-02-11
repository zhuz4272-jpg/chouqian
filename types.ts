export interface Fortune {
  id: string;
  title: string; // The main big character (e.g., 福, 财)
  keyword: string; // The short keyword (e.g., Wealth, Love)
  description: string; // The longer poetic description
  luckyColor: string;
  luckyNumber: number;
}