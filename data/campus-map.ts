export type RoomType = 'Class' | 'Lab' | 'Cabin' | 'Hall' | 'TPO' | 'Office' | 'Washroom' | 'COE' | 'Sports' | 'Others';
export type Floor = 'Ground' | 'First' | 'Second' | '-1';

export interface Room {
  name: string;
  loc: string;
  lat: string;
  lng: string;
  type: RoomType;
  floor: Floor;
}

export const ROOMS: Room[] = ([  // Ground Floor
  {name: "Entrance", loc: "Main entrance", lat: "12.9753648", lng: "77.5867286", type: "Others", floor: "Ground"},
  {name: "Engineering Division", loc: "Unknown area", lat: "12.9753449", lng: "77.5867471", type: "Others", floor: "Ground"},
  {name: "TPO", loc: "Training and placements office", lat: "12.9753887", lng: "77.5867166", type: "TPO", floor: "Ground"},
  {name: "TPO Lab-1", loc: "Right wing", lat: "12.975338", lng: "77.5865372", type: "TPO", floor: "Ground"},
  {name: "TPO Lab-2", loc: "Right wing", lat: "12.975323", lng: "77.5864685", type: "TPO", floor: "Ground"},
  {name: "TPO Lab-3", loc: "Right wing", lat: "12.9752635", lng: "77.5863323", type: "TPO", floor: "Ground"},
  {name: "AC Machines Lab", loc: "Right wing", lat: "12.9751904", lng: "77.5862096", type: "Lab", floor: "Ground"},
  {name: "Power Systems Protection Lab", loc: "Right wing", lat: "12.9751884", lng: "77.5861382", type: "Lab", floor: "Ground"},
  {name: "Dr. K.P. Guruswamy (KPG), Dr.Mahesh C.M (Dept of EE)", loc: "Right wing", lat: "12.9751247", lng: "77.5860581", type: "Cabin", floor: "Ground"},
  {name: "Dr.Madhusudhana J, Manjappa N (Dept of EE)", loc: "Right wing", lat: "12.9751136", lng: "77.5859957", type: "Cabin", floor: "Ground"},
  {name: "Minchu", loc: "Marvel, Staff, TPO", lat: "12.974937", lng: "77.586295", type: "Others", floor: "Ground"},
  {name: "SMT. M V Vijayalakshmi (Finance Officer)", loc: "Left wing", lat: "12.9751358", lng: "77.5866834", type: "Cabin", floor: "Ground"},
  {name: "Prof. Subhasish Tripathy (Director)", loc: "Left wing", lat: "12.9750633", lng: "77.5866562", type: "Cabin", floor: "Ground"},
  {name: "Dr. A.V. Sriram (Registrar (Interim))", loc: "Left wing", lat: "12.9749734", lng: "77.5866123", type: "Cabin", floor: "Ground"},
  {name: "Administrative Office", loc: "Left wing", lat: "12.9747669", lng: "77.5865228", type: "Office", floor: "Ground"},
  {name: "Room 101", loc: "Left wing", lat: "12.9746774", lng: "77.5865", type: "Class", floor: "Ground"},
  {name: "Gents Washroom-1", loc: "Left wing", lat: "12.9746153", lng: "77.5864732", type: "Washroom", floor: "Ground"},
  {name: "Ladies Washroom-1", loc: "Left wing", lat: "12.9746764", lng: "77.586499", type: "Washroom", floor: "Ground"},
  {name: "Vending machine", loc: "Right wing", lat: "12.9751165", lng: "77.5860651", type: "Others", floor: "Ground"},
  {name: "Dept Of electrical engineering", loc: "Left wing", lat: "12.97422", lng: "77.586305", type: "Lab", floor: "Ground"},
  {name: "Arcadis Training Centre", loc: "Left wing", lat: "12.9742272", lng: "77.5863327", type: "Lab", floor: "Ground"},
  {name: "Circuits and measurements lab", loc: "Left wing", lat: "12.974349", lng: "77.586374", type: "Lab", floor: "Ground"},
  {name: "Basic Electrical Engineering Lab", loc: "Left wing", lat: "12.9743736", lng: "77.5863883", type: "Lab", floor: "Ground"},
  {name: "DC Machines and Transformers Lab", loc: "Left wing", lat: "12.974376", lng: "77.586386", type: "Lab", floor: "Ground"},
  {name: "Dr Y R Manjunath,Dr.H. Prasanna Kumar(EEE)", loc: "Left wing", lat: "12.9745422", lng: "77.5864634", type: "Cabin", floor: "Ground"},
  {name: "Renewable Energy Lab", loc: "Left wing", lat: "12.974564", lng: "77.58646", type: "Lab", floor: "Ground"},
  {name: "Power Electronics and Drives Lab", loc: "Left wing", lat: "12.9741677", lng: "77.5862753", type: "Lab", floor: "Ground"},
  {name: "Electrical Main Panel Board room", loc: "Left wing", lat: "12.97464", lng: "77.58649", type: "Others", floor: "Ground"},
  {name: "LH 4", loc: "Lecture Hall Complex", lat: "12.9744206", lng: "77.5861479", type: "Hall", floor: "Ground"},
  {name: "LH 2", loc: "Lecture Hall Complex", lat: "12.9743213", lng: "77.5859753", type: "Hall", floor: "Ground"},
  {name: "LH 5", loc: "Lecture Hall Complex", lat: "12.974524", lng: "77.585996", type: "Hall", floor: "Ground"},
  {name: "LH 6", loc: "Lecture Hall Complex", lat: "12.9745823", lng: "77.5859525", type: "Hall", floor: "Ground"},
  {name: "LH 1", loc: "Lecture Hall Complex", lat: "12.974462", lng: "77.585887", type: "Hall", floor: "Ground"},
  {name: "Ladies washroom -3", loc: "Lecture Hall Complex", lat: "12.9744673", lng: "77.5858234", type: "Washroom", floor: "Ground"},
  {name: "LH 3", loc: "Lecture Hall Complex", lat: "12.974353", lng: "77.58597", type: "Hall", floor: "Ground"},
  {name: "Ladies Washroom -2", loc: "Right wing", lat: "12.9749447", lng: "77.5856873", type: "Washroom", floor: "Ground"},
  {name: "Gents Washroom- 3", loc: "Lecture Hall Complex", lat: "12.974319", lng: "77.586024", type: "Washroom", floor: "Ground"},
  {name: "Gents Washroom- 4", loc: "Right wing", lat: "12.9745934", lng: "77.5854442", type: "Washroom", floor: "Ground"},
  {name: "Staff room (Dr. Dharmendra Chouhan)", loc: "Lecture Hall Complex", lat: "12.974353", lng: "77.586056", type: "Cabin", floor: "Ground"},
  {name: "Gents Washroom- 5", loc: "Electrical Block", lat: "12.9742181", lng: "77.5853285", type: "Washroom", floor: "Ground"},
  {name: "NCC (No.2 KAR AIR SQN (T))", loc: "NCC", lat: "12.974085", lng: "77.586042", type: "Cabin", floor: "Ground"},
  {name: "Indoor Sports room", loc: "Electrical Block", lat: "12.9743504", lng: "77.5853644", type: "Sports", floor: "Ground"},
  {name: "Physics Lab (Dept. Of Physics)", loc: "Electrical Block", lat: "12.974093", lng: "77.585458", type: "Lab", floor: "Ground"},
  {name: "Room No. 330", loc: "Electrical Block", lat: "12.9742654", lng: "77.5853962", type: "Class", floor: "Ground"},

  // First Floor
  {name: "ECE Lab", loc: "Right wing", lat: "12.9751031", lng: "77.5860343", type: "Lab", floor: "First"},
  {name: "Electrical staff rooms", loc: "Right wing", lat: "12.9750231", lng: "77.5858408", type: "Cabin", floor: "First"},
  {name: "Dr.Ramesh H.R", loc: "Right wing", lat: "12.9749927", lng: "77.5857694", type: "Cabin", floor: "First"},
  {name: "ECE Analog Electronics Lab", loc: "Right wing", lat: "12.9749535", lng: "77.5857", type: "Lab", floor: "First"},
  {name: "Veena H.S", loc: "Right wing", lat: "12.9748898", lng: "77.5855518", type: "Cabin", floor: "First"},
  {name: "Dr.T.S.Prasanna", loc: "Right wing", lat: "12.9748166", lng: "77.5855133", type: "Cabin", floor: "First"},
  {name: "ECE VLSI Lab", loc: "Right wing", lat: "12.9747457", lng: "77.5854908", type: "Lab", floor: "First"},
  {name: "ECE Signal Processing and Networks", loc: "Right wing", lat: "12.9746875", lng: "77.58547", type: "Lab", floor: "First"},
  {name: "ECE ICs and Embedded system", loc: "Right wing", lat: "12.9746202", lng: "77.5854415", type: "Lab", floor: "First"},
  {name: "Dr.B.P.Harish", loc: "Right Wing", lat: "12.9750861", lng: "77.5859692", type: "Cabin", floor: "First"},
  {name: "UVCE COE Room 4", loc: "Right wing", lat: "12.9751035", lng: "77.5860185", type: "COE", floor: "First"},
  {name: "UVCE COE Room 3", loc: "Right wing", lat: "12.9751381", lng: "77.5861121", type: "COE", floor: "First"},
  {name: "UVCE COE Room 2", loc: "Right wing", lat: "12.975273", lng: "77.586382", type: "COE", floor: "First"},
  {name: "UUCMS Office", loc: "Right wing", lat: "12.9753044", lng: "77.5864624", type: "Others", floor: "First"},
  {name: "Dr.H.Prasanna Kumar(Chairman Electrical dept) and EEE dept", loc: "Right wing", lat: "12.9753393", lng: "77.5865496", type: "Cabin", floor: "First"},
  {name: "Dept of ECE and Chairman", loc: "Left Wing", lat: "12.9751721", lng: "77.5867005", type: "Cabin", floor: "First"},
  {name: "Dr.Thriveni J and Dept of CSE", loc: "Left Wing", lat: "12.9750492", lng: "77.5866532", type: "Cabin", floor: "First"},
  {name: "CSE Office", loc: "Left Wing", lat: "12.9749966", lng: "77.586625", type: "Office", floor: "First"},
  {name: "CSE-211", loc: "Left Wing", lat: "12.9747849", lng: "77.5865516", type: "Class", floor: "First"},
  {name: "Dr Kiran K(CSE) Dr Tanuja R (CSE)", loc: "Left Wing", lat: "12.974754", lng: "77.586537", type: "Cabin", floor: "First"},
  {name: "CSE-213", loc: "Left Wing", lat: "12.9747264", lng: "77.5865358", type: "Class", floor: "First"},
  {name: "CAD LAB Automation Lab", loc: "Left Wing", lat: "12.974566", lng: "77.586476", type: "Lab", floor: "First"},
  {name: "EC-201", loc: "Left Wing", lat: "12.9746196", lng: "77.5864986", type: "Class", floor: "First"},
  {name: "Design Lab", loc: "Left Wing", lat: "12.97446", lng: "77.586455", type: "Lab", floor: "First"},
  {name: "Dr.S.H Manjula(Prof CSE)", loc: "Left Wing", lat: "12.9744755", lng: "77.5864343", type: "Cabin", floor: "First"},
  {name: "EC Lab (CSE)", loc: "Left Wing", lat: "12.974395", lng: "77.586393", type: "Lab", floor: "First"},
  {name: "Measurement & Metrology Lab", loc: "Left Wing", lat: "12.9743634", lng: "77.5863937", type: "Lab", floor: "First"},
  {name: "Sand testing Lab", loc: "Left Wing", lat: "12.974188", lng: "77.586292", type: "Lab", floor: "First"},
  {name: "Gents Washroom-2", loc: "Left Wing", lat: "12.9741717", lng: "77.5862864", type: "Washroom", floor: "First"},
  {name: "ML-VI", loc: "Left Wing", lat: "12.974144", lng: "77.586186", type: "Class", floor: "First"},
  {name: "Room No. 328", loc: "Electrical Block", lat: "12.9742762", lng: "77.5853017", type: "Class", floor: "First"},
  {name: "Ladies washroom 4", loc: "Electrical Block", lat: "12.974276", lng: "77.585362", type: "Washroom", floor: "First"},
  {name: "Ladies Lounge", loc: "Electrical Block", lat: "12.9742429", lng: "77.5853637", type: "Others", floor: "First"},
  {name: "Room no 329", loc: "Electrical Block", lat: "12.974343", lng: "77.585345", type: "Class", floor: "First"},
  {name: "Room no. 326", loc: "Electrical Block", lat: "12.9741364", lng: "77.5854536", type: "Class", floor: "First"},
  {name: "Room no. 327", loc: "Electrical Block", lat: "12.974158", lng: "77.585417", type: "Class", floor: "First"},
  {name: "Room no. 324", loc: "Electrical Block", lat: "12.9740318", lng: "77.5854861", type: "Class", floor: "First"},
  {name: "Room no. 325", loc: "Electrical Block", lat: "12.974052", lng: "77.585462", type: "Class", floor: "First"},
  {name: "Room no. 323", loc: "Electrical Block", lat: "12.9740014", lng: "77.5854888", type: "Class", floor: "First"},
  {name: "Sir M.Visvesvaraya Senate Hall", loc: "Main Entrance", lat: "12.9753197", lng: "77.5866713", type: "Hall", floor: "First"},

  // Second Floor
  {name: "CSE Lab 1", loc: "Main entrance -Right Wing Second floor", lat: "12.9749718", lng: "77.5857211", type: "Lab", floor: "Second"},
  {name: "CSE Lab 2", loc: "Main entrance -Right Wing Second floor", lat: "12.9749914", lng: "77.585763", type: "Lab", floor: "Second"},
  {name: "CSE Lab 3", loc: "Main entrance -Right Wing Second floor", lat: "12.975009", lng: "77.5857966", type: "Lab", floor: "Second"},
  {name: "CSE Lab 4", loc: "Main entrance -Right Wing Second floor", lat: "12.9750535", lng: "77.5858868", type: "Lab", floor: "Second"},
  {name: "EC 301 A", loc: "Main entrance -Left Wing Second floor", lat: "12.9746745", lng: "77.5865037", type: "Class", floor: "Second"},
  {name: "EC 302A", loc: "Main entrance -Left Wing Second floor", lat: "12.9745843", lng: "77.586550", type: "Class", floor: "Second"},
  {name: "EC 301 B", loc: "Main entrance -Left Wing Second  floor ", lat: "12.974576", lng: "77.586473", type: "Class", floor: "Second"},
  {name: "EC 303", loc: "Main entrance -Left Wing Second floor", lat: "12.9744151", lng: "77.5864212", type: "Class", floor: "Second"},
  {name: "EC 302 B", loc: "Main entrance -Left Wing Second  floor ", lat: "12.974549", lng: "77.586456", type: "Class", floor: "Second"},
  {name: "EC 306", loc: "Main entrance -Left Wing Second floor", lat: "12.9741736", lng: "77.586326", type: "Class", floor: "Second"},
  {name: "EC 304", loc: "Main entrance -Left Wing Second  floor ", lat: "12.974432", lng: "77.586413", type: "Class", floor: "Second"},
  {name: "EC 308", loc: "Main entrance -Left Wing Second floor", lat: "12.9741191", lng: "77.5861516", type: "Class", floor: "Second"},
  {name: "EC 305", loc: "Main entrance -Left Wing Second  floor ", lat: "12.974404", lng: "77.586391", type: "Class", floor: "Second"},
  {name: "EC 307", loc: "Main entrance -Left Wing Second  floor ", lat: "12.974155", lng: "77.586207", type: "Class", floor: "Second"},
  
  // -1 Floor
  {name: "Chemistry Lab (Dept. of Chemistry)", loc: "Electrical Block", lat: "12.9740367", lng: "77.585528", type: "Lab", floor: "-1"},

  // Mechanical Block - Ground Floor
  {name: "Entrance-Dept of Mechanical engineering", loc: "Mechanical Block", lat: "12.9759797", lng: "77.5866964", type: "Others", floor: "Ground"},
  {name: "Prof. Shivarudraiah (Dept of Mechanical engineering)", loc: "Mechanical Block", lat: "12.9761202", lng: "77.5866217", type: "Cabin", floor: "Ground"},
  {name: "Prof.H.C.Chittappa (Chairman Dept of Mechanical Engineering)", loc: "Mechanical Block", lat: "12.9760927", lng: "77.5866582", type: "Cabin", floor: "Ground"},
  {name: "Office-Mechanical Dept", loc: "Mechanical Block", lat: "12.9759163", lng: "77.5866324", type: "Office", floor: "Ground"},
  {name: "EDM Lab", loc: "Mechanical Block", lat: "12.9758908", lng: "77.5865794", type: "Lab", floor: "Ground"},
  {name: "Ladies Toilet", loc: "Mechanical Block", lat: "12.9758278", lng: "77.5864403", type: "Washroom", floor: "Ground"},
  {name: "AICTE-RPS-R&D Lab", loc: "Mechanical Block", lat: "12.975835", lng: "77.5864923", type: "Lab", floor: "Ground"},

  // Mechanical Block - First Floor
  {name: "U.N.Kempayya- Dean", loc: "Mechanical Block", lat: "12.9760441", lng: "77.5866545", type: "Cabin", floor: "First"},
  {name: "Staff Cabin (Unnamed)", loc: "Mechanical Block", lat: "12.9761176", lng: "77.5866364", type: "Cabin", floor: "First"},
  {name: "Dr.Ananda GK", loc: "Mechanical Block", lat: "12.9759281", lng: "77.5866515", type: "Cabin", floor: "First"},
  {name: "Dr.Ramesh DK", loc: "Mechanical Block", lat: "12.9758987", lng: "77.5866512", type: "Cabin", floor: "First"},
  {name: "Classroom (Unnamed)", loc: "Mechanical Block", lat: "12.9758778", lng: "77.5866009", type: "Class", floor: "First"},
  {name: "Mechanical Lecture Hall-102", loc: "Mechanical Block", lat: "12.9758235", lng: "77.5864775", type: "Hall", floor: "First"},
  {name: "Seminar Hall", loc: "Mechanical Block", lat: "12.9757938", lng: "77.5864162", type: "Hall", floor: "First"},
  {name: "Mechanical Lecture Hall-103", loc: "Mechanical Block", lat: "12.9757647", lng: "77.5863354", type: "Hall", floor: "First"},
  {name: "Mechanical Lecture Hall-104", loc: "Mechanical Block", lat: "12.9757412", lng: "77.5862723", type: "Hall", floor: "First"},
  {name: "Gents Washroom", loc: "Mechanical Block", lat: "12.9757134", lng: "77.5861972", type: "Washroom", floor: "First"},

  // Mechanical Block - Second Floor
  {name: "Design Innovation Center", loc: "Mechanical Block", lat: "12.9761225", lng: "77.5866314", type: "Cabin", floor: "Second"},
  {name: "Dr.Bangarappa.L", loc: "Mechanical Block", lat: "12.9760565", lng: "77.5866599", type: "Cabin", floor: "Second"},
  {name: "Dr.Madhu H.J", loc: "Mechanical Block", lat: "12.9760872", lng: "77.5866663", type: "Cabin", floor: "Second"},
  {name: "Dr.Ramesh kumar KR", loc: "Mechanical Block", lat: "12.9761071", lng: "77.5866535", type: "Cabin", floor: "Second"},
  {name: "Prof-Dr.Saravanan.R", loc: "Mechanical Block", lat: "12.9759264", lng: "77.5866451", type: "Cabin", floor: "Second"},
  {name: "Prof-Dr.Rajashekar.R", loc: "Mechanical Block", lat: "12.9759264", lng: "77.5866451", type: "Cabin", floor: "Second"},
  {name: "Dr.Venkatesh N", loc: "Mechanical Block", lat: "12.9759055", lng: "77.5866455", type: "Cabin", floor: "Second"},
  {name: "Dr.Chethan.M.R", loc: "Mechanical Block", lat: "12.9759055", lng: "77.5866455", type: "Cabin", floor: "Second"},
  {name: "Dr.C.Anilkumar", loc: "Mechanical Block", lat: "12.9758859", lng: "77.5866307", type: "Cabin", floor: "Second"},
  {name: "Sri.Sathish P.C", loc: "Mechanical Block", lat: "12.9758859", lng: "77.5866307", type: "Cabin", floor: "Second"},
  {name: "ML 201", loc: "Mechanical Block", lat: "12.9758735", lng: "77.5865979", type: "Hall", floor: "Second"},
  {name: "ML 202", loc: "Mechanical Block", lat: "12.975833", lng: "77.5864819", type: "Hall", floor: "Second"},
  {name: "ML 203", loc: "Mechanical Block", lat: "12.9758242", lng: "77.5864564", type: "Hall", floor: "Second"},
  {name: "ML 204", loc: "Mechanical Block", lat: "12.9757922", lng: "77.5863608", type: "Hall", floor: "Second"},
  {name: "ML 205", loc: "Mechanical Block", lat: "12.975769", lng: "77.5862931", type: "Hall", floor: "Second"},
  {name: "Dr H.K.Shivanand", loc: "Mechanical Block", lat: "12.9757432", lng: "77.5862267", type: "Cabin", floor: "Second"},
  {name: "Staff Toilet", loc: "Mechanical Block", lat: "12.9757118", lng: "77.5861536", type: "Washroom", floor: "Second"}
] as Room[]).sort((a, b) => {
  const typeA = a.type.toLowerCase();
  const typeB = b.type.toLowerCase();
  if (typeA < typeB) return -1;
  if (typeA > typeB) return 1;
  return a.name.localeCompare(b.name);
});