# Referência — homemanager.com.br (site atual)

Fonte: `Site_HM/Ref/Home Manager – Automação Residencial.html` (snapshot da home).
Stack original: WordPress 4.9.26 + tema **Deploy** (Mikado/`mkdf-`) + Visual Composer 5.1 + Slider Revolution 5.1.6 + Contact Form 7.
Fontes: Open Sans + Montserrat. Grid: `mkdf-grid-1300` (1300px). Header sobreposto ao slider (`margin-top: -149px`), altura 149px, sticky on scroll.

## Paleta identificada
| Uso | Cor |
|---|---|
| Azul escuro (faixa "Por que escolher") | `#074669` |
| Azul-marinho (faixa final / rodapé) | `#1f2f48` |
| Azul claro (ícones) | `#92d3ef` |
| Fundo de conteúdo | `#ffffff` |

## Navegação
Menu (4 itens, também em versão sticky e mobile):
1. EMPRESA → `/empresa/`
2. SOLUÇÕES → `/solucoes/`
3. CONTATO → `/contact-page-2/`
4. `| Acesso ao Sistema |` → `/acesso-ao-sistema/`

Logo: `home_manager_logo-1-e1540908250170.png`. Favicon: `pin_mapa_site.png`.

## Estrutura da home (ordem das seções)

### 1. Top bar
Vazia (widget sem conteúdo), fundo `rgba(255,255,255,.26)`.

### 2. Hero — Slider Revolution `rev_slider_1_1` (full width)
6 slides, textos em PNG (não há texto real — copy precisa ser reescrita):
| # | Imagem de fundo | Camadas | Link |
|---|---|---|---|
| rs-66 | `solucao_final_02.jpg` | `solucao_chamada.png`, `solucao_apoio.png`, `solucao_barra.png` | — |
| rs-12 | `X-8_atualizado-2.jpg` | `X-8_textos.png` | — |
| rs-10 | `Smart_Center_2021_FUNDO_Novo.jpg` | chamada + 3 linhas de apoio + barra + `SMART_SITE.gif` | Smart Center |
| rs-11 | `home_one_2021.jpg` | chamada + 3 linhas de apoio + barra | Home One |
| rs-52 | `abertura_2021.jpg` | `fechamento_abertura.png`, `abertura_apoio.png` | — |
| rs-74 | transparente | — | — |

### 3. "Conheça as soluções HM" — grade de produtos
Banner-título em imagem (`Conheça_as_soluções_HM.jpg`). Fundo branco, padding 30/88.
Grade **6 colunas** com filtro isotope + "load more". Categorias do filtro:
`All · Acessórios (63) · Áudio&Vídeo/Climatização (60) · Cortinas/Persianas (58) · Iluminação (57) · Integração (62) · Interruptores (59) · Sensores (61) · Smart Center (56)`

21 produtos (hover com overlay + título):

| # | Produto | Categorias | Slug |
|---|---|---|---|
| 1 | Nova Smart Center | 56 | `smart-center` |
| 2 | Home One | 58,57,59,61 | `home-one` |
| 3 | Módulo Entradas | 59 | `modulo-entradas` |
| 4 | Módulo X-1 | 57 | `modulo-x-1` |
| 5 | Módulo X-2 | 58,57,59 | `modulo-x-2` |
| 6 | Módulo X-4 | 58,57,59 | `modulo-x-4` |
| 7 | Módulo X-8 | 58,57,59,61 | `modulo-x-8` |
| 8 | Módulo RGBW | 57 | `modulo-rgbw` |
| 9 | Módulo 0 a 10 | 57 | `modulo-0-a-10` |
| 10 | Módulo Sensor | 61 | `sensor` |
| 11 | Módulo Infravermelho | 60 | `modulo-infravermelho` |
| 12 | SmartPad | 59 | `teclado-smartpad` |
| 13 | Liberação Controle de Acesso | 62 | `liberacao-controle-de-acesso` |
| 14 | Liberação Câmera IP | 62 | `liberacao-camera-ip` |
| 15 | Blaster Infravermelho de Mesa | 63 | `blaster-ir-de-mesa` |
| 16 | Blaster Infravermelho | 63,60 | `blaster-infravermelho` |
| 17 | Emissor Infravermelho | 60 | `emissor-infravermelho` |
| 18 | Módulo Blaster | *(sem categoria)* | `modulo-blaster` |
| 19 | Extensor Infravermelho | 63 | `extensor_ir` |
| 20 | Adaptador Sensor Luminosidade | 63,61 | `adaptador-sensor-luminosidade` |
| 21 | Adaptador Sensor Temperatura | 63,61 | `adaptador-sensor-temperatura` |

