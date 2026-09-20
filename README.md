# Home Manager — home reconstruída

Site estático. Sem build, sem dependências: abra `index.html` ou sirva a pasta.

```
python -m http.server 8777
```

## Regras de fundo
Só **branco puro** (`#FFFFFF`) e **preto** (`#0A0A0B`). Nada de bege ou cinza morno.
As seções alternam: hero (foto escura) · números (branco) · ambientes (preto) ·
destaques (branco) · vitrine (branco) · por que escolher (preto) ·
aplicativo (branco) · depoimentos (branco) · contato (preto) · rodapé (preto).

## Produtos

Abas por **função** (Smart Center · Iluminação · Interruptores · Cortinas ·
Áudio e clima · Sensores · Integração · Acessórios), com **"Todos" por último**.

Estrutura:

1. **Produto em destaque à esquerda**, grande, sobre um fundo tecnológico suave
   (anéis que respiram, dois círculos tracejados girando, brilho pulsando).
2. **Características em pílulas pretas à direita**, alinhadas.
3. Abaixo, centralizados: nome, categoria, **parágrafo de apresentação** e o
   link para a página do produto.
4. **Uma linha.**
5. Abaixo dela, a **fileira do segmento** — cada produto num **círculo**, nome
   embaixo. Clicar troca o destaque, as pílulas e o texto. O ativo ganha anel
   azul-marinho.

Estado inicial: aba **Smart Center**, com a **Nova Smart Center** em destaque.
Na aba **Todos** aparecem os 21, todos em opacidade cheia.

### Imagens de produto
`assets/produtos/3d/` traz os **renders 3D oficiais de 2025**, com fundo
transparente de verdade — vindos de
`D:\Clientes_02\Home_Manager5\Home_Manager_Módulos_2025\Módulos_3d_2025`.
São 9 dos produtos do catálogo: Smart Center, Entradas, X-1, X-2, X-4, X-8,
RGBW, 0 a 10 e Sensor.

Os outros 11 (Home One, SmartPad, liberações, acessórios de infravermelho e
adaptadores) ainda usam as fotos antigas, **com fundo branco**. Por isso a seção
de produtos vive em fundo branco e as imagens usam `mix-blend-mode: multiply`.
Quando chegarem os renders desses 11, dá para levar a seção para o preto.

Não tente recortar o fundo das fotos antigas por preenchimento. Já foi testado
duas vezes:

- tolerância larga (26) come os módulos de corpo branco inteiros;
- tolerância estreita (228–247) resolve 9 das 11, mas **`blaster-ir` e
  `smartpad` continuam impossíveis**: o corpo branco encosta num fundo cinza
  em degradê, então não existe limiar que separe os dois.

Enquanto essas duas não tiverem render com alfa, a seção de produtos não pode
ir para o preto — sobre preto o `multiply` apaga qualquer corpo claro.

### De onde vêm os textos
Das **páginas de produto da própria Home Manager**
(`homemanager.com.br/produtos/<slug>/`): o parágrafo de apresentação e o bloco
"CARACTERÍSTICAS". Nada foi inferido. Ao trocar um produto, atualize `data-desc`
e `data-feats` para continuarem batendo com a página oficial.

## Direção visual
- **Hero** no padrão da referência *Elevate*: fotografia de ponta a ponta, navegação
  em pílula de vidro flutuante, faixa de categorias atravessando a imagem, título
  embaixo à esquerda e texto de apoio à direita.
- **Corpo** no padrão da referência *Homely*: títulos centralizados em caixa baixa
  com um trecho em peso forte, cartões arredondados, abas segmentadas em pílula,
  faixa de números e blocos escuros de contraste.
- Uma única família tipográfica: **Montserrat**, pesos 200 a 700.
- Slogan: **A sua casa vai entender você.**

## Seções
Hero · números · ambientes · destaques · catálogo · por que escolher ·
aplicativo · depoimentos · contato · rodapé.

## Arquivos
| Caminho | O que é |
|---|---|
| `index.html` | a página inteira |
| `assets/css/site.css` | sistema visual e componentes |
| `assets/js/site.js` | comportamento (nada é obrigatório para ler a página) |
| `assets/brand/` | logo em duas variantes, ícones, favicon |
| `assets/produtos/` | as 21 fotos de produto (material da marca) |
| `assets/ambientes/` | fotografia de interiores — ver licenciamento abaixo |
| `assets/sistema/` | telas reais do aplicativo |
| `assets/legado/` | tudo que foi baixado do site antigo, sem tratamento |
| `brand-spec.md` | paleta, tipografia, regras de imagem |
| `docs/referencia-site-atual.md` | levantamento do site antigo |

## Fotografia de ambiente — atenção
A Home Manager **não tem fotografia de interiores** no material existente: o site
antigo só usava placas lavadas e as fotos pequenas embutidas nas telas do app.

Os seis ambientes do palco foram **fornecidos pelo cliente** (imagens geradas por
IA, entregues em 20/09/2026). São da mesma casa fictícia, o que dá coerência de
arquitetura, luz e paleta entre os cômodos — coisa que o banco CC0 anterior não
tinha. Cada um vem em duas versões: a grande para o palco e uma `-min` de 420px
para o círculo da miniatura, para a fileira não baixar seis fotos inteiras.

| Arquivo | Cômodo | Origem |
|---|---|---|
| `sala.jpg` | Sala de estar | cliente (IA) |
| `suite.jpg` | Suíte master | cliente (IA) |
| `cozinha.jpg` | Cozinha | cliente (IA) |
| `garagem.jpg` | Garagem | cliente (IA) |
| `quarto.jpg` | Quarto | cliente (IA) |
| `banho.jpg` | Banheiro | cliente (IA) |

`sala.jpg` e `suite.jpg` reaproveitaram o nome de fotos CC0 antigas, então o HTML
aponta para elas com `?v=2` — sem isso o navegador de quem já visitou continua
servindo a imagem velha do cache.

O **hero ainda usa a foto CC0** (`hero.jpg`, "Interior luxury Buckhead condo",
rawpixel, domínio público). É a única imagem de banco que sobrou, e destoa das
outras seis. Vale pedir ao cliente uma imagem da mesma série para substituí-la.

Para produção, o ideal continua sendo foto de projeto real da empresa: dá
credibilidade que imagem gerada não dá. Basta trocar os arquivos mantendo os
nomes — e subir o `?v=` de quem for reaproveitar nome.

O registro por arquivo está em `assets/ambientes/CREDITOS.json`.

## Regras que não devem ser quebradas
- **É um showroom de produto.** Nada de arquitetura de sistema, topologia ou
  telemetria: a Home Manager não publica isso e seria inferência.
- Especificação técnica só para o Módulo X-8, que a tem impressa no corpo.
- Fotos de produto sobre fundo claro precisam de `mix-blend-mode: multiply`, e
  nenhum ancestral entre a imagem e o fundo pode criar contexto de empilhamento
  (`z-index`, `transform`) — senão a mescla para de funcionar.
- Legenda sobre foto precisa de `z-index`: o `::after` do véu pinta acima do
  conteúdo normal e apagaria o texto.
- Todo movimento é desligado sob `prefers-reduced-motion`.
