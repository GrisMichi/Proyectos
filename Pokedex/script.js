

document.addEventListener("DOMContentLoaded", async () => {
    // Generar un número aleatorio entre 1 y 400
    const randomId = Math.floor(Math.random() * 400) + 1;
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

    console.log(res);

    // Actualizar el nombre y la imagen del Pokémon
    document.getElementById("name").textContent = res.data.name.toUpperCase();
    document.getElementById("pokemon").src = res.data.sprites.other.home.front_default;
    document.getElementById("minipoke").src = res.data.sprites.front_default;


    document.getElementById("num_pokemon").textContent = `#${randomId}`;

    // tipo para tarjeta
// tipo para tarjeta
const types = res.data.types.map(type => type.type.name);

if (types.length === 1) {
    const primaryType = types[0];
    document.getElementById("tarjeta_principal").style.backgroundColor = `var(--${primaryType})`;
} else if (types.length >= 2) {
    const primaryType = types[0];
    const secondaryType = types[1];
    document.getElementById("tarjeta_principal").style.background = `linear-gradient(var(--${primaryType}), var(--${secondaryType}))`;
}


    res.data.types.forEach((item, i) => {
        document.getElementById("tipo").innerHTML += `
                <button id="boton" style="background-color:var(--${item.type.name})">${item.type.name}</button>`
    })


    const typeUrl = res.data.types[0].type.url; 
    let typeInfo = await axios.get(typeUrl);
    console.log(typeInfo);

    const damageFrom = typeInfo.data.damage_relations.double_damage_from; // Acceder correctamente a damage_relations
    // Usar forEach para agregar botones de debilidades
    damageFrom.forEach((item, index) => {
        if (index < 2) { // Limitar a las dos primeras debilidades
            document.getElementById("deb").innerHTML += `
                    <button id="boton_debilidad" style="background-color:var(--${item.name})">${item.name}</button>`;
        }
    });


const stats = res.data.stats;
const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
stats.forEach((stat, index) => {
    const statName = statNames[index];
    document.querySelectorAll('.status-text')[index].textContent = `${statName.charAt(0).toUpperCase() + statName.slice(1)}: ${stat.base_stat}/255`;
    const statusBarColor = document.querySelectorAll('.status-bar-color')[index];
    const typeColor = `var(--${types[0]})`; // Usar el primer tipo
    statusBarColor.style.width = `${stat.base_stat / 2}%`; // Ajustar el ancho de la barra de estado
    statusBarColor.style.backgroundColor = typeColor; 
});

});



