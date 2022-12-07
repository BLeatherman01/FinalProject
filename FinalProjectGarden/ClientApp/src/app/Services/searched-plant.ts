export interface SearchPlant {
    data:  Plant[];
    self:  string;
    first: string;
    last:  string;
    meta:  SearchPlantMeta;
}

export interface Plant {
    id:              string;
    author?:          string;
    common_name:     string;
    slug?:            string;
    scientific_name: string;
    status?:          string;
    rank?:            string;
    family?:          string;
    genus?:           string;
    genus_id?:        string;
    image_url?:       string;
    links?:           Links;
    meta?:            DatumMeta;
}

export interface Links {
    self:  string;
    genus: string;
    plant: string;
}

export interface DatumMeta {
    last_modified: Date;
}

export interface SearchPlantMeta {
    total: number;
}

