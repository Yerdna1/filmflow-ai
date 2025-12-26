/**
 * Demo Actor Presets for FilmFlow AI
 * Slovak Drama: "Stratené Srdcia" (Lost Hearts)
 *
 * Realistic 30-minute film cast: 25 actors
 * - 4 Main characters
 * - 8 Supporting characters
 * - 8 Minor characters
 * - 5 Generic presets
 */

export const demoActors = [
  // ==========================================
  // MAIN CHARACTERS (4)
  // ==========================================
  {
    name: 'Mária Kováčová',
    type: 'MAIN',
    age: 32,
    gender: 'female',
    description: 'Hlavná hrdinka - talentovaná klaviristka, ktorá sa vracia do rodného mesta po rokoch v zahraničí. Elegantná, ale s vnútorným nepokojom. Tmavé vlasy, zelené oči, štíhla postava.',
    backstory: 'Mária odišla z malého slovenského mesta pred 10 rokmi, aby študovala hudbu vo Viedni. Teraz sa vracia na pohreb svojej babičky a musí čeliť minulosti, ktorú zanechala - vrátane svojej prvej lásky Jakuba. Jej matka zomrela, keď mala 15 rokov, čo ju hlboko poznačilo.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-20c54229-5ee2-4ff6-9536-2f2b1299b15b-0-1765880675072.jpeg',
    voiceId: 'sk_female_maria',
    traits: ['citlivá', 'talentovaná', 'nerozhodná', 'nostalgická'],
    relationships: {
      'Jakub Novák': 'bývalý partner, prvá láska',
      'Elena Kováčová': 'mladšia sestra',
      'Babička Anna': 'babička (zosnulá)',
      'Martin Horváth': 'nevlastný brat (neskôr odhalené)',
    },
  },
  {
    name: 'Jakub Novák',
    type: 'MAIN',
    age: 35,
    gender: 'male',
    description: 'Máriina prvá láska - teraz úspešný vinár v rodinnom podniku. Silný, ale citlivý muž, ktorý nikdy nezabudol. Atletická postava, krátke hnedé vlasy, vrúcne hnedé oči.',
    backstory: 'Jakub zostal v meste a prevzal rodinné vinárstvo po otcovej smrti pred 5 rokmi. Oženil sa s Katarínou, ale manželstvo nevydržalo - rozviedli sa pred 2 rokmi. Stále nosí v peňaženke starú fotku s Máriou. Cíti zodpovednosť za rodinu a tradíciu.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-e7da9049-853a-4fd4-9582-cd1f62131321-0-1765880675072.jpeg',
    voiceId: 'sk_male_jakub',
    traits: ['zodpovedný', 'romantický', 'tvrdohlavý', 'lojálny'],
    relationships: {
      'Mária Kováčová': 'bývalá partnerka, prvá láska',
      'Tomáš Novák': 'otec (zosnulý)',
      'Katarína Nováková': 'bývalá manželka',
      'Štefan Novák': 'starší brat',
    },
  },
  {
    name: 'Elena Kováčová',
    type: 'MAIN',
    age: 28,
    gender: 'female',
    description: 'Máriina mladšia sestra - temperamentná a priama. Cíti sa zradená, že ju Mária opustila. Svetlé vlasy, modré oči, energická.',
    backstory: 'Elena zostala doma starať sa o chorú babičku, zatiaľ čo Mária žila svoj sen. Teraz vedie miestnu kaviareň "U Anny" pomenovanú po babičke a tajne píše poéziu. Má komplikovaný vzťah s Lukášom, miestnym učiteľom.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-f274b32e-5aad-4a15-b997-17165d085a1b-0-1765880675072.jpeg',
    voiceId: 'sk_female_elena',
    traits: ['temperamentná', 'kreatívna', 'zraniteľná', 'starostlivá'],
    relationships: {
      'Mária Kováčová': 'staršia sestra',
      'Babička Anna': 'babička (zosnulá)',
      'Zuzana Bieliková': 'najlepšia kamarátka',
      'Lukáš Krajčír': 'komplikovaný vzťah',
    },
  },
  {
    name: 'Martin Horváth',
    type: 'MAIN',
    age: 40,
    gender: 'male',
    description: 'Tajomný cudzinec - rakúsky businessman, ktorý prichádza kúpiť Jakubovo vinárstvo. Elegantný, šedivejúce vlasy, prenikavé sivé oči.',
    backstory: 'Martin nie je tým, za koho sa vydáva. Je Máriiným nevlastným bratom - synom jej biologického otca, rakúskeho podnikateľa Hansa Horvátha, ktorý mal tajný vzťah s Máriinou matkou. Prišiel hľadať pravdu o svojej rodine.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-20c54229-5ee2-4ff6-9536-2f2b1299b15b-1-1765880675072.jpeg',
    voiceId: 'sk_male_martin',
    traits: ['záhadný', 'inteligentný', 'odmeraný', 'hľadajúci'],
    relationships: {
      'Mária Kováčová': 'nevlastná sestra',
      'Hans Horváth': 'otec (zosnulý)',
      'Helena Kováčová': 'nevlastná matka Márie',
    },
  },

  // ==========================================
  // SUPPORTING CHARACTERS (8)
  // ==========================================
  {
    name: 'Babička Anna',
    type: 'SUPPORTING',
    age: 78,
    gender: 'female',
    description: 'Zosnulá babička - objavuje sa v spomienkach a flashbackoch. Múdra žena s vráskami plnými príbehov, vždy v zástere, láskavé oči.',
    backstory: 'Anna bola strážkyňou rodinných tajomstiev. Vedela o Máriinom skutočnom otcovi, ale nikdy to nepovedala. V jej pozostalosti sa nájde list, ktorý zmení všetko. Bola známa svojimi koláčmi a múdrosťami.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-20c54229-5ee2-4ff6-9536-2f2b1299b15b-2-1765880675072.jpeg',
    voiceId: 'sk_female_anna',
    traits: ['múdra', 'láskavá', 'tajomná', 'ochranárska'],
    relationships: {
      'Mária Kováčová': 'vnučka',
      'Elena Kováčová': 'vnučka',
      'Helena Kováčová': 'dcéra (zosnulá)',
    },
  },
  {
    name: 'Peter Molnár',
    type: 'SUPPORTING',
    age: 55,
    gender: 'male',
    description: 'Miestny farár a rodinný priateľ. Vysoký, šedivé vlasy, vždy v čiernom, dobrotivá tvár s hlbokými vráskami.',
    backstory: 'Peter bol kedysi zaľúbený do Máriinej matky Heleny. Pozná tajomstvo o Máriinom skutočnom otcovi - bol to on, kto ich dal dokopy. Trápi ho vina a hľadá odpustenie.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-e7da9049-853a-4fd4-9582-cd1f62131321-1-1765880675072.jpeg',
    voiceId: 'sk_male_peter',
    traits: ['duchovný', 'trápený', 'múdry', 'kajúcny'],
    relationships: {
      'Helena Kováčová': 'bývalá láska (zosnulá)',
      'Mária Kováčová': 'krstná dcéra',
      'Babička Anna': 'rodinná priateľka',
    },
  },
  {
    name: 'Zuzana Bieliková',
    type: 'SUPPORTING',
    age: 30,
    gender: 'female',
    description: 'Elenina najlepšia kamarátka a spolumajiteľka kaviarne. Vždy vie, čo sa deje v meste. Kudrnaté ryšavé vlasy, pehy, živý úsmev.',
    backstory: 'Zuzana vyrastala s Elenou a zostala jej verná. Je miestna "spravodajská služba" - má rada klebety, ale jej srdce je na správnom mieste. Tajne je zaľúbená do Štefana Nováka.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-f274b32e-5aad-4a15-b997-17165d085a1b-1-1765880675072.jpeg',
    voiceId: 'sk_female_zuzana',
    traits: ['zhovorčivá', 'lojálna', 'romantická', 'praktická'],
    relationships: {
      'Elena Kováčová': 'najlepšia kamarátka',
      'Štefan Novák': 'tajná láska',
    },
  },
  {
    name: 'Tomáš Novák',
    type: 'SUPPORTING',
    age: 65,
    gender: 'male',
    description: 'Jakubov otec (v spomienkach) - prísny, ale spravodlivý vinár starej školy. Mohutná postava, fúzy, zvetranelá tvár.',
    backstory: 'Tomáš zomrel pred piatimi rokmi na infarkt. Jeho posledné slová Jakubovi boli o Márii: "Nedovoľ jej odísť znova." Bol legendou medzi vinármi regiónu.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-20c54229-5ee2-4ff6-9536-2f2b1299b15b-3-1765880675072.jpeg',
    voiceId: 'sk_male_tomas',
    traits: ['prísny', 'spravodlivý', 'tradičný', 'milujúci'],
    relationships: {
      'Jakub Novák': 'syn',
      'Štefan Novák': 'starší syn',
    },
  },
  {
    name: 'Štefan Novák',
    type: 'SUPPORTING',
    age: 38,
    gender: 'male',
    description: 'Jakubov starší brat - odišiel z mesta za kariérou v Bratislave. Advokát, elegantný, trochu namyslený.',
    backstory: 'Štefan vždy závidel Jakubovi vzťah s otcom. Odišiel študovať právo a stal sa úspešným advokátom. Vracia sa na pohreb a objavuje, že mu rodné mesto chýba viac, než si myslel.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-e7da9049-853a-4fd4-9582-cd1f62131321-2-1765880675072.jpeg',
    voiceId: 'sk_male_stefan',
    traits: ['ambiciózny', 'odmeraný', 'inteligentný', 'osamelý'],
    relationships: {
      'Jakub Novák': 'mladší brat',
      'Tomáš Novák': 'otec (zosnulý)',
      'Zuzana Bieliková': 'potenciálny záujem',
    },
  },
  {
    name: 'Katarína Nováková',
    type: 'SUPPORTING',
    age: 33,
    gender: 'female',
    description: 'Jakubova bývalá manželka - učiteľka na miestnej škole. Krásna, ale nešťastná, hľadá nový začiatok.',
    backstory: 'Katarína sa s Jakubom rozviedla pred 2 rokmi. Vedela, že jeho srdce vždy patrilo Márii. Teraz začína vzťah s Lukášom, ale cíti zmätok pri Máriinom návrate.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-f274b32e-5aad-4a15-b997-17165d085a1b-2-1765880675072.jpeg',
    voiceId: 'sk_female_katarina',
    traits: ['dôstojná', 'zranená', 'silná', 'odpúšťajúca'],
    relationships: {
      'Jakub Novák': 'bývalý manžel',
      'Lukáš Krajčír': 'nový vzťah',
    },
  },
  {
    name: 'Lukáš Krajčír',
    type: 'SUPPORTING',
    age: 35,
    gender: 'male',
    description: 'Miestny učiteľ histórie - romantik a idealista. Okuliare, učiteľský vzhľad, láskavé oči.',
    backstory: 'Lukáš je nový v meste - prišiel pred 3 rokmi. Má komplikovaný vzťah s Elenou, ale začal chodiť s Katarínou. Je fascinovaný históriou regiónu a vinárstva.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-e7da9049-853a-4fd4-9582-cd1f62131321-3-1765880675072.jpeg',
    voiceId: 'sk_male_lukas',
    traits: ['inteligentný', 'romantický', 'nerozhodný', 'láskavý'],
    relationships: {
      'Elena Kováčová': 'komplikovaná minulosť',
      'Katarína Nováková': 'súčasná partnerka',
    },
  },
  {
    name: 'Helena Kováčová',
    type: 'SUPPORTING',
    age: 45,
    gender: 'female',
    description: 'Máriina a Elenina matka (v spomienkach) - krásna, talentovaná, tragická postava. Zosnulá pred 17 rokmi.',
    backstory: 'Helena zomrela pri autonehode, keď mala Mária 15 rokov. Mala tajný vzťah s Hansom Horváthom, z ktorého sa narodila Mária. Elena je dcéra jej manžela Jozefa.',
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-f274b32e-5aad-4a15-b997-17165d085a1b-3-1765880675072.jpeg',
    voiceId: 'sk_female_helena',
    traits: ['krásna', 'tajomná', 'tragická', 'milujúca'],
    relationships: {
      'Mária Kováčová': 'dcéra',
      'Elena Kováčová': 'dcéra',
      'Hans Horváth': 'tajný milenec',
      'Jozef Kováč': 'manžel',
    },
  },

  // ==========================================
  // MINOR CHARACTERS (8)
  // ==========================================
  {
    name: 'Jozef Kováč',
    type: 'MINOR',
    age: 50,
    gender: 'male',
    description: 'Máriinín a Elenin otec (v spomienkach) - robotník, jednoduchý muž. Zosnulý.',
    backstory: 'Jozef nikdy nevedel, že Mária nie je jeho biologická dcéra. Miloval obe dcéry rovnako. Zomrel na rakovinu pred 8 rokmi.',
    imageUrl: '/actors/actor-male-50.svg',
    voiceId: 'sk_male_jozef',
    traits: ['jednoduchý', 'pracovitý', 'milujúci'],
  },
  {
    name: 'Starosta Ján Horník',
    type: 'MINOR',
    age: 60,
    gender: 'male',
    description: 'Miestny starosta - politický, ale nie zlý človek. Korpulentný, vždy v obleku.',
    backstory: 'Starosta už 20 rokov. Poznal všetkých v meste. Snaží sa zachovať tradície a pritiahnuť turistov.',
    imageUrl: '/actors/actor-male-60.svg',
    voiceId: 'sk_male_starosta',
    traits: ['politický', 'tradičný', 'priateľský'],
  },
  {
    name: 'Doktorka Iveta Šimková',
    type: 'MINOR',
    age: 45,
    gender: 'female',
    description: 'Miestna lekárka - starala sa o babičku Annu v posledných mesiacoch. Praktická, empatická.',
    backstory: 'Doktorka Šimková sa vrátila do rodného mesta po rokoch v Prahe. Vie o zdravotných tajomstvách mnohých rodín.',
    imageUrl: '/actors/actor-female-45.svg',
    voiceId: 'sk_female_doktorka',
    traits: ['profesionálna', 'empatická', 'diskrétna'],
  },
  {
    name: 'Pani Marta Hrušková',
    type: 'MINOR',
    age: 70,
    gender: 'female',
    description: 'Suseda Kováčovcov - vie všetko o všetkých. Malá, živá, vždy pri plote.',
    backstory: 'Pani Marta bola najlepšia priateľka babičky Anny. Pozná tajomstvá, ale drží jazyk za zubami - väčšinou.',
    imageUrl: '/actors/actor-female-70.svg',
    voiceId: 'sk_female_marta',
    traits: ['zvedavá', 'dobrosrdečná', 'klebetná'],
  },
  {
    name: 'Ondrej Varga',
    type: 'MINOR',
    age: 55,
    gender: 'male',
    description: 'Majster vinárov - pracuje pre Jakuba už 30 rokov. Fúzy, červená tvár, mozolnaté ruky.',
    backstory: 'Ondrej poznal Jakubovho otca Tomáša lepšie než ktokoľvek. Je ako strýko pre Jakuba.',
    imageUrl: '/actors/actor-male-55.svg',
    voiceId: 'sk_male_ondrej',
    traits: ['pracovitý', 'lojálny', 'múdry'],
  },
  {
    name: 'Organista Pavol',
    type: 'MINOR',
    age: 65,
    gender: 'male',
    description: 'Kostolný organista - hrá na pohrebe babičky. Tichý, duchovný.',
    backstory: 'Pavol učil malú Máriu hrať na klavír. Bol to on, kto objavil jej talent.',
    imageUrl: '/actors/actor-male-65.svg',
    voiceId: 'sk_male_pavol',
    traits: ['tichý', 'hudobný', 'duchovný'],
  },
  {
    name: 'Čašníčka Simona',
    type: 'MINOR',
    age: 22,
    gender: 'female',
    description: 'Mladá čašníčka v kaviarni Eleny. Energická študentka.',
    backstory: 'Simona brigáduje v kaviarni počas štúdia. Obdivuje Elenu a jej odvahu viesť vlastný biznis.',
    imageUrl: '/actors/actor-female-22.svg',
    voiceId: 'sk_female_simona',
    traits: ['energická', 'mladá', 'ambiciózna'],
  },
  {
    name: 'Notár Dr. Kováč',
    type: 'MINOR',
    age: 58,
    gender: 'male',
    description: 'Miestny notár - číta babičkin testament. Formálny, presný.',
    backstory: 'Dr. Kováč (žiadny príbuzenský vzťah) spravuje testamenty rodín v regióne už 30 rokov.',
    imageUrl: '/actors/actor-male-58.svg',
    voiceId: 'sk_male_notar',
    traits: ['formálny', 'presný', 'dôverný'],
  },

  // ==========================================
  // GENERIC PRESETS (5)
  // ==========================================
  {
    name: 'Slovenská žena - mladá',
    type: 'PRESET',
    age: 25,
    gender: 'female',
    description: 'Generická mladá slovenská žena. Vhodná pre vedľajšie postavy, hosťky na kare, svadobné hostky.',
    backstory: null,
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-e7da9049-853a-4fd4-9582-cd1f62131321-2-1765880675072.jpeg',
    voiceId: 'sk_female_generic_young',
    traits: [],
  },
  {
    name: 'Slovenská žena - stredný vek',
    type: 'PRESET',
    age: 45,
    gender: 'female',
    description: 'Generická žena stredného veku. Ideálna pre matky, učiteľky, predavačky, smútočné hosťky.',
    backstory: null,
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-e7da9049-853a-4fd4-9582-cd1f62131321-3-1765880675072.jpeg',
    voiceId: 'sk_female_generic_middle',
    traits: [],
  },
  {
    name: 'Slovenský muž - mladý',
    type: 'PRESET',
    age: 28,
    gender: 'male',
    description: 'Generický mladý slovenský muž. Vhodný pre vedľajšie postavy, pracovníkov vo vinártstve.',
    backstory: null,
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-f274b32e-5aad-4a15-b997-17165d085a1b-2-1765880675072.jpeg',
    voiceId: 'sk_male_generic_young',
    traits: [],
  },
  {
    name: 'Slovenský muž - stredný vek',
    type: 'PRESET',
    age: 50,
    gender: 'male',
    description: 'Generický muž stredného veku. Ideálny pre otcov, podnikateľov, smútočných hostí.',
    backstory: null,
    imageUrl: '/actors/actor-male-50-generic.svg',
    voiceId: 'sk_male_generic_middle',
    traits: [],
  },
  {
    name: 'Slovenský muž - starší',
    type: 'PRESET',
    age: 70,
    gender: 'male',
    description: 'Generický starší slovenský muž. Ideálny pre dedov, starostov, farárov, múdrych starcov.',
    backstory: null,
    imageUrl: 'https://mayzbozualhhrykb.public.blob.vercel-storage.com/generations/gen-f274b32e-5aad-4a15-b997-17165d085a1b-3-1765880675072.jpeg',
    voiceId: 'sk_male_generic_old',
    traits: [],
  },
]

