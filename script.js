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
    // Haal de waarde uit de textarea
    var inputText = document.getElementById("volumeValue").value;
    
    // Split de tekst op nieuwe regels of komma's
    var values = inputText.split(/\s*,\s*|\r?\n+/);
    
    var result = ""; // Voor het resultaat van de conversies

    // Eenheden en hun conversiefactor naar liter (L)
    var unitToLiter = {
        "ml": 0.001,      // Milliliter naar liter
        "cl": 0.01,       // Centiliter naar liter
        "dl": 0.1,        // Deciliter naar liter
        "l": 1,           // Liter naar liter
        "hl": 100,        // Hectoliter naar liter
        "m³": 1000,       // Kubieke meter naar liter
        "cm³": 0.001,     // Kubieke centimeter naar liter
        "dm³": 1,         // Kubieke decimeter naar liter
        "ft³": 28.3168,   // Kubieke voet naar liter
        "in³": 0.016387,  // Kubieke inch naar liter
        "gal": 3.78541,   // Amerikaanse gallon naar liter
        "qt": 0.946353,   // Quart naar liter
        "pt": 0.473176,   // Pint naar liter
        "cup": 0.24,      // Beker naar liter
        "tbsp": 0.0147868,// Eetlepel naar liter
        "tsp": 0.00492892 // Theelepel naar liter
    };

    // Volledig uitgeschreven eenheden omzetten naar afkortingen
    var fullToAbbreviation = {
        // Nederlandse termen
        "milliliter": "ml",
        "centiliter": "cl",
        "deciliter": "dl",
        "liter": "l",
        "hectoliter": "hl",
        "kubieke meter": "m³",
        "kubieke centimeter": "cm³",
        "kubieke decimeter": "dm³",
        "kubieke voet": "ft³",
        "kubieke inch": "in³",
        "gallon": "gal",
        "quart": "qt",
        "pint": "pt",
        "beker": "cup",
        "eetlepel": "tbsp",
        "theelepel": "tsp",
    
        // Engelse termen
        "millilitre": "ml",
        "centilitre": "cl",
        "decilitre": "dl",
        "litre": "l",
        "hectolitre": "hl",
        "cubic meter": "m³",
        "cubic centimetre": "cm³",
        "cubic decimetre": "dm³",
        "cubic foot": "ft³",
        "cubic inch": "in³",
        "gallons": "gal",
        "quarts": "qt",
        "pints": "pt",
        "cup": "cup",
        "tablespoon": "tbsp",
        "teaspoon": "tsp"
    };
    

    // Loop door elke invoer en voer de conversie uit
    for (var i = 0; i < values.length; i++) {
        var input = values[i].trim();

        // Reguliere expressie om invoer te matchen zoals "10 L naar ml"
        var match = input.match(/^(\d+\.?\d*)\s*([\w\s]+)\s+(?:naar|to|a|à|en|zu)\s+([\w\s]+)$/i);


        var convertedValue = null;
        
        if (match) {
            var value = parseFloat(match[1]); // De waarde (bijv. 10)
            var fromUnit = match[2].toLowerCase(); // De begin-eenheid (bijv. L)
            var toUnit = match[3].toLowerCase(); // De doel-eenheid (bijv. ml)

            // Zet de volledige eenheid om naar de afkorting
            fromUnit = fullToAbbreviation[fromUnit] || fromUnit;
            toUnit = fullToAbbreviation[toUnit] || toUnit;

            fromUnit = fromUnit.toLowerCase();
            toUnit = toUnit.toLowerCase();

            // Controleer of de eenheden geldig zijn
            if (unitToLiter[fromUnit] !== undefined && unitToLiter[toUnit] !== undefined) {
                // Zet de waarde eerst om naar liter
                var valueInLiters = value * unitToLiter[fromUnit];
                
                // Zet de waarde van liter om naar de doel-eenheid
                convertedValue = valueInLiters / unitToLiter[toUnit];

                // Voeg de conversie toe aan de resultaatstring
                result += value + " " + fromUnit + " is gelijk aan " + convertedValue.toFixed(4) + " " + toUnit + ".\n";
            } else {
                result += "Onbekende eenheid voor conversie: " + fromUnit + " naar " + toUnit + ".\n";
            }
        } else {
            result += "Invoer '" + input + "' is niet correct geformatteerd.\n";
        }
    }

    // Zet het resultaat in de result-paragraaf
    document.getElementById("volumeResult").value += result + "\n";
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
