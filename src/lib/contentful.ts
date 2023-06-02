import contentful, { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
export interface InformationContentfulInterface {
  title: string;
  informationRichText: Document;
}

export interface SocialNetworkContentfulInterface {
  title: string;
  url: string;
}

export interface ProfileContentfulInterface {
  readonly title: string;
  readonly slug: string;
  readonly abbreviation: string;
}

export type StatusType =
  | 'En stock'
  | 'GB en cours'
  | 'GB terminé'
  | 'Interest Check'
  | 'Out Of Stock';

export interface KeycapArticleContentfulInterface {
  readonly title: string;
  readonly img: string;
  readonly profile: string;
  readonly description?: string;
  readonly material: string;
  readonly status?: StatusType;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly url: string;
  readonly additionalUrl?: string;
  readonly warningText?: string;
  readonly isNew?: boolean;
}

export type KeycapArticleType = Omit<
  KeycapArticleContentfulInterface,
  'img' | 'profile' | 'startDate' | 'endDate'
> & {
  img: string;
  profile: string;
  profileId: string;
  startDate?: string;
  endDate?: string;
};

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});
