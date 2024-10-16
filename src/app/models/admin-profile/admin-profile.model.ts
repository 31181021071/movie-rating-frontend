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
    director?: string[];
    actor?: string[];
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
    director?: string[];
    actor?: string[];
}

export interface DirectorSearchCondition extends Pagination {
    name?: string;
    country?: string[];
    birthFrom?: string;
    birthTo?: string;
}

export interface DirectorSearchResult extends Pagination {
    id?: number;
    name?: string;
    country?: string;
    birth?: string;
}

export interface DirectorDetail{
    id?: number;
    img?: string;
    name?: string;
    country?: string;
    birth?: Date;
    description?: string;
}

export interface ActorSearchCondition extends Pagination {
    name?: string;
    country?: string[];
    birthFrom?: string;
    birthTo?: string;
}

export interface ActorSearchResult extends Pagination {
    id?: number;
    name?: string;
    country?: string;
    birth?: string;
}

export interface ActorDetail{
    id?: number;
    img?: string;
    name?: string;
    country?: string;
    birth?: Date;
    description?: string;
}


