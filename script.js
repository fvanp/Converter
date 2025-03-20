// Functie om tabbladen te openen
function openTab(evt, tabName) {
    // Verberg alle tabbladen
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Verwijder de actieve klasse van alle tablinks
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Toon het gekozen tabblad en voeg de actieve klasse toe aan de klikbare tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Standaard tabblad openen (bijvoorbeeld 'lengtes')
document.getElementsByClassName("tablinks")[0].click();

// Voorbeeld conversiefuncties (aanpassen naar behoefte)

function convertLengthText() {
    // Haal de waarde uit de textarea
    var inputText = document.getElementById("lengthText").value;
    
    // Split de tekst op nieuwe regels om verschillende conversies te verwerken
    var values = inputText.split(/\s*,\s*|\r?\n+/); // Scheidt de tekst bij komma's, nieuwe regels, en extra spaties
    
    var result = ""; // Voor het resultaat van de conversies

    // Eenheden en hun conversiefactor naar meter
    var unitToMeter = {
        "mm": 0.001,    // Millimeter naar meter
        "cm": 0.01,     // Centimeter naar meter
        "m": 1,         // Meter naar meter
        "dm": 0.1,      // Decimeter naar meter
        "km": 1000,     // Kilometer naar meter
        "µm": 0.000001, // Micrometer naar meter
        "nm": 0.000000001, // Nanometer naar meter
        "mi": 1609.344, // Mijl naar meter
        "yd": 0.9144,   // Yard naar meter
        "ft": 0.3048,   // Voet naar meter
        "in": 0.0254,   // Inch naar meter
        "Tm": 1000000000000,  // Terameter naar meter (10^12 meter)
        "pm": 0.000000000001, // Picometer naar meter (10^-12 meter)
        "da": 10,       // Deca naar meter (10 meter)
        "h": 100,       // Hecto naar meter (100 meter)
        "M": 1000000,   // Mega naar meter (10^6 meter)
        "G": 1000000000, // Giga naar meter (10^9 meter)
        "ly": 9460730472580800 // Lightyear to meter ( 9.46 x 10^12)
    };

    // Volledig uitgetypt omzetten naar afkortingen
    var fullToAbbreviation = {
        "millimeter": "mm",
        "centimeter": "cm",
        "meter": "m",
        "decimeter": "dm",
        "kilometer": "km",
        "micrometer": "µm",
        "nanometer": "nm",
        "mile": "mi",
        "yard": "yd",
        "foot": "ft",
        "inch": "in",
        "terameter": "Tm",
        "picometer": "pm",
        "deca": "da",
        "hecto": "h",
        "mega": "M",
        "giga": "G",
        "hectometer": "hm",
        "lightyear": "ly"
    };
    

    // Loop door elke invoer en voer de conversie uit
    for (var i = 0; i < values.length; i++) {
        var input = values[i].trim();

        // Reguliere expressie om de invoer in onderdelen te splitsen: "10 cm naar mm"
        var match = input.match(/^(\d+\.?\d*)\s*(\w+)\s+(?:naar|to|a|à|en|zu)\s+(\w+)$/i);

        var convertedValue = null;
        
        if (match) {
            var value = parseFloat(match[1]); // De waarde (bijv. 10)
            var fromUnit = match[2].toLowerCase(); // De begin-eenheid (bijv. cm)
            var toUnit = match[3].toLowerCase(); // De doel-eenheid (bijv. mm)

            // Zet de volledige eenheid om naar de afkorting
            fromUnit = fullToAbbreviation[fromUnit] || fromUnit;
            toUnit = fullToAbbreviation[toUnit] || toUnit;

            // Controleer of de eenheden geldig zijn
            if (unitToMeter[fromUnit] !== undefined && unitToMeter[toUnit] !== undefined) {
                // Zet de waarde eerst om naar meter
                var valueInMeters = value * unitToMeter[fromUnit];
                
                // Zet de waarde van meter om naar de doel-eenheid
                convertedValue = valueInMeters / unitToMeter[toUnit];

                // Voeg de conversie toe aan de resultaatstring
                result += value + " " + fromUnit + " is gelijk aan " + convertedValue + " " + toUnit + ".\n";
            } else {
                result += "Onbekende eenheid voor conversie: " + fromUnit + " naar " + toUnit + ".\n";
            }
        } else {
            result += "Invoer '" + input + "' is niet correct geformatteerd.\n";
        }
    }

    // Zet het resultaat in de result-paragraaf
    document.getElementById("lengthOutput").value += result + "\n";

}



function convertVolume() {
    var value = document.getElementById("volumeValue").value;
    var result = value * 1000; // Voorbeeld: liter naar milliliter
    document.getElementById("volumeResult").innerText = value + " liter is gelijk aan " + result + " milliliter.";
}
async function convertCurrency() {
    var inputText = document.getElementById("currencyText").value;
    var values = inputText.split(/\s*,\s*|\r?\n+/);
    
    var result = "";

    // API URL van de currency API
    var url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"; // Basis is EUR

    // Fallback URL voor het geval de primaire URL niet werkt
    var fallbackUrl = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

    try {
        // Eerst proberen de API van jsdelivr
        let response = await fetch(url);
        
        // Als de eerste poging faalt, probeer dan de fallback
        if (!response.ok) {
            console.log("Fout bij ophalen van API, fallback gebruiken...");
            response = await fetch(fallbackUrl);
        }

        // Zorg ervoor dat we een geldige response hebben
        if (!response.ok) {
            throw new Error("Kan geen gegevens ophalen van de API.");
        }

        const data = await response.json();

        // Log de hele API-response voor debugging
        console.log("API Response:", data);

        // Verkrijg de wisselkoersen van EUR
        var rates = data.eur;
        
        // Controleer of rates daadwerkelijk zijn opgehaald
        if (!rates) {
            result += "Geen wisselkoersen beschikbaar in de API-respons.\n";
            document.getElementById("currencyOutput").value = result;
            return;
        }

        // Loop door elke invoer en voer de conversie uit
        for (var i = 0; i < values.length; i++) {
            var input = values[i].trim();
            var match = input.match(/^(\d+\.?\d*)\s*(\w+)\s+(?:naar|to|a|à|en|zu)\s+(\w+)$/i);

            if (match) {
                var value = parseFloat(match[1]);
                var fromCurrency = match[2].toLowerCase(); // Begin valuta (nu in lowercase)
                var toCurrency = match[3].toLowerCase(); // Doel valuta (nu in lowercase)
                
                // Log de van-to valuta om na te gaan of ze correct zijn
                console.log(`Conversie: ${fromCurrency} naar ${toCurrency}`);

                // Controleer of de valuta-informatie beschikbaar is in de API-response
                if (rates[fromCurrency] && rates[toCurrency]) {
                    // Omrekenen naar de doelvaluta
                    var convertedValue = (value / rates[fromCurrency]) * rates[toCurrency];
                    
                    result += `${value} ${fromCurrency.toUpperCase()} is gelijk aan ${convertedValue.toFixed(2)} ${toCurrency.toUpperCase()}.\n`;
                } else {
                    result += `Geen gegevens voor conversie van ${fromCurrency} naar ${toCurrency}.\n`;
                }
            } else {
                result += "Invoer '" + input + "' is niet correct geformatteerd.\n";
            }
        }

        // Toon het resultaat in het outputveld
        document.getElementById("currencyOutput").value = result;

    } catch (error) {
        result += "Fout bij het ophalen van de API: " + error.message + "\n";
        document.getElementById("currencyOutput").value = result;
    }
}
