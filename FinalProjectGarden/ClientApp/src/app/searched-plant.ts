    export interface SearchedPlant {
        data:  Datum[];
        self:  string;
        first: string;
        last:  string;
        meta:  WelcomeMeta;
    }
    
    export interface Datum {
        id:              string;
        author:          string;
        common_name:     string;
        slug:            string;
        scientific_name: string;
        status:          string;
        rank:            string;
        family:          string;
        genus:           string;
        genus_id:        string;
        image_url?:      string;
        links:           Links;
        meta:            DatumMeta;
    }
    
    export interface Links {
        self:  string;
        genus: string;
        plant: string;
    }
    
    export interface DatumMeta {
        last_modified: Date;
    }
    
    export interface WelcomeMeta {
        total: number;
    }
