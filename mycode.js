document.addEventListener("DOMContentLoaded", function() {
    myAirtable().then(() => {
        makemodel(); // Assuming the first make is selected by default
    }).catch(error => {
        console.error('Error loading data:', error);
    });
});
        document.getElementById("Make").addEventListener("change", makemodel);
        document.getElementById("Model").addEventListener("change", otherParameters);
        document.getElementById("Front-2-windows").addEventListener("click", Front2Windows);
        document.getElementById("Back-half").addEventListener("click", BackHalf);
        document.getElementById("Full-Car-All-Doors-Back").addEventListener("click", FullCarAllDoorsandBack);
        document.getElementById("Windshield-as-a-Bundle").addEventListener("click", WindshieldAsaBundle);
        document.getElementById("Windshield-Alone").addEventListener("click", WindshieldAlone);
        document.getElementById("Full-Car-plus-Windshield-at-Bundle-Price").addEventListener("click", FullCarPlusWindshield);
        document.getElementById("Single-door-window").addEventListener("click", SingleDoorWindow);
        document.getElementById("Sun-Strip").addEventListener("click", SunStrip);
        document.getElementById("Panoramic-Sunroof").addEventListener("click", PanoramicSunroof);
        document.getElementById("Double-Sunroof").addEventListener("click", DoubleSunroof);
        document.getElementById("Sunroof").addEventListener("click", Sunroof);
        
        let make_list = []; //make an empty list of makes
        let model_list = []; //make an empty list of models
        let year_list = [];  //make an empty list of years
        var json_list=[];
        var json = {};
        let modelfilter=[];
        let yearfilter = [];
        var globalData = [];
        
        function myAirtable(){

            if (globalData.length > 0) {
        // Data already fetched, use it to populate dropdowns
        populateMakesDropdown();
        return Promise.resolve();
    }
            return new Promise((resolve, reject) => {
        console.log("Fetching data from Airtable");
        var Airtable = require('airtable');
        
        var base = new Airtable({apiKey: 'patVdQLqyb4HiwQwy.d565b293b6eec2157f974f60aa3608c1120bad26a9b29c8f4fbddc3ed6cfe3bc'}).base('appEu3iPKkU8MBiYe');
        
        base('Imported table').select({
            
            maxRecords: 15000,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            
                records.forEach(function (record) {
                
               //make_list.push(record.get("Make"));
               //model_list.push(record.get("Model"));
               //year_list.push(record.get("Year"));
               
               var jsonData={
               "Make":record.get("Make"),
               "Model":record.get("Model"),
               "Year":record.get("Year"),
               "Package1":record.get("Front 2 Windows | Black"),
               "Package2":record.get("Back Half | Black (from Types)"),
               "Package3":record.get("Full Car (All Doors & Back) | Black (from Types)"),
               "Package4":record.get("Windshield as a Bundle | Black (from Types)"),
               "Package5":record.get("Windshield Alone | Black"),
                 "Package6":record.get("Full Car plus Windshield (at Bundle Price) | Black (from Types)"),
                "Package7":record.get("Single door window | Black"),
               "Package8":record.get("Sun Strip | Black"),
               "Package9":record.get("Panoramic Sunroof | Black (from Types)"),
               "Package10":record.get("Double Sunroof | Black (from Types)"),
               "Package1Ceramic":record.get("Front 2 Windows | Black Ceramic"),
               "Package2Ceramic":record.get("Back Half | Black Ceramic (from Types)"),
                 "Package3Ceramic":record.get("Full Car (All Doors and Back) | Black Ceramic (from Types)"),
               "Package4Ceramic":record.get("Windshield as a Bundle | Black Ceramic (from Types)"),
                "Package5Ceramic":record.get("Windshield Alone | Black Ceramic"),
               "Package6Ceramic":record.get("Full Car plus Windshield (at Bundle Price) | Black Ceramic (from Types)"),
               "Package7Ceramic":record.get("Single door window | Black Ceramic"),
               "Package8Ceramic":record.get("Sun Strip | Black Ceramic"),
               "Package9Ceramic":record.get("Panoramic Sunroof | Black Ceramic (from Types)"),
                "Package10Ceramic":record.get("Double Sunroof | Black Ceramic (from Types)"),
               "Package11Ceramic":record.get("Sunroof | Black Ceramic"),
               
               "Package1i3Ceramic":record.get("Front 2 Windows | i3 Ceramic"),
               "Package2i3Ceramic":record.get("Back Half | i3 Ceramic (from Types)"),
               "Package3i3Ceramic":record.get("Full Car (All Doors and Back) | i3 Ceramic (from Types)"),
               "Package4i3Ceramic":record.get("Windshield as a Bundle | i3 Ceramic (from Types)"),
               "Package5i3Ceramic":record.get("Windshield Alone | i3 Ceramic"),
                "Package6i3Ceramic":record.get("Full Car plus Windshield (at Bundle Price) | i3 Ceramic (from Types)"),
                "Package7i3Ceramic":record.get("Single door window | i3 Ceramic"),
               "Package8i3Ceramic":record.get("Sun Strip | i3 Ceramic"),
               "Package9i3Ceramic":record.get("Panoramic Sunroof | i3 Ceramic (from Types)"),
               "Package10i3Ceramic":record.get("Double Sunroof | i3 Ceramic (from Types)"),
               "Package11i3Ceramic":record.get("Sunroof | i3 Ceramic")
              
               }
               
              //console.log(json);
             globalData.push(jsonData);
             
            });

            fetchNextPage();

}, function done(err) { 
    if (err) { 
        console.error(err); 
        reject(err); 
        return; 
    }
    populateMakesDropdown();
            resolve();
      
    
        });
});
        }
         
        function populateMakesDropdown() {
    var makeDropdown = document.getElementById("Make");
    makeDropdown.innerHTML = ''; // Clear existing options

    var makes = globalData.map(item => item.Make);
    var uniqueMakes = [...new Set(makes)].sort();

    uniqueMakes.forEach(make => {
        var option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeDropdown.appendChild(option);
    });
}

