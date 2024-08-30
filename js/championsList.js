document.addEventListener("DOMContentLoaded", function () {
  updateChampionsList();
});

async function updateChampionsList() {
  let url = `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/champion.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar campeões");
    }

    const data = await response.json();
    const champions = data.data;
    const championsList = document.getElementById("champions-list");
    const filterInput = document.getElementById("champion-filter");

    championsList.innerHTML = "";

    // Função para exibir campeões filtrados
    function displayFilteredChampions(filter) {
      championsList.innerHTML = "";

      for (let champion in champions) {
        const championData = champions[champion];
        if (championData.name.toLowerCase().includes(filter.toLowerCase())) {
          let championUrl = `index.html?champion=${championData.id}`;
          championsList.innerHTML += `
                <a href="${championUrl}">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${championData.image.full}" alt="${championData.name}">
                </a>
            `;
        }
      }
    }

    // Exibir todos os campeões inicialmente
    displayFilteredChampions("");

    // Adicionar evento para filtrar campeões conforme o usuário digita
    filterInput.addEventListener("input", () => {
      const filterValue = filterInput.value;
      displayFilteredChampions(filterValue);
    });
  } catch (error) {
    alert(error.message);
  }
}
