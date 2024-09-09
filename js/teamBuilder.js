import Papa from "https://cdn.skypack.dev/papaparse";
import { getChampionImageById } from "./championsList.js";

document.addEventListener("DOMContentLoaded", function () {
  Papa.parse("database.csv", {
    download: true,
    header: true,
    complete: function (results) {
      populateChampionSelect(results.data);
    },
  });

  var calculateButton = document.getElementById("calculateButton");
  calculateButton.addEventListener("click", calculateTeamStats);
});

function populateChampionSelect(data) {
  const select = document.getElementById("champion-select");
  data.forEach((champion) => {
    // Criar um campeão:
    let championImage = getChampionImageById(champion);

    let championUrl = `index.html?champion=${champion.id}`;

    let championsList = document.getElementById("championsList");
    championsList.innerHTML += `
        <a href="${championUrl}">
            <img src="${championImage}" alt="${champion.name}">
        </a>
    `;

    const option = document.createElement("option");
    option.value = champion.Champion;
    option.textContent = champion.Champion;
    option.dataset.stats = JSON.stringify(champion);
    select.appendChild(option);
  });
}

function calculateTeamStats() {
  const selectedOptions = Array.from(
    document.getElementById("champion-select").selectedOptions
  );
  const teamStats = {
    region: "Demacia",
    ultimate: false,
    poke: false,
    cc: false,
  };

  selectedOptions.forEach((option) => {
    const championStats = JSON.parse(option.dataset.stats);

    teamStats.DamageType[championStats.DamageType] =
      (teamStats.DamageType[championStats.DamageType] || 0) + 1;
    teamStats.Durability += parseInt(championStats.Durability, 10);
    teamStats.Control += parseInt(championStats.Control, 10);
    teamStats.Utility += parseInt(championStats.Utility, 10);
    teamStats.Mobility += parseInt(championStats.Mobility, 10);
    teamStats.Difficulty += parseInt(championStats.Difficulty, 10);
  });

  displayTeamStats(teamStats);
}

function displayTeamStats(stats) {
  document.getElementById("damage-type").textContent =
    "Tipos de Dano: " + JSON.stringify(stats.DamageType);
  document.getElementById("durability").textContent =
    "Durabilidade: " + stats.Durability;
  document.getElementById("control").textContent = "Controle: " + stats.Control;
  document.getElementById("utility").textContent =
    "Utilidade: " + stats.Utility;
  document.getElementById("mobility").textContent =
    "Mobilidade: " + stats.Mobility;
  document.getElementById("difficulty").textContent =
    "Dificuldade: " + stats.Difficulty;
}
