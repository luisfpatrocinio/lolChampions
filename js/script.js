async function fetchChampionInfo() {
    const championName = document.getElementById("champion-name").value.toLowerCase();

    if (!championName) {
        alert("Por favor, digite o nome de um campeão.");
        return;
    }

    const url = `https://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/${championName}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Campeão não encontrado");
        }

        const data = await response.json();
        const champion = data.data[Object.keys(data.data)[0]];
        
        displayChampionInfo(champion);
    } catch (error) {
        alert(error.message);
    }
}

function displayChampionInfo(champion) {
    const resultDiv = document.getElementById("champion-result");
    resultDiv.innerHTML = `
        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg" alt="${champion.name}">
        <h3>${champion.name}</h3>
        <p>${champion.title}</p>
        <p>${champion.blurb}</p>
    `;
}
