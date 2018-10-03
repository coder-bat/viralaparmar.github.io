$(function () {

  var str = `AirSpace Class,Aircraft Model,Engine Model,From_City,Number of Records,Price,To_City
  B,A330-203,CF6-80E142,Sydney,1,180,Melbourne
  A,A330-202,CF6-80E142,Sydney,1,170,Brisbane
  B,B737-3B7,CFM56-3B1,Sydney,1,120,Canberra
  B,B737-476,CFM-56-3,Canberra,1,120,Sydney
  A,A320-232,V2527-5A,Sydney,1,90,Newcastle
  A,A320-232,V2527-5A,Newcastle,1,90,Sydney
  B,A320-232,V2527-5A,Sydney,1,130,Broken Hill
  B,A320-232,V2527-5A,Broken Hill,1,130,Sydney
  C,A330-243,772B-60,Melbourne,1,180,Sydney
  B,A320-232,V2527-5A,Melbourne,1,140,Canberra
  B,A320-232,V2527-5A,Canberra,1,140,Melbourne
  A,B737-3B7,CFM56-3B1,Melbourne,1,175,Adelaide
  A,A320-232,V2527-5A,Melbourne,1,130,Hobart
  A,B717-200,Unknown,Melbourne,1,70,Bendigo
  A,B717-200,Unknown,Bendigo,1,70,Melbourne
  A,B737-3B7,CFM56-3B1,Melbourne,1,100,Launceston
  C,B737-3B7,CFM56-3B1,Adelaide,1,175,Melbourne
  C,A320-232,V2527-5A,Adelaide,1,100,Broken Hill
  C,A320-232,V2527-5A,Broken Hill,1,100,Adelaide
  D,A330-203,CF6-80E142,Adelaide,1,220,Perth
  D,A330-203,CF6-80E142,Adelaide,1,230,Darwin
  D,A330-203,CF6-80E142,Darwin,1,230,Adelaide
  E,B737-476,CFM-56-3,Darwin,1,120,Alice Springs
  E,B737-476,CFM-56-3,Alice Springs,1,120,Darwin
  D,A330-203,CF6-80E142,Perth,1,220,Adelaide
  C,A320-232,V2527-5A,Perth,1,100,Albany
  C,A320-232,V2527-5A,Perth,1,80,Kalgoorlie
  C,A320-232,V2527-5A,Perth,1,90,Broome
  B,A320-232,V2527-5A,Albany,1,100,Perth
  C,A320-232,V2527-5A,Kalgoorlie,1,80,Perth
  B,B737-476,CFM-56-3,Broome,1,90,Perth
  B,B737-476,CFM-56-3,Launceston,1,100,Melbourne
  B,A320-232,V2527-5A,Launceston,1,80,Hobart
  A,B737-3B7,CFM56-3B1,Hobart,1,130,Melbourne
  A,A320-232,V2527-5A,Hobart,1,80,Launceston
  B,A330-203,CF6-80E142,Brisbane,1,170,Sydney
  A,B737-3B7,CFM56-3B1,Brisbane,1,170,Mt Isa
  A,B737-3B7,CFM56-3B1,Brisbane,1,180,Rockhampton
  A,A330-203,CF6-80E142,Brisbane,1,230,Cairns
  B,A330-203,CF6-80E142,Brisbane,1,240,Darwin
  A,A330-202,CF6-80E142,Mt Isa,1,170,Brisbane
  B,A330-202,CF6-80E142,Rockhampton,1,180,Brisbane
  A,A330-203,CF6-80E142,Cairns,1,230,Brisbane
  A,A330-203,CF6-80E142,Darwin,1,240,Brisbane
  B,B737-3B7,CFM56-3B1,Mt Isa,1,120,Darwin
  B,B737-3B7,CFM56-3B1,Darwin,1,120,Mt Isa
  B,B717-200,Unknown,Adelaide,1,50,Pt Augusta
  C,B717-200,Unknown,Pt Augusta,1,50,Adelaide
  `;

  var assignedColors = {
    "ADL": "PURPLE",
    "ALB": "RED",
    "ASP": "MAROON",
    "BENDI": "DARKBLUE",
    "BNE": "#999900",
    "BHQ": "OLIVE",
    "CNS": "LIME",
    "CBR": "GREEN",
    "DRW": "TEAL",
    "HBA": "AQUA",
    "KALG": "DARKVIOLET",
    "LAUNCE": "SADDLEBROWN",
    "MEL": "FUCHSIA",
    "MTISA": "MIDNIGHTBLUE",
    "NCL": "MAGENTA",
    "PER": "BLUE",
    "PTAGT": "SILVER",
    "ROK": "NAVY",
    "SYD": "BLACK"
  }


  var data = CSVToArray(str, ',');
  console.log(data);

  function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
      (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
      ) {

        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);

      }

      var strMatchedValue;

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {

        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );

      } else {

        // We found a non-quoted value.
        strMatchedValue = arrMatches[3];

      }


      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
  }

  var filterName = '';

  var shortNames = {
    "Adelaide": "ADL",
    "Albany": "ALB",
    "Alice Springs": "ASP",
    "Bendigo": "BENDI",
    "Brisbane": "BNE",
    "Broken Hill": "BHQ",
    "Broome": "BME",
    "Cairns": "CNS",
    "Canberra": "CBR",
    "Darwin": "DRW",
    "Hobart": "HBA",
    "Kalgoorlie": "KALG",
    "Launceston": "LAUNCE",
    "Melbourne": "MEL",
    "Mt Isa": "MTISA",
    "Newcastle": "NCL",
    "Perth": "PER",
    "Pt Augusta": "PTAGT",
    "Rockhampton": "ROK",
    "Sydney": "SYD"
  }

  var OD_PAIRS = [];

  var resCheck = data.forEach(function (result) {
    if (result[3] != 'From_City' && result[3] != undefined)
      OD_PAIRS.push([`${shortNames[result[3]]}`, `${shortNames[result[6]]}`, `${result[3]}`, `${result[6]}`])
  });

  console.log(OD_PAIRS);

  var currentWidth = $('#map').width();
  var width = 1200;
  var height = 800;

  var projection = d3.geo.mercator()
    .center([135, -20.83])
    .scale(600)
    .translate([width / 2, height / 2]);

  var path = d3.geo
    .path()
    .pointRadius(10)
    .projection(projection);

  var svg = d3.select("#map")
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", currentWidth)
    .attr("height", currentWidth * height / width);

  var airportMap = {};

  function transition(plane, route, price) {
    var l = route.node().getTotalLength();
    plane.transition()
      .duration(l * 50)
      .attrTween("transform", delta(plane, route.node(), price))
      .each("end", function () { route.remove(); })
      .remove();
  }

  function delta(plane, path, price) {
    var l = path.getTotalLength();
    var plane = plane;
    return function (i) {
      return function (t) {
        var p = path.getPointAtLength(t * l);

        var t2 = Math.min(t + 0.05, 1);
        var p2 = path.getPointAtLength(t2 * l);

        var x = p2.x - p.x;
        var y = p2.y - p.y;
        var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;

        var s = Math.min(Math.sin(Math.PI * t) * (price / 150), price / 170);
        return "translate(" + p.x + "," + p.y + ") scale(" + s + ") rotate(" + r + ")";
      }
    }
  }

  function fly(origin, destination, originFull, destFull) {
    var route = svg.append("path")
      .datum({ type: "LineString", coordinates: [airportMap[origin], airportMap[destination]] })
      .attr("class", "route")
      .attr("d", path);
    console.log(origin);
    let className;
    let textClass = '';

    if (OD_PAIRS.filter(x => x.includes(origin).length > 0)) {
      className = `${origin} ${assignedColors[origin]}`;
    }

    if (filterName != '' && filterName != origin) {
      className += ' no-display';
      textClass = 'no-display';
    }

    origin = origin.toLowerCase();
    destination = destination.toLowerCase();

    let price = data.filter(x => x.includes(originFull) && x.includes(destFull));
    var plane = svg.append("path")
      .attr("class", "plane " + className)
      .attr("d", "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z")
      .attr("height", "100px");

    var text1 = svg.append("text")
      .attr("x", "8")
      .attr("y", "-10")
      .attr("class", textClass)
      .text("$" + (price ? price[0][5] : 'unknown'));
    var text2 = svg.append("text")
      .attr("x", "8")
      .attr("y", "-30")
      .attr("class", textClass)
      .text("To: " + destFull);


    transition(text1, route, (price ? price[0][5] : 'unknown'));
    transition(text2, route, (price ? price[0][5] : 'unknown'));
    transition(plane, route, (price ? price[0][5] : 'unknown'));
  }

  function loaded(error, countries, airports) {
    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(topojson.feature(countries, countries.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path);

    svg.append("g")
      .attr("class", "airports")
      .selectAll("path")
      .data(topojson.feature(airports, airports.objects.airports).features)
      .enter()
      .append("path")
      .attr("id", function (d) { return (d.properties.abbrev + "Air") })
      .attr("class", function (d) {
        var abb = OD_PAIRS.filter(x => x.includes(d.properties.abbrev));
        console.log(abb.length);
        if (abb.length <= 0) {
          console.log(abb);
          return "no-display";
        }
        else {
          return `${d.properties.abbrev} bigone ${assignedColors[d.properties.abbrev]}`;
        }
      })
      .attr("d", path)

    var geos = topojson.feature(airports, airports.objects.airports).features;
    for (i in geos) {
      airportMap[geos[i].properties.abbrev] = geos[i].geometry.coordinates;
    }

    var i = 0;

    setInterval(function () {
      if (i > OD_PAIRS.length - 1) {
        i = 0;
      }
      var od = OD_PAIRS[i];
      fly(od[0], od[1], od[2], od[3]);
      i++;
    }, 1500);
  }

  queue().defer(d3.json, "./json/countries2.topo.json")
    .defer(d3.json, "./json/airports2.topo.json")
    .await(loaded);

  $(window).resize(function () {
    currentWidth = $("#map").width();
    svg.attr("width", currentWidth);
    svg.attr("height", currentWidth * height / width);
  });

  let done = [];

  for (var i = 1; i < data.length - 1; i++) {
    if (done.indexOf(data[i][3]) > -1) {
      continue;
    }
    else {
      let shortName;
      let abbr = OD_PAIRS.filter(x => x.includes(data[i][3]));
      if (abbr.length > 0 && abbr[0][2] == data[i][3])
        shortName = abbr[0][0];
      else
        shortName = abbr.length > 0 ? abbr[0][1] : '';
      $(".filterLeft").append(`<button id="${shortName}-fil" class="${data[i][3]} filterButton">${data[i][3]} Airport</button><br/>`);
      $(`#${shortName}-fil`).css("background-color", `${assignedColors[shortName]}`)
      done.push(data[i][3]);
    }
  }

  $(".filterButton").click(function (event) {
    var str = $(this).attr('id');
    var res = str.split("-");
    if (res[0] != "All") {
      filterName = `${res[0]}`;
      $(`.airports > path:not('.${res[0]}')`).css("display", "none");
      $(`.airports > path.${res[0]}`).css("display", "block");
      str = $(this).attr('class');
      res = str.split(" ");
      $("#infoText").empty();
      let getData = data.filter(x => x.includes(`${res[0]}`));
      $("#infoText").append(`
      <h3>Outgoing data from selected airport</h3>
      <table>
      <tbody id="${res[0]}info">
        <tr>
          <th>Destination</th>
          <th>Price</th>
          <th>Airspace Class</th>
          <th>Aircraft Model</th>
          <th>Engine Model</th>
        </tr>`);
      for (var i = 0; i < getData.length; i++) {
        if (getData[i][6] != res[0]) {
          $(`#${res[0]}info`).append(`
          <tr>
            <td>${getData[i][6]}</td>
            <td>${getData[i][5]}</td>
            <td>${getData[i][0]}</td>
            <td>${getData[i][1]}</td>
            <td>${getData[i][2]}</td>
          </tr>
          `);
        }
      }
    }
    else {
      filterName = '';
      $(`.airports > path`).css("display", "block");
      $("#infoText").empty();
    }
  });

  function mode(array) {
    if (array.length == 0)
      return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  setTimeout(function () {
    $(("path")).mouseenter(function () {
      var classNames = $(this).attr("class");
      if (classNames) {
        var shortName = classNames.split(' ')[0];
        $(`.airports > path:not('.${shortName}')`).css("opacity", "0.3");
        var fullName = getKeyByValue(shortNames, shortName);
        let getData = data.filter(x => x.includes(fullName));
        var airClass = [];
        var airModel = [];
        var engModel = [];
        if (getData.length > 0) {
          $(".tooltipCust").empty();
          $(".tooltipCust").append(`<h4>This airport is connected with</h4>`);
          getData.forEach(function (dataPoint) {
            airClass.push(dataPoint[0]);
            airModel.push(dataPoint[1]);
            engModel.push(dataPoint[2]);
            if (dataPoint[6] != fullName) {
              $(".tooltipCust").append(`${dataPoint[6]}<br/>`);
            }
          });
        }
        $(".tooltipCust").append('<h4>The most common class of flights from this airport is </h4>' + mode(airClass)) + ` class<br/>`;
        $(".tooltipCust").append(`<h4>Most of the flights are equipped with following</h4>
        Aircraft Model: ` + mode(airModel) + `<br/>
        Engine Model: ` + mode(engModel));
        $(".tooltipCust").css("display", "block");
      }
    });
  }, 5000);

  setTimeout(function () {
    $(("path")).mouseout(function () {
      $(`.airports > path`).css("opacity", "0.7");
      $(".tooltipCust").css("display", "none");
    });
  }, 5000);


});