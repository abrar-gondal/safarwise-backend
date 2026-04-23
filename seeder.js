const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');
const CityTour = require('./models/CityTour');


dotenv.config();
const packages = [
  { name: 'K2 Base Camp Expedition', destination: 'Skardu, Gilgit-Baltistan', description: 'The ultimate Pakistan adventure trek across the legendary Baltoro Glacier to the foot of K2, the world\'s second highest mountain at 8,611 metres.', price: 89000, originalPrice: 110000, duration: '14 Days', image: '/images/packages/k2-base-camp.jpg', tags: ['Trekking', 'Adventure', 'Mountains'], featured: true, rating: 4.9, reviews: 48, highlights: ['K2 Base Camp at 5,150 metres', 'Baltoro Glacier crossing', 'Concordia panorama', 'Broad Peak views', 'Askole village', 'Trango Towers'], includes: ['Certified mountain guide', 'All porters and camping equipment', 'All meals', 'Permits and NOC', 'Transport Lahore to Skardu', 'Hotel in Skardu'], excludes: ['Flights to Skardu', 'Personal trekking gear', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Skardu',activities:['Fly to Skardu','Hotel check-in','Team briefing']},{day:2,title:'Skardu Acclimatization',activities:['Skardu Fort','Acclimatization walk']},{day:3,title:'Skardu to Askole',activities:['Jeep to Askole','Trek preparation']},{day:4,title:'Askole to Jhola',activities:['Trek begins','Camp Jhola']},{day:5,title:'Jhola to Paiyu',activities:['Baltoro foothills','Camp Paiyu']},{day:6,title:'Paiyu Rest Day',activities:['Acclimatization']},{day:7,title:'Paiyu to Urdukas',activities:['Baltoro Glacier','First K2 sighting']},{day:8,title:'Urdukas to Goro II',activities:['Full glacier walk','Camp Goro II']},{day:9,title:'Goro II to Concordia',activities:['Reach Concordia','K2 panorama']},{day:10,title:'K2 Base Camp',activities:['Trek to K2 BC 5150m','Celebration']},{day:11,title:'Rest Day',activities:['Photography day']},{day:12,title:'Return to Urdukas',activities:['Begin return trek']},{day:13,title:'Urdukas to Askole',activities:['Descend Baltoro']},{day:14,title:'Departure',activities:['Jeep to Skardu','Farewell dinner']}] },
  { name: 'Hunza Valley Blossom Tour', destination: 'Hunza, Gilgit-Baltistan', description: 'Experience the magical cherry and apricot blossom season in Hunza Valley with breathtaking views of Rakaposhi and the turquoise Attabad Lake.', price: 35000, originalPrice: 44000, duration: '7 Days', image: '/images/packages/hunza-valley.jpg', tags: ['Cultural', 'Scenic', 'Nature'], featured: true, rating: 4.8, reviews: 124, highlights: ['Baltit Fort', 'Eagle\'s Nest sunrise', 'Attabad Lake boat ride', 'Cherry blossom season', 'Rakaposhi view', 'Ganish village'], includes: ['Hotel (6 nights)', 'All meals', 'Private transport', 'Expert guide', 'Boat ride', 'Entry fees'], excludes: ['Flights to Gilgit', 'Lunches', 'Personal shopping', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Hunza',activities:['Flight to Gilgit','Drive to Karimabad','Hotel check-in']},{day:2,title:'Karimabad',activities:['Baltit Fort','Altit Fort','Bazaar']},{day:3,title:'Eagle\'s Nest',activities:['Sunrise at Eagle\'s Nest','Rakaposhi views','Ganish village']},{day:4,title:'Attabad Lake',activities:['Boat ride','Gojal Valley','Passu village']},{day:5,title:'Blossom Walk',activities:['Cherry blossom trail','Apricot orchards']},{day:6,title:'Free Day',activities:['Optional hike','Shopping']},{day:7,title:'Return to Lahore',activities:['Drive to Gilgit','Flight to Lahore']}] },
  { name: 'Lahore Heritage and Food Tour', destination: 'Lahore, Punjab', description: 'Discover the Mughal grandeur and vibrant food culture of Lahore Badshahi Mosque, Lahore Fort, Food Street and Wagah Border.', price: 14500, originalPrice: 18000, duration: '4 Days', image: '/images/packages/lahore-heritage.jpg', tags: ['Cultural', 'Food', 'History'], featured: true, rating: 4.7, reviews: 89, highlights: ['Badshahi Mosque', 'Lahore Fort', 'Fort Road Food Street', 'Walled City walk', 'Shalimar Gardens', 'Wagah Border'], includes: ['Hotel (3 nights)', 'Breakfast and dinner', 'Transport', 'Guide', 'Entry tickets'], excludes: ['Flights to Lahore', 'Lunches', 'Personal shopping', 'Tips'], itinerary: [{day:1,title:'Arrival and Walled City',activities:['Hotel check-in','Walled City walk','Food Street dinner']},{day:2,title:'Mughal Monuments',activities:['Lahore Fort','Badshahi Mosque','Lahore Museum']},{day:3,title:'Gardens and Wagah',activities:['Shalimar Gardens','Wagah Border ceremony']},{day:4,title:'Shopping and Departure',activities:['Anarkali Bazaar','Liberty Market','Departure']}] },
  { name: 'Fairy Meadows and Nanga Parbat', destination: 'Diamer, Gilgit-Baltistan', description: 'Camp at 3,300 metres with a front-row view of Nanga Parbat the Killer Mountain.', price: 27000, duration: '5 Days', image: '/images/packages/fairy-meadows.jpg', tags: ['Camping', 'Trekking', 'Adventure'], featured: false, rating: 4.8, reviews: 67, highlights: ['Fairy Meadows 3,300m', 'Nanga Parbat views', 'Beyal Camp trek', 'Cliff road jeep ride', 'Stargazing', 'Alpine forests'], includes: ['Camping at Fairy Meadows', 'All meals', 'Jeep from Raikot Bridge', 'Guide', 'Porter'], excludes: ['Transport to Raikot Bridge', 'Personal gear', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Raikot Bridge',activities:['Overnight drive via KKH']},{day:2,title:'Trek to Fairy Meadows',activities:['Jeep on cliff road','3-hour forest trek']},{day:3,title:'Beyal Camp Trek',activities:['Trek to 3,500m','Glacier views','Stargazing']},{day:4,title:'Photography Day',activities:['Sunrise photography','Meadow walks']},{day:5,title:'Return',activities:['Trek down','Drive to Lahore']}] },
  { name: 'Skardu and Deosai Plains Safari', destination: 'Skardu, Gilgit-Baltistan', description: 'Explore the world\'s second highest plateau at Deosai and spot Himalayan Brown Bears.', price: 32000, duration: '6 Days', image: '/images/packages/skardu-deosai.jpg', tags: ['Wildlife', 'Adventure', 'Scenic'], featured: false, rating: 4.7, reviews: 53, highlights: ['Deosai Plains', 'Brown Bear spotting', 'Sheosar Lake', 'Shangrila Resort', 'Skardu Fort', 'Shigar Valley'], includes: ['Hotel (5 nights)', 'All meals', '4x4 jeep', 'Wildlife guide', 'Park fees'], excludes: ['Flights to Skardu', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Arrive Skardu',activities:['Flight from Lahore','Skardu Fort']},{day:2,title:'Shigar Valley',activities:['Shigar Fort','Cold Desert','Waterfall']},{day:3,title:'Deosai Day 1',activities:['Enter Deosai','Wildlife spotting','Sheosar Lake']},{day:4,title:'Deosai Day 2',activities:['Brown Bear search','Wildflowers']},{day:5,title:'Lakes Tour',activities:['Shangrila','Satpara Lake']},{day:6,title:'Departure',activities:['Flight to Lahore']}] },
  { name: 'Swat Valley and Malam Jabba', destination: 'Swat, Khyber Pakhtunkhwa', description: 'Discover the Switzerland of Pakistan lush green valleys, Buddhist ruins, and the famous Malam Jabba ski resort.', price: 21000, duration: '5 Days', image: '/images/packages/swat-valley.jpg', tags: ['Nature', 'Cultural', 'Family'], featured: false, rating: 4.6, reviews: 41, highlights: ['Malam Jabba chairlift', 'Mahodand Lake trek', 'Buddhist ruins', 'Swat Museum', 'Kalam Valley', 'Swat River'], includes: ['Hotel (4 nights)', 'Breakfast', 'Transport', 'Guide', 'Chairlift tickets', 'Entry fees'], excludes: ['Lunch and dinner', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Mingora',activities:['Overnight drive','Hotel check-in','Swat Museum']},{day:2,title:'Malam Jabba',activities:['Chairlift ride','Forest walks']},{day:3,title:'Kalam Valley',activities:['Drive to Kalam','Ushu Forest','Mahodand Lake']},{day:4,title:'Heritage',activities:['Udegram ruins','Swat River picnic']},{day:5,title:'Return to Lahore',activities:['Morning departure']}] },
  { name: 'Karakoram Highway Road Trip', destination: 'Lahore to Khunjerab Pass', description: 'Drive the legendary Karakoram Highway from Lahore all the way to the Khunjerab Pass on the Chinese border at 4,693 metres.', price: 58000, originalPrice: 72000, duration: '10 Days', image: '/images/packages/karakoram-highway.jpg', tags: ['Road Trip', 'Adventure', 'Scenic'], featured: true, rating: 4.9, reviews: 76, highlights: ['Khunjerab Pass 4,693m', 'Attabad Lake', 'Passu Cones', 'Hunza Valley', 'Chilas rock carvings', 'Rakaposhi view'], includes: ['Private vehicle (9 nights)', 'All meals', 'Driver-guide', 'All fuel', 'Khunjerab Pass permit'], excludes: ['Lunches', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Islamabad',activities:['Drive to Islamabad','Faisal Mosque']},{day:2,title:'Islamabad to Besham',activities:['Hazara Motorway drive']},{day:3,title:'Besham to Chilas',activities:['KKH mountain entry','Rock carvings']},{day:4,title:'Chilas to Gilgit',activities:['Nanga Parbat view','Arrive Gilgit']},{day:5,title:'Gilgit',activities:['Kargah Buddha','Gilgit bazaar']},{day:6,title:'Gilgit to Hunza',activities:['Baltit Fort','Eagle\'s Nest']},{day:7,title:'Hunza to Gojal',activities:['Attabad Lake','Passu Cones']},{day:8,title:'Khunjerab Pass',activities:['Drive to 4,693m','China border']},{day:9,title:'Rest in Hunza',activities:['Village walks','Shopping']},{day:10,title:'Return to Lahore',activities:['Flight from Gilgit']}] },
  { name: 'Makran Coastal Highway Adventure', destination: 'Gwadar, Balochistan', description: 'Drive the Makran Coastal Highway along the Arabian Sea pristine beaches, mud volcanoes, and the Princess of Hope rock formation.', price: 31000, duration: '6 Days', image: '/images/packages/makran-coastal.jpg', tags: ['Coastal', 'Adventure', 'Scenic'], featured: false, rating: 4.6, reviews: 35, highlights: ['Kund Malir Beach', 'Princess of Hope', 'Chandragup volcanoes', 'Hingol National Park', 'Gwadar Hammerhead', 'Fresh seafood'], includes: ['Hotel and beach camping', 'All meals', '4x4 vehicle', 'Guide', 'Park fees'], excludes: ['Flights to Karachi', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Karachi to Ormara',activities:['Makran Highway drive','Arrive Ormara']},{day:2,title:'Hingol National Park',activities:['Princess of Hope','Sphinx rock','Hingol River']},{day:3,title:'Kund Malir Beach',activities:['Beach camp','Swimming','Sunset']},{day:4,title:'Mud Volcanoes',activities:['Chandragup volcanoes','Drive to Gwadar']},{day:5,title:'Gwadar',activities:['Gwadar port','Hammerhead viewpoint','Fish market']},{day:6,title:'Return',activities:['Fly or drive to Karachi']}] },
  { name: 'Naran Kaghan Valley Tour', destination: 'Naran, Khyber Pakhtunkhwa', description: 'Explore the magical Naran Kaghan Valley Saif ul Malook Lake, Babusar Top at 4,173 metres, Lulusar Lake and the beautiful Shogran plateau.', price: 18500, originalPrice: 22000, duration: '5 Days', image: '/images/packages/naran-kaghan.jpg', tags: ['Nature', 'Lakes', 'Family'], featured: false, rating: 4.7, reviews: 92, highlights: ['Saif ul Malook Lake 3,224m', 'Babusar Top 4,173m', 'Lulusar Lake', 'Shogran plateau', 'Kaghan River', 'Horse riding'], includes: ['Hotel (4 nights)', 'Breakfast and dinner', 'Transport', 'Guide', 'Horse ride'], excludes: ['Lunches', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Shogran',activities:['Overnight drive','Siri Paye meadows']},{day:2,title:'Shogran and Naran',activities:['Shogran views','Drive to Naran']},{day:3,title:'Saif ul Malook',activities:['Lake at 3,224m','Boat ride','Horse riding']},{day:4,title:'Babusar Top',activities:['Babusar Top 4,173m','Lulusar Lake','Lalazar']},{day:5,title:'Return to Lahore',activities:['Morning departure']}] },
  { name: 'Neelum Valley Azad Kashmir Tour', destination: 'Neelum Valley, Azad Kashmir', description: 'Discover Neelum Valley in Azad Kashmir with turquoise rivers, Ratti Gali Lake, Arang Kel and the ancient Sharda ruins.', price: 16500, duration: '5 Days', image: '/images/packages/neelum-valley.jpg', tags: ['Nature', 'Kashmir', 'Scenic'], featured: false, rating: 4.6, reviews: 58, highlights: ['Ratti Gali Lake 3,700m', 'Arang Kel via cable car', 'Sharda ruins', 'Taobat', 'Neelum River', 'Keran LOC'], includes: ['Hotel (4 nights)', 'Breakfast and dinner', 'Transport', 'Guide', 'Cable car tickets'], excludes: ['Lunches', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Muzaffarabad',activities:['Drive to Muzaffarabad','Fort visit']},{day:2,title:'Keran and Sharda',activities:['Neelum River drive','Sharda ruins']},{day:3,title:'Arang Kel',activities:['Cable car','Forest trek','Kashmir views']},{day:4,title:'Ratti Gali Lake',activities:['Trek to 3,700m','Alpine photography']},{day:5,title:'Return to Lahore',activities:['Morning departure']}] },
  { name: 'Kumrat Valley and Dir', destination: 'Kumrat Valley, Khyber Pakhtunkhwa', description: 'Discover one of Pakistan\'s most beautiful off-beat valleys Kumrat in Upper Dir with dense deodar forests and the Jahaz Banda plateau.', price: 19500, duration: '5 Days', image: '/images/packages/kumrat-valley.jpg', tags: ['Nature', 'Adventure', 'Off-beat'], featured: false, rating: 4.5, reviews: 34, highlights: ['Kumrat deodar forests', 'Jahaz Banda 3,400m', 'Do Kala waterfall', 'Panjkora River', 'Wildflower meadows', 'Kohistani culture'], includes: ['Hotel and guesthouse', 'All meals', '4x4 jeep', 'Local guide'], excludes: ['Transport from Lahore to Dir', 'Personal expenses', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Dir',activities:['Overnight drive','Arrive Dir']},{day:2,title:'Dir to Kumrat',activities:['Jeep to Kumrat','Do Kala waterfall']},{day:3,title:'Jahaz Banda',activities:['Trek to plateau 3,400m','Wildflowers']},{day:4,title:'Explore Kumrat',activities:['Forest walk','Village visit']},{day:5,title:'Return to Lahore',activities:['Morning departure']}] },
  { name: 'Hunza and Skardu Combined', destination: 'Hunza and Skardu, Gilgit-Baltistan', description: 'The ultimate northern Pakistan experience combining the best of Hunza and Skardu in one unforgettable 9-day journey.', price: 52000, originalPrice: 65000, duration: '9 Days', image: '/images/packages/hunza-skardu.jpg', tags: ['Adventure', 'Scenic', 'Popular'], featured: true, rating: 4.9, reviews: 108, highlights: ['Baltit Fort and Eagle\'s Nest', 'Attabad Lake', 'Deosai Plains safari', 'Shangrila Resort', 'Khunjerab Pass', 'Cold Desert'], includes: ['Hotel (8 nights)', 'All meals', 'Private vehicle', 'Expert guide', 'All entry fees', 'Boat ride'], excludes: ['Flights Lahore-Gilgit and Skardu-Lahore', 'Lunches', 'Personal shopping', 'Travel insurance', 'Tips'], itinerary: [{day:1,title:'Lahore to Hunza',activities:['Flight to Gilgit','Drive to Karimabad']},{day:2,title:'Hunza Monuments',activities:['Baltit Fort','Altit Fort']},{day:3,title:'Eagle\'s Nest and Attabad',activities:['Sunrise Eagle\'s Nest','Attabad Lake','Passu Cones']},{day:4,title:'Khunjerab Pass',activities:['Drive to 4,693m','China border']},{day:5,title:'Hunza to Skardu',activities:['Drive to Skardu','Skardu Fort']},{day:6,title:'Shigar Valley',activities:['Shigar Fort','Cold Desert']},{day:7,title:'Deosai Plains',activities:['Bear search','Sheosar Lake']},{day:8,title:'Skardu Lakes',activities:['Shangrila','Satpara Lake']},{day:9,title:'Departure',activities:['Flight Skardu to Lahore']}] },
];
const cityTours = [
  {
    name: 'Walled City Heritage Walk',
    duration: '1 Day', price: 2500,
    image: '/images/city-tours/walled-city.jpg',
    desc: 'Walk through the historic Walled City of Lahore, exploring Delhi Gate, Shahi Hammam, Wazir Khan Mosque and the bustling bazaars.',
    highlights: ['Delhi Gate', 'Wazir Khan Mosque', 'Shahi Hammam', 'Gali Surjan Singh', 'Badshahi Mosque', 'Minar-e-Pakistan'],
    difficulty: 'Easy', groupSize: 'Up to 15 people',
    overview: 'Walk through the historic Walled City of Lahore on this immersive guided heritage walk. This tour follows the Royal Route used by Mughal emperors, passing through centuries-old streets, magnificent mosques, a Mughal-era bathhouse, and vibrant traditional bazaars.',
    itinerary: [
      { time: '8:00 AM',  activity: 'Meeting Point Delhi Gate',         detail: 'Meet your guide at Delhi Gate. Brief introduction and overview of the day.' },
      { time: '8:30 AM',  activity: 'Delhi Gate to Shahi Guzargah',       detail: 'Walk through Delhi Gate into the heart of the Walled City. Explore Gali Surjan Singh with its preserved Mughal and Sikh-era havelis.' },
      { time: '9:30 AM',  activity: 'Wazir Khan Mosque',                  detail: 'Visit the magnificent Wazir Khan Mosque built in 1634 considered the finest Mughal mosque in Pakistan with its extraordinary tile work.' },
      { time: '10:30 AM', activity: 'Shahi Hammam',                       detail: 'Explore the Shahi Hammam a beautifully restored Mughal-era royal bathhouse commissioned by Wazir Khan.' },
      { time: '11:30 AM', activity: 'Shah Alam Market',                   detail: 'Walk through the bustling Shah Alam Market one of the oldest bazaars in the Walled City.' },
      { time: '1:00 PM',  activity: 'Lunch Break',                        detail: 'Lunch at a traditional restaurant in the Walled City. Try authentic Lahori cuisine.' },
      { time: '2:30 PM',  activity: 'Iqbal Park and Minar-e-Pakistan',    detail: 'Visit Greater Iqbal Park and the Minar-e-Pakistan monument.' },
      { time: '4:30 PM',  activity: 'Badshahi Mosque',                    detail: 'Visit the Badshahi Mosque one of the largest mosques in the world, built by Aurangzeb in 1673.' },
      { time: '5:30 PM',  activity: 'Tour Ends',                          detail: 'Tour concludes at the Badshahi Mosque.' },
    ],
    includes: ['Expert local guide (full day)', 'All entrance fees', 'Bottled water throughout', 'Transport between key sites', 'Afternoon tea'],
    excludes: ['Lunch', 'Lahore Fort interior entry', 'Personal shopping', 'Tips for guide'],
    meetingPoint: 'Delhi Gate, Walled City of Lahore', featured: true,
  },
  {
    name: 'Mughal Monuments Tour',
    duration: '1 Day', price: 3500,
    image: '/images/city-tours/mughal-monuments.jpg',
    desc: 'Visit the greatest Mughal monuments in Lahore Badshahi Mosque, Lahore Fort, Sheesh Mahal and Shalimar Gardens.',
    highlights: ['Lahore Fort Sheesh Mahal', 'Badshahi Mosque', 'Shalimar Gardens', 'Wazir Khan Mosque', 'Ranjit Singh Samadhi'],
    difficulty: 'Easy', groupSize: 'Up to 20 people',
    overview: 'This comprehensive Mughal Monuments Tour visits all the major monuments of the Mughal era in a single day, with an expert historian guide providing rich context and stories behind each extraordinary site.',
    itinerary: [
      { time: '8:00 AM',  activity: 'Lahore Fort Shahi Qila',           detail: 'Begin with the UNESCO-listed Lahore Fort. Explore Sheesh Mahal, Jahangir\'s Quadrangle, Naulakha Pavilion and Alamgiri Gate.' },
      { time: '11:00 AM', activity: 'Badshahi Mosque and Hazuri Bagh',    detail: 'Visit the Badshahi Mosque and Ranjit Singh Samadhi. Walk through Hazuri Bagh garden.' },
      { time: '1:30 PM',  activity: 'Lunch',                              detail: 'Lunch at Fort Road Food Street.' },
      { time: '3:00 PM',  activity: 'Wazir Khan Mosque',                  detail: 'Visit Wazir Khan Mosque with its extraordinary faience tile work.' },
      { time: '4:30 PM',  activity: 'Shalimar Gardens',                   detail: 'UNESCO-listed Shalimar Gardens built by Shah Jahan in 1641.' },
      { time: '6:00 PM',  activity: 'Tour Ends',                          detail: 'Tour concludes at Shalimar Gardens.' },
    ],
    includes: ['Expert historian guide (full day)', 'All Mughal monument entrance fees', 'Transport throughout', 'Bottled water'],
    excludes: ['Lunch', 'Personal shopping', 'Tips'],
    meetingPoint: 'Lahore Fort main entrance, Circular Road', featured: true,
  },
  {
    name: 'Lahore Food Street Experience',
    duration: 'Evening', price: 1800,
    image: '/images/city-tours/food-street.jpg',
    desc: 'Experience the legendary Lahori food culture Fort Road Food Street, Gawalmandi, Lahori Paye, Nihari and the famous Lassi.',
    highlights: ['Fort Road Food Street', 'Lahori Paye and Nihari', 'Gawalmandi Dhabas', 'Traditional Lassi', 'Lahori Karahi'],
    difficulty: 'Easy', groupSize: 'Up to 12 people',
    overview: 'Lahore is the food capital of Pakistan. This evening food tour takes you through the most legendary eating spots in the city, from Fort Road Food Street with its Mughal backdrop to the traditional dhabas of Gawalmandi.',
    itinerary: [
      { time: '5:30 PM', activity: 'Meeting Anarkali Bazaar',   detail: 'Meet your food guide at the historic Anarkali Bazaar.' },
      { time: '6:00 PM', activity: 'Gawalmandi Food Street',      detail: 'Start at Gawalmandi try Lahori Paye and Nihari from shops operating for generations.' },
      { time: '7:00 PM', activity: 'Fort Road Food Street',       detail: 'Head to Fort Road Food Street with views of Badshahi Mosque and Lahore Fort.' },
      { time: '7:30 PM', activity: 'Dinner at Food Street',       detail: 'Sit down dinner featuring Lahori Karahi, Seekh Kebab and Naan.' },
      { time: '9:00 PM', activity: 'Lassi and Desserts',          detail: 'End the tour with Lahori Lassi from a traditional lassi shop.' },
      { time: '9:30 PM', activity: 'Tour Ends',                   detail: 'Tour concludes in the Walled City area.' },
    ],
    includes: ['Food guide', 'All food tastings listed', 'Lassi and desserts', 'Transport between food spots'],
    excludes: ['Additional food beyond tastings', 'Personal drinks', 'Tips'],
    meetingPoint: 'Anarkali Bazaar, main entrance', featured: false,
  },
  {
    name: 'Shalimar Gardens and Museums',
    duration: '1 Day', price: 2800,
    image: '/images/city-tours/shalimar-gardens.jpg',
    desc: 'Explore the UNESCO-listed Shalimar Gardens and the Lahore Museum housing one of South Asia\'s finest collections.',
    highlights: ['Lahore Museum Fasting Buddha', 'Fakir Khana Museum', 'Shalimar Gardens', 'Gulabi Bagh Gateway'],
    difficulty: 'Easy', groupSize: 'Up to 20 people',
    overview: 'This tour visits the Shalimar Gardens — the finest surviving Mughal pleasure garden alongside Lahore Museum and the remarkable Fakir Khana Museum housing one of the world\'s largest private art collections.',
    itinerary: [
      { time: '9:00 AM',  activity: 'Lahore Museum',        detail: 'Begin with the Lahore Museum highlights include the famous Fasting Buddha sculpture and Mughal miniature paintings.' },
      { time: '11:30 AM', activity: 'Fakir Khana Museum',   detail: 'Visit the Fakir Khana Museum a private family museum housing over 100,000 artifacts.' },
      { time: '1:30 PM',  activity: 'Lunch',                detail: 'Lunch at a restaurant in Gulberg.' },
      { time: '3:00 PM',  activity: 'Shalimar Gardens',     detail: 'Visit UNESCO-listed Shalimar Gardens built by Shah Jahan in 1641.' },
      { time: '5:00 PM',  activity: 'Gulabi Bagh Gateway',  detail: 'Visit the Gulabi Bagh gateway one of the finest examples of Mughal tile work in Lahore.' },
      { time: '5:30 PM',  activity: 'Tour Ends',            detail: 'Tour concludes at Gulabi Bagh.' },
    ],
    includes: ['Expert guide', 'All museum and garden entrance fees', 'Transport throughout', 'Bottled water'],
    excludes: ['Lunch', 'Personal shopping', 'Tips'],
    meetingPoint: 'Lahore Museum, Mall Road', featured: false,
  },
  {
    name: 'Wagah Border Ceremony',
    duration: 'Half Day', price: 1500,
    image: '/images/city-tours/wagah-border.jpg',
    desc: 'Witness the spectacular Wagah Border flag-lowering ceremony at the Pakistan-India border unlike anything else in the world.',
    highlights: ['Flag-lowering Ceremony', 'Pakistan Rangers Drill', 'Border Crossing View', 'Patriotic Atmosphere'],
    difficulty: 'Easy', groupSize: 'Up to 30 people',
    overview: 'Every evening at sunset, the Pakistani and Indian border forces perform an elaborate and theatrical flag-lowering ceremony at Wagah Border the only open crossing between the two countries.',
    itinerary: [
      { time: '2:00 PM', activity: 'Departure from Lahore',     detail: 'Depart from Lahore Wagah Border is approximately 30 kilometres away.' },
      { time: '3:00 PM', activity: 'Arrive at Wagah Border',    detail: 'Arrive at the border and proceed through security.' },
      { time: '3:30 PM', activity: 'Explore the Border Area',   detail: 'View the border crossing and the Indian side grandstands.' },
      { time: '4:30 PM', activity: 'Ceremony Begins',           detail: 'Pakistan Rangers perform the flag-lowering drill to thunderous crowd response.' },
      { time: '5:30 PM', activity: 'Return to Lahore',          detail: 'Return journey to Lahore. Arrive back approximately 6:30 PM.' },
    ],
    includes: ['Transport (Lahore to Wagah and return)', 'Guide', 'Grandstand seating assistance'],
    excludes: ['Food and drinks', 'Personal shopping', 'Tips'],
    meetingPoint: 'Agreed pickup point in Lahore', featured: false,
  },
  {
    name: 'Complete Lahore City Tour',
    duration: '2 Days', price: 8500,
    image: '/images/city-tours/complete-lahore-tour.jpg',
    desc: 'The complete Lahore experience all major monuments, food streets, museums, Shalimar Gardens and Wagah Border over two full days.',
    highlights: ['Lahore Fort', 'Badshahi Mosque', 'Walled City Walk', 'Shalimar Gardens', 'Wagah Border', 'Food Street Dinners'],
    difficulty: 'Easy', groupSize: 'Up to 15 people',
    overview: 'The definitive Lahore experience. Over two full days with an expert historian guide, covering every major monument, food street, museum, garden and attraction in the city.',
    itinerary: [
      { time: 'Day 1 — 8:30 AM',  activity: 'Lahore Fort',                    detail: 'Full exploration of Lahore Fort including Sheesh Mahal, Picture Wall and Alamgiri Gate.' },
      { time: 'Day 1 — 11:00 AM', activity: 'Badshahi Mosque and Hazuri Bagh', detail: 'Badshahi Mosque, Ranjit Singh Samadhi and Hazuri Bagh garden.' },
      { time: 'Day 1 — 1:00 PM',  activity: 'Lunch at Fort Road Food Street',  detail: 'Lunch at the atmospheric Fort Road Food Street.' },
      { time: 'Day 1 — 3:00 PM',  activity: 'Walled City Heritage Walk',       detail: 'Walk through Delhi Gate, Wazir Khan Mosque, Shahi Hammam.' },
      { time: 'Day 1 — 6:00 PM',  activity: 'Gawalmandi Food Street Evening',  detail: 'Traditional Lahori dinner at Gawalmandi followed by Lassi.' },
      { time: 'Day 2 — 9:00 AM',  activity: 'Lahore Museum and Shalimar Gardens', detail: 'Lahore Museum followed by UNESCO-listed Shalimar Gardens.' },
      { time: 'Day 2 — 1:00 PM',  activity: 'Lunch in Gulberg',                detail: 'Lunch at a restaurant in Gulberg.' },
      { time: 'Day 2 — 3:00 PM',  activity: 'Wagah Border Ceremony',           detail: 'Drive to Wagah Border for the flag-lowering ceremony at sunset.' },
      { time: 'Day 2 — 6:30 PM',  activity: 'Liberty Market',                  detail: 'Shopping at Liberty Market in Gulberg.' },
      { time: 'Day 2 — 8:00 PM',  activity: 'Tour Ends',                       detail: 'Tour concludes in central Lahore.' },
    ],
    includes: ['Expert guide (2 full days)', 'All entrance fees', 'Transport throughout', 'Bottled water', 'Day 1 dinner at Gawalmandi'],
    excludes: ['Hotel accommodation', 'Lunches', 'Day 2 dinner', 'Personal shopping', 'Tips'],
    meetingPoint: 'Your hotel in Lahore (pickup included)', featured: true,
  },
];
const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Package.deleteMany();
    await CityTour.deleteMany();
    console.log('🗑️  Cleared existing data');
    console.log('Cleared existing city tours');

    await Package.insertMany(packages);
    await CityTour.insertMany(cityTours);
    console.log('✅ Data seeded successfully!');
    console.log(`📦 ${packages.length} packages inserted`);
    console.log(`🏙️  ${cityTours.length} city tours inserted`);

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};
importData();