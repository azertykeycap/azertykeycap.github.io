import contentful, { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type {
  TypeArticleSkeleton,
  TypeKeycaps__profileSkeleton
} from './types';
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
  readonly profile: { title: string; slug: string };
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
  profile: { title: string; slug: string };
  profileId: string;
  startDate?: string;
  endDate?: string;
};

export const contentfulClient = contentful.createClient({
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT,
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});

export const getNavigationLinks = async () => {
  const navigationLinksEntries =
    await contentfulClient.getEntries<TypeKeycaps__profileSkeleton>({
      content_type: 'keycaps-profile',
      order: ['fields.title']
    });

  return navigationLinksEntries.items.map(({ fields }) => {
    const { title, slug, abbreviation } = fields;
    return { title, slug, abbreviation };
  });
};

export const getArticles = async () => {
  const articlesEntries =
    await contentfulClient.getEntries<TypeArticleSkeleton>({
      content_type: 'article'
    });

  return articlesEntries.items.map(({ fields }) => {
    const {
      title,
      img,
      slug,
      profile,
      material,
      description,
      status,
      startDate,
      endDate,
      url,
      additionalUrl,
      warningText,
      isNew
    } = fields;

    return {
      title,
      img: (img as Asset).fields.file?.url as string,
      slug,
      profile: {
        title: (
          profile as Entry<TypeKeycaps__profileSkeleton, undefined, string>
        ).fields?.title,
        slug: (
          profile as Entry<TypeKeycaps__profileSkeleton, undefined, string>
        ).fields?.slug,
        description: (
          profile as Entry<TypeKeycaps__profileSkeleton, undefined, string>
        ).fields?.description,
        abbreviation: (
          profile as Entry<TypeKeycaps__profileSkeleton, undefined, string>
        ).fields?.abbreviation
      },
      material,
      description,
      status,
      startDate: startDate
        ? new Date(startDate).toLocaleDateString('fr-FR')
        : undefined,
      endDate: endDate
        ? new Date(endDate).toLocaleDateString('fr-FR')
        : undefined,
      url,
      additionalUrl,
      warningText,
      isNew
    };
  });
};
