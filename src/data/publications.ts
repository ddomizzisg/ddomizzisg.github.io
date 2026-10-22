export interface Publication {
  year: number;
  title: string;
  authors: string[];
  venue: string;
  type: 'Conference' | 'Journal';
}

export const publications: Publication[] = [
  {
    year: 2023,
    title: 'A data science pipeline synchronisation method for edge-fog-cloud continuum',
    authors: ['Sanchez-Gallegos, D. D.', 'Gonzalez-Compean, J. L.', 'Carretero, J.', 'Marin-Castro, H.'],
    venue: "SC'23 Workshops of The International Conference on High Performance Computing, Network, Storage, and Analysis",
    type: 'Conference',
  },
  {
    year: 2022,
    title: 'PuzzleMesh: A puzzle model to build mesh of agnostic services for edge-fog-cloud',
    authors: ['Sanchez-Gallegos, D. D.', 'Gonzalez-Compean, J. L.', 'Carretero, J.', 'Marin, H.', 'Tchernykh, A.', 'Montella, R.'],
    venue: 'IEEE Transactions on Services Computing',
    type: 'Journal',
  },
  {
    year: 2020,
    title: 'On the continuous processing of health data in edge-fog-cloud computing by using micro/nanoservice composition',
    authors: ['Sánchez-Gallegos, D. D.', 'Galaviz-Mosqueda, A.', 'Gonzalez-Compean, J. L.', 'Villarreal-Reyes, S.', 'Perez-Ramos, A. E.', 'Carrizales-Espinoza, D.', 'Carretero, J.'],
    venue: 'IEEE Access',
    type: 'Journal',
  },
];

// Matches both spellings of the surname so the owner is always highlighted.
export const isMe = (author: string) => /S[aá]nchez-Gallegos/.test(author);
