import { clsx } from 'clsx';
import type { KeycapArticleContentfulInterface } from '../../../lib/contentful';
import { styles } from './styles.css';
import { Image } from '@unpic/preact';

export interface ArticleProps {
  article: KeycapArticleContentfulInterface;
  isHighPriority: boolean;
}

export default function Article(props: ArticleProps) {
  const { article, isHighPriority } = props;

  const {
    img,
    profile,
    startDate,
    endDate,
    title,
    material,
    status,
    description,
    warningText,
    url,
    additionalUrl,
    isNew
  } = article;

  return (
    <article
      className={clsx(isNew ? styles.article.new : styles.article.normal)}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="url" content={url} />
      <meta itemProp="image" content={img} />
      <meta itemProp="material" content={material} />
      <meta itemProp="brand" content={profile.abbreviation} />

      {profile && <meta itemProp="category" content={profile.abbreviation} />}

      {startDate && endDate && (
        <meta itemProp="releaseDate" content={`${startDate} - ${endDate}`} />
      )}

      {warningText && <meta itemProp="negativeNotes" content={warningText} />}

      {isNew && (
        <div className={styles.newBadge.div}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.newBadge.svg}
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd"
            />
          </svg>
          <span className={styles.newBadge.span}>Nouveau</span>
        </div>
      )}

      <Image
        src={`${img}?fit=fill&w=560&h=370&fm=webp&q=70`}
        alt={title}
        loading={isHighPriority ? 'eager' : 'lazy'}
        decoding={isHighPriority ? 'auto' : 'async'}
        fetchpriority={isHighPriority ? 'high' : 'low'}
        layout="fullWidth"
        className={styles.article.content.img}
        itemProp="image"
        background="auto"
        breakpoints={[320, 768]}
      />
      <h2 itemProp="name" className={styles.article.content.description.h2}>
        {title}
      </h2>
      <hr className={styles.hr} />
      <dl className={styles.article.content.description.dl.base}>
        <dt className={styles.article.content.description.dl.dt}>Profil :</dt>
        <dd
          className={styles.article.content.description.dl.dd}
          itemProp="category"
        >
          {profile.title}
        </dd>
        <dt className={styles.article.content.description.dl.dt}>Material :</dt>
        <dd
          className={styles.article.content.description.dl.dd}
          itemProp="material"
        >
          {material}
        </dd>
      </dl>
      {status && (
        <>
          <hr className={styles.hr} />
          <dl className={styles.article.content.description.dl.base}>
            <dt className={styles.article.content.description.dl.dt}>
              Statut :
            </dt>
            <dd
              className={styles.article.content.description.dl.status.dd}
              itemProp={'availability'}
            >
              {status}
            </dd>
          </dl>
          {(startDate || endDate) && (
            <>
              <hr className={styles.hr} />
              <dl
                className={styles.article.content.description.dl.base}
                itemProp={'releaseDate'}
              >
                {startDate && (
                  <>
                    <dt className={styles.article.content.description.dl.dt}>
                      Date début :
                    </dt>
                    <time
                      dateTime={startDate}
                      className={styles.article.content.description.dl.dd}
                    >
                      {startDate}
                    </time>
                  </>
                )}
                {endDate && (
                  <>
                    <dt className={styles.article.content.description.dl.dt}>
                      Date fin :
                    </dt>
                    <time
                      dateTime={endDate}
                      className={styles.article.content.description.dl.dd}
                    >
                      {endDate}
                    </time>
                  </>
                )}
              </dl>
            </>
          )}
        </>
      )}
      {description && (
        <>
          <hr className={styles.hr} />
          <section
            itemProp={'description'}
            className={styles.article.content.description.section}
          >
            {description}
          </section>
        </>
      )}
      {warningText && (
        <>
          <hr className={styles.hr} />
          <span
            itemProp="negativeNotes"
            className={styles.article.content.description.dl.warning.span}
          >
            Attention : {warningText}
          </span>
        </>
      )}
      <hr className={styles.hr} />
      <div className={styles.article.content.description.dl.additionnalUrl.div}>
        {additionalUrl && (
          <a
            role="button"
            href={additionalUrl}
            className={
              styles.article.content.description.dl.additionnalUrl.button
                .secondary
            }
            target="_blank"
            onClick={() => {
              window.umami.track('Additional button clicked', {
                profile: profile.title,
                title: title,
                material: material,
                url: url,
                isNew: isNew
              });
            }}
          >
            Kit secondaire
          </a>
        )}
        <a
          role="button"
          href={url}
          itemProp="url"
          target="_blank"
          className={
            styles.article.content.description.dl.additionnalUrl.button.primary
          }
          onClick={() => {
            window.umami.track('See more button clicked', {
              profile: profile.title,
              title: title,
              material: material,
              url: url,
              isNew: isNew
            });
          }}
        >
          En savoir +
        </a>
      </div>
    </article>
  );
}
