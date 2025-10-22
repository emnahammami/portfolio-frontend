

// Certificate interfaces
export interface ICertificate {
  _id: string;
  titre: string;
  organisme: string;
  dateObtention: string;
  lien: string;
  images: string[];
  description?: string;
  skills?: string[];
}

export interface ICertificateConfig {
  title: string;
  subtitle: string;
  certificates: ICertificate[];
}
