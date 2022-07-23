/// <reference types="react-scripts" />

interface Option {
  method: string,
  headers?: {
    'x-api-key': string,
    'Content-type'?: string,
  },
  body?: string,
  // mode?: string,
};

interface Breed {
  id: string,
  name: string,
  temperament: string,
  description: string,
  origin: string;
  weight: { 
    metric: string,
  },
  image: {
    url: string
  },
  life_span: string,
};

interface Image {
  breeds: {
    id: string,
    name: string,
  }
  id: string,
  url: string,
};

interface Favourite {
  id: string,
  image_id: string,
  sub_id?: string,
  created_at?: Date,
  image: {
    id: string,
    url: string,
  }
};

interface Vote {
  id: string | number,
  image_id: string,
  sub_id?: string,
  value: number,
}

interface VoteLog {
  time: string,
  imageId: string,
  action: 'added' | 'removed',
  section: 'Likes' | 'Favourites' | 'Dislikes',
};

type Order = 'asc' | 'desc' | 'rand';