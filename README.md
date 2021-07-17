<p align="center">
  <a href="#-Introdução">Introdução</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Tecnologias-e-Ferramentas">Tecnologias</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Estrutura">Estrutura</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Instalação/Execução">Instalação</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Comentários-Adicionais">Comentários Adicionais</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

# Introdução

Crypto Search é uma aplicação desenvolvida como desafio teste da [QR Capital](https://www.qr.capital/pt/). A aplicação
exibe as criptomoedas disponíveis, dando a possibilidade do usuário 'rastreá-las' para ver o preço atual e a variação das
últimas 24h.

# Tecnologias e Ferramentas

A aplicação foi construída utilizando [Next.js](https://nextjs.org/docs/getting-started) com [React](https://pt-br.reactjs.org/), sendo que a escolha do Next foi para a melhor performance em SEO e a possibilidade de usar SSR/SSG caso necessário no futuro, possibilitando um crescimento mais estável do projeto.

Para os estilos, foi utilizado o framework [Tailwind CSS](https://tailwindcss.com/) conforme requerido pelo desafio.

Para os testes, foi utilizado o [Jest](https://jestjs.io/pt-BR/) e o [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), as requisições foram *mockadas* com o [Mock Service Worker](https://mswjs.io/). **Obs: Fiz apenas testes simples pois comecei a estudar recentemente testes, portanto não tenho muita habilidade em fazê-los.**

Para padronizar o código e manter a qualidade, foram utilizados, em conjunto: [Editor Config](https://editorconfig.org/), [Prettier](https://prettier.io/) e [ESLint](https://eslint.org/)

Além disso, outras bibliotecas foram utilizadas para auxiliar na implementação das funcionalidades, sendo elas:

[Axios](https://github.com/axios/axios): Fazer requisições HTTP, optei pela biblioteca por ser mais robusta que o fetch e ser mais semântica.

[Nookies](https://github.com/maticzav/nookies): Biblioteca que facilita a manipulação dos cookies no Next. Utilizei principalmente para salvar as moedas que o usuário deu *track* nos cookies, uma abordagem diferente e mais simples do que usar a Context API ou Prop Drilling.

[React Icons](https://react-icons.github.io/react-icons/): Utilizei os ícones do Material Design na aplicação.

[React Tostify](https://fkhadra.github.io/react-toastify/introduction): Biblioteca que facilita bastante a utilização de mensagens de Toast, usei por ter tempo limitado para fazer o desafio e poder focar nas funcionalidades mais importantes.

# Estrutura

*Pasta raíz:* Configurações das ferramentas, bibliotecas, algumas configurações do Next e as variáveis de ambiente.

*public:* Imagens utilizadas na aplicação e o favicon.

*src:* A pasta principal da aplicação, portanto é melhor explicar pasta por pasta.

```
components
  shared          #Componentes que são reaproveitados
                  em mais de uma página

hooks             #Pasta que contém os elementos que iremos
                  reutilizar em mais de uma parte na aplicação
                  (contextos)
  useLoading      #Hook que mostra o spinner de loading em todas
                  as páginas

  index.tsx       #Arquivo que engloba todos os Providers, podendo
                  assim deixar o _app.tsx mais limpo, importando
                  apenas esse arquivo que já contem todos os
                  hooks

pages             #Arquivos das páginas e do documento

services          #Arquivos que importam os serviços
                  (Conexão com serviços de terceiros, por exemplo)

styles            #Arquivos de estilo

types             #Tipagens que são usadas em mais de um componente

utils             #Funções úteis e reaproveitáveis para chamar em
                  qualquer lugar da aplicação
```

# Instalação/Execução

1 - Clone o projeto;

2 - Execute o comando ```yarn``` para instalar as dependências;

3 - Copie o conteúdo do arquivo ```.env.example```, crie um arquivo chamado ```.env.local``` e cole as informações.
**OBS: Deixei a key disponível no example apenas para facilitar a execução do teste, JAMAIS FAÇAM ISSO EM PRODUÇÃO GALERA!**

4 - Execute o comando ```yarn dev``` para rodar a aplicação;

5 - É possivel executar ```yarn test``` para executar os testes ou ```yarn test:watch``` para executar ficar observando os testes.

# Comentários Adicionais

1 - Comentei algumas funcionalidades principais do código para facilitar a compreensão, mas costumo tentar escrever os códigos da maneira mais descritível possível para que não seja necessário nem comentar para entender o código!

2 - Como mencionei acima, fiz apenas testes simples pois comecei a estudar testes recentemente;

3 - Talvez criar um hook para o loading não seria a melhor abordagem, mas fiz para testar e mostrar um pouco mais do que já sei como fazer!

4 - Limitei a exibição dos autocompletes em 12 itens para não pesar a página.
