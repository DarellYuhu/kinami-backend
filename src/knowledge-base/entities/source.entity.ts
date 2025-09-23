export class Source {
  name: string;
  description?: string;
}

export class PavidSource {
  metadata: {
    id: string;
    date: string;
    link: string;
    title: string;
    domain: string;
    subdomain: string;
  };
  article: string;
}
