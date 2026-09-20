# Brand spec — Home Manager

Derivada dos assets reais baixados de homemanager.com.br (não de suposição).
Todos os caminhos são relativos à raiz do projeto.

## Logo
| Variante | Arquivo | Uso |
|---|---|---|
| Fundo claro (wordmark azul-tinta) | `assets/brand/logo.png` | header condensado sobre seções claras, rodapé claro |
| Fundo escuro (wordmark branco) | `assets/brand/logo-sticky.png` | header sobre o hero, rodapé escuro |
| Símbolo / favicon | `assets/brand/favicon.png` | aba do navegador |

O símbolo é uma casa em contorno azul com onda Wi-Fi — sempre legível sobre claro e escuro.

## Paleta (extraída por amostragem dos assets)
| Token | Hex | Origem real |
|---|---|---|
| `--ink` | `#041B2D` | grade escuro derivado do azul-tinta do logo |
| `--ink-2` | `#072C45` | idem, um passo acima |
| `--navy` | `#003C60` | cor dominante do wordmark do logo |
| `--slate` | `#2E5470` | azul-ardósia impresso no corpo do Módulo X-8 |
| `--sky` | `#54A8D8` | azul médio do símbolo da casa |
| `--sky-2` | `#78CCF0` | azul claro da onda Wi-Fi |
| `--led` | `#5BD4DE` | **LED ciano** — barra de luz do Smart Center e status do X-8 |
| `--pearl` | `#F2F5F7` | branco-pérola do corpo dos módulos |

`--led` é o acento único. É a assinatura da marca: o equipamento literalmente emite essa luz.

## Tipografia
- Display: **Sora** 700/800 — geométrica, técnica; ecoa o peso do wordmark.
- Texto: **Archivo** 400/500/600.
- Técnica: **JetBrains Mono** 500, caixa alta, entreletra aberta — imita as legendas serigrafadas no hardware (`ENTRADAS DIGITAIS`, `REDE IP`, `SAÍDAS`).

## Imagens de produto
21 fotos reais em `assets/produtos/`, todas sobre fundo branco — por isso a grade de produtos vive numa seção clara.
Cenas de ambiente em `assets/cenas/`, telas reais do aplicativo em `assets/sistema/`.

## Movimento e efeitos
Conceito: **a casa acorda**. A pagina percorre noite -> amanhecer -> dia -> anoitecer,
e as viradas entre claro e escuro sao degrades, nunca cortes secos.

- Fio de luz ciano de 1px na lateral, com a cabeca acesa acompanhando o scroll.
- Malha de sinal em canvas no hero (decorativa), que reage ao cursor.
- Grao de filme e foco de luz que segue o cursor nas secoes escuras.
- Inclinacao 3D leve com brilho especular nos cartoes e nas placas de produto.
- Botoes magneticos e varredura de luz no hover.
- Etiquetas monoespacadas que "decodificam" ao entrar na tela.
- Easing padrao `cubic-bezier(.2,.8,.2,1)`. Tudo desligado sob `prefers-reduced-motion`.

## Como as fotos de produto sao montadas
Todas as fotos vem sobre fundo branco. Duas regras:
- **Sobre placa clara** (showroom): `mix-blend-mode: multiply` apaga o branco e
  preserva produto e sombra. Nenhum ancestral entre a imagem e o fundo da placa
  pode ter `z-index` ou `transform` proprio, senao cria contexto de empilhamento
  e a mescla para de enxergar a placa.
- **Sobre cartao branco** (catalogo): nada a fazer, o branco ja coincide.
Nunca usar `screen` sobre fundo escuro: isso destroi os modulos brancos da linha.

## Fatos verificados (nao inventar nada alem destes)
- 21 produtos, 8 categorias, com as mesmas atribuicoes do site atual.
- Modulo X-8, lido da propria serigrafia do produto: 12 entradas digitais,
  8 saidas, 1 entrada analogica, Rede IP Ethernet, Zigbee, LED de status.
  Nenhum outro produto teve especificacao publicada aqui.
- Contato: (51) 3062-1910 - WhatsApp (51) 92003-4550 - contato@homemanager.com.br
- Endereco: Av. Ceara, 1629 - Sao Joao, Porto Alegre/RS, CEP 90240-512
- Depoimentos: Home & Tech, Kistech, Claudio (Construtora Clave) - textos
  integrais em `docs/referencia-site-atual.md`.

## Fora de escopo
A pagina e um **showroom de produto**. Nao descreve arquitetura de sistema,
topologia, plantas de instalacao nem telemetria: nada disso esta publicado pela
Home Manager e seria inferencia.
