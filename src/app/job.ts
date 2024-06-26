export interface Job {
    id: number;
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
    location?: string; // Optionnel si ce n'est pas utilisé partout
    industries?: string[]; // Optionnel si ce n'est pas utilisé partout
    types?: string[]; // Optionnel si ce n'est pas utilisé partout
    description?: string; // Optionnel si ce n'est pas utilisé partout
    publishDate?: string; // Optionnel si ce n'est pas utilisé partout
  }
  