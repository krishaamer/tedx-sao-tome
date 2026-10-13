# Web content and publication notes

Verified on 2026-10-14. New development is in `apps/web`; legacy source,
credentials, databases and backup archives have not been altered.

## Historical editions

The 2018 WordPress `past.blade.php` repeated the 2015 theme/date for 2014 and
contained inaccurate dates for all four earlier editions. The modern archive
uses these verified records:

| Edition | Date | Theme | Venue | Source |
| --- | --- | --- | --- | --- |
| 2013 | 20 June 2013 | Islands Connected | Hotel Praia | [TED event 8987](https://www.ted.com/tedx/events/8987) |
| 2014 | 25 October 2014 | Futurismo Santomense: Visão Raio X | Arquivo Histórico | [TED event 13297](https://www.ted.com/tedx/events/13297), [contemporary report](https://bkup.stpdigital.net/2014/10/27/tedxsaotome-o-poder-das-ideias-pode-mudar-sao-tome-e-princip/) |
| 2015 | 25 July 2015 | Ponto Sem Retorno: Tudo e Nada | Biblioteca Nacional | [TED event 16437](https://www.ted.com/tedx/events/16437), [organizer announcement](https://bkup.stpdigital.net/2015/06/20/inscreva-se-na-3-edicao-do-tedxsaotome-a-ponte-para-os-seus-sonhos/), [post-event report](https://pordentrodaafrica.com/cultura/tedxsaotome-iiia-edicao-do-evento-abordou-as-atitudes-individuais-em-prol-do-coletivo) |
| 2016 | 25 June 2016 | Transcendência | Pestana São Tomé | [TED event 19275](https://www.ted.com/tedx/events/19275) |
| 2018 | 29 September 2018, 14:30 local | Re\|Evolution | CACAU | Archived `legacy/wordpress-2018/site/web/app/themes/tedx2018/resources/views/partials/content/section/theme.blade.php` and the archived programme |

The TED listing for 2015 names Arquivo Histórico, while the contemporary
organizer announcement and post-event reporting both name Biblioteca Nacional.
The latter is used as the actual venue. Original archive photographs are
presented as historical imagery; individual photographs have not been redated.

São Tomé used UTC+1 in September 2018, according to
[IANA's Africa time-zone data](https://data.iana.org/time-zones/tzdb/africa).
The announced start is encoded as `2018-09-29T14:30:00+01:00`. An exact end time
has not been established, so it is omitted. `EventCompleted` is not an instance
of [Schema.org EventStatusType](https://schema.org/EventStatusType); the optional
status is omitted for this historical event.

## Recordings

The [official 2013 event page](https://www.ted.com/tedx/events/8987) links to
[this playlist](https://www.youtube.com/playlist?list=PLsRNoUx8w3rNbDkGh3a_cCPd4brZKlQ0q).
All nine linked video IDs in `apps/web/src/content/archive.ts` were verified
through YouTube oEmbed as published by TEDx Talks. Thumbnail images were
downloaded from the corresponding public `i.ytimg.com/vi/<id>/hqdefault.jpg`
URLs. Videos play on YouTube; the site does not rehost the recordings or load
an embedded player on page view.

The 2018 programme's Harvey Fineberg and Camille A. Brown videos link to their
original TED pages. They are explicitly labeled as screenings, not as local
speaker recordings. No reliably matched local-speaker recordings for 2015,
2016 or 2018 have been added.

## Team and contact

The team directory is explicitly the **2016 roster**, from
[TED event 19275](https://www.ted.com/tedx/events/19275). The 2018 WordPress team
template is empty; an unverified 2018/current roster has not been inferred.

Facebook, Instagram and Twitter are public links from the original 2018
footer. Current contact pages use Facebook and Instagram. The commented
`info@tedxsaotome.com` address is not presented as a verified mailbox.
Historically published email addresses are not treated as current contacts.

No future edition was confirmed in the records consulted. The next-edition
page therefore directs visitors to community announcements without inventing
dates, ticket sales, volunteer vacancies, or application forms.

## Publication workflow

Run `pnpm check` before publication. It runs ESLint, Next's TypeScript/build
checks, and `tools/validation/verify-static-export.mjs` against the generated
export. GitHub Actions repeats this for pushes, pull requests and manual runs.

Vercel project `tedx-sao-tome-web` is connected to `krishaamer/tedx-sao-tome` in
the HAAM team. Use the web app as the project root (`apps/web`), Node 24, the
workspace lockfile and `out` as static output. Canonical pages and sitemap
URLs use `https://www.tedxsaotome.com/`, matching the existing apex redirect.

Validate the preview before publishing the reviewed revision to production.
Keep the previous ready deployment available for rollback.
