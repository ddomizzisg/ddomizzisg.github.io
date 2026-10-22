export interface Project {
  period: string;
  title: string;
  funding: string;
  role: string;
}

export interface Stay {
  period: string;
  institution: string;
  host: string;
  project: string;
}

export const projects: Project[] = [
  {
    period: '2020 – 2023',
    title:
      'Plataforma tecnológica para la gestión, aseguramiento, intercambio y preservación de grandes volúmenes de datos en salud y construcción de un repositorio nacional de servicios de análisis de datos de salud',
    funding: 'Conacyt–PRONACES',
    role: 'Developed Nez, a framework for building data science systems over non-structured data.',
  },
  {
    period: '2017',
    title:
      'Servicio federado de cómputo en la nube para el almacenamiento, procesamiento y distribución de imágenes satelitales',
    funding: 'Conacyt–AEM',
    role: 'Developed a geoportal for indexing, searching and discovering digital products, and workflows for processing satellite imagery.',
  },
];

export const stays: Stay[] = [
  {
    period: 'Oct 2022 – Feb 2023',
    institution: 'CICESE Monterrey',
    host: 'Dr. Alejandro Galaviz',
    project: 'Arquitecturas de cómputo edge-fog-cloud para el manejo y procesamiento de datos en ambientes IoT',
  },
  {
    period: 'Oct 2018 – Nov 2018',
    institution: 'Parthenope University of Naples',
    host: 'Dr. Raffaele Montella',
    project: 'Developing middleware and scientific tools in the field of workflows for data processing',
  },
  {
    period: 'Jan 2017 – Aug 2017',
    institution: 'Cinvestav Tamaulipas',
    host: 'Dr. José González',
    project: 'Cloud computing federated service to store, process and distribute satellite imagery',
  },
];
