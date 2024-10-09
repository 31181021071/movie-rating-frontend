export interface MovieSearchCondition {
    movieName?: string;
    country?: string[];
    releaseYear?: number[];
    genre?: string[];
    ratingFrom?: number;
    ratingTo?: number;
    isShow?: boolean[];
}

export interface MovieSearchResult{
    id?: number;
    movieName?: string;
    country?: string;
    releaseYear?: number;
    genre?: string;
    rating?: number;
    isShow?: boolean;
}

export interface MovieDetail{
    id?: number;
    movieName?: string;
    country?: string;
    releaseYear?: number;
    genre?: string[];
    rating?: number;
    isShow?: boolean;
    description?: string;
}


