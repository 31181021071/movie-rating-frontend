import { Pagination } from "../pagination.model";

export interface MovieSearchCondition extends Pagination {
    movieName?: string;
    country?: string[];
    releaseDateFrom?: string;
    releaseDateTo?: string;
    genre?: string[];
    ratingFrom?: number;
    ratingTo?: number;
    isShow?: string[];
}

export interface MovieSearchResult extends Pagination {
    id?: number;
    movieName?: string;
    country?: string;
    releaseDate?: string;
    genre?: string;
    rating?: number;
    isShow?: string;
}

export interface MovieDetail{
    id?: number;
    img?: string;
    movieName?: string;
    country?: string;
    releaseDate?: Date;
    genre?: string[];
    rating?: number;
    isShow?: string;
    description?: string;
}


