import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { EditionNav } from "@/components/edition-nav";
import { SpeakerDirectory } from "@/components/speaker-directory";
import { CopyValue } from "@/components/copy-value";
import { contrastRatio, designTokens, identitySections, specimenSpeakers, tokensCss, tokenValues } from "@/content/design-system";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/identity-guide.module.css";

export const metadata = pageMetadata({
  title: "Identidade visual e design system",
  description: "Guia da identidade visual TEDxSãoTomé e do sistema do arquivo digital: logótipo histórico, cores, tipografia, tokens, componentes e acessibilidade.",
  path: "/identidade/",
});

export default function IdentityPage() {
  return <>
    <SiteNav />
    <main id="main-content">
      <header className={styles.hero}>
        <div className="container">
          <Link href="/" className={styles.back}>TEDxSãoTomé / Guia visual</Link>
          <div className={styles.heroGrid}>
            <div><h1>Identidade visual.<br />Sistema digital.</h1><p>A marca que liga as nossas edições. As ferramentas que dão forma ao arquivo.</p><span className={styles.version}>CVI e design system do website · v{designTokens.version}</span></div>
            <div className={styles.heroLogo}><Image src={designTokens.archiveLogo.path} alt="Logótipo histórico TEDxSãoTomé de 2018" width={1396} height={246} sizes="(max-width: 760px) 85vw, 520px" preload /><p>Arte original de 2018, preservada sem alterações.</p></div>
          </div>
        </div>
      </header>
      <div className={`container ${styles.layout}`}>
        <nav className={styles.contents} aria-label="Secções do guia de identidade">
          {identitySections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
          <a className={styles.downloadNav} href="/brand/design-tokens.json" download>Descarregar tokens</a>
        </nav>
        <div className={styles.sections}>
          <section id="marca" className={styles.section} aria-labelledby="marca-title">
            <h2 id="marca-title">Marca e logótipo</h2>
            <p className={styles.lead}>TEDxSãoTomé, por inteiro. Uma identidade local, um evento organizado de forma independente.</p>
            <div className={styles.logoSpecimen}><div><Image src={designTokens.archiveLogo.path} alt="TEDxSãoTomé, incluindo a assinatura original do evento independente" width={1396} height={246} sizes="(max-width: 760px) 80vw, 660px" /></div></div>
            <div className={styles.specimenCaption}><span>Logótipo histórico · letras brancas · fundo preto</span><a href={designTokens.archiveLogo.path} download="tedxsaotome-logo-2018.svg">Descarregar SVG</a></div>
            <div className={styles.twoColumns}>
              <div><h3>Preservar a origem</h3><p>O SVG é o mesmo ficheiro guardado no arquivo de design de 2018. Mantemos o vermelho <code>#EC1C24</code>, as proporções e a assinatura original. Não é uma nova versão do logótipo.</p></div>
              <div><h3>Usar com cuidado</h3><p>Manter o nome completo e as proporções. Reservar espaço livre à volta, não juntar a marca a outros logótipos e usar um fundo preto liso para esta versão de letras brancas.</p></div>
            </div>
            <aside className={styles.notice}><h3>Arquivo histórico, orientação atual</h3><p>Este guia documenta o arquivo e o website; não substitui as normas TEDx. Para novas aplicações, consultar as <a href="https://www.ted.com/tedx/organizer-guide/design-and-promote-event">orientações oficiais de identidade TEDx</a>. A marca atual especifica o vermelho <code>#EB0028</code>; os ficheiros históricos continuam intactos.</p></aside>
          </section>
          <section id="cores" className={styles.section} aria-labelledby="cores-title">
            <h2 id="cores-title">Cores com uma função</h2>
            <p className={styles.lead}>O vermelho destaca. Os neutros dão espaço às pessoas, às imagens e às ideias. Estes são os valores usados pelo website.</p>
            <ul className={styles.palette}>
              {designTokens.colors.map((color) => <li key={color.variable} className={styles.colorCard}>
                <div className={styles.colorSample} style={{ backgroundColor: color.value, color: color.text }}><span>Aa</span><span>{contrastRatio(color.value, color.text).toFixed(2)}:1</span></div>
                <div className={styles.colorCopy}><h3>{color.name}</h3><code>{color.value.toUpperCase()}</code><small>{color.variable}</small><p>{color.usage}</p><CopyValue value={color.value} label={`Copiar ${color.name}: ${color.value}`} /></div>
              </li>)}
            </ul>
            <p className={styles.caption}>Os rácios apresentados são calculados entre o fundo e o texto de cada amostra. O vermelho de ação é a escolha para links de texto; a cor de linha é apenas decorativa.</p>
            <div className={styles.contrastExamples}><div><strong>Texto sobre branco</strong><p>Biografias e descrições em <code>--muted</code>.</p><span>{contrastRatio(tokenValues["--muted"], tokenValues["--white"]).toFixed(2)}:1</span></div><div><strong>Links sobre branco</strong><Link href="/oradores/">Conhecer os oradores</Link><span>{contrastRatio(tokenValues["--red-dark"], tokenValues["--white"]).toFixed(2)}:1</span></div></div>
          </section>
          <section id="tipografia" className={styles.section} aria-labelledby="tipografia-title">
            <h2 id="tipografia-title">Tipografia direta</h2>
            <p className={styles.lead}>Arial para a interface, com Helvetica Neue e Helvetica como alternativas locais. Sem fontes externas para carregar.</p>
            <div className={styles.typeSpecimen}><span>Aa</span><p>Ideias das ilhas.<br />São Tomé e Príncipe.</p><small>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />Àá Ââ Ãã Çç Éé Íí Óó Õõ Úú · 0123456789</small></div>
            <div className={styles.typeRows}>
              <div><small>Título de página · 38–68px · 700</small><p className={styles.typeDisplay}>Muitas vozes.</p></div>
              <div><small>Título de secção · 28–44px · 700</small><p className={styles.typeHeading}>Uma ideia pode ligar-nos.</p></div>
              <div><small>Texto · 16px · 400 · entrelinha 1.65</small><p className={styles.typeBody}>O arquivo reúne as pessoas e os programas das cinco edições do TEDxSãoTomé. As biografias referem-se ao ano de cada participação.</p></div>
              <div><small>Metadados · 13px · 400</small><p className={styles.typeMeta}>TEDxSãoTomé 2018 — perfil histórico</p></div>
            </div>
            <p className={styles.caption}>A escala responde ao ecrã e ao contexto. A tipografia de interface não serve para reconstruir o logótipo: utilizar sempre o ficheiro de arte original.</p>
          </section>
          <section id="layout" className={styles.section} aria-labelledby="layout-title">
            <h2 id="layout-title">Espaço para respirar</h2>
            <p className={styles.lead}>Conteúdo alinhado à esquerda, colunas que se adaptam e espaço suficiente para ler e tocar.</p>
            <div className={styles.spacingScale}>{designTokens.primitives.filter((token) => token.variable.startsWith("--space-")).map((token) => <div key={token.variable}><span style={{ width: token.value }} /><code>{token.value}</code><small>{token.variable}</small></div>)}</div>
            <p className={styles.caption}>Esta escala torna explícitos os espaçamentos usados nos novos exemplos do guia. O arquivo anterior mantém os seus estilos; não é uma normalização de todas as páginas.</p>
            <dl className={styles.metrics}><div><dt>Largura máxima do conteúdo</dt><dd>{tokenValues["--content"]}</dd></div><div><dt>Alvo mínimo de interação</dt><dd>{tokenValues["--control-min"]} × {tokenValues["--control-min"]}</dd></div><div><dt>Cantos dos controlos / cartões</dt><dd>{tokenValues["--radius-control"]} / {tokenValues["--radius-card"]}</dd></div><div><dt>Transição breve</dt><dd>{tokenValues["--motion-fast"]}</dd></div></dl>
          </section>
          <section id="componentes" className={styles.section} aria-labelledby="componentes-title">
            <h2 id="componentes-title">Componentes em uso</h2>
            <p className={styles.lead}>Exemplos funcionais dos mesmos componentes que aparecem no website. Não são imagens de uma interface.</p>
            <div className={styles.componentBlock}><h3>Ações</h3><p>A ação principal conduz ao conteúdo. A variante de contorno vive sobre uma superfície escura. Passe o rato ou navegue com Tab para ver os estados.</p><div className={styles.actionExamples}><div><Link className="button button--primary" href="/oradores/">Conhecer os oradores</Link><small>Principal · fundo claro</small></div><div className={styles.darkExample}><Link className="button button--ghost" href="/videos/">Ver as palestras</Link><small>Contorno · fundo escuro</small></div></div></div>
            <div className={styles.componentBlock}><h3>Navegação por edição</h3><p>Links reais para as cinco edições do arquivo. Em cada página de edição, a navegação identifica o ano atual.</p><EditionNav /></div>
            <div className={styles.componentBlock}><h3>Perfis, filtros e vídeo</h3><p>Uma amostra de três perfis históricos: retrato, imagem indisponível e apresentação gravada. Pesquise, filtre, abra um perfil ou carregue o vídeo para experimentar.</p><div className={styles.directorySpecimen}><SpeakerDirectory speakers={specimenSpeakers} /></div><Link className={styles.textLink} href="/oradores/">Explorar o diretório completo de 47 perfis</Link></div>
            <div className={styles.componentNotes}><div><h3>Cartão e perfil</h3><p>O nome abre o perfil sem perder a posição. Escape fecha, o foco regressa ao cartão e os links de edição continuam independentes.</p></div><div><h3>Leitor de vídeo</h3><p>A miniatura precede o leitor. O iframe só é carregado após uma ação e é removido quando o perfil fecha. Mantemos o link para a fonte original.</p></div></div>
          </section>
          <section id="acessibilidade" className={styles.section} aria-labelledby="acessibilidade-title">
            <h2 id="acessibilidade-title">Acessibilidade faz parte do sistema</h2>
            <p className={styles.lead}>Uma ideia deve poder ser encontrada, lida e explorada por diferentes pessoas.</p>
            <ul className={styles.checklist}><li>Foco visível em links, botões e campos. O estado não depende apenas da cor.</li><li>Nomes acessíveis nos controlos; filtros anunciam os resultados sem interromper a leitura.</li><li>Modais nativos com Escape, isolamento do fundo e retorno de foco.</li><li>Sem reprodução automática antes de uma ação; dar sempre acesso à fonte original.</li><li>Movimento reduzido respeitado e conteúdo utilizável em ecrãs estreitos.</li><li>Texto normal com contraste de pelo menos 4.5:1; limites essenciais de controlos com 3:1.</li></ul>
            <aside className={styles.notice}><h3>Compromisso, não certificação</h3><p>Estas são regras de implementação e teste. O guia não declara que todo o conteúdo histórico ou os leitores externos têm certificação de acessibilidade.</p></aside>
          </section>
          <section id="recursos" className={styles.section} aria-labelledby="recursos-title">
            <h2 id="recursos-title">Recursos para continuar</h2>
            <p className={styles.lead}>Copie os valores ou descarregue os ficheiros. Os tokens são locais ao website; o logótipo pertence ao arquivo histórico.</p>
            <div className={styles.downloads}><a href={designTokens.archiveLogo.path} download="tedxsaotome-logo-2018.svg"><strong>Logótipo histórico</strong><span>SVG · versão de 2018 sobre fundo preto</span></a><a href="/brand/design-tokens.json" download="tedxsaotome-design-tokens.json"><strong>Tokens do website</strong><span>JSON · cores, espaço, tipografia e interação</span></a></div>
            <div className={styles.codeBlock}><div><h3>Variáveis CSS</h3><CopyValue value={tokensCss} label="Copiar todas as variáveis CSS" /></div><pre tabIndex={0} aria-label="Variáveis CSS do sistema"><code>{tokensCss}</code></pre></div>
            <p className={styles.caption}>As cores e os tokens deste guia são verificados contra o CSS em cada execução de <code>pnpm check</code>. A arte do logótipo é validada pelo seu hash, sem alterar o original.</p>
            <div className={styles.sources}><h3>Origem e orientação</h3><p><code>legacy/wordpress-2018/design/tedxsaotome-logo.svg</code> — arte preservada de 2018.<br /><code>apps/web/src/app/globals.css</code> — cores e variáveis do website.</p><a href="https://www.ted.com/tedx/organizer-guide/design-and-promote-event">Guia oficial TEDx de identidade e promoção</a><a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">WCAG: contraste mínimo de texto</a><a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html">WCAG: contraste de elementos de interface</a></div>
          </section>
        </div>
      </div>
    </main>
    <SiteFooter />
  </>;
}
