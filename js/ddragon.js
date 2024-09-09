export async function getVersion() {
  let version = await fetch(
    `https://ddragon.leagueoflegends.com/api/versions.json`
  );
  version = await version.json();
  version = version[0];
  return version;
}
