import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const siteRoot = "/Users/krishaamer/Local Sites/tedxsaotome/app/public";
const uploadsRoot = path.join(siteRoot, "wp-content/uploads");
const outputRoot = "/Users/krishaamer/Work/legacy-apps/tedxsaotome/tedx-web/tedx2018-next";
const mysql = "/Users/krishaamer/Library/Application Support/Local/lightning-services/mysql-8.4.0/bin/darwin-arm64/bin/mysql";
const mysqlDefaults = "/Users/krishaamer/Library/Application Support/Local/run/8Vkh_rT1R/conf/mysql/my.cnf";

const programme = [
  ["14:30", "Check-in"],
  ["15:00", "Welcome Drink"],
  ["15:15", "Intro TEDx by Chris Anderson"],
  ["15:25", "Performance ANY MOREIRA (Lembuá vivê / Vira mum / Poeta)"],
  ["15:40", "A estética cinematográfica e a compreensão de nós mesmos por IVANICK LOPANDZA"],
  ["16:00", "Desplastificar por ESTRELA MATILDE"],
  ["16:20", 'VIDEO TED TALK: Harvey Fineberg - "Estamos prontos para a neoevolução?"'],
  ["16:40", "Caminhando rumo ao amor comunitário por MOISÉS VIEGAS"],
  ["17:00", "Uma criança com necessidades especiais pode contribuir para o desenvolvimento do país? por ANA MOTA"],
  ["17:20", "A grande contradição: globalização vs tribalismo/nacionalismo por SOUSA JAMBA"],
  ["17:40", "Performance MC KARBOSS (Sentimento de Culpa / Gându / Bom dia Primo / Noémia / San City)"],
  ["18:00", "Networking & Coffee Break"],
  ["18:30", "A floresta vista através de um prato de calulu por MEYER ANTÓNIO"],
  ["18:50", 'VIDEO TED TALK: Camille A. Brown - "Uma história visual da dança social em 25 movimentos"'],
  ["18:55", "Os nossos netos já nascem com dívidas por FILINTO COSTA ALEGRE"],
  ["19:15", "Ideias que valem milhões por EDITE TEN JUA"],
  ["19:35", "Futuro inevitável: do papel ao digital por LUISÉLIO PINTO"],
  ["19:55", "Sorteio"],
  ["20:05", "Redesenhar a energia nas ilhas sustentáveis por MÉ-CHINHÔ"],
  ["20:25", "O cancro não é uma sentença de morte por MARIA JOSÉ PRAZERES"],
  ["23:00", "X After Dark after party no Pirata Lounge Beach"],
];

const talkTitles = new Map([
  ["estrela-matilde", "Desplastificar"],
  ["moises-viegas", "Caminhando rumo ao amor comunitário"],
  ["meyer-antonio", "A floresta vista através de um prato de calulu"],
  ["any-moreira", "Performance ANY MOREIRA"],
  ["sousa-jamba", "A grande contradição: globalização vs tribalismo/nacionalismo"],
  ["ana-mota", "Uma criança com necessidades especiais pode contribuir para o desenvolvimento do país?"],
  ["edite-ten-jua", "Ideias que valem milhões"],
  ["ivanick-lopandza", "A estética cinematográfica e a compreensão de nós mesmos"],
  ["me-chinho", "Redesenhar a energia nas ilhas sustentáveis"],
  ["maria-jose-prazeres", "O cancro não é uma sentença de morte"],
  ["karboss", "Performance MC KARBOSS"],
  ["luiselio-pinto", "Futuro inevitável: do papel ao digital"],
  ["filinto-costa-alegre", "Os nossos netos já nascem com dívidas"],
]);

const sponsors = [
  ["CST", "2018/09/cst.svg"],
  ["Espaços", "2018/09/espacos.svg"],
  ["BISTP", "2018/09/bistp.jpg"],
  ["Super Bock", "2018/09/Super_Bock_Logo.png"],
  ["Innova", "2018/09/41466059_2665922260299729_6637344460969607168_n.png"],
  ["STP Digital", "2018/09/stp-digital.jpg"],
  ["TAP", "2018/09/tap-logo.png"],
  ["O Pirata", "2018/09/42128764_439824949874389_1411251443725238272_n.png"],
  ["Seguritas", "2018/09/42094445_490132891464187_8555544075896356864_n.png"],
  ["Copinet", "2018/09/copinet.jpg"],
  ["Cacau", "2018/09/cacau.jpg"],
  ["Ondas Divinas", "2018/09/ondas-divinas.jpg"],
  ["HBD", "2018/09/hbd.jpg"],
  ["Frutinón", "2018/09/frutinon.jpg"],
  ["@quistp", "2018/09/aquistp.jpg"],
  ["Páginas Amarelas", "2018/09/paginas-amarelas.jpg"],
  ["Rádio Nacional de São Tomé e Príncipe", "2018/09/rnstp.jpg"],
  ["Televisão Santomense", "2018/09/tvs.jpg"],
  ["Galo Cantá", "2018/09/galo-canta.jpg"],
];

