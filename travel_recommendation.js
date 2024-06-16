function clearInput() {
    document.getElementById("input-1").value = "";
    document.getElementById("results").innerHTML = "";
    document.getElementById("container-1").classList.remove("results-container");
}

document.getElementById("clear").addEventListener("click", clearInput);
document.getElementById("search").addEventListener("click", submit);
document.getElementById("input-1").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submit();
    }
});

function submit() {
    let input = document.getElementById("input-1").value.trim().toLowerCase();
    const json_source = './travel_recommendation_api.json';

    axios.get(json_source)
        .then(response => {


            var selection;
            var countryData;

            if (input === "beaches" || input === "beach") {
                selection = "beaches";
                const data = response.data.beaches;
                countryData = data;
            }
            else if (input === "temples" || input === "temple") {
                selection = "temples";
                const data = response.data.temples;
                countryData = data;

            }
            else {
                selection = "countries";
                const data = response.data.countries;
                countryData = data.find(item => item.name.toLowerCase() === input);
            }

            const container1 = document.getElementById("container-1");

            //countries
            if (countryData && selection === "countries") {
                container1.classList.add("results-container");
                const resultsContainer = document.getElementById("results");
                resultsContainer.innerHTML = ""; // Clear previous results

                countryData.cities.forEach(city => {
                    const cityDiv = document.createElement("div");
                    cityDiv.classList.add("city");

                    //image 
                    const cityImage = document.createElement("img");
                    cityImage.src = city.imageUrl;
                    cityImage.alt = city.name;
                    cityImage.classList.add("city-image");

                    //name
                    const cityName = document.createElement("h2");
                    cityName.innerText = city.name;

                    //description
                    const cityDescription = document.createElement("p");
                    cityDescription.innerText = city.description;

                    //appending to HTML
                    cityDiv.appendChild(cityImage);
                    cityDiv.appendChild(cityName);
                    cityDiv.appendChild(cityDescription);
                    resultsContainer.appendChild(cityDiv);
                });
            }

            //temples
            else if (countryData && selection === "temples") {
                container1.classList.add("results-container");
                const resultsContainer = document.getElementById("results");
                resultsContainer.innerHTML = ""; // Clear previous results

                countryData.forEach(beach => {
                    const beachDiv = document.createElement("div");
                    beachDiv.classList.add("city");

                    const beachImage = document.createElement("img");
                    beachImage.src = beach.imageUrl;
                    beachImage.alt = beach.name;
                    beachImage.classList.add("city-image");

                    const beachName = document.createElement("h2");
                    beachName.innerText = beach.name;

                    const beachDescription = document.createElement("p");
                    beachDescription.innerText = beach.description;

                    beachDiv.appendChild(beachImage);
                    beachDiv.appendChild(beachName);
                    beachDiv.appendChild(beachDescription);
                    resultsContainer.appendChild(beachDiv);
                });
            }



            //beaches
            else if (countryData && selection === "beaches") {
                container1.classList.add("results-container");
                const resultsContainer = document.getElementById("results");
                resultsContainer.innerHTML = ""; // Clear previous results

                countryData.forEach(beach => {
                    const beachDiv = document.createElement("div");
                    beachDiv.classList.add("city");

                    const beachImage = document.createElement("img");
                    beachImage.src = beach.imageUrl;
                    beachImage.alt = beach.name;
                    beachImage.classList.add("city-image");

                    const beachName = document.createElement("h2");
                    beachName.innerText = beach.name;

                    const beachDescription = document.createElement("p");
                    beachDescription.innerText = beach.description;

                    beachDiv.appendChild(beachImage);
                    beachDiv.appendChild(beachName);
                    beachDiv.appendChild(beachDescription);
                    resultsContainer.appendChild(beachDiv);
                });
            } else {
                alert("not found. Please enter a valid country or type like beach and temple name.");
            }




        })
        .catch(error => {
            console.log(error);
        });
}
