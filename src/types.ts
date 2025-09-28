export type Thumbnail = {
  trending?: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
};

export type Movie = {
  id: number;
  title: string;
  year: number;
  rating: string;
  category: string;
  thumbnail: Thumbnail;
  isBookmarked: boolean;
};

export type MoviesProps = {
  movie: Movie;
};

export type HeadingProp = {
  children: React.ReactNode;
};

export type ButtonProp = {
  children: React.ReactNode;
};

export type PlayIconProps = {
  className: string;
};

export type AuthProps = {
  email: string;
  password: string;
  confirmPassword?: string;
};
