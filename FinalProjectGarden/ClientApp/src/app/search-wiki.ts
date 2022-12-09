export interface WikiSearch {
    batchcomplete: string;
    continue:      Continue;
    query:         Query;
}

export interface Continue {
    sroffset: number;
    continue: string;
}

export interface Query {
    search:     Search[];
}

export interface Search {
    ns:        number;
    title:     string;
    pageid:    number;
    size:      number;
    wordcount: number;
    snippet:   string;
    timestamp: Date;
}
