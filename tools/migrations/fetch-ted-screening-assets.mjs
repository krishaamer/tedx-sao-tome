// Refresh public TED thumbnails only. No videos are downloaded or rehosted.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const slugs = [
  "chimamanda_ngozi_adichie_the_danger_of_a_single_story",
  "adora_svitak_what_adults_can_learn_from_kids",
  "mohamed_ali_the_link_between_unemployment_and_terrorism",
  "joi_ito_want_to_innovate_become_a_now_ist",
  "bel_pesce_5_ways_to_kill_your_dreams",
  "alessandra_orofino_it_s_our_city_let_s_fix_it",
  "ngozi_okonjo_iweala_want_to_help_africa_do_business_here",
  "charles_robertson_africa_s_next_boom",
  "harvey_fineberg_are_we_ready_for_neo_evolution",
  "camille_a_brown_a_visual_history_of_social_dance_in_25_moves",
];
const directory = new URL("../../apps/web/public/images/recordings/", import.meta.url);
await mkdir(directory, { recursive: true });

for (const slug of slugs) {
  const source = `https://www.ted.com/talks/${slug}`;
  const response = await fetch(`https://www.ted.com/services/v1/oembed.json?url=${encodeURIComponent(source)}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${slug}: oEmbed HTTP ${response.status}`);
  const metadata = await response.json();
  if (metadata.provider_name !== "TED" || !metadata.html.includes(`https://embed.ted.com/talks/${slug}`)) throw new Error(`${slug}: unexpected source metadata`);
  const thumbnailUrl = new URL(metadata.thumbnail_url);
  if (thumbnailUrl.protocol !== "https:" || thumbnailUrl.hostname !== "pi.tedcdn.com") throw new Error(`${slug}: unexpected thumbnail provider`);
  const thumbnail = await fetch(thumbnailUrl, { signal: AbortSignal.timeout(30000) });
  if (!thumbnail.ok || !thumbnail.headers.get("content-type")?.startsWith("image/")) throw new Error(`${slug}: invalid thumbnail response`);
  const filename = `ted-${slug}.jpg`;
  await writeFile(new URL(filename, directory), Buffer.from(await thumbnail.arrayBuffer()));
  console.log(JSON.stringify({ title: metadata.title, source, embed: `https://embed.ted.com/talks/${slug}`, thumbnail: `/images/recordings/${filename}`, path: fileURLToPath(new URL(filename, directory)) }));
}
