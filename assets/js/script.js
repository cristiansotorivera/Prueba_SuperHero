// token superhero 10161076434054076

$(document).ready(function () {
    // Declaro variables
    const searchButton = $("#formulario");
    const textFormulario = $("#textFormulario");
    const resultado = $("#resultado");
    
    // boton para busqueda super hero
    searchButton.on("submit", function (e) {
        e.preventDefault();

        // Request a SuperHeroAPI
        $.ajax({
            url: `https://www.superheroapi.com/api.php/10161076434054076/${textFormulario.val()}`,
            method: "GET",
            success(data) {
                // Display superHero info
                resultado.html(`
                    <h2 class="text-center">Información Super Hero</h2>
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${data.image.url}" class="img-fluid rounded-start">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre : ${data.name}</h5>
                                    <ul>
                                        <li>Publicado por: ${data.biography.publisher}</li>
                                        <hr>
                                        <li>Ocupación : ${data.work.occupation}</li>
                                        <hr>
                                        <li>Primera Aparición : ${data.biography["first-appearance"]}</li>
                                        <hr>
                                        <li>Altura: ${data.appearance.height}</li>
                                        <hr>
                                        <li>Peso: ${data.appearance.weight}</li>
                                        <hr>
                                        <li>Alianza: ${data.biography.aliases}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                // Datos para pie chart
                const dataPoints = [
                    { y: data.powerstats.intelligence, label: "Intelligence" },
                    { y: data.powerstats.strength, label: "Strength" },
                    { y: data.powerstats.speed, label: "Speed" },
                    { y: data.powerstats.durability, label: "Durability" },
                    { y: data.powerstats.power, label: "Power" },
                    { y: data.powerstats.combat, label: "Combat" },
                ];

                // Variable gráfico CanvasJS 
                const chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", 
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder de ${data.name}`,
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y} ",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y} ",
                        dataPoints: dataPoints
                    }]
                });

                chart.render();
            },
            error(e) {
                console.error("Connection Issues: " + e.statusCode);
            }
        });
    });
});
