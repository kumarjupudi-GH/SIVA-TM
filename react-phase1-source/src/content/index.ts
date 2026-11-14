import siteJson from './site.json';
import productsJson from './products.json';
import pathwaysJson from './pathways.json';
import teamJson from './team.json';
import divisionsJson from './divisions.json';

export type Status = 'Available' | 'Beta' | 'Prototype' | 'Coming Soon';

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  status: Status;
  /** Link to the independently hosted app. Leave empty until it is live. */
  url: string;
  featured: boolean;
}

export interface Pathway {
  slug: string;
  title: string;
  description: string;
  audience: string;
  objectives: string[];
}

export interface LabItem {
  title: string;
  status: Status;
}

export const site = siteJson;
export const products = productsJson as Product[];
export const pathways = pathwaysJson as Pathway[];
export const team = teamJson;
export const divisions = divisionsJson as typeof divisionsJson & { lab: LabItem[] };
