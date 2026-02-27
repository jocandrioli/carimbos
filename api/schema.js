const crypto = require("crypto");

const SALT = "carimbos-gpon-rs-capital-2024";

function checkAuth(req, res) {
  const pw = process.env.APP_PASSWORD || "";
  if (!pw) { res.status(500).json({ error: "APP_PASSWORD não configurada." }); return false; }
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const expected = crypto.createHmac("sha256", SALT).update(pw).digest("hex");
  if (!token || token !== expected) { res.status(401).json({ error: "Acesso negado." }); return false; }
  return true;
}

// ═══════════════════════════════════════════════════════════════
// DADOS SENSÍVEIS — ficam APENAS no servidor
// ═══════════════════════════════════════════════════════════════
const LISTS = {
  supervisors: [
    { name: "Alexandre Ilha", phone: "(51) 99753-4576" },
    { name: "Diego Jaworski", phone: "(51) 99670-7110" },
    { name: "Diego Richter", phone: "(51) 99754-9214" },
    { name: "Marcio Mendes", phone: "(51) 99589-2075" },
    { name: "Mário Pereira", phone: "(51) 99837-8234" },
    { name: "Rodrigo Duarte", phone: "(51) 99758-7793" },
    { name: "Rodrigo Rosa", phone: "(51) 99840-6074" }
  ],
  analysts: ["Carina F. Chuquel","Edmilson G. Rieira","Eduarda P. Rodrigues","Julia S. Silva","Matheus A. Castro","Rafaela V. Dias","Silvio L. R. Putrique"],
  techDirectory: [
    { phone:"51 99763-8035", matricula:"00076213", name:"Matheus S. Sanguine" },
    { phone:"51 99924-4755", matricula:"00163361", name:"Luciano Mabilia" },
    { phone:"51 99678-8025", matricula:"00163721", name:"Ismael S. Brito" },
    { phone:"51 99422-8248", matricula:"00060280", name:"Valdir R. C. Almeida" },
    { phone:"51 98030-9631", matricula:"00073519", name:"Silvio L. R. Putrique" },
    { phone:"51 99534-1867", matricula:"03540223", name:"José H. O. Machado" },
    { phone:"51 98054-0410", matricula:"00163877", name:"Guilherme D. S. Freitas" },
    { phone:"51 99526-0602", matricula:"00159101", name:"Lucas D. P. Cordeiro" },
    { phone:"51 99709-0842", matricula:"00163697", name:"Robson R. Silva" },
    { phone:"51 99618-2075", matricula:"00060276", name:"Laerte R. Silva" },
    { phone:"51 99763-4557", matricula:"00075430", name:"Marcio A. G. S. Santos" },
    { phone:"51 98064-4219", matricula:"00163623", name:"Luis C. S. Santos" },
    { phone:"51 98658-5845", matricula:"00161608", name:"Ronaldo F. Dutra" },
    { phone:"51 99612-4572", matricula:"03538188", name:"Marco A. Espindula" },
    { phone:"51 98200-2880", matricula:"00161750", name:"Neivo J. Rosa" },
    { phone:"51 99747-3044", matricula:"00163141", name:"Luis G. V. Ramos" },
    { phone:"51 98457-3078", matricula:"00161587", name:"Carlos D. R. S. Silva" },
    { phone:"51 98059-7226", matricula:"00163233", name:"Alex G. Matzenbacher" },
    { phone:"51 98023-8657", matricula:"03552249", name:"Carlos A. Souza" },
    { phone:"51 99570-4213", matricula:"03550117", name:"Cassiano R. A. S. Silva" },
    { phone:"51 99919-9314", matricula:"00164406", name:"Jair S. Correia" },
    { phone:"51 99764-5055", matricula:"00069814", name:"Sergio Klug" },
    { phone:"51 98041-7960", matricula:"00163287", name:"Pablo J. Rosa" },
    { phone:"51 98053-8983", matricula:"03538781", name:"Rafael B. Marco" },
    { phone:"51 99871-5081", matricula:"03538393", name:"Nairo I. Mirandoli" },
    { phone:"51 98098-6616", matricula:"00163683", name:"Diego M. Flores" },
    { phone:"51 99150-5863", matricula:"00161589", name:"Alexandre M. F. S. Santos" },
    { phone:"51 99597-6730", matricula:"00075370", name:"Atilas P. Carvalho" },
    { phone:"51 99231-4424", matricula:"00176139", name:"Antonio C. V. Callegari" },
    { phone:"51 99796-5508", matricula:"00176016", name:"João C. C. Marques" },
    { phone:"51 99516-6051", matricula:"00176136", name:"Jonatan G. Santos" },
    { phone:"51 99628-3036", matricula:"00176067", name:"Lindomar A. Nascimento" },
    { phone:"51 98050-2082", matricula:"00176104", name:"Marcelo D. S. Teixeira" },
    { phone:"51 99774-0215", matricula:"00176008", name:"Miguel A. F. S. M. Machado" },
    { phone:"51 99859-9693", matricula:"00176073", name:"Uilian D. S. Salgado" },
    { phone:"51 99743-3673", matricula:"00176312", name:"Anderson T. C. Costa" },
    { phone:"51 99528-9884", matricula:"00176299", name:"Gabriel A. Ziemer" },
    { phone:"51 99648-3321", matricula:"00176277", name:"Sergio C. S. M. Junior" },
    { phone:"51 99897-8292", matricula:"00176115", name:"Vinicius D. S. Camponogara" },
    { phone:"51 99841-5012", matricula:"00176249", name:"Mauricio G. Barros" },
    { phone:"51 99531-1546", matricula:"00176278", name:"Luiz A. Fagundes" },
    { phone:"51 99913-3576", matricula:"00176316", name:"Marcelo B. Conforti" },
    { phone:"51 99898-1482", matricula:"00176391", name:"Deivide R. Silva" },
    { phone:"51 99587-8094", matricula:"00074649", name:"Denis R. L. Vogel" },
    { phone:"51 99586-5085", matricula:"00176386", name:"Diego D. Santos" },
    { phone:"51 99630-0788", matricula:"00176813", name:"Paulo R. Soares" },
    { phone:"51 99745-1232", matricula:"00176379", name:"Regis R. Pereira" },
    { phone:"51 99996-0999", matricula:"00176258", name:"Oldonir A. A. Silva" }
  ],
  sites: ["RSCBM_G1N01","RSCBM_O1A01","RSGUB_G1N01","RSNHO_G1I02","RSPAE_G1B95","RSPAE_G1C01","RSPAE_G1I22","RSPAE_G1I23","RSPAE_G1I24","RSPAE_G1I25","RSPAE_G1I26","RSPAE_G1I32","RSPAE_G1I33","RSPAE_G1I35","RSPAE_G1I41","RSPAE_G1I47","RSPAE_G1I48","RSPAE_G1I51","RSPAE_G1I55","RSPAE_G1I57","RSPAE_G1N42","RSPAE_G1N45","RSSLE_G1M01","RSSLE_O1A04"],
  causes: ["Abalroamento","Furto","Acidente","Descarga","Vandalismo","Troca de poste","Degradação / Infiltração","Defeito","Falha em atividade anterior","Obra de terceiros","Interperie","Ataque de animais","Sem defeito pra rede"],
  subcauses: {
    "Furto":["Cabo","CEO","CTO","Splitter"],
    "Acidente":["Carga alta","Linha de pipa"],
    "Descarga":["Atmosferica","Eletrica"],
    "Degradação / Infiltração":["CEO","CTO","DGOI"],
    "Defeito":["Splitter Atenuado","Fibra curta","Saída de Splitter","Sem sinal"],
    "Falha em atividade anterior":["Atenuação","Desorganização","Fibra invertida","Fibra quebrada"],
    "Obra de terceiros":["Outras obras","Poda de Arvore","Troca de poste não programada"],
    "Ataque de animais":["Abelha","Formiga","Outros","Roedores"],
    "Sem defeito pra rede":["Encontrado OK"]
  },
  materials: [
    {id:"mat_0001",name:"ALÇA PREFORM P/ DROP ÓPT ASU ATÉ 12 FO",code:"0056-0003-0",unit:"un"},
    {id:"mat_0002",name:"SPLITTER OPT. PASSIVO 1:8-10 DB-FTTH",code:"0192-0219-9",unit:"un"},
    {id:"mat_0003",name:"KIT DERIV FIST-GCO DERIVAÇÃO RAYCHEM",code:"0219-0022-1",unit:"un"},
    {id:"mat_0004",name:"ABRAÇ. AÇO INOX AUTO TRAVANTE S/PROT",code:"0219-0333-7",unit:"un"},
    {id:"mat_0005",name:"LAÇO PRÉ-FORMADO LPF 4,8",code:"0256-0092-3",unit:"un"},
    {id:"mat_0006",name:"DERIVAÇÃO T PRÉ-FORMADA P/CORDOALHA 6,4",code:"0256-0180-6",unit:"un"},
    {id:"mat_0007",name:"LAÇO PREFORM P/ DROP ÓPT ASU ATÉ 12 FO",code:"0256-0234-9",unit:"un"},
    {id:"mat_0008",name:"ALÇA PREF P/CFOA-SM-AS-80 de 18 a 36 fo",code:"0256-0243-5",unit:"un"},
    {id:"mat_0009",name:"ALÇA PREF P/CFOA-SM-AS-80 de 48 a 72 fo",code:"0256-0244-6",unit:"un"},
    {id:"mat_0010",name:"ALÇA PREF. P/ CORDOALHA DIELÉTRICA 6,4",code:"0380-9200-0",unit:"un"},
    {id:"mat_0011",name:"CORDOALHA DIELÉTRICA 6,4",code:"0380-9201-1",unit:"m"},
    {id:"mat_0012",name:"DERIVACAO PREF P CORD DIELETRICA 6,4",code:"0380-9202-2",unit:"un"},
    {id:"mat_0013",name:"FIO DE ESPINAR DIELETRICO",code:"0380-9203-3",unit:"m"},
    {id:"mat_0014",name:"LAÇO PREF. P/ CORDOALHA DIELÉTRICA 6,4",code:"0380-9204-4",unit:"un"},
    {id:"mat_0015",name:"CABO CFOA-SM AS 80 24F TS",code:"0452-0120-3",unit:"m"},
    {id:"mat_0016",name:"KIT DERIV TERMOC CEO AEREO/SUBT FOSC100",code:"0460-0048-2",unit:"un"},
    {id:"mat_0017",name:"CAIXA OPTICA 6 ADAPTADORES + PIGTAIL",code:"0486-0358-5",unit:"un"},
    {id:"mat_0018",name:"CRUZETA P RESERVA TÉCNICA FO POSTE 300mm",code:"0254-0061-4",unit:"un"},
    {id:"mat_0019",name:"SUP ANCORAGEM CABO OPT AS E CORD DIELETR",code:"0456-0157-7",unit:"un"},
    {id:"mat_0020",name:"SUP PASSAGEM CABO OPT AS E CORD DIELETR",code:"0456-0158-8",unit:"un"},
    {id:"mat_0021",name:"LAÇO PREF P/CFOA-SM-AS-80 DE 18 A 36 FO",code:"0456-0160-0",unit:"un"},
    {id:"mat_0022",name:"LAÇO PREF P/CFOA-SM-AS-80 DE 48 A 72 FO",code:"0456-0161-1",unit:"un"},
    {id:"mat_0023",name:"LAÇO PREF P/CFOA-SM-AS-80 DE 144 FO",code:"0456-0162-2",unit:"un"},
    {id:"mat_0024",name:"CTOPS 70/30 (AZUL) OPT",code:"0380-9207-7",unit:"un"},
    {id:"mat_0025",name:"CTOPS 80/20 (BRANCA) FC",code:"0380-9213-3",unit:"un"},
    {id:"mat_0026",name:"CTOPS 90/10 (VERDE) FC",code:"0380-9215-5",unit:"un"},
    {id:"mat_0027",name:"CTOPS 85/15 (AMARELA) FC",code:"0380-9214-4",unit:"un"},
    {id:"mat_0028",name:"CTOPS 1:8 (ROXA) FC",code:"0256-0343-3",unit:"un"},
    {id:"mat_0029",name:"CTOPS 60/40 (VERMELHA) FC",code:"0380-9211-1",unit:"un"},
    {id:"mat_0030",name:"CTOPS 70/30 (AZUL) FC",code:"0380-9212-2",unit:"un"},
    {id:"mat_0031",name:"MINI CDOE 1:8 ENTRADA E SAÍDA PRECON",code:"0186-0100-2",unit:"un"},
    {id:"mat_0032",name:"MINI CDOE 85/15",code:"0186-0099-8",unit:"un"},
    {id:"mat_0033",name:"MINI CDOE 80/20",code:"0186-0099-9",unit:"un"},
    {id:"mat_0034",name:"MINI CDOE 90/10",code:"0186-0100-0",unit:"un"},
    {id:"mat_0035",name:"MINI CDOE 60/40",code:"0186-0097-7",unit:"un"},
    {id:"mat_0036",name:"MINI CDOE 70/30",code:"0186-0098-8",unit:"un"},
    {id:"mat_0037",name:"BRAÇADEIRA REGULÁVEL POSTE BAP-3",code:"0256-0073-7",unit:"un"},
    {id:"mat_0038",name:"ANEL DE DISTRIBUICAO EM ACO AGFS",code:"0230-0204-7",unit:"un"},
    {id:"mat_0039",name:"BRAÇADEIRA REGULÁVEL POSTE BAP-2",code:"0256-0072-9",unit:"un"},
    {id:"mat_0040",name:"ALÇA PLASTICA PARA ANCORAGEM CFOA 5MM",code:"0380-9220-0",unit:"un"},
    {id:"mat_0041",name:"SUPORTE UNIVERSAL PARA CAIXA BARRAMENTO",code:"0460-0069-9",unit:"un"},
    {id:"mat_0042",name:"PLAQUETA DE IDENTIFICAÇÃO PARA CABO ÓPTI",code:"0840-2667-7",unit:"un"},
    {id:"mat_0043",name:"CARACTER ADESIVO 15MM ALGARISMOS 0-9",code:"9001-1358-8",unit:"plc"},
    {id:"mat_0044",name:"CARACTER ADESIVO 15MM ALFABETO A-N",code:"9001-1360-0",unit:"plc"},
    {id:"mat_0045",name:"CHAPA MEIO DE VAO",code:"0230-0232-5",unit:"un"},
    {id:"mat_0046",name:"DROP OPTICO AS CM AR FIG8 LSZH 4F",code:"0380-9221-1",unit:"m"},
    {id:"mat_0047",name:"CABO DROP CIRCULAR 5 MM 12F",code:"0452-1257-7",unit:"m"},
    {id:"mat_0048",name:"MINI-CEO TERMOC 16ENT AEREO E SUBT 144FO",code:"0456-0170-0",unit:"un"},
    {id:"mat_0049",name:"CONJ EMENDA 48F 4ENT",code:"0456-0169-9",unit:"un"},
    {id:"mat_0050",name:"CONJ EMENDA 72F 4ENT",code:"0456-0172-2",unit:"un"},
    {id:"mat_0051",name:"CABO DROP CIRCULAR 12F - 100M",code:"0452-1258-8",unit:"un"},
    {id:"mat_0052",name:"CABO DROP CIRCULAR 12F - 500M",code:"0452-1264-4",unit:"un"},
    {id:"mat_0053",name:"CABO DROP CIRCULAR 12F - 150M",code:"0452-1259-9",unit:"un"},
    {id:"mat_0054",name:"CABO DROP CIRCULAR 12F - 200M",code:"0452-1260-0",unit:"un"},
    {id:"mat_0055",name:"CABO DROP CIRCULAR 12F - 250M",code:"0452-1261-1",unit:"un"},
    {id:"mat_0056",name:"CABO DROP CIRCULAR 12F - 300M",code:"0452-1262-2",unit:"un"},
    {id:"mat_0057",name:"CABO DROP CIRCULAR 12F - 400M",code:"0452-1263-3",unit:"un"},
    {id:"mat_0058",name:"CABO DROP CIRCULAR 24F - 100M",code:"0452-1280-0",unit:"un"},
    {id:"mat_0059",name:"ALÇA PLASTIC ATE 6,3MM C/GANCHO METALICO",code:"0380-9242-2",unit:"un"},
    {id:"mat_0060",name:"CEOP 12F",code:"0456-0184-4",unit:"un"},
    {id:"mat_0061",name:"CDPS 2 SP1:8 CAIXA DERIV PRE-C SPLIT",code:"0460-0072-2",unit:"un"},
    {id:"mat_0062",name:"CDPS SP1:8 CAIXA DERIV PRE-C SPLIT",code:"0460-0074-4",unit:"un"},
    {id:"mat_0063",name:"CDPS SP1:4 CAIXA DERIV PRE-C SPLIT",code:"0460-0080-0",unit:"un"},
    {id:"mat_0064",name:"CDPS 4 SP1:4 CAIXA DERIV PRE-C SPLIT",code:"0460-0078-8",unit:"un"},
    {id:"mat_0065",name:"CDPS 2 SP1:4 CAIXA DERIV PRE-C SPLIT",code:"0460-0079-9",unit:"un"},
    {id:"mat_0066",name:"CONJ. SUP. CABOS OPT MEIO DE VAO RAQUETE",code:"0460-0084-4",unit:"un"},
    {id:"mat_0072",name:"FITA PARA ROTULADORA ELETRONICA (PT80)",code:"0378-1565-0",unit:"rolo"},
    {id:"mat_0073",name:"ADAPTADOR REF UNIV DROP FIG8",code:"0380-9259-9",unit:"un"},
    {id:"mat_0074",name:"FIO DE ESPINAR ISOLADO PARA AGRUPADOR",code:"0380-9291-0",unit:"m"},
    {id:"mat_0075",name:"LAÇO PREF P/ CABO DROP ALT. CAP ATE 48",code:"0380-9294-0",unit:"un"},
    {id:"mat_0076",name:"ALÇA PREF P/ CABO DROP ALT. CAP ATE 48",code:"0380-9295-0",unit:"un"},
    {id:"mat_0077",name:"CUNHA PLÁST P/ DROP ÓPT ROC/FIG8 REDEXT",code:"0099-0119-0",unit:"un"},
    {id:"mat_0078",name:"CONECT OPT FAC SC/APC FIG8 COMPAC REDEXT",code:"0380-9292-0",unit:"un"},
    {id:"mat_0079",name:"DROP OPT COMP INTERNO CFOI REDEXT",code:"0380-9293-0",unit:"un"},
    {id:"mat_0080",name:"PONTO TERMINAL DE REDE-ÓPTICO REDEXT",code:"0258-0397-0",unit:"un"},
    {id:"mat_0081",name:"TUBO ISOLADOR MENSAGEIRO TIM 4,8MM",code:"0430-0018-0",unit:"m"},
    {id:"mat_0082",name:"TUBO ISOLADOR MENSAGEIRO TIM 6,4MM",code:"0430-0019-0",unit:"m"},
    {id:"mat_0083",name:"ALÇA PREF DROP FIG8",code:"0380-9296-0",unit:"un"},
    {id:"mat_0084",name:"LAÇO PREF DROP FIG8",code:"0380-9297-0",unit:"un"},
    {id:"mat_0085",name:"SUP ENCAIXE UNIFICADO 04 ROLD (TIPO DM)",code:"0456-0201-0",unit:"un"},
    {id:"mat_0086",name:"SPIRAL TUBE 1/2 LARANJA",code:"0254-0082-7",unit:"m"},
    {id:"mat_0087",name:"DUTO P PROTEÇÃO PARA CABOS EM REDE AEREA",code:"0430-0017-7",unit:"m"},
    {id:"mat_0088",name:"CABO DROP ALTA CAPACID. 24F S/MPO",code:"0452-1331-0",unit:"m"},
    {id:"mat_0089",name:"CABO DROP ALTA CAPACID. 36F S/MPO",code:"0452-1332-0",unit:"m"},
    {id:"mat_0090",name:"CABO DROP ALTA CAPACID. 144F S/MPO",code:"0452-1373-0",unit:"m"},
    {id:"mat_0091",name:"Protetor Ref p/ Conec Campo CDOE (NOVA)",code:"0458-0014-0",unit:"un"},
    {id:"mat_0092",name:"CABO DROP ALTA CAPACID. 72 FIBRAS S/MPO",code:"0452-1333-0",unit:"m"},
    {id:"mat_0093",name:"Protetor p/ Conec Reforçado de Campo",code:"0458-0015-0",unit:"un"},
    {id:"mat_0094",name:"ALÇA PREF P/ CABO DROP ALT. CAP. 72FO",code:"0256-0367-0",unit:"un"},
    {id:"mat_0095",name:"ALÇA PREF P/ CABO DROP ALT. CAP 144FO",code:"0256-0368-0",unit:"un"},
    {id:"mat_0096",name:"PROTETOR EMENDA 45 mm X 3,5 m (Tubete)",code:"0458-0018-0",unit:"un"}
  ]
};

// Deduplica techDirectory
const seen = new Set();
LISTS.techDirectory = LISTS.techDirectory.filter(t => {
  if (seen.has(t.matricula)) return false;
  seen.add(t.matricula); return true;
});
LISTS.technicians = [...new Set(LISTS.techDirectory.map(t => t.name))]
  .sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!checkAuth(req, res)) return;
  return res.status(200).json({ lists: LISTS });
};
