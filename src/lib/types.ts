import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode
} from 'contentful';

export interface TypeApiOgImagesFields {
  img: EntryFieldTypes.AssetLink;
  author?: EntryFieldTypes.Symbol;
}

export type TypeApiOgImagesSkeleton = EntrySkeletonType<
  TypeApiOgImagesFields,
  'apiOgImages'
>;
export type TypeApiOgImages<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeApiOgImagesSkeleton, Modifiers, Locales>;

export interface TypeArticleFields {
  title: EntryFieldTypes.Symbol;
  img: EntryFieldTypes.AssetLink;
  slug: EntryFieldTypes.Symbol;
  profile: EntryFieldTypes.EntryLink<TypeKeycaps__profileSkeleton>;
  material: EntryFieldTypes.Symbol<
    | 'ABS Double-Shot'
    | 'ABS Pad-Printed'
    | 'ABS Simple'
    | 'Aluminium'
    | 'PBT Double-Shot'
    | 'PBT Dye-Sub'
    | 'PBT Laser printed'
  >;
  description?: EntryFieldTypes.Text;
  status?: EntryFieldTypes.Symbol<
    | 'En stock'
    | 'Extras GB'
    | 'Extras In-Stock'
    | 'GB en cours'
    | 'GB terminé'
    | 'Interest Check'
    | 'Out Of Stock'
  >;
  startDate?: EntryFieldTypes.Date;
  endDate?: EntryFieldTypes.Date;
  url: EntryFieldTypes.Symbol;
  additionalUrl?: EntryFieldTypes.Symbol;
  warningText?: EntryFieldTypes.Symbol;
  isNew?: EntryFieldTypes.Boolean;
}

export type TypeArticleSkeleton = EntrySkeletonType<
  TypeArticleFields,
  'article'
>;
export type TypeArticle<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export interface TypeHomepageFields {
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  profileCards: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeKeycaps__profileSkeleton>
  >;
}

export type TypeHomepageSkeleton = EntrySkeletonType<
  TypeHomepageFields,
  'homepage'
>;
export type TypeHomepage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeHomepageSkeleton, Modifiers, Locales>;

export interface TypeInformation__rich__textFields {
  title?: EntryFieldTypes.Symbol;
  informationRichText: EntryFieldTypes.RichText;
}

export type TypeInformation__rich__textSkeleton = EntrySkeletonType<
  TypeInformation__rich__textFields,
  'information-rich-text'
>;
export type TypeInformation__rich__text<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeInformation__rich__textSkeleton, Modifiers, Locales>;

export interface TypeKeycaps__profileFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  abbreviation: EntryFieldTypes.Symbol;
  thumbnail?: EntryFieldTypes.AssetLink;
}

export type TypeKeycaps__profileSkeleton = EntrySkeletonType<
  TypeKeycaps__profileFields,
  'keycaps-profile'
>;
export type TypeKeycaps__profile<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeKeycaps__profileSkeleton, Modifiers, Locales>;

export interface TypeSocialNetworkFields {
  title: EntryFieldTypes.Symbol;
  url: EntryFieldTypes.Symbol;
}

export type TypeSocialNetworkSkeleton = EntrySkeletonType<
  TypeSocialNetworkFields,
  'socialNetwork'
>;
export type TypeSocialNetwork<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeSocialNetworkSkeleton, Modifiers, Locales>;
