import { clsx } from 'clsx';
import type { KeycapArticleType } from '../../../lib/contentful';
import { styles } from './styles.css';

export interface ArticleProps {
  article: KeycapArticleType;
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
    <article class={clsx(isNew ? styles.article.new : styles.article.normal)}>
      {isNew && (
        <div class={styles.newBadge.div}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class={styles.newBadge.svg}
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd"
            />
          </svg>
          <span class={styles.newBadge.span}>Nouveau</span>
        </div>
      )}

      <img
        src={`${img}?fit=fill&w=400&h=266&fm=webp&q=70`}
        alt={title}
        loading={isHighPriority ? 'eager' : 'lazy'}
        decoding={isHighPriority ? 'auto' : 'async'}
        height="266"
        width="400"
        class={styles.article.figure.img}
      />
      <section>
        <h4 class={styles.article.figure.figcaption.h4}>{title}</h4>
        <hr class={styles.hr} />
        <section class={styles.article.figure.figcaption.section}>
          <dl class={styles.article.figure.figcaption.dl.base}>
            <dt class={styles.article.figure.figcaption.dl.dt}>Profil :</dt>
            <dd class={styles.article.figure.figcaption.dl.dd}>{profile}</dd>
          </dl>
          <dl class={styles.article.figure.figcaption.dl.base}>
            <dt class={styles.article.figure.figcaption.dl.dt}>Material :</dt>
            <dd class={styles.article.figure.figcaption.dl.dd}>{material}</dd>
          </dl>
        </section>
        {status && (
          <>
            <hr class={styles.hr} />
            <section class={styles.article.figure.figcaption.section}>
              <dl class={styles.article.figure.figcaption.dl.base}>
                <dt class={styles.article.figure.figcaption.dl.dt}>Statut :</dt>
                <dd class={styles.article.figure.figcaption.dl.status.dd}>
                  {status}
                </dd>
              </dl>
            </section>
            {(startDate || endDate) && (
              <>
                <hr class={styles.hr} />
                <section class={styles.article.figure.figcaption.section}>
                  {startDate && (
                    <dl class={styles.article.figure.figcaption.dl.base}>
                      <dt class={styles.article.figure.figcaption.dl.dt}>
                        Date début :
                      </dt>
                      <dd class={styles.article.figure.figcaption.dl.dd}>
                        {startDate}
                      </dd>
                    </dl>
                  )}
                  {endDate && (
                    <dl class={styles.article.figure.figcaption.dl.base}>
                      <dt class={styles.article.figure.figcaption.dl.dt}>
                        Date fin :
                      </dt>
                      <dd class={styles.article.figure.figcaption.dl.dd}>
                        {endDate}
                      </dd>
                    </dl>
                  )}
                </section>
              </>
            )}
          </>
        )}
        {description && (
          <>
            <hr class={styles.hr} />
            <section class={styles.article.figure.figcaption.section}>
              {description}
            </section>
          </>
        )}
        {warningText && (
          <>
            <hr class={styles.hr} />
            <span class={styles.article.figure.figcaption.dl.warning.span}>
              Attention : {warningText}
            </span>
          </>
        )}
        <hr class={styles.hr} />
        <div class={styles.article.figure.figcaption.dl.additionnalUrl.div}>
          {additionalUrl && (
            <a
              role="button"
              href={additionalUrl}
              class={
                styles.article.figure.figcaption.dl.additionnalUrl.button
                  .secondary
              }
              target="_blank"
            >
              Kit secondaire
            </a>
          )}
          <a
            role="button"
            href={url}
            target="_blank"
            class={
              styles.article.figure.figcaption.dl.additionnalUrl.button.primary
            }
          >
            En savoir +
          </a>
        </div>
      </section>
    </article>
  );
}