function queryJson(sql) {
  const output = execFileSync(
    mysql,
    [
      `--defaults-file=${mysqlDefaults}`,
      "-uroot",
      "-proot",
      "-D",
      "local",
      "--batch",
      "--raw",
      "--skip-column-names",
      "-e",
      sql,
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );

  return JSON.parse(output.trim());
}

function cleanHtml(html) {
  const cleaned = html
    .replace(/\r\n/g, "\n")
    .replace(/<span\b[^>]*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<a\b[^>]*>/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<([a-z0-9]+)\b[^>]*>/gi, "<$1>")
    .replace(/<\/?div>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (/<p>|<ul>|<ol>|<blockquote>/i.test(cleaned)) {
    return cleaned;
  }

  return cleaned
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("\n");
}

function copyAsset(relativeSource, targetFolder) {
  const source = path.join(uploadsRoot, relativeSource);
  const filename = path.basename(relativeSource);
  const destinationDir = path.join(outputRoot, "public/images", targetFolder);
  mkdirSync(destinationDir, { recursive: true });
  copyFileSync(source, path.join(destinationDir, filename));
  return `/images/${targetFolder}/${filename}`;
}

function toTs(value) {
  return JSON.stringify(value, null, 2);
}

const pageRows = queryJson(`
SELECT JSON_ARRAYAGG(
  JSON_OBJECT(
    'id', ID,
    'name', post_title,
    'slug', post_name,
    'content', post_content,
    'imagePath', image_path
  )
)
FROM (
  SELECT
    p.ID,
    p.post_title,
    p.post_name,
    p.post_content,
    filemeta.meta_value AS image_path
  FROM wp_posts p
  JOIN wp_postmeta thumb ON thumb.post_id = p.ID AND thumb.meta_key = '_thumbnail_id'
  JOIN wp_postmeta filemeta ON filemeta.post_id = thumb.meta_value AND filemeta.meta_key = '_wp_attached_file'
  WHERE p.post_type = 'page'
    AND p.post_status = 'publish'
    AND p.ID <> 8
  ORDER BY p.ID
) pages;
`);

const speakers = pageRows.map(({ name, slug, content, imagePath }) => ({
  name,
  slug,
  image: copyAsset(imagePath, "speakers"),
  talk: talkTitles.get(slug) ?? name,
  bioHtml: cleanHtml(content),
}));

const sponsorData = sponsors.map(([name, file]) => ({
  name,
  image: copyAsset(file, "sponsors"),
}));

const siteTs = `export const navItems = [
  { label: "Sobre TEDx", href: "/#about" },
  { label: "Oradores", href: "/#speakers" },
  { label: "Programa", href: "/#programme" },
  { label: "Parceiros", href: "/#sponsors" },
];

export const speakers = ${toTs(speakers)};

export const sponsors = ${toTs(sponsorData)};

export const programme = ${toTs(programme)} as const;

export const pastEvents = [
  {
    year: "2013",
    theme: "Islands Connected",
    date: "25.06.2013 - HOTEL PRAIA",
    image: "/images/2013.jpg",
  },
  {
    year: "2014",
    theme: "Ponto Sem Retorno",
    date: "15.07.2015 - BIBLIOTECA NACIONAL",
    image: "/images/2014.jpg",
  },
  {
    year: "2015",
    theme: "Ponto Sem Retorno",
    date: "15.07.2015 - BIBLIOTECA NACIONAL",
    image: "/images/2015.jpg",
  },
  {
    year: "2016",
    theme: "Transcendência",
    date: "25.07.2016 - HOTEL PESTANA",
    image: "/images/2016.jpg",
  },
];

export const socialLinks = [
  { label: "Facebook", short: "Fb", href: "https://www.facebook.com/tedxsaotome" },
  { label: "Instagram", short: "Ig", href: "https://www.instagram.com/tedxsaotome/" },
  { label: "Twitter", short: "Tw", href: "https://twitter.com/tedxsaotome" },
  { label: "YouTube", short: "Yt", href: "https://www.youtube.com/results?search_query=tedxsaotome" },
];
`;

writeFileSync(path.join(outputRoot, "src/data/site.ts"), siteTs);
console.log(`Imported ${speakers.length} speakers and ${sponsorData.length} sponsors.`);
