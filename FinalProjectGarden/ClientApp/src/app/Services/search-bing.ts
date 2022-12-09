export interface SearchImages {
  type: string;
  instrumentation: Instrumentation;
  readLink: string;
  webSearchURL: string;
  queryContext: QueryContext;
  totalEstimatedMatches: number;
  nextOffset: number;
  currentOffset: number;
  value: Value[];
  queryExpansions: QueryExpansion[];
  pivotSuggestions: PivotSuggestion[];
  similarTerms: SimilarTerm[];
  relatedSearches: QueryExpansion[];
}

export interface Instrumentation {
  type: string;
}

export interface PivotSuggestion {
  pivot: string;
  suggestions: QueryExpansion[];
}

export interface QueryExpansion {
  text: string;
  displayText: string;
  webSearchURL: string;
  searchLink: string;
  thumbnail: QueryExpansionThumbnail;
}

export interface QueryExpansionThumbnail {
  thumbnailURL: string;
}

export interface QueryContext {
  originalQuery: string;
  alterationDisplayQuery: string;
  alterationOverrideQuery: string;
  alterationMethod: string;
  alterationType: string;
}

export interface SimilarTerm {
  text: string;
  displayText: string;
  webSearchURL: string;
  thumbnail: SimilarTermThumbnail;
}

export interface SimilarTermThumbnail {
  url: string;
}

export interface Value {
  webSearchURL: string;
  name: string;
  thumbnailURL: string;
  datePublished: Date;
  isFamilyFriendly: boolean;
  contentURL: string;
  hostPageURL: string;
  contentSize: string;
  encodingFormat: EncodingFormat;
  hostPageDisplayURL: string;
  width: number;
  height: number;
  hostPageDiscoveredDate: Date;
  thumbnail: ValueThumbnail;
  imageInsightsToken: string;
  insightsMetadata: InsightsMetadata;
  imageID: string;
  accentColor: string;
  hostPageFavIconURL?: string;
  hostPageDomainFriendlyName?: string;
  creativeCommons?: string;
}

export enum EncodingFormat {
  JPEG = 'jpeg',
}

export interface InsightsMetadata {
  pagesIncludingCount: number;
  availableSizesCount: number;
  recipeSourcesCount?: number;
}

export interface ValueThumbnail {
  width: number;
  height: number;
}
