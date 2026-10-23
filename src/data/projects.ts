export interface Project {
  period: string;
  title: string;
  funding: string;
  reference?: string;
  role?: string;
}

export interface Stay {
  period: string;
  institution: string;
  host: string;
  project: string;
}

export const projects: Project[] = [
  {
    period: '2026 – 2027',
    title: 'New techniques for managing data factories in the computing continuum',
    funding: 'Universidad Carlos III de Madrid — UC3M Programa Propio',
    reference: 'Ref. 2025/00822/001',
    role: 'Principal Researcher',
  },
  {
    period: '2024 – 2026',
    title: 'New scalable I/O techniques for hybrid HPC and data-intensive workloads (SCIOT)',
    funding: 'Universidad Carlos III de Madrid — Agencia Española de Investigación',
  },
  {
    period: '2023 – 2024',
    title: 'DECIDE: New Methods on High-End and Edge Computing for the Intensive Processing of Data',
    funding: 'Universidad Carlos III de Madrid — Ministerio de Ciencia, Innovación y Universidades',
  },
  {
    period: '2020 – 2022',
    title: 'ConvergenciA Big dAta-Hpc: de Los sensores a las Aplicaciones (CABAHLA-CM)',
    funding: 'Universidad Carlos III de Madrid — Comunidad de Madrid',
  },
  {
    period: '2020 – 2023',
    title:
      'Technological platform for the management, assurance, exchange, and storage of large volumes of medical data, and building of a national repository of health data analytics services',
    funding: 'Conacyt — PRONACES',
  },
  {
    period: '2017',
    title: 'Cloud computing federated service to store, process, and distribute satellite imagery',
    funding: 'Conacyt — AEM',
  },
];

export const stays: Stay[] = [
  {
    period: 'May 2026 – Jul 2026',
    institution: 'Scientific Computing and Imaging Institute, University of Utah, USA',
    host: 'Prof. Manish Parashar',
    project: 'Intelligent data storage systems for the computing continuum',
  },
  {
    period: 'Jan 2024 – Mar 2024',
    institution: 'Globus Laboratory, University of Chicago',
    host: 'Kyle Chard and Ian Foster',
    project: 'DynoStore – A resilient data fabric system',
  },
  {
    period: 'Oct 2022 – Feb 2023',
    institution: 'CICESE Monterrey',
    host: 'Dr. Alejandro Galaviz',
    project: 'Arquitecturas de cómputo edge-fog-cloud',
  },
  {
    period: 'Oct 2018 – Nov 2018',
    institution: 'Parthenope University of Naples',
    host: 'Dr. Raffaele Montella',
    project: 'DagOnStar',
  },
  {
    period: 'Jan 2017 – Aug 2017',
    institution: 'Cinvestav Tamaulipas',
    host: 'Dr. José González',
    project: 'Cloud computing federated service to store, process, and distribute satellite imagery',
  },
];
