export const continentsData: Record<string, {name: string, text: string}> = {
  "Africa": {
    name: "قارة إفريقيا",
    text: "تقع قارة إفريقيا بأكملها في النصفين الشمالي والجنوبي من الكرة الأرضية. وتتميز قارة إفريقيا بشكلها الهضبي، بسبب تعدد الهضاب فيها مثل هضبة إفريقيا الشمالية.",
  },
  "Asia": {
    name: "قارة آسيا",
    text: "تقع قارة آسيا بالكامل في النصف الشرقي من الكرة الأرضية، وتتميز بعدد من الخصائص الجغرافية المهمة؛ فهي تشتهر بوجود أعلى هضاب العالم وهي هضبة التِبْت، كما تضم أعلى قمة جبلية على مستوى العالم، وهي قمة إفرست.",
  },
  "Europe": {
    name: "قارة أوروبا",
    text: "تقع قارة أوروبا بأكملها في النصف الشمالي من الكرة الأرضية، وتتميز بتنوع تضاريسها؛ فمن أشهر جبالها جبال الألب، كما تضم السهل الأوروبي العظيم الذي يُعَدّ من أوسع السهول الفيضية.",
  },
  "South America": {
    name: "قارة أمريكا الجنوبية",
    text: "تقع قارة أمريكا الجنوبية بأكملها في النصف الغربي من الكرة الأرضية، وتتميز بشكلها الأقرب إلى شكل المثلث، كما أنها تضم عددًا كبيرًا من الغابات، مثل غابات الأمازون.",
  },
  "Australia": {
    name: "قارة أستراليا",
    text: "تقع قارة أستراليا بأكملها في النصفين الشرقي والجنوبي من الكرة الأرضية. وتتسم معظم أراضيها بأنها أراضٍ صحراوية وجبلية.",
  },
  "North America": {
    name: "قارة أمريكا الشمالية",
    text: "تقع قارة أمريكا الشمالية بأكملها في النصفين الشمالي والغربي من الكرة الأرضية، وتتميز بوجود المناطق شديدة البرودة التي يغطيها الجليد طوال العام لقربها من القطب الشمالي.",
  },
  "Antarctica": {
    name: "القارة القطبية الجنوبية",
    text: "تقع القارة القطبية الجنوبية بالكامل في النصف الجنوبي من الكرة الأرضية، وتتميز بوجود المناطق شديدة البرودة التي يغطيها الجليد طوال العام لقربها من القطب الجنوبي.",
  }
};

