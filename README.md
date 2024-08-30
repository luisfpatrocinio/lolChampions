# League of Legends API - Campeões

Esta página utiliza a API do League of Legends para exibir informações detalhadas sobre os campeões do jogo.

### Descrição da API

- **API:** Riot Games - League of Legends
- **Descrição:** A API permite obter dados sobre campeões, itens, runas e outras informações relacionadas ao jogo.
- **Endpoint utilizado:** `https://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/{champion}.json`
- **Métodos suportados:** GET
- **Demonstração via cURL:**

```bash
curl -X GET "https://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/Ahri.json"
```

### Funcionalidades da Página

- **Seleção de Campeões com Filtro:** Os usuários podem pesquisar campeões pelo nome para encontrar rapidamente o campeão desejado.
- **Informações Detalhadas dos Campeões:** A página exibe detalhes como nome, título, história e habilidades de cada campeão.
- **Habilidades dos Campeões:** A seção de habilidades apresenta as principais habilidades de cada campeão, incluindo seus efeitos e descrições.