> Obs.: itens 20 e 21 compartilham a mesma thumbnail (`adaptador_sensor_temp_thumb.jpg`) — corrigir na reconstrução. Item 18 ficaria fora de qualquer filtro.

### 4. "Por que escolher a HM" — 4 benefícios
Banner-título em imagem (`Por_que_escolher_HM.jpg`), faixa `#074669`, texto branco, ícones Font Awesome `#92d3ef`, animação from-bottom escalonada (200/400/600/800ms).

1. **Bem-estar** (`fa-child`) — "Formatação de cenários inteligentes para o seu ambiente, garantindo o máximo de conforto e bem-estar para você e sua família."
2. **Maior Segurança** (`fa-shield`) — "Monitoramento de espaços residenciais e corporativos através de câmeras e sensores de presença, luminosidade, fumaça, temperatura, inundação e intrusão."
3. **Redução de Custos** (`fa-bar-chart`) — "Projetos desenvolvidos para a menor intervenção civil e redução de consumo de energia - adaptados conforme as suas necessidades."
4. **Facilidade de Uso** — "Mobilidade no acesso e configuração de todos os parâmetros disponíveis, a partir de qualquer localidade, através de celular, tablet ou computador."

### 5. Slider do sistema — `rev_slider_4_2`
Telas do software, tudo em imagem: `Slide_final_sistema_02/03/04/05/06/60.jpg`.

### 6. Slider técnico/diferenciais — `rev_slider_25_3`
Camadas sobre `fundo_slide_01.jpg` / `fundo.jpg`: `Facil_Instalação.png`, `robustez-1.png`, `eficiencia.png`, `arquitetura-1.png`, `dados-1.png`, `modulo.png`, `trilho.png`, `trilho_vale.png`, `labels.png`, `icones-1.png`, `linha.png`.

### 7. Depoimentos (3 colunas, fundo branco)
| Título | Imagem | Depoente / link |
|---|---|---|
| VERSATILIDADE | `versatilidade-2.jpg` | Home & Tech – Áudio, Vídeo e Automação → homeetech.com.br |
| SATISFAÇÃO | `satisfacao.jpg` | Kistech Automação e Home Theater → kistech.com.br |
| ESTABILIDADE | `estabilidade.jpg` | Cláudio – Construtora Clave → clave.com.br |

Textos completos:
- **Versatilidade:** "É um produto de excelente acabamento, discreto e com tecnologia agregada de altíssimo nível. Os módulos são resistentes e de fácil manuseio, com as informações necessárias para a instalação no próprio equipamento. O software, muito intuitivo, permite diversas configurações e uma real customização por parte do cliente final."
- **Satisfação:** "Escolhemos a solução da Home Manager para oferecer aos nossos clientes por várias razões: praticidade na instalação, robustez no funcionamento, interface intuitiva, suporte eficaz e pela constante modernização e desenvolvimento de novas soluções. Entre todas as marcas que já trabalhamos, a Home Manager foi a que trouxe maior satisfação para nós e nossos clientes."
- **Estabilidade:** "O que impressiona é a estabilidade do sistema que com quase um ano de funcionamento ininterrupto nunca parou. Temos tudo acessível por tablets e smartphones, que são usados como controle universal. A interface gráfica foi toda personalizada de acordo com nossa solicitação, incluindo cenários projetados para cada ambiente da residência."

### 8. "Siga a Home Manager"
Título H3 centralizado + separador azul + 2 ícones:
- Facebook `facebook.com/homemanager.ar` → legenda `homemanager.ar`
- Instagram `instagram.com/home.manager` → legenda `home.manager`

### 9. Rodapé (`#1f2f48`, 3 colunas, texto cinza)
| Coluna 1 | Coluna 2 | Coluna 3 |
|---|---|---|
| **Home Manager – Automação Residencial**<br>Política de Privacidade<br>Política da Empresa | **Contato**<br>Fone: (51) 3062-1910<br>Suporte WhatsApp: (51) 92003-4550<br>Email: contato@homemanager.com.br | **Endereço**<br>Av. Ceará, 1629 – São João<br>Porto Alegre / RS<br>CEP: 90240-512 |

## Pontos a resolver na reconstrução
- **Toda a copy do hero e dos títulos de seção está em imagem** (PNG/JPG) — não há texto para SEO nem para leitores de tela. Precisa virar HTML real.
- Dependências pesadas (Revolution Slider, Visual Composer, jQuery UI, Google Maps API com chave exposta) podem ser substituídas por CSS/JS nativo.
- Sem meta description, sem OG tags, sem dados estruturados.
- Chave da Google Maps API aparece em texto claro no HTML original — não replicar.
- Encoding do arquivo de origem é misto (UTF-8 com bytes CP1252 soltos em alguns travessões).