// Call this function when the page loads
myAirtable().catch(error => console.error('Error loading data:', error));
               
        function makemodel() {
    var selectedMake = document.getElementById("Make").value;
    modelfilter = globalData
        .filter(item => item.Make === selectedMake)
        .map(item => item.Model);

    // Remove duplicates and sort
    modelfilter = [...new Set(modelfilter)].sort();

    // Clear existing options and populate new ones for models
    var modelDropdown = document.getElementById("Model");
    modelDropdown.innerHTML = '';
    modelfilter.forEach(function(model) {
        var option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelDropdown.appendChild(option);
    });

    // Update years based on the first selected model
    updateYearDropdown(selectedMake, modelfilter[0]);
}

function updateYearDropdown(make, model) {
    var yearDropdown = document.getElementById("Year");
    yearDropdown.innerHTML = ''; // Clear existing options

    var filteredYears = globalData
        .filter(item => item.Make === make && item.Model === model)
        .map(item => item.Year);

    var uniqueYears = [...new Set(filteredYears)].sort();
    uniqueYears.forEach(function(year) {
        var option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    });
}

// Event listener for model change to update years
document.getElementById("Model").addEventListener("change", function() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    updateYearDropdown(selectedMake, selectedModel);
});

// Initial call to populate makes and models on page load
myAirtable().then(() => {
    makemodel(); // Assuming the first make is selected by default
}).catch(error => {
    console.error('Error loading data:', error);
});


