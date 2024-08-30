async function fetchChampionInfo() {
  const championName = document.getElementById("champion-name").value.trim();
  const language = "pt_BR";

  if (!championName) {
    alert("Por favor, digite o nome de um campeão.");
    return;
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/14.16.1/data/${language}/champion/${championName}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Campeão não encontrado");
    }

    const data = await response.json();
    console.log(data.data);
    const champion = data.data[Object.keys(data.data)[0]];

    displayChampionInfo(champion);
  } catch (error) {
    alert(error.message);
  }
}

function displayChampionInfo(champion) {
  const resultDiv = document.getElementById("champion-result");
  resultDiv.innerHTML = `
        <img src="https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${champion.name}.png" alt="${champion.name}">
        <h3 class="championName">${champion.name}</h3>
        <p class="championTitle">${champion.title}</p>
        <p>${champion.lore}</p>
    `;

  let splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  // Alterando o background da página
  document.body.style.backgroundImage = `url(${splashUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  displayChampionSkills(champion);
}

function displayChampionSkills(champion) {
  const skills = champion.spells;
  const skillsDiv = document.getElementById("champion-skills");

  skillsDiv.innerHTML = "";

  const passive = champion.passive;
  skillsDiv.innerHTML += `
        <div class="skill">
            <img src="https://ddragon.leagueoflegends.com/cdn/14.17.1/img/passive/${passive.image.full}" alt="${passive.name}">
            <h4>${passive.name}</h4>
            <p>${passive.description}</p>
        </div>
    `;

  skills.forEach((skill, index) => {
    // let skillTooltip = skill.tooltip;
    // // Substituir {{ ??? }} por <strong> e </strong>
    // skillTooltip = skillTooltip.replace(/\{\{|\}\}/g, (match) => {
    //   return match === "{{" ? "<strong>" : "</strong>";
    // });

    let costString = `<p>Custo: ${skill.costBurn} ${skill.costType}</p>`;
    costString = costString.replace(
      "{{ abilityresourcename }}",
      `${champion.partype}`
    );

    skillsDiv.innerHTML += `
                <div class="skill">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${skill.id}.png" alt="${skill.name}">
                    <h4>${skill.name}</h4>
                    ${costString}
                    <p>${skill.description}</p>
                </div>
            `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Obter o nome do campeão da URL
  const urlParams = new URLSearchParams(window.location.search);
  const championName = urlParams.get("champion");
  if (championName) {
    document.getElementById("champion-name").value = championName;
    fetchChampionInfo();
  }
});
