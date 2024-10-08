import { Mcodes } from "../mcodes.model";

export interface MovieSearchCondition {
    movieName?: string;
    country?: Mcodes[];
    releassYear?: Mcodes[];
    genre?: Mcodes[];
    ratingFrom?: number;
    ratingTo?: number;
    isShow?: boolean;
}

export interface MovieSearchResult{
    movieName?: string;
    country?: string;
    releassYear?: number;
    genre?: string;
    rating?: number;
    isShow?: boolean;
}