export const countryToContinentMap: Record<string, string> = {
  "Tanzania": "Africa", "W. Sahara": "Africa", "Dem. Rep. Congo": "Africa", "Somalia": "Africa", "Kenya": "Africa", "Sudan": "Africa", "Chad": "Africa", "Zimbabwe": "Africa", "Botswana": "Africa", "Namibia": "Africa", "Senegal": "Africa", "Mali": "Africa", "Mauritania": "Africa", "Benin": "Africa", "Niger": "Africa", "Nigeria": "Africa", "Cameroon": "Africa", "Togo": "Africa", "Ghana": "Africa", "Côte d'Ivoire": "Africa", "Guinea": "Africa", "Guinea-Bissau": "Africa", "Liberia": "Africa", "Sierra Leone": "Africa", "Burkina Faso": "Africa", "Central African Rep.": "Africa", "Congo": "Africa", "Gabon": "Africa", "Eq. Guinea": "Africa", "Zambia": "Africa", "Malawi": "Africa", "Mozambique": "Africa", "eSwatini": "Africa", "Angola": "Africa", "Burundi": "Africa", "Madagascar": "Africa", "Gambia": "Africa", "Tunisia": "Africa", "Algeria": "Africa", "Djibouti": "Africa", "Somaliland": "Africa", "Uganda": "Africa", "Rwanda": "Africa", "S. Sudan": "Africa", "Egypt": "Africa", "Morocco": "Africa", "Libya": "Africa", "Ethiopia": "Africa", "South Africa": "Africa", "Lesotho": "Africa", "Eritrea": "Africa", "Central African Republic": "Africa", "Equatorial Guinea": "Africa", "Ivory Coast": "Africa", "Republic of the Congo": "Africa", "Swaziland": "Africa", "Western Sahara": "Africa",
  "Argentina": "South America", "Chile": "South America", "Uruguay": "South America", "Brazil": "South America", "Bolivia": "South America", "Peru": "South America", "Colombia": "South America", "Venezuela": "South America", "Guyana": "South America", "Suriname": "South America", "Ecuador": "South America", "Paraguay": "South America", "Falkland Is.": "South America", "Trinidad and Tobago": "South America",
  "Canada": "North America", "United States of America": "North America", "Mexico": "North America", "Panama": "North America", "Costa Rica": "North America", "Nicaragua": "North America", "Honduras": "North America", "El Salvador": "North America", "Guatemala": "North America", "Belize": "North America", "Cuba": "North America", "Haiti": "North America", "Dominican Rep.": "North America", "Bahamas": "North America", "Puerto Rico": "North America", "Jamaica": "North America", "Greenland": "North America",
  "Fiji": "Australia", "Papua New Guinea": "Australia", "Indonesia": "Asia", "Timor-Leste": "Australia", "New Caledonia": "Australia", "Solomon Is.": "Australia", "New Zealand": "Australia", "Australia": "Australia", "Vanuatu": "Australia",
  "Kazakhstan": "Asia", "Uzbekistan": "Asia", "Malaysia": "Asia", "Brunei": "Asia", "Cambodia": "Asia", "Thailand": "Asia", "Laos": "Asia", "Myanmar": "Asia", "Vietnam": "Asia", "North Korea": "Asia", "South Korea": "Asia", "Mongolia": "Asia", "India": "Asia", "Bangladesh": "Asia", "Bhutan": "Asia", "Nepal": "Asia", "Pakistan": "Asia", "Afghanistan": "Asia", "Tajikistan": "Asia", "Kyrgyzstan": "Asia", "Turkmenistan": "Asia", "Iran": "Asia", "Syria": "Asia", "Armenia": "Asia", "Turkey": "Asia", "Georgia": "Asia", "Sri Lanka": "Asia", "Taiwan": "Asia", "Philippines": "Asia", "Japan": "Asia", "Yemen": "Asia", "Saudi Arabia": "Asia", "Oman": "Asia", "Iraq": "Asia", "Kuwait": "Asia", "Qatar": "Asia", "United Arab Emirates": "Asia", "Jordan": "Asia", "Palestine": "Asia", "Israel": "Asia", "Lebanon": "Asia", "China": "Asia", "Azerbaijan": "Asia", "Russia": "Asia",
  "Norway": "Europe", "Sweden": "Europe", "Belarus": "Europe", "Ukraine": "Europe", "Poland": "Europe", "Austria": "Europe", "Hungary": "Europe", "Moldova": "Europe", "Romania": "Europe", "Lithuania": "Europe", "Latvia": "Europe", "Estonia": "Europe", "Germany": "Europe", "Bulgaria": "Europe", "Greece": "Europe", "Albania": "Europe", "Croatia": "Europe", "Switzerland": "Europe", "Luxembourg": "Europe", "Belgium": "Europe", "Netherlands": "Europe", "Portugal": "Europe", "Spain": "Europe", "Ireland": "Europe", "Italy": "Europe", "Denmark": "Europe", "United Kingdom": "Europe", "Iceland": "Europe", "Slovenia": "Europe", "Finland": "Europe", "Slovakia": "Europe", "Czechia": "Europe", "Bosnia and Herz.": "Europe", "Macedonia": "Europe", "Serbia": "Europe", "Montenegro": "Europe", "Kosovo": "Europe", "France": "Europe", "N. Cyprus": "Europe", "Cyprus": "Europe",
  "Fr. S. Antarctic Lands": "Antarctica", "Antarctica": "Antarctica"
};
