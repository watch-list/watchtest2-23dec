
import { CategoryInfo, WatchItem } from './types';

export const CATEGORIES: CategoryInfo[] = [
    { 
        id: 'kdrama', 
        name: 'K-DRAMA', 
        color: '#A42EFF', 
        gradient: 'from-[#1a0a2e] to-[#A42EFF]', 
        path: '/kdrama' 
    },
    { 
        id: 'kmovie', 
        name: 'K-MOVIE', 
        color: '#A42EFF', 
        gradient: 'from-[#1a0a2e] to-[#A42EFF]', 
        path: '/kmovie' 
    },
    { 
        id: 'hdrama', 
        name: 'H-DRAMA', 
        color: '#5045D9', 
        gradient: 'from-[#0a0a2e] to-[#5045D9]', 
        path: '/hdrama' 
    },
    { 
        id: 'hmovie', 
        name: 'H-MOVIE', 
        color: '#5045D9', 
        gradient: 'from-[#0a0a2e] to-[#5045D9]', 
        path: '/hmovie' 
    },
    { 
        id: 'bdrama', 
        name: 'B-DRAMA', 
        color: '#E81717', 
        gradient: 'from-[#2e0a0a] to-[#E81717]', 
        path: '/bdrama' 
    },
    { 
        id: 'bmovie', 
        name: 'B-MOVIE', 
        color: '#E81717', 
        gradient: 'from-[#2e0a0a] to-[#E81717]', 
        path: '/bmovie' 
    },
    { 
        id: 'cdrama', 
        name: 'C-DRAMA', 
        color: '#F7D625', 
        gradient: 'from-[#2e2a0a] to-[#F7D625]', 
        path: '/cdrama' 
    },
    { 
        id: 'anime', 
        name: 'ANIME', 
        color: '#FF7DE8', 
        gradient: 'from-[#2e0a26] to-[#FF7DE8]', 
        path: '/anime' 
    }
];

export const GENRE_OPTIONS = [
    'Romance', 'Drama', 'Comedy', 'Action', 'Thriller', 'Fantasy', 'Horror', 'Sci-Fi', 
    'Historical', 'Mystery', 'Slice of Life', 'Adventure', 'Supernatural', 'Crime', 
    'Family', 'Music', 'Sports', 'Martial Arts'
];

export const STATUS_OPTIONS = [
    { value: 'watching', label: 'Watching', color: '#4CAF50' },
    { value: 'completed', label: 'Completed', color: '#2196F3' },
    { value: 'plan-to-watch', label: 'Plan to Watch', color: '#FFC107' },
    { value: 'on-hold', label: 'On Hold', color: '#9E9E9E' },
    { value: 'dropped', label: 'Dropped', color: '#F44336' }
];

export const INITIAL_DATA: WatchItem[] = [
    {
        id: "kd001",
        category: "kdrama",
        title: "Lovely Runner",
        year: 2024,
        poster: "https://picsum.photos/seed/lovely/500/750",
        myRating: 10,
        episodes: 16,
        episodesWatched: 16,
        status: "completed",
        genres: ["Romance", "Fantasy", "Comedy"],
        watchLink: "https://example.com/watch/lovely-runner",
        trailerUrl: "https://www.youtube.com/watch?v=8M7Y703sZSc",
        dateAdded: "2024-12-15",
        lastUpdated: "2024-12-16",
        favorite: true
    },
    {
        id: "hm001",
        category: "hmovie",
        title: "Dune: Part Two",
        year: 2024,
        poster: "https://picsum.photos/seed/dune/500/750",
        myRating: 9,
        episodes: 1,
        episodesWatched: 1,
        status: "completed",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        watchLink: "https://example.com/watch/dune-2",
        dateAdded: "2024-12-10",
        lastUpdated: "2024-12-12",
        favorite: true
    },
    {
        id: "ani001",
        category: "anime",
        title: "Jujutsu Kaisen",
        year: 2023,
        poster: "https://picsum.photos/seed/jjk/500/750",
        myRating: 9,
        episodes: 24,
        episodesWatched: 24,
        status: "completed",
        genres: ["Action", "Fantasy", "Supernatural"],
        watchLink: "https://example.com/watch/jujutsu-kaisen",
        dateAdded: "2024-11-20",
        lastUpdated: "2024-11-25",
        favorite: true
    },
    {
        id: "cd001",
        category: "cdrama",
        title: "Love Between Fairy and Devil",
        year: 2022,
        poster: "https://picsum.photos/seed/fairy/500/750",
        myRating: 8,
        episodes: 36,
        episodesWatched: 36,
        status: "completed",
        genres: ["Romance", "Fantasy"],
        watchLink: "https://example.com/watch/fairy-devil",
        dateAdded: "2024-10-05",
        lastUpdated: "2024-10-06",
        favorite: false
    }
];
