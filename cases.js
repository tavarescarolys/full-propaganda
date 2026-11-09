/*
  Cases da parede, na ordem em que aparecem.

  slug      identifica o case na URL (#case-<slug>). Sem acentos nem espaços.
  imagem    nome-base dos arquivos em assets/cases/ (gerados por _build/build-images.py):
            <imagem>-480/-960/-1654.webp para o tile e <imagem>-peca-1200/-2000.webp
            para o visualizador.
  titulo    nome do case.
  descricao texto do visualizador.
  destaque  true deixa o tile em 2×2. Com 3 destaques a parede fecha sem buracos
            em 6, 4, 3 e 2 colunas (27 + 3×3 = 36 células).
  video     opcional. URL do YouTube ou Vimeo; o visualizador toca o vídeo no lugar da imagem.
*/
window.CASES = [
  {
    slug: "nova-sede-alego",
    imagem: "nova-sede-alego",
    titulo: "Nova Sede ALEGO – A casa é sua",
    descricao: "A campanha reforça a proximidade da instituição com a população e evidencia como a estrutura tecnológica contribui para mais eficiência, transparência e sustentabilidade no serviço público.",
    destaque: true
  },
  {
    // REVISAR: o título fala em Goiânia, mas a descrição fala em Aparecida de Goiânia.
    slug: "pref-goiania-desenvolvimento-economico",
    imagem: "pref-goiania-desenvolvimento-economico",
    titulo: "Pref de Goiânia – Desenvolvimento Econômico",
    descricao: "Campanha de prestação de contas da Prefeitura de Aparecida de Goiânia, destacando indicadores de crescimento econômico do município."
  },
  {
    slug: "pesquisa-planmob",
    imagem: "pesquisa-planmob",
    titulo: "Pesquisa PlanMob – Mobilidade começa com sua participação",
    descricao: "Campanha para incentivar a participação da população na Pesquisa PlanMob, iniciativa voltada ao planejamento da mobilidade urbana em Anápolis."
  },
  {
    slug: "alego-emendas-impositivas",
    imagem: "alego-emendas-impositivas",
    titulo: "ALEGO - Campanha Emendas Impositivas",
    descricao: "Campanha de divulgação das emendas impositivas da ALEGO, destacando como os recursos públicos são direcionados para áreas essenciais como saúde, educação, infraestrutura e assistência social."
  },
  {
    slug: "parque-itiquira-40-anos",
    imagem: "parque-itiquira-40-anos",
    titulo: "Parque Municipal do Itiquira – 40 anos",
    descricao: "A campanha convida o público a explorar as belezas do parque e reforçando o turismo de natureza, aventura e contemplação.",
    destaque: true
  },
  {
    slug: "iluminacao-anel-viario-go-040",
    imagem: "iluminacao-anel-viario-go-040",
    titulo: "Campanha para apresentar a Nova Iluminação do Anel Viário e GO-040 - Prefeitura de Aparecida de Goiânia",
    descricao: "Apresentou os 10 km de nova iluminação instalados no Anel Viário e GO-040."
  },
  {
    slug: "aniversario-anapolis",
    imagem: "aniversario-anapolis",
    titulo: "Campanha Aniversário de Anápolis - Prefeitura de Anápolis",
    descricao: "Campanha desenvolvida para celebrar os 116 anos de Anápolis."
  },
  {
    slug: "maio-amarelo-anapolis",
    imagem: "maio-amarelo-anapolis",
    titulo: "Maio Amarelo - Prefeitura de Anápolis",
    descricao: "Campanha Maio Amarelo - 2023."
  },
  {
    slug: "alego-100-dias",
    imagem: "alego-100-dias",
    titulo: "100 dias de gestão - Alego",
    descricao: "Campanha desenvolvida para apresentar os 100 primeiros dias (2023) de gestão da Alego."
  },
  {
    slug: "alego-projetos-2021",
    imagem: "alego-projetos-2021",
    titulo: "ALEGO",
    descricao: "Campanha desenvolvida para apresentar os principais projetos aprovados pela ALEGO no ano de 2021."
  },
  {
    slug: "goiania-88-anos",
    imagem: "goiania-88-anos",
    titulo: "Prefeitura de Goiânia",
    descricao: "Vídeo produzido para a Prefeitura de Goiânia em comemoração ao aniversário de 88 anos da capital.",
    destaque: true,
    video: "" // REVISAR: URL do vídeo no YouTube ou Vimeo
  },
  {
    slug: "sempre-chevrolet-black-november",
    imagem: "sempre-chevrolet-black-november",
    titulo: "Sempre Chevrolet",
    descricao: "Campanha Black November."
  },
  {
    slug: "goiania-capa-o-popular-brt",
    imagem: "goiania-capa-o-popular-brt",
    titulo: "Prefeitura de Goiânia",
    descricao: "Capa falsa para o jornal O Popular. Divulgação das alterações do BRT."
  },
  {
    slug: "schin",
    imagem: "schin",
    titulo: "Schin",
    descricao: "Divulgação de produto."
  },
  {
    slug: "formosa-dengue",
    imagem: "formosa-dengue",
    titulo: "Prefeitura de Formosa",
    descricao: "Anúncio nas principais mídias sobre medidas preventivas contra a dengue."
  },
  {
    slug: "anapolis-semana-conciliacao",
    imagem: "anapolis-semana-conciliacao",
    titulo: "Prefeitura de Anápolis",
    descricao: "Campanha Semana Nacional de Conciliação."
  },
  {
    slug: "formosa-emplacamento",
    imagem: "formosa-emplacamento",
    titulo: "Prefeitura de Formosa",
    descricao: "Campanha de incentivo para emplacamento no município."
  },
  {
    slug: "anapolis-natal-de-coracao",
    imagem: "anapolis-natal-de-coracao",
    titulo: "Prefeitura de Anápolis",
    descricao: "Campanha Natal de Coração"
  },
  {
    slug: "catalao-iptu-2019",
    imagem: "catalao-iptu-2019",
    titulo: "Prefeitura de Catalão",
    descricao: "Campanha para divulgação do IPTU 2019."
  },
  {
    slug: "fundacao-ecologica-revista",
    imagem: "fundacao-ecologica-revista",
    titulo: "Fundação Ecológica Nacional",
    descricao: "Revista para divulgação das ações do Patriota."
  },
  {
    slug: "formosa-prestacao-de-contas",
    imagem: "formosa-prestacao-de-contas",
    titulo: "Prefeitura de Formosa",
    descricao: "Campanha prestação de contas."
  },
  {
    slug: "fundacao-ecologica-site",
    imagem: "fundacao-ecologica-site",
    titulo: "Fundação Ecológica Nacional",
    descricao: "Site renovado e com novas funcionalidades."
  },
  {
    slug: "goiania-asfalto",
    imagem: "goiania-asfalto",
    titulo: "Prefeitura de Goiânia",
    descricao: "Campanha para apresentação de melhorias no asfalto."
  },
  {
    slug: "burger-king-drive-thru",
    imagem: "burger-king-drive-thru",
    titulo: "Burger King Brasil",
    descricao: "Divulgação lançamento Drive Thru."
  },
  {
    slug: "goiania-coronavirus",
    imagem: "goiania-coronavirus",
    titulo: "Prefeitura de Goiânia",
    descricao: "Medidas de combate ao coronavírus"
  },
  {
    slug: "camara-senador-canedo",
    imagem: "camara-senador-canedo",
    titulo: "Câmara de Senador Canedo",
    descricao: "Anúncio institucional"
  },
  {
    slug: "bohemia-bar-em-bar",
    imagem: "bohemia-bar-em-bar",
    titulo: "Cervejaria Bohemia",
    descricao: "Divulgação do festival Bar em Bar."
  }
];
