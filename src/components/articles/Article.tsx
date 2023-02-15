import { cva, cx } from 'class-variance-authority';
import type { KeycapArticleType } from '../../lib/contentful';

export interface ArticleProps {
  article: KeycapArticleType;
  isHighPriority: boolean;
}

const t = cva('article', {
  variants: {}
});

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
      class={cx(
        isNew
          ? 'rounded-xl border-[3px] border-amber-500'
          : 'border border-slate-200 hover:border-slate-300',
        'relative flex h-fit flex-col rounded-lg  bg-white transition-colors dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600'
      )}
    >
      {isNew && (
        <div
          class={
            'absolute -inset-4 flex h-fit w-fit shrink-0 items-center gap-x-2 rounded-full bg-amber-500 fill-white p-3 text-xs font-bold uppercase text-white lg:p-2 lg:pl-3 lg:pr-4'
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class={'h-6 w-6'}
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd"
            />
          </svg>

          <span class={'hidden lg:inline'}>Nouveau</span>
        </div>
      )}

      <figure>
        <img
          src={`${img}?fit=fill&w=400&h=266&fm=webp&q=70`}
          alt={title}
          loading={isHighPriority ? 'eager' : 'lazy'}
          decoding={isHighPriority ? 'auto' : 'async'}
          height="266"
          width="400"
          class={
            'w-full rounded-t-lg border-b border-b-slate-100 bg-slate-300 object-fill dark:border-b-slate-800 dark:bg-slate-700'
          }
        />
        <figcaption>
          <dl>
            <dt>
              <span class={'sr-only'}>Nom :</span>
            </dt>
            <dd class="basis-3/5 text-slate-600 dark:text-slate-300">
              <h4 class="p-4 text-center text-base font-medium text-slate-800 dark:text-slate-100">
                {title}
              </h4>
            </dd>
          </dl>
          <hr class="h-px border-none bg-slate-100 dark:bg-slate-700" />
          <section
            class={
              'flex flex-col space-y-1 p-4 text-sm text-slate-700 dark:text-slate-200'
            }
          >
            <dl class="flex w-full items-center">
              <dt class="basis-2/5 font-semibold text-slate-900 dark:text-slate-100">
                Profil :
              </dt>
              <dd class="basis-3/5 text-slate-600 dark:text-slate-300">
                {profile}
              </dd>
            </dl>
            <dl class="flex w-full items-center">
              <dt class="basis-2/5 font-semibold text-slate-900 dark:text-slate-100">
                Material :
              </dt>
              <dd class="basis-3/5 text-slate-600 dark:text-slate-300">
                {material}
              </dd>
            </dl>
          </section>
          {status && (
            <>
              <hr class="h-px border-none bg-slate-100 dark:bg-slate-700" />
              <section
                class={
                  'flex flex-col space-y-1 p-4 text-sm text-slate-700 dark:text-slate-200'
                }
              >
                <>
                  <dl class="flex w-full items-center">
                    <dt class="basis-2/5 font-semibold text-slate-900 dark:text-slate-100">
                      Statut :
                    </dt>
                    <dd class="flex basis-auto items-center rounded bg-teal-700 p-1 px-2 text-xs font-bold uppercase text-white dark:border dark:border-teal-700 dark:bg-indigo-700/10 dark:text-teal-100">
                      {status}
                    </dd>
                  </dl>
                </>
              </section>
              {(startDate || endDate) && (
                <>
                  <hr class="h-px border-none bg-slate-100 dark:bg-slate-700" />
                  <section
                    class={
                      'flex flex-col space-y-1 p-4 text-sm text-slate-700 dark:text-slate-200'
                    }
                  >
                    {startDate && (
                      <dl class="flex w-full items-center">
                        <dt class="basis-2/5 font-semibold text-slate-900 dark:text-slate-100">
                          Date début :
                        </dt>
                        <dd class="basis-3/5 text-slate-600 dark:text-slate-300">
                          {startDate}
                        </dd>
                      </dl>
                    )}
                    {endDate && (
                      <dl class="flex w-full items-center">
                        <dt class="basis-2/5 font-semibold text-slate-900 dark:text-slate-100">
                          Date fin :
                        </dt>
                        <dd class="basis-3/5 text-slate-600 dark:text-slate-300">
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
              <hr class="h-px border-none bg-slate-100 dark:bg-slate-700" />
              <section
                class={
                  'flex flex-col space-y-1 p-4 text-sm text-slate-700 dark:text-slate-200'
                }
              >
                {description}
              </section>
            </>
          )}
          {warningText && (
            <>
              <hr class="h-px border-none bg-slate-100 dark:bg-slate-700" />
              <section
                class={
                  'flex flex-col space-y-1 p-4 text-sm text-slate-700 dark:text-slate-200'
                }
              >
                <span class="w-fit rounded bg-red-600 px-2 py-1 font-bold text-white dark:border dark:border-red-700 dark:bg-red-600/10 dark:text-red-100">
                  Attention : {warningText}
                </span>
              </section>
            </>
          )}
          <hr class="h-px border-none bg-slate-100 dark:bg-slate-700" />
          <section
            class={
              'flex flex-col space-y-1 p-4 pt-0 text-sm text-slate-700 dark:text-slate-200'
            }
          >
            <div class={'flex flex-col pt-4 lg:gap-y-2'}>
              {additionalUrl && (
                <a
                  role="button"
                  href={additionalUrl}
                  class="w-full flex-1 rounded-md border-transparent bg-indigo-50 p-2 text-center font-semibold text-indigo-800 transition-colors hover:bg-indigo-100/50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:bg-indigo-100/20 dark:text-indigo-200 dark:hover:bg-indigo-100/30"
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
                  'w-full self-end rounded-md border-transparent bg-indigo-600 p-2 text-center font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:border dark:border-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-100 dark:hover:bg-indigo-500/20'
                }
              >
                En savoir +
              </a>
            </div>
          </section>
        </figcaption>
      </figure>
    </article>
  );
}