// Initial setup
document.getElementById("Make").addEventListener("change", makemodel);

      function otherParameters(){
       var Front2Windows=[];
       var BackHalf=[];
       var FullCarAllDoorsandBack=[];
       var WindshieldAsaBundle=[];
       var WindshieldAlone=[];
       var FullCarPlusWindshield=[];
       var SingleDoorWindow=[];
       var SunStrip=[];
       var PanoramicSunroof=[];
       var DoubleSunroof=[];
       var Sunroof=[];
       
       
       var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;

    var parametersModel = globalData.filter(function (el) {
        return el.Make === selectedMake && el.Model === selectedModel;
    });
    
     for (let item in parametersModel) {
     console.log(parametersModel[item].Package1);
     Front2Windows.push(parametersModel[item].Package1,parametersModel[item].Package1Ceramic,parametersModel[item].Package1i3Ceramic);
     BackHalf.push(parametersModel[item].Package2,parametersModel[item].Package2Ceramic,parametersModel[item].Package2i3Ceramic);
     FullCarAllDoorsandBack.push(parametersModel[item].Package3,parametersModel[item].Package3Ceramic,parametersModel[item].Package3i3Ceramic);
     WindshieldAsaBundle.push(parametersModel[item].Package4,parametersModel[item].Package4Ceramic,parametersModel[item].Package4i3Ceramic);
      WindshieldAlone.push(parametersModel[item].Package5,parametersModel[item].Package5Ceramic,parametersModel[item].Package5i3Ceramic);
      FullCarPlusWindshield.push(parametersModel[item].Package6,parametersModel[item].Package6Ceramic,parametersModel[item].Package6i3Ceramic);
      SingleDoorWindow.push(parametersModel[item].Package7,parametersModel[item].Package7Ceramic,parametersModel[item].Package7i3Ceramic);
      SunStrip.push(parametersModel[item].Package8,parametersModel[item].Package8Ceramic,parametersModel[item].Package8i3Ceramic);
      PanoramicSunroof.push(parametersModel[item].Package9,parametersModel[item].Package9Ceramic,parametersModel[item].Package9i3Ceramic);
      DoubleSunroof.push(parametersModel[item].Package10,parametersModel[item].Package10Ceramic,parametersModel[item].Package10i3Ceramic);
     Sunroof.push(parametersModel[item].Package11Ceramic,parametersModel[item].Package11i3Ceramic);
     
     var minFront2Windows = Math.min(...Front2Windows);
     var minBackHalf = Math.min(...BackHalf);
     var minFullCarAllDoorsandBack = Math.min(...FullCarAllDoorsandBack);
     var minWindshieldAsaBundle = Math.min(...WindshieldAsaBundle);
     var minWindshieldAlone = Math.min(...WindshieldAlone);
     var minFullCarPlusWindshield = Math.min(...FullCarPlusWindshield);
     var minSingleDoorWindow = Math.min(...SingleDoorWindow);
     var minSunStrip = Math.min(...SunStrip);
     var minPanoramicSunroof = Math.min(...PanoramicSunroof);
     var minDoubleSunroof = Math.min(...DoubleSunroof);
     var minSunroof = Math.min(...Sunroof);
     console.log (minFront2Windows);
      document.getElementById("P2").innerHTML="Starting at $" + minFront2Windows;
      document.getElementById("P3").innerHTML="Starting at $" + minBackHalf;
      document.getElementById("P4").innerHTML="Starting at $" + minFullCarAllDoorsandBack;
      document.getElementById("P5").innerHTML="Starting at $" + minWindshieldAsaBundle;
      document.getElementById("P6").innerHTML="Starting at $" + minWindshieldAlone;
      document.getElementById("P7").innerHTML="Starting at $" + minFullCarPlusWindshield;
      document.getElementById("P8").innerHTML="Starting at $" + minSingleDoorWindow;
      document.getElementById("P9").innerHTML="Starting at $" + minSunStrip;
      document.getElementById("P10").innerHTML="Starting at $" + minPanoramicSunroof;
      document.getElementById("P11").innerHTML="Starting at $" + minDoubleSunroof;
      document.getElementById("P1").innerHTML="Starting at $" + minSunroof;
      
     //console.log(Front2Windows);
    }
    
    
    }
    let choice="";
    let filmtype=[];
    let standard=0;
    let ceramic=0;
    let multilayer=0;
    
    function Front2Windows(){
     choice="";
     choice="Front 2 Windows";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package1;
    ceramic=filmtype[0].Package1Ceramic; 
    multilayer=filmtype[0].Package1i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    }
    function BackHalf(){
     choice="";
     choice="Back Half";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package2;
    ceramic=filmtype[0].Package2Ceramic; 
    multilayer=filmtype[0].Package2i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function FullCarAllDoorsandBack(){
     choice="";
     choice="Full Car All Doors and Back";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package3;
    ceramic=filmtype[0].Package3Ceramic; 
    multilayer=filmtype[0].Package3i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function WindshieldAsaBundle(){
     choice="";
     choice="Windshield as a Bundle";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package4;
    ceramic=filmtype[0].Package4Ceramic; 
    multilayer=filmtype[0].Package4i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function WindshieldAlone (){
     choice="";
     choice="Windshield Alone";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package5;
    ceramic=filmtype[0].Package5Ceramic; 
    multilayer=filmtype[0].Package5i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function FullCarPlusWindshield(){
     choice="";
     choice="Full Car plus Windshield";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package6;
    ceramic=filmtype[0].Package6Ceramic; 
    multilayer=filmtype[0].Package6i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function SingleDoorWindow(){
    choice="";
     choice="Single Door Window";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package7;
    ceramic=filmtype[0].Package7Ceramic; 
    multilayer=filmtype[0].Package7i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function SunStrip(){
     choice="";
     choice="Sun Strip";
      filmtype = globalDatat.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package8;
    ceramic=filmtype[0].Package8Ceramic; 
    multilayer=filmtype[0].Package8i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function PanoramicSunroof(){
     choice="";
     choice="Panoramic Sunroof";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package9;
    ceramic=filmtype[0].Package9Ceramic; 
    multilayer=filmtype[0].Package9i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function DoubleSunroof(){
     choice="";
     choice="Double Sunroof";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package10;
    ceramic=filmtype[0].Package10Ceramic; 
    multilayer=filmtype[0].Package10i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="$"+standard;
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
    function Sunroof(){
     choice="";
     choice="Sunroof";
      filmtype = globalData.filter(function (el) {
      return el.Make === document.getElementById("Make").value,
             el.Model=== document.getElementById("Model").value
    });  
     
    standard=filmtype[0].Package3;
    ceramic=filmtype[0].Package11Ceramic; 
    multilayer=filmtype[0].Package11i3Ceramic; 
    console.log(standard);
    document.getElementById("SF").innerHTML="Not Available";
    document.getElementById("CF").innerHTML="$"+ceramic;
    document.getElementById("MF").innerHTML="$"+multilayer;
    document.getElementById("chosen-film").innerHTML=choice;
    console.log(standard);
    }
       