// Voice presets for ElevenLabs
export const actorVoices: Record<string, {
  name: string
  provider: string
  voiceId: string
  accent: string
  gender: string
  ageRange: string
}> = {
  // Main characters
  sk_female_maria: { name: 'Mária', provider: 'elevenlabs', voiceId: '21m00Tcm4TlvDq8ikWAM', accent: 'západoslovenský', gender: 'female', ageRange: '25-35' },
  sk_male_jakub: { name: 'Jakub', provider: 'elevenlabs', voiceId: 'VR6AewLTigWG4xSOukaG', accent: 'západoslovenský', gender: 'male', ageRange: '30-40' },
  sk_female_elena: { name: 'Elena', provider: 'elevenlabs', voiceId: 'EXAVITQu4vr4xnSDxMaL', accent: 'západoslovenský', gender: 'female', ageRange: '25-30' },
  sk_male_martin: { name: 'Martin', provider: 'elevenlabs', voiceId: 'pNInz6obpgDQGcFmaJgB', accent: 'rakúsky prízvuk', gender: 'male', ageRange: '35-45' },

  // Supporting characters
  sk_female_anna: { name: 'Anna (babička)', provider: 'elevenlabs', voiceId: 'MF3mGyEYCl7XYWbV9V6O', accent: 'stredoslovenský', gender: 'female', ageRange: '70+' },
  sk_male_peter: { name: 'Peter (farár)', provider: 'elevenlabs', voiceId: 'yoZ06aMxZJJ28mfd3POQ', accent: 'stredoslovenský', gender: 'male', ageRange: '50-60' },
  sk_female_zuzana: { name: 'Zuzana', provider: 'elevenlabs', voiceId: 'jBpfuIE2acCO8z3wKNLl', accent: 'východoslovenský', gender: 'female', ageRange: '25-35' },
  sk_male_tomas: { name: 'Tomáš', provider: 'elevenlabs', voiceId: 'TxGEqnHWrfWFTfGW9XjX', accent: 'západoslovenský', gender: 'male', ageRange: '60-70' },
  sk_male_stefan: { name: 'Štefan', provider: 'elevenlabs', voiceId: 'N2lVS1w4EtoT3dr4eOWO', accent: 'bratislavský', gender: 'male', ageRange: '35-40' },
  sk_female_katarina: { name: 'Katarína', provider: 'elevenlabs', voiceId: 'XB0fDUnXU5powFXDhCwa', accent: 'západoslovenský', gender: 'female', ageRange: '30-35' },
  sk_male_lukas: { name: 'Lukáš', provider: 'elevenlabs', voiceId: 'CYw3kZ02Hs0563khs1Fj', accent: 'neutrálny', gender: 'male', ageRange: '30-40' },
  sk_female_helena: { name: 'Helena', provider: 'elevenlabs', voiceId: 'XrExE9yKIg1WjnnlVkGX', accent: 'západoslovenský', gender: 'female', ageRange: '40-50' },

  // Minor characters
  sk_male_jozef: { name: 'Jozef', provider: 'elevenlabs', voiceId: 'SOYHLrjzK2X1ezoPC6cr', accent: 'vidiecky', gender: 'male', ageRange: '45-55' },
  sk_male_starosta: { name: 'Starosta', provider: 'elevenlabs', voiceId: 'GBv7mTt0atIp3Br8iCZE', accent: 'formálny', gender: 'male', ageRange: '55-65' },
  sk_female_doktorka: { name: 'Doktorka', provider: 'elevenlabs', voiceId: 'oWAxZDx7w5VEj9dCyTzz', accent: 'profesionálny', gender: 'female', ageRange: '40-50' },
  sk_female_marta: { name: 'Marta', provider: 'elevenlabs', voiceId: 'z9fAnlkpzviPz146aGWa', accent: 'vidiecky', gender: 'female', ageRange: '65-75' },
  sk_male_ondrej: { name: 'Ondrej', provider: 'elevenlabs', voiceId: 'Zlb1dXrM653N07WRdFW3', accent: 'vidiecky', gender: 'male', ageRange: '50-60' },
  sk_male_pavol: { name: 'Pavol', provider: 'elevenlabs', voiceId: 'bVMeCyTHy58xNoL34h3p', accent: 'tichý', gender: 'male', ageRange: '60-70' },
  sk_female_simona: { name: 'Simona', provider: 'elevenlabs', voiceId: 'FGY2WhTYpPnrIDTdsKH5', accent: 'mladý', gender: 'female', ageRange: '20-25' },
  sk_male_notar: { name: 'Notár', provider: 'elevenlabs', voiceId: 'IKne3meq5aSn9XLyUdCD', accent: 'formálny', gender: 'male', ageRange: '55-60' },

  // Generic presets
  sk_female_generic_young: { name: 'Mladá žena', provider: 'elevenlabs', voiceId: '21m00Tcm4TlvDq8ikWAM', accent: 'neutrálny', gender: 'female', ageRange: '20-30' },
  sk_female_generic_middle: { name: 'Žena stredný vek', provider: 'elevenlabs', voiceId: 'MF3mGyEYCl7XYWbV9V6O', accent: 'neutrálny', gender: 'female', ageRange: '40-50' },
  sk_male_generic_young: { name: 'Mladý muž', provider: 'elevenlabs', voiceId: 'VR6AewLTigWG4xSOukaG', accent: 'neutrálny', gender: 'male', ageRange: '20-30' },
  sk_male_generic_middle: { name: 'Muž stredný vek', provider: 'elevenlabs', voiceId: 'TxGEqnHWrfWFTfGW9XjX', accent: 'neutrálny', gender: 'male', ageRange: '40-50' },
  sk_male_generic_old: { name: 'Starší muž', provider: 'elevenlabs', voiceId: 'TxGEqnHWrfWFTfGW9XjX', accent: 'neutrálny', gender: 'male', ageRange: '65+' },
}

// Actor statistics
export const actorStats = {
  total: demoActors.length,
  byType: {
    main: demoActors.filter(a => a.type === 'MAIN').length,
    supporting: demoActors.filter(a => a.type === 'SUPPORTING').length,
    minor: demoActors.filter(a => a.type === 'MINOR').length,
    preset: demoActors.filter(a => a.type === 'PRESET').length,
  },
  byGender: {
    male: demoActors.filter(a => a.gender === 'male').length,
    female: demoActors.filter(a => a.gender === 'female').length,
  },
  withImages: demoActors.filter(a => a.imageUrl).length,
  withVoices: demoActors.filter(a => a.voiceId).length,
}
