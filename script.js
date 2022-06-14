const getData = function (url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
    const countries = data.map(country => country.name.common);
    $(function() {
        $( ".automplete" ).autocomplete({
            source: function(request, response) { //limits the list for the first 5 results
            var results = $.ui.autocomplete.filter(countries, request.term);
            response(results.slice(0, 5));
            },
            select: function(e, ui) {
                //setting the chosen country in a const to make the code more clean
                const chosenCountry = data[countries.indexOf(ui.item.label)];
                document.getElementById('flag').src = chosenCountry.flags.png;
                document.getElementById('countryName').innerHTML = 'Name: ' + chosenCountry.name.common;
                document.getElementById('continent').innerHTML = 'Continent: ' + chosenCountry.continents[0];
                document.getElementById('population').innerHTML = 'Population: ' + chosenCountry.population;
                document.getElementById('countryCard').classList.remove('hidden');
            }
        });
        // makes the search only choose the countries that start with the string that was typed
        $.ui.autocomplete.filter = function (array, term) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function (value) {
                return matcher.test(value.label || value.value || value);
            });
        };
     });
    })
}
const storedData =  getData('https://restcountries.com/v3.1/all');
