// ======= CONFIGURACIÓN DEL TORNEO / TOURNAMENT CONFIG =======
// Única fuente de los números del torneo. Cambiá acá cuando se cierren.
// Single source of truth for the tournament numbers. Edit here once final.
const TOURNAMENT_CONFIG = {
  totalRunners: 32,
  directQualifiers: 8,    // Top 8 de las clasificatorias: directo a Octavos, no juegan grupos
  numGroups: 3,
  groupSize: 8,
  groupQualifiers: 8,     // los mejores 8 de la fase de grupos completan el cuadro (16 en Octavos)
  matchdays: 4,           // fechas de la fase de grupos

  // Apertura de las clasificatorias ("qualys"). Formato ISO con offset.
  // Qualifier window opens. ISO format with UTC offset.
  qualysOpen: '2026-12-26T00:00:00-03:00',      // abren: 26 dic 2026, 00:00 hora Argentina (UTC-3)
  qualysClose: '',                              // cierre: sin definir (si se deja vacio, no se muestra)
  qualysTimeZone: 'America/Argentina/Buenos_Aires', // solo para mostrar la fecha siempre igual

  // Modo prueba: usa datos falsos en Grupos / Clasificatorias / Brackets.
  // También se activa agregando ?mock=1 a la URL (sin tocar el código).
  // Test mode: fake data. Also enabled with ?mock=1 in the URL.
  mock: false,
};

// ======= FUENTES DE DATOS (Google Sheets) / DATA SOURCES =======
// Pegar acá el link de "Publicar en la web -> CSV" de cada hoja.
// Sheet PRINCIPAL del torneo (2027). Por ahora está casi vacía: hasta que se
// carguen corredores, la pestaña Clasificatorias muestra el mensaje de vacío.
const SHEET_ID = '1oBfViFUu-jujuuVkXmNCU4Ew9Lt9gCEptcTYFwPtZHw';
const sheetCsv = gid => `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

const SHEET_URLS = {
  groups: '',                      // gid de la hoja de grupos — pendiente
  schedule: '',                    // hoja del calendario/sorteo (Fecha, Grupo, Corredor 1, Corredor 2, Horario) — pendiente
  standings: sheetCsv('1240403995'), // hoja "Qualifiers" de la sheet principal
};

// ======= BANDERAS / FLAGS =======
// País de cada corredor. Se usa cuando la Sheet no trae la columna "Flag".
// Valor: código ISO de 2 letras ("AR", "UY", "US", "JP"...) o directamente un emoji.
// Clave: nombre del corredor en minúsculas. / Key: runner name, lowercased.
const RUNNER_FLAGS = {
  jokeruy: 'UY',
  sawken: 'AR',
  pochoide: 'AR',
  yuushi: 'JP',
  shimarisu: 'JP',

  frit: 'US',
  majorrichy: 'US',

  seppp: 'ID',
  champt: 'ID',
  zudinn: 'ID',
  muh: 'ID',
  lu1u: 'ID',
  val: 'ID',
  hannnry: 'ID',
  aqbilghilman: 'ID',

  nobu_22: 'PE',
  matiuss: 'EC',

  youcri: 'JP',
  doradori_dolph: 'JP',

  infamouslol8: 'CO',
  razie: 'CR',
  luis_sera: 'FR',

  novi_fan: 'AR',
  mateoush27: 'AR',
  mattgael: 'AR',

  pixiesaki: 'CL',
  manboo: 'CN',
  gui19: 'BR',

  missing: 'MX',
  '4rcadan': 'AR',
  otakuxd: 'BR',
  thenevs: 'BR',
  mikewavrr: 'US',
  abdou_mz: 'DZ',
  // ...completar. También se puede llenar la columna "Flag" de la Sheet.
};

// ======= EDICIONES ANTERIORES / PAST EDITIONS =======
// Sheets con TODOS los datos de cada edición pasada (para el botón "ver datos").
const sheetPreview = (id, gid) => `https://docs.google.com/spreadsheets/d/${id}/preview?gid=${gid}`;
const SHEET_2026_ARCHIVE_ID = '1Q4dkuOBvclcAzfIG_8oD6oQeFjp3ION0lxsDkE-K9No';
const SHEET_2022_ARCHIVE_ID = '1nMEivjEgs-6tI-h75PW8KDr2iS4VDLM1O12JFCQpAw4';

// Podio de cada Ditman Cup pasada. Dejar '' lo que falte.
const PAST_EDITIONS = [
  {
    year: 2026,
    champion: 'JokerUY',
    runnerUp: 'Sawken',
    third: 'Pochoide',
    prize: '$1,568',
    logo: 'assets/champions/2026.png',
    vod: 'https://www.youtube.com/@DitmanCup',
    sheetUrl: sheetPreview(SHEET_2026_ARCHIVE_ID, '1240403995'),
  },
  {
    year: 2022,
    name: 'NG Pro Tournament 2022',
    champion: 'Yuushi',
    runnerUp: 'shimarisu',
    third: 'Sawken',
    prize: '$1,000',
    logo: 'assets/champions/2022.png',
    vod: '',
    sheetUrl: sheetPreview(SHEET_2022_ARCHIVE_ID, '526473677'),
  },
];

// ======= MEJORES CLIPS / BEST CLIPS =======
// Clips destacados por sección. Extraídos del canal de Twitch (twitch.tv/ditmancup).
// Cada item: s = slug del clip, t = título, a = autor del clip, v = views, d = fecha.
// Para sumar uno a mano: agregá { s: '<slug>', ... } a la sección que quieras.
const CLIPS = [
  { section: 'Ditman Cup 2026', items: [
    { s: 'NeighborlyAdorableOctopusOSsloth-naioivubgNMq57TY', t: 'Tenes que cerrar el estadio, los genios hacen eso', a: 'Gallardd', v: 120, d: '2026-01-20' },
    { s: 'OutstandingTenaciousSoymilkTTours-wRFOfwbbdffulO6q', t: 'SAWKEN TODODROGADO', a: 'MateoUsh27', v: 107, d: '2026-01-25' },
    { s: 'FlirtySucculentMosquitoOMGScoots-EFR8hfxGtCFAy7hL', t: 'CHACO KICK', a: 'JokerUY', v: 98, d: '2026-01-13' },
    { s: 'DistinctPlumpLegDeIlluminati-DJgd6W_mll5N1CZc', t: 'MISSING MOST CREEPYPASTA GALLERY', a: 'JokerUY', v: 92, d: '2026-02-21' },
    { s: 'BlueAdorableToadChefFrank-la6UlXjFJNLEYywW', t: 'EL FOLLOW MATEO EL FOLLOOOOOOOW', a: 'sawkenn', v: 85, d: '2026-02-07' },
    { s: 'FurryPerfectFerretEleGiggle-SPnRwG9pHQB9lzkH', t: 'That is so UNLUCKY', a: 'MikeWavRR', v: 70, d: '2026-02-12' },
    { s: 'CloudyStormyApePMSTwin-9eeZAF9w9R-M54cL', t: 'youcri activa los cheats de invencibilidad', a: 'sawkenn', v: 64, d: '2026-02-08' },
    { s: 'BusyAliveTigerLitty-wJwAOmsjsjrpAlLD', t: 'el wachin ta de paso nomas', a: 'sawkenn', v: 63, d: '2026-01-28' },
    { s: 'TentativeAcceptableIcecreamArsonNoSexy-aoOYQ1bm-isR9ATd', t: 'creepypasta novis2 para pocho', a: 'sawkenn', v: 63, d: '2026-02-02' },
    { s: 'KathishRelentlessBoarPastaThat-OIg3PEFsWsxFU9gT', t: 'INSTA MUFA JOKER', a: 'JokerUY', v: 61, d: '2026-02-07' },
    { s: 'GrotesqueObeseEagleAliens-TA3OH4wFkEnuG5tx', t: 'OUT OF BOUND FLASH ARCA', a: 'JokerUY', v: 59, d: '2026-02-09' },
    { s: 'CrypticHilariousConsoleKappaPride-Z8vcsSWRyxGaoYhV', t: 'pocho no lo hago mas', a: 'gapi0909', v: 58, d: '2026-01-25' },
    { s: 'ThankfulIncredulousSproutThisIsSparta-Fp-Heo8xDXKA55NG', t: 'la jokermufa', a: 'sawkenn', v: 54, d: '2026-01-31' },
    { s: 'ShyCrunchyBottleCeilingCat-RKwaxjtJFr5jM45w', t: 'que andas mostrando arca', a: 'sawkenn', v: 52, d: '2026-02-16' },
    { s: 'ScaryAthleticQuailNotLikeThis-yD2oLEMv8PSTtqP-', t: 'o7 granada', a: 'JokerUY', v: 49, d: '2026-02-12' },
    { s: 'ThoughtfulAmorphousRamenCmonBruh-09HRgzGtbaQcCRBQ', t: 'MATEO CHUPAME LA P', a: '4rcadan', v: 48, d: '2026-01-18' },
    { s: 'CredulousDeafFerretKevinTurtle-2nvPAOkzJY4tjWiD', t: 'pocho memed in canyon twice', a: 'playking615', v: 47, d: '2026-02-12' },
    { s: 'VivaciousSavageSalmonThisIsSparta-ywwpq8QVTzWS6Qx2', t: 'missing recontra mega duro mirando la puerta', a: 'pochiel_', v: 39, d: '2026-02-18' },
    { s: 'ResilientYawningBoarGingerPower-bIFpAa3LTviEOzUx', t: 'infa out of novis3 Sane', a: 'sawkenn', v: 39, d: '2026-01-31' },
    { s: 'PowerfulDirtyPangolinEagleEye-sd68cy399prIlOhB', t: 'novi creepypasta lo persigue', a: 'sawkenn', v: 38, d: '2026-01-31' },
    { s: 'SpoopyLuckyReindeerAsianGlow-W7Rohlzf5zyJSkly', t: 'NOOOOOOOOOOOOOOO', a: 'JokerUY', v: 36, d: '2026-02-07' },
    { s: 'PlacidStrongMoonCurseLit-rTEUwI29wn6Ax-r6', t: 'SAWKEN PORFAVOR!!!!', a: 'sawkenn', v: 36, d: '2026-02-21' },
    { s: 'WittyExuberantChoughSquadGoals-LiddZ1Qv2Xtsap0Y', t: 'insane mirror', a: 'sawkenn', v: 36, d: '2026-02-21' },
    { s: 'CrispyRefinedLegWTRuck-C1ScalxfOrla4u3p', t: 'disparos re merca', a: 'sawkenn', v: 34, d: '2026-02-14' },
    { s: 'DepressedElatedOctopusDatSheffy-gMCDVgvE1NBV06D_', t: 'combea2 war extremo', a: 'sawkenn', v: 32, d: '2026-02-20' },
    { s: 'DifferentToughIguanaOpieOP-k2dB0JeR1N1hlNrs', t: 'tirale el rocket al novi ya fue', a: 'sawkenn', v: 32, d: '2026-01-31' },
    { s: 'EnthusiasticDignifiedRamenHassanChop-Bve_YvNm3tOlwfu6', t: 'joker creepypasta clutch whall part 2', a: 'JokerUY', v: 30, d: '2026-02-19' },
    { s: 'EasyFunnyBoarCclamChamp-EJfiDsAnUuyteOOv', t: '1 bala', a: 'JokerUY', v: 30, d: '2026-02-12' },
    { s: 'PopularLachrymoseLocustPeoplesChamp-B51ef87AmfYPXkW6', t: 'pocho merca', a: 'JokerUY', v: 30, d: '2026-02-15' },
    { s: 'TemperedEmpathicKangarooTebowing-sx_-OInI2-UxCDeL', t: 'Novis 2 Sane sure', a: 'JokerUY', v: 30, d: '2026-02-11' },
    { s: 'VivaciousSlipperyPoxMoreCowbell-loP5MqjD_erQXu5i', t: 'rare rng', a: 'slifercs', v: 29, d: '2026-02-19' },
    { s: 'SplendidVainWatermelonThisIsSparta--Wh32YzZtqJPDcSV', t: 'He never got a bad merchant', a: 'sawkenn', v: 28, d: '2026-02-11' },
    { s: 'DeadSpikyFriesRalpherZ-tkxlKQEkOG3GHflX', t: 'debería estar bien', a: 'MateoUsh27', v: 27, d: '2026-02-08' },
    { s: 'PeppyBadAardvarkGingerPower-EhpdYRLvBd0I-4Ju', t: 'cabin cup hechomierda', a: 'sawkenn', v: 25, d: '2026-02-12' },
    { s: 'HandsomeAverageAirGuitarThunBeast-qAocU8y_0nBValTF', t: 'novis2 creepypasta youcri (arca died before also VODIJ)', a: 'JokerUY', v: 25, d: '2026-02-09' },
    { s: 'MuddyCrowdedCrabsBuddhaBar-m35zP1Dhb42ej0_h', t: 'novis1 mega ultra combo', a: 'sawkenn', v: 24, d: '2026-02-21' },
    { s: 'IntelligentSpoopyPancakeDendiFace-7yslr-G2RleRes9t', t: 'UNA ROCAAAAAAAAA AGHHHHHHHH', a: 'JokerUY', v: 23, d: '2026-02-09' },
    { s: 'BlitheKathishRadishTwitchRaid-1tQQ9WOaH72Lgduf', t: 'si esta ada se muere ada, si esta sherry se meure, (MUERE)', a: 'JokerUY', v: 21, d: '2026-02-12' },
    { s: 'MoistLaconicHummingbirdKeepo-BmrfOoBTGCyQPZnH', t: 'EL CURRENT PACE DE OTAKU CAMBIO!!', a: 'JokerUY', v: 21, d: '2026-02-15' },
    { s: 'RenownedSuaveShallotCurseLit-juUvgsVaaFMKDOsQ', t: 'LORE DE POCHO PARALISIS DE SUEÑO', a: 'JokerUY', v: 21, d: '2026-02-15' },
    { s: 'GorgeousPlacidApeSaltBae-kdFt6g-qskqVpTu2', t: 'pocho ojos amarillo fluor', a: 'sawkenn', v: 20, d: '2026-02-15' },
    { s: 'AlertRudeReubenNotATK-CQJ2lCHpi_O6VDmE', t: 'pocho avion', a: 'MateoUsh27', v: 20, d: '2026-01-25' },
    { s: 'TenuousTriangularGullPupper-QWDa_Ul8ViYxg0vB', t: 'POCHO WARHALL 2', a: 'JokerUY', v: 20, d: '2026-02-12' },
    { s: 'MildLitigiousGrassKappaWealth-DTO8E4-uF-hbKJ5D', t: 'POCHO WARHALL 1', a: 'JokerUY', v: 19, d: '2026-02-12' },
    { s: 'TrustworthyResourcefulNarwhalWow-pAGb5rAkSMD7jN_K', t: 'aint locked in the target xdd', a: 'roger_eduardo67', v: 19, d: '2026-01-15' },
    { s: 'BovineDarkSaladRedCoat-amoJaF-sbxXAhFYw', t: 'matrix', a: 'sawkenn', v: 19, d: '2026-02-24' },
    { s: 'AntsyHealthyAardvarkMrDestructoid-XRO8QMWM0R49U9Ai', t: 'controles invertido', a: 'gapi0909', v: 19, d: '2026-01-28' },
    { s: 'CrazyMildHamBloodTrail-2AIBDr2aRq0Vzhu3', t: 'SAWKEN ANGEL DE LA GUARDA', a: 'JokerUY', v: 19, d: '2026-02-12' },
    { s: 'PeppyUninterestedBorkHoneyBadger-Dgo5nELYJ4vilPIM', t: 'joker creepypasta clutch whall part 1', a: 'JokerUY', v: 18, d: '2026-02-19' },
    { s: 'LivelyKawaiiAyeayeFUNgineer-6jHWBj-ihJW-TFvq', t: 'creepypasta dog', a: 'sawkenn', v: 18, d: '2026-02-21' },
    { s: 'ColdInnocentTroutTBTacoLeft-FganDOLboJXqmZBS', t: 'IMPOSSIBLE TO MUFA MISSING', a: 'JokerUY', v: 18, d: '2026-02-16' },
    { s: 'MoldyFastCheddarFUNgineer-lmRNR8lbJYdXiB8k', t: 'hechomierda frit missing novis2', a: 'JokerUY', v: 17, d: '2026-02-09' },
    { s: 'SuaveCorrectBurritoDuDudu-qf0IMbFM_tpZGvVe', t: 'CREEPYPASTA JAPONES LA SUCIA ESA', a: 'JokerUY', v: 17, d: '2026-02-09' },
    { s: 'AbstrusePoorTurnipNotATK-0KzUd_hoxHKyGGAN', t: 'missing recontra mega duro mirando la caja', a: 'Missing', v: 17, d: '2026-02-19' },
    { s: 'BetterCrunchyToothHeyGirl-4tkr5UuVcHxY_8-f', t: 'INSTA MUFA', a: 'JokerUY', v: 16, d: '2026-02-08' },
    { s: 'LitigiousPricklySalmonKappaClaus-yG99lMK1UAVZ5Cll', t: 'lo recontra rusheaba wtf', a: 'sawkenn', v: 16, d: '2026-02-21' },
    { s: 'BloodyGlutenFreeMosquitoSoBayed-f3ZmnlkrLZhy0giS', t: 'joker mufa x3000', a: 'JokerUY', v: 15, d: '2026-01-31' },
    { s: 'TiredShinyFoxSoBayed-nxJfkTKgd96KLv5b', t: 'CREEPYPASTA CABINS', a: 'JokerUY', v: 14, d: '2026-02-09' },
    { s: 'SparklingRelentlessCucumberDoggo-nb2utcMzgCIPBo1X', t: 'mateo mufa', a: 'JokerUY', v: 13, d: '2026-02-07' },
  ] },
  { section: 'NG Pro Tournament 2022', items: [
    { s: 'TenuousFancyYakinikuLitFam-en79hrjrsVnDO973', t: 'u3 warp?', a: 'eidenfir', v: 362, d: '2022-03-20' },
    { s: 'CogentEnjoyableReubenMVGame-lt1c4ETva9t3cJqp', t: 'Mom IRL RNG', a: 'eidenfir', v: 215, d: '2022-03-05' },
    { s: 'GrossSpotlessJellyfishDxAbomb-YprCYwmP7EPAwfCJ', t: 'biggest combo in history', a: 'sawkenn', v: 199, d: '2022-02-23' },
    { s: 'VastPunchySardineBudBlast-YI4sNgwyrbgqNPF_', t: 'Garrador new knife strat?', a: 'JoeKoh27', v: 158, d: '2022-02-06' },
    { s: 'AmericanModernStingrayMrDestructoid-GWohRGQ8hkLO2SGd', t: 'Thanks novi Okayge', a: 'Spartanfinix117', v: 141, d: '2022-02-17' },
    { s: 'GloriousKawaiiSheepDerp-wQpDdUHUCyiu7gfp', t: 'novi chilling on the ceiling', a: 'sawkenn', v: 119, d: '2022-02-20' },
    { s: 'ColdbloodedTransparentBadgerPeanutButterJellyTime-RybWBSRV9pp14iYf', t: 'dogey bodyblock', a: 'DrumsetWereWolf', v: 111, d: '2022-03-10' },
    { s: 'ColorfulTentativeVanillaBigBrother-G8IS59v03huTOt2e', t: 'WHAT ARE YOU DOING???!!', a: 'sawkenn', v: 102, d: '2022-04-24' },
    { s: 'NastyBrightLegSquadGoals-Z0Yb0hymdVqTYyBb', t: 'HELLO??', a: 'sawkenn', v: 96, d: '2022-02-12' },
    { s: 'StrangeFlaccidPizzaNomNom-ai04Gx2dEzgJjZgi', t: 'Oh no he is dead', a: 'Kevin700P', v: 94, d: '2022-02-27' },
    { s: 'TardyArtsyNoodleCorgiDerp-j7woBDewzicUClOg', t: 'calculated', a: 'enhikee', v: 91, d: '2022-06-08' },
    { s: 'GloriousRealOysterAMPEnergyCherry-8Wm1oUOlD_Y6uzeE', t: 'ashley??????', a: 'sawkenn', v: 89, d: '2022-03-27' },
    { s: 'AlertProudDragonKappa-F3ykbPtcMEKJ2-ZI', t: 'SYNCED', a: 'sawkenn', v: 85, d: '2022-02-18' },
    { s: 'BlushingSlickWasabiStinkyCheese-_Uxh_rpiHoD8Q0Yx', t: 'little flex', a: 'sawkenn', v: 82, d: '2022-02-05' },
    { s: 'TrappedResourcefulClipsmomFutureMan-gDRiI-_7EMneYDpn', t: 'RE4 NG Pro Steam 60fps !tournament !prizepool | Qualifying !bracket, round 1, Kromer vs Hikee, Tuesday 8th, 10pm UTC+1', a: 'sawkenn', v: 70, d: '2022-02-08' },
    { s: 'FreezingTangibleSandstormAMPEnergy-4z1UsWBIdDJ4WCFm', t: 'WHAT THE!!!', a: 'sawkenn', v: 67, d: '2022-04-24' },
    { s: 'NastyHardWrenchKippa-3R8g__fVInBON2vC', t: 'HOW?!', a: 'eidenfir', v: 63, d: '2022-02-12' },
    { s: 'EmpathicDarlingTermitePastaThat-FiUDeTPknLRfrnO5', t: 'Invert Aim new strat?', a: 'JoeKoh27', v: 62, d: '2022-02-05' },
    { s: 'SincereSuccessfulDeerShazBotstix-ZwN7ci_wIHzvdGGf', t: 'THAT BAD?!!!', a: 'eidenfir', v: 52, d: '2022-03-10' },
    { s: 'SquareBoredSrirachaVoHiYo-Vqco2PF4UFgunLnH', t: 'Cursed by Sniper\'s Commentary', a: 'ImSniperKiller', v: 46, d: '2022-02-06' },
    { s: 'CreativeDifficultAlbatrossKappa-03IffEVsxfk3Mgdb', t: 'Luis prediction', a: 'DrumsetWereWolf', v: 46, d: '2022-02-24' },
    { s: 'SneakyMildChowderWholeWheat-mTLmvpk4MbJqSYWn', t: 'YEAAAAAA', a: 'eidenfir', v: 45, d: '2022-02-19' },
    { s: 'FrigidEnergeticMeatloafKeyboardCat-kZ0oa2bcOEBC3U3a', t: 'miracle in the wrecking ball', a: 'Tania__ainaT', v: 44, d: '2022-03-12' },
    { s: 'IgnorantSlipperyPieCoolStoryBob-4M2DauyXfbRQ459V', t: 'cursed loading', a: 'sawkenn', v: 43, d: '2022-03-20' },
    { s: 'ShortSpikyBoarAsianGlow-a81NryKaLximPnte', t: 'Nooo luis te pasaste KEKW', a: 'l_tobirama', v: 42, d: '2022-02-07' },
    { s: 'TolerantIronicSoymilkDogFace-9jwqm4C_22gPO6bc', t: 'RE4 NG Pro Steam 60fps !tournament !prizepool | Qualifying !bracket, round 2, OtakuXD vs Hikee, Sunday 27th, 10 pm UTC+1', a: 'RedWiwen', v: 37, d: '2022-02-27' },
    { s: 'CuriousTastyNewtRitzMitz-bFQNixUcP1bMu8Zr', t: '25.52', a: 'sawkenn', v: 34, d: '2022-07-02' },
    { s: 'MuddyGenerousLettuceOSfrog-2uhT_Q6-AKSwMSp1', t: 'Near perfect sync', a: 'casualspeedrun', v: 32, d: '2022-02-18' },
    { s: 'StormyCooperativeWatercressPeanutButterJellyTime-SUm5o6W7-wQNkqs_', t: 'jetski glitch', a: 'enhikee', v: 27, d: '2023-12-18' },
    { s: 'ObservantPoisedRuffBudStar-9Yqp5BZqnK4X4ZeP', t: 'u3 safe', a: 'shunviewer', v: 26, d: '2022-04-30' },
    { s: 'ModernDeliciousTurtleNerfRedBlaster-28Jwo97QZ0mmnZal', t: 'MajorWeirdChamp', a: 'DrumsetWereWolf', v: 25, d: '2022-02-13' },
    { s: 'VastVastTortoiseM4xHeh-8I4bxqCLx_N-hbWO', t: 'Lost Ark > RE4', a: 'ImSniperKiller', v: 19, d: '2022-02-19' },
    { s: 'DifferentDarlingWaspTBCheesePull-KmrlpeD5pLX_L1ou', t: 'tankei nada', a: 'SiaoMuleki', v: 17, d: '2022-02-12' },
    { s: 'BillowingSincereMagpieFloof-7iUQ26mrQ_OE68ke', t: 'inventory i-frames', a: 'ImSniperKiller', v: 17, d: '2022-02-18' },
    { s: 'KindCredulousGullBCWarrior-XUU9KSU4oxyZDYfW', t: '36k', a: 'eidenfir', v: 17, d: '2022-03-13' },
    { s: 'FrigidAgileBibimbapSmoocherZ-tDYgoSR3GMJAIeYW', t: 'tavo don comedy KEKO', a: 'l_tobirama', v: 17, d: '2022-03-03' },
    { s: 'AliveGlutenFreeAppleShadyLulu-Q-XSDIemYTzA9Otu', t: 'RE4 NG Pro Steam 60fps !tournament | Qualifying !brackets, round 1, Chrioden vs ImSniperkiller, Saturday 5th, 10pm UTC+1', a: 'RockCandyy', v: 14, d: '2022-02-05' },
    { s: 'LovelyScrumptiousSeahorseCmonBruh-JYNhKb7RzttDiSIK', t: '.', a: 'sawkenn', v: 14, d: '2023-11-28' },
    { s: 'DeafPlacidDiamondSmoocherZ-hMgv_A7y3AD28ZHQ', t: 'Sadge', a: 'enhikee', v: 14, d: '2022-04-02' },
  ] },
];

// ======= RUNNERS DE RE4 EN VIVO / RE4 RUNNERS LIVE =======
// Canales de Twitch a vigilar. El estado "EN VIVO" se consulta a la API pública
// de Twitch (GraphQL, sin API key) en una sola request.
const RE4_LIVE_CHANNELS = [
  'DitmanCup', 'sawkenn', 'jokeruy', '4rcadan', 'Nevs', 'missing', 'pochiel_', 'mattgael',
  'pixieesaki', 'vechman', 'RazieCR', 'fritrrs', 'MateoUsh27', 'youcri1031', 'majorrichy',
  'infamouslol8', 'shularune', 'slifercs', 'doradori_dolph', 'xjoker115', 'eidenfir',
  'abdou_mz', 'novi_fan', 'MineZowski', 'MikeWavRR', 'FrancoBv17', 'chanwii',
  'gabrielsinmarr', 'redshines', 'MrMuba', 'Ninazerotwo', 'Gallardd', 'iiLanceLM', 'nobu_22',
  'Neuroticc_', 'derekt21288', 'yuushi_1234', 'ezequiel_kazama', 'yisuseldragon', 'otakuterere',
  'luis_sera', 'joydurnyup', 'M4tiuss_',
];

// Runners que streamean en YouTube. No hay forma sin API key de saber si están
// en vivo, así que el card lleva a youtube.com/.../live (YouTube redirige al
// stream si están transmitiendo).
const YOUTUBE_LIVE_CHANNELS = [
  { name: 'seppp', id: 'UCeClRyYfzoODHyA7FJKcjvA' },
  { name: 'Bang Gori', id: 'UCMnXQX5GWrrcfSVZrOIaJUA' },
  { name: 'nyr9468', url: 'https://www.youtube.com/@nyr9468/live' },
  { name: 'Fedo_Ras', url: 'https://www.youtube.com/@Fedo_Ras/live' },
  { name: 'NETJU', url: 'https://www.youtube.com/@junetkhairulamri9336/live' },
  { name: 'aqbilghilman', url: 'https://www.youtube.com/@aqbilghilman30/live' },
  { name: 'Mrchampppt', url: 'https://www.youtube.com/@mrchampppt/live' },
  { name: 'Zudinnn', id: 'UCkX2rtFOeywknZ0ibu-ajWA' },
  { name: 'VAL', url: 'https://www.youtube.com/@valyorleza/live' },
  { name: 'Muh01', url: 'https://www.youtube.com/results?search_query=Muh01+resident+evil+4' }, // handle sin confirmar
];

// ======= TEXTOS BILINGÜES / BILINGUAL STRINGS =======
const I18N = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.sorteo': 'Calendario',
    'nav.torneo': 'Torneo',
    'intro.t1': 'Calendario',
    'nav.grupos': 'Grupos',
    'nav.brackets': 'Brackets',
    'nav.simulations': 'Simulaciones',
    'nav.champions': 'Historia',
    'nav.clips': 'Clips',
    'nav.live': 'En vivo',
    'nav.donaciones': 'Donaciones',
    'nav.organizadores': 'Organizadores',
    'nav.menu': 'Abrir menu',

    'hero.subtitle': 'Torneo comunitario de speedrunning de Resident Evil 4.',

    'countdown.label': 'Faltan para que abran las qualys',
    'countdown.days': 'dias',
    'countdown.hours': 'horas',
    'countdown.mins': 'min',
    'countdown.secs': 'seg',
    'countdown.open': '¡Las qualys ya estan abiertas!',
    'countdown.datePrefix': 'Apertura:',
    'countdown.closePrefix': 'Cierre:',

    'facts.runners': 'runners',
    'facts.groups': 'grupos',
    'facts.qualify': 'clasifican directo',

    'intro.title': 'Bienvenidos a la Ditman Cup 2027',
    'intro.lead': 'Todo para seguir el torneo, en un solo lugar.',
    'intro.d1': 'Contra quien jugas y cuando',
    'intro.d2': 'Top 8 directo + 24 en 3 grupos',
    'intro.d3': 'Doble eliminacion hasta la final',
    'intro.d4': 'Proba el formato vos mismo',

    'sorteo.title': 'Calendario',
    'sorteo.r1.l': 'Que se sortea',
    'sorteo.r1.t': 'No los grupos: los cruces. Tu grupo sale del ranking de clasificatorias y el sorteo define contra quien jugas dentro de el.',
    'sorteo.r2.l': 'Cuando',
    'sorteo.r2.t': 'Un sorteo nuevo en vivo antes de cada fecha, cuando los resultados anteriores ya movieron a los runners entre grupos.',
    'sorteo.r3.l': 'Donde',
    'sorteo.r3.t': 'En vivo por twitch.tv/ditmancup. Los cruces aparecen abajo con dia y hora.',
    'sorteo.r4.l': 'Top 8',
    'sorteo.r4.t': 'Van directo a Octavos de Final: no juegan grupos, asi que no se sortean.',
    'sched.title': 'Calendario',
    'sched.matchday': 'Fecha {n}',
    'sched.dateTbd': 'Fecha a confirmar',
    'sched.note1': 'Los grupos salen del ranking de clasificatorias.',
    'sched.noteN': 'Los grupos se arman con los resultados de la fecha anterior.',
    'sched.vs': 'vs',
    'sched.tzNote': 'Horarios en tu zona horaria ({tz}).',
    'donors.title': 'Top donadores',
    'donors.colName': 'Donador',
    'donors.colAmount': 'Donado',
    'donors.loading': 'Cargando donadores…',
    'donors.empty': 'Todavia no hay donadores.',
    'donors.error': 'No se pudo cargar la lista de donadores.',
    'donors.total': '{amount} recaudados · {n} donadores',
    'donors.src': 'Fuente: Matcherino · ediciones {years}',
    'donors.thanks': 'Gracias!',
    'donors.thanksGeneric': 'Gracias a todos los que apoyaron la Ditman Cup.',
    'donors.thanksSub': 'Gracias a nuestros {n} donadores por apoyar la Ditman Cup.',
    'visits.label': 'Visitas a la pagina',

    'grupos.title': 'Fase de grupos',
    'grupos.loading': 'Cargando grupos…',
    'grupos.sheetError': 'No se pudo cargar la Sheet. Mostrando datos de ejemplo.',
    'group.word': 'Grupo',
    'group.tbd': 'Por definir',
    'group.directTitle': 'Top 8 — directo a Octavos',
    'group.directBadge': 'No juegan grupos',
    'group.directNote': 'Clasificaron directo desde las clasificatorias: entran al cuadro en Octavos de Final.',
    'group.stageBadge': 'Fase de grupos',
    'group.stageTitle': '24 runners · 3 grupos de 8',
    'group.stageNote': 'Ellos si juegan: los cruces se sortean dentro de cada grupo (ver Torneo > Calendario).',

    'brackets.title': 'Brackets',
    'brackets.placeholder': 'El cuadro de eliminacion se arma una vez cerrada la fase de grupos.',
    'brackets.previewNote': 'Doble eliminacion · {n} clasificados. Si perdes una vez bajas al cuadro de perdedores; si perdes de nuevo, quedas eliminado. Los cruces reales se definen al cerrar la fase de grupos.',
    'bracket.champion': 'Campeon/a',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.seedTag': 'Sembrado {n}',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinal',
    'bracket.round.quarter': 'Cuartos',
    'bracket.round.r16': 'Octavos',
    'bracket.round.r32': '16avos',
    'bracket.round.generic': 'Ronda de {n}',
    'bracket.winners': 'Cuadro de ganadores',
    'bracket.losers': 'Cuadro de perdedores',
    'bracket.grandFinal': 'Gran Final',
    'bracket.round.winnersFinal': 'Final de ganadores',
    'bracket.lr': 'Ronda de perdedores {n}',
    'bracket.losersSemi': 'Semifinal de perdedores',
    'bracket.losersFinal': 'Final de perdedores',
    'bracket.winnerOf': 'Ganador M{n}',
    'bracket.loserOf': 'Perdedor M{n}',

    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Runner',
    'clas.col.group': 'Grupo',
    'clas.col.time': 'Mejor tiempo',
    'clas.col.pts': 'Pts',

    'don.title': 'Donaciones',
    'don.body': 'La Ditman Cup se sostiene gracias a la comunidad. Si queres colaborar con los premios y los gastos del torneo, podes hacerlo aca:',
    'don.btn': 'Donar',
    'don.pool.title': 'Prize pool y gastos del torneo',
    'don.me.title': 'Apoyame a mi',
    'don.me.body': 'Esto es totalmente opcional, pero si te gusta la pagina y queres apoyarme directamente, se aprecia un monton. Gracias por ser parte de esta comunidad!',
    'don.me.btn': 'Donar a JokerUY',

    'org.title': 'Organizacion y staff',
    'org.tier.organizers': 'Organizadores',
    'org.tier.mods': 'SRC Moderators',
    'org.tier.helpers': 'Helpers y casters',
    'org.tier.design': 'Arte y diseño',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderador',
    'org.role.helper': 'Helper',
    'org.role.helperCaster': 'Helper / Caster',
    'org.role.artDesign': 'Arte y diseño',
    'org.role.artDesignWeb': 'Arte y diseño, Diseñador web',

    'link.discord': 'Discord',
    'link.rules': 'Reglas',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'Historia',
    'champions.edition': 'Ditman Cup {year}',
    'champions.donors': 'Donadores',
    'champions.timeline': 'Todas las donaciones (cronologia)',
    'champions.txToggle': 'Ver cada donacion',
    'champions.champion': 'Campeon',
    'champions.runnerUp': '2do puesto',
    'champions.third': '3er puesto',
    'champions.tbd': 'Por confirmar',
    'champions.vod': 'Ver final',
    'champions.prize': 'Prize pool',
    'champions.trophyTitle': 'El trofeo',
    'champions.trophyPending': 'El trofeo de la Ditman Cup 2027 todavia se esta diseñando.',
    'champions.viewData': 'Ver todos los datos',
    'champions.modalHint': 'Datos originales de la planilla del torneo.',

    'clips.title': 'Mejores clips',
    'clips.intro': 'Momentos destacados de ediciones y torneos anteriores.',
    'clips.empty': 'Todavia no hay clips cargados. ¿Tenes uno? Pasalo por Discord.',

    'live.title': 'Runners de RE4 en vivo',
    'live.intro': 'Canales de la comunidad que estan corriendo Resident Evil 4 ahora mismo.',
    'live.on': 'EN VIVO',
    'live.off': 'Desconectado',
    'live.none': 'Ningun canal de la lista esta en vivo en este momento.',
    'live.watch': 'Ver en Twitch',
    'live.checking': 'Chequeando canales…',

    'footer.text': 'Ditman Cup 2027 · Hecho para la comunidad',
    'footer.credit': 'Sitio web por',

    'sim.title': 'Simulador — formato tipo Nations League',
    'sim.r1.l': 'Directo',
    'sim.r1.t': 'El Top 8 de las clasificatorias no juega grupos y va directo a Octavos de Final.',
    'sim.r2.l': 'Grupos',
    'sim.r2.t': 'Los otros 24 juegan 3 grupos de 8 en 4 fechas. Un BO1 por fecha, dentro de tu grupo.',
    'sim.r3.l': 'Movimiento',
    'sim.r3.t': 'Si ganas, subis de grupo. Si perdes, bajas.',
    'sim.r4.l': 'Puntos',
    'sim.r4.t': 'Victoria: 2 pts en Grupo 1, 1 pt en Grupos 2 y 3. Si perdes por menos de 30s: bono de +1 (Grupo 1) o +0.5 (Grupos 2 y 3).',
    'sim.r5.l': 'Clasifican',
    'sim.r5.t': 'Tras la fecha 4, los 8 mejores por puntos pasan a Octavos. Desempate: promedio de tus 2 mejores carreras.',
    'sim.proposal': 'Propuesta de formato — todavia no es el definitivo.',
    'sim.dateBadge': 'Fecha',
    'sim.btnNext': 'Simular siguiente fecha',
    'sim.btnNext5': 'Simular hasta el final',
    'sim.btnReset': 'Reiniciar',
    'sim.qualifyTitleLive': 'Si el torneo cortara aca, clasifican estos 16 (8 directos + 8 de grupos por puntaje)',
    'sim.qualifyTitleFinal': 'Torneo terminado — clasificados definitivos (8 directos + 8 de grupos por puntaje)',
    'sim.legendQualified': 'Clasificado a Octavos (Top 8 de la fase de grupos)',
    'sim.legendEliminated': 'Eliminado',
    'sim.directTag': 'clasificado directo',
    'sim.directTitle': 'Top 8 — clasificados directo a Octavos',
    'sim.directNote': 'Los 8 mejores tiempos de las clasificatorias no juegan la fase de grupos: quedan sembrados directo en Octavos de Final.',
    'sim.group1': 'Grupo 1',
    'sim.group2': 'Grupo 2',
    'sim.group3': 'Grupo 3',
    'sim.runnersCount': '{n} runners',
    'sim.thRunner': 'Runner',
    'sim.thPB': 'PB',
    'sim.thPts': 'Pts',
    'sim.thBest': 'Mejor tiempo',
    'sim.thBestAvg': 'Mejor promedio',
    'sim.thHistory': 'Historial',
    'sim.rankingTitle': 'Ranking de grupos — ordenado solo por puntaje',
    'sim.rankingNote': 'Los 24 runners de la fase de grupos en una sola tabla, ordenados de mayor a menor puntaje (sin desempates de grupo ni tabla por tabla). Los primeros 8 clasifican a Octavos junto al Top 8 directo.',
    'sim.logTitleEmpty': 'Todavia no se corrio ninguna fecha',
    'sim.logTitle': 'Resultados de la fecha {n}',
    'sim.logTitleFinal': 'Resultados de la fecha {n} (final)',
    'sim.raceResult': '<b>{a}</b> {timeA} vs <b>{b}</b> {timeB} — gana {winner} por {margin}',
    'sim.moveUp': '<span class="sim-move-up">▲</span> <b>{name}</b> asciende a Grupo {group} — mejor tiempo del grupo ({time})',
    'sim.moveDown': '<span class="sim-move-down">▼</span> <b>{name}</b> desciende a Grupo {group} — peor tiempo del grupo ({time})',
    'sim.boundaryLabel': 'Frontera Grupo {a} / Grupo {b}',
    'sim.bracketTitle': 'Octavos de Final',
    'sim.wbTitle': 'Doble eliminacion — jugala',
    'sim.wbNote': 'Carreras BO1, igual que en grupos: gana el mejor tiempo. Si perdes una vez bajas al cuadro de perdedores; si perdes de nuevo, quedas eliminado.',
    'sim.btnWbNext': 'Jugar {round}',
    'sim.wbDone': 'Torneo terminado',
    'sim.btnWbEverything': 'Jugar todo hasta la Gran Final',
    'sim.champion': 'Campeon de la Ditman Cup',
    'sim.btnWbAll': 'Jugar hasta la final de ganadores',
    'sim.btnWbReset': 'Reiniciar resultados',
    'sim.wbChamp': 'Campeon del cuadro de ganadores — directo a la Gran Final',
    'sim.bracketLocked': 'Termina las 4 fechas para desbloquear el sorteo de octavos.',
    'sim.bracketExplainer': 'El Top 8 directo queda fijo con el sembrado clasico (no se cruzan entre ellos hasta semis). Sortealos contra los 8 clasificados de la fase de grupos para completar los cruces.',
    'sim.btnDrawNext': 'Sortear siguiente',
    'sim.btnDrawAll': 'Sortear todos',
    'sim.btnDrawReset': 'Reiniciar sorteo',
    'sim.sideA': 'Lado A',
    'sim.sideB': 'Lado B',
    'sim.seedTag': 'Top {n}',
    'sim.pending': 'Por sortear',
    'sim.footer': 'Simulacion con datos ficticios — pensada para entender el formato, no para predecir resultados reales.',
    'sim.doneLabel': 'Torneo terminado',

    'testmode': 'MODO PRUEBA · datos falsos',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.sorteo': 'Schedule',
    'nav.torneo': 'Tournament',
    'intro.t1': 'Schedule',
    'nav.grupos': 'Groups',
    'nav.brackets': 'Bracket',
    'nav.simulations': 'Simulations',
    'nav.champions': 'History',
    'nav.clips': 'Clips',
    'nav.live': 'Live',
    'nav.donaciones': 'Donations',
    'nav.organizadores': 'Organizers',
    'nav.menu': 'Open menu',

    'hero.subtitle': 'Community Resident Evil 4 speedrunning tournament.',

    'countdown.label': 'Until the qualifiers open',
    'countdown.days': 'days',
    'countdown.hours': 'hours',
    'countdown.mins': 'min',
    'countdown.secs': 'sec',
    'countdown.open': 'Qualifiers are now open!',
    'countdown.datePrefix': 'Opens:',
    'countdown.closePrefix': 'Closes:',

    'facts.runners': 'runners',
    'facts.groups': 'groups',
    'facts.qualify': 'qualify directly',

    'intro.title': 'Welcome to the Ditman Cup 2027',
    'intro.lead': 'Everything you need to follow the tournament, in one place.',
    'intro.d1': 'Who you face, and when',
    'intro.d2': 'Top 8 direct + 24 in 3 groups',
    'intro.d3': 'Double elimination to the final',
    'intro.d4': 'Play through the format yourself',

    'sorteo.title': 'Schedule',
    'sorteo.r1.l': 'What is drawn',
    'sorteo.r1.t': 'Not the groups: the matchups. Your group comes from the qualifier ranking and the draw decides who you face inside it.',
    'sorteo.r2.l': 'When',
    'sorteo.r2.t': 'A new live draw before each matchday, once the previous results have moved runners between groups.',
    'sorteo.r3.l': 'Where',
    'sorteo.r3.t': 'Live on twitch.tv/ditmancup. Matchups appear below with day and time.',
    'sorteo.r4.l': 'Top 8',
    'sorteo.r4.t': 'Straight to the Round of 16: they skip the groups, so they are not drawn.',
    'sched.title': 'Schedule',
    'sched.matchday': 'Matchday {n}',
    'sched.dateTbd': 'Date TBD',
    'sched.note1': 'Groups come from the qualifier ranking.',
    'sched.noteN': 'Groups are set from the previous matchday results.',
    'sched.vs': 'vs',
    'sched.tzNote': 'Times shown in your local time zone ({tz}).',
    'donors.title': 'Top donors',
    'donors.colName': 'Donor',
    'donors.colAmount': 'Donated',
    'donors.loading': 'Loading donors…',
    'donors.empty': 'No donors yet.',
    'donors.error': 'Could not load the donors list.',
    'donors.total': '{amount} raised · {n} donors',
    'donors.src': 'Source: Matcherino · {years} editions',
    'donors.thanks': 'Thank you!',
    'donors.thanksGeneric': 'Thank you to every donor who has supported the Ditman Cup.',
    'donors.thanksSub': 'Thank you to our {n} donors for supporting the Ditman Cup.',
    'visits.label': 'Page visits',

    'grupos.title': 'Group stage',
    'grupos.loading': 'Loading groups…',
    'grupos.sheetError': 'Could not load the Sheet. Showing sample data.',
    'group.word': 'Group',
    'group.tbd': 'TBD',
    'group.directTitle': 'Top 8 — direct to Round of 16',
    'group.directBadge': 'Skip the groups',
    'group.directNote': 'Qualified straight from the qualifiers: they enter the bracket at the Round of 16.',
    'group.stageBadge': 'Group stage',
    'group.stageTitle': '24 runners · 3 groups of 8',
    'group.stageNote': 'These are the ones playing: matchups are drawn inside each group (see Tournament > Schedule).',

    'brackets.title': 'Bracket',
    'brackets.placeholder': 'The knockout bracket goes live once the group stage is finalized.',
    'brackets.previewNote': 'Double elimination · {n} qualifiers. Lose once and you drop to the Losers Bracket; lose again and you are out. Real matchups are set once the group stage is finalized.',
    'bracket.champion': 'Champion',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.seedTag': 'Seed {n}',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinals',
    'bracket.round.quarter': 'Quarterfinals',
    'bracket.round.r16': 'Round of 16',
    'bracket.round.r32': 'Round of 32',
    'bracket.round.generic': 'Round of {n}',
    'bracket.winners': 'Winners Bracket',
    'bracket.losers': 'Losers Bracket',
    'bracket.grandFinal': 'Grand Final',
    'bracket.round.winnersFinal': 'Winners Final',
    'bracket.lr': 'Losers Round {n}',
    'bracket.losersSemi': 'Losers Semifinal',
    'bracket.losersFinal': 'Losers Final',
    'bracket.winnerOf': 'Winner M{n}',
    'bracket.loserOf': 'Loser M{n}',

    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Runner',
    'clas.col.group': 'Group',
    'clas.col.time': 'Best time',
    'clas.col.pts': 'Pts',

    'don.title': 'Donations',
    'don.body': 'The Ditman Cup runs on community support. If you want to chip in for the prize pool and tournament costs, you can do it here:',
    'don.btn': 'Donate',
    'don.pool.title': 'Prize pool & tournament costs',
    'don.me.title': 'Support me',
    'don.me.body': 'This one is completely optional, but if you like the website and want to support me directly, it is truly appreciated. Thank you for being part of this community!',
    'don.me.btn': 'Donate to JokerUY',

    'org.title': 'Organizers & staff',
    'org.tier.organizers': 'Organizers',
    'org.tier.mods': 'SRC Moderators',
    'org.tier.helpers': 'Helpers & casters',
    'org.tier.design': 'Art & design',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderator',
    'org.role.helper': 'Helper',
    'org.role.helperCaster': 'Helper / Caster',
    'org.role.artDesign': 'Art & design',
    'org.role.artDesignWeb': 'Art & design, Website Designer',

    'link.discord': 'Discord',
    'link.rules': 'Rules',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'History',
    'champions.edition': 'Ditman Cup {year}',
    'champions.donors': 'Donors',
    'champions.timeline': 'All donations (chronological)',
    'champions.txToggle': 'Show each donation',
    'champions.champion': 'Champion',
    'champions.runnerUp': '2nd place',
    'champions.third': '3rd place',
    'champions.tbd': 'To be confirmed',
    'champions.vod': 'Watch the final',
    'champions.prize': 'Prize pool',
    'champions.trophyTitle': 'The trophy',
    'champions.trophyPending': 'The Ditman Cup 2027 trophy is still being designed.',
    'champions.viewData': 'View all data',
    'champions.modalHint': 'Original data from the tournament spreadsheet.',

    'clips.title': 'Best clips',
    'clips.intro': 'Highlights from past editions and other tournaments.',
    'clips.empty': "No clips added yet. Got one? Drop it in the Discord.",

    'live.title': 'RE4 runners live',
    'live.intro': 'Community channels running Resident Evil 4 right now.',
    'live.on': 'LIVE',
    'live.off': 'Offline',
    'live.none': 'No channel from the list is live right now.',
    'live.watch': 'Watch on Twitch',
    'live.checking': 'Checking channels…',

    'footer.text': 'Ditman Cup 2027 · Made for the community',
    'footer.credit': 'Website by',

    'sim.title': 'Simulator — Nations League–style format',
    'sim.r1.l': 'Direct',
    'sim.r1.t': 'The Top 8 from qualifiers skip the groups and go straight to the Round of 16.',
    'sim.r2.l': 'Groups',
    'sim.r2.t': 'The other 24 play 3 groups of 8 over 4 matchdays. One BO1 per matchday, inside your group.',
    'sim.r3.l': 'Movement',
    'sim.r3.t': 'Win and you move up a group. Lose and you move down.',
    'sim.r4.l': 'Points',
    'sim.r4.t': 'Win: 2 pts in Group 1, 1 pt in Groups 2 and 3. Lose by under 30s: bonus of +1 (Group 1) or +0.5 (Groups 2 and 3).',
    'sim.r5.l': 'Qualify',
    'sim.r5.t': 'After matchday 4 the 8 best by points join the Round of 16. Tiebreak: average of your 2 best races.',
    'sim.proposal': 'Format proposal — not final yet.',
    'sim.dateBadge': 'Matchday',
    'sim.btnNext': 'Simulate next matchday',
    'sim.btnNext5': 'Simulate to the end',
    'sim.btnReset': 'Reset',
    'sim.qualifyTitleLive': 'If the tournament ended now, these 16 would qualify (8 direct + 8 from groups by points)',
    'sim.qualifyTitleFinal': 'Tournament over — final qualifiers (8 direct + 8 from groups by points)',
    'sim.legendQualified': 'Qualified to Round of 16 (Top 8 from groups)',
    'sim.legendEliminated': 'Eliminated',
    'sim.directTag': 'direct qualifier',
    'sim.directTitle': 'Top 8 — direct qualifiers to the Round of 16',
    'sim.directNote': "The 8 fastest qualifier times skip the group stage entirely: they're seeded straight into the Round of 16.",
    'sim.group1': 'Group 1',
    'sim.group2': 'Group 2',
    'sim.group3': 'Group 3',
    'sim.runnersCount': '{n} runners',
    'sim.thRunner': 'Runner',
    'sim.thPB': 'PB',
    'sim.thPts': 'Pts',
    'sim.thBest': 'Best time',
    'sim.thBestAvg': 'Best Average Time',
    'sim.thHistory': 'History',
    'sim.rankingTitle': 'Group stage ranking — sorted by points only',
    'sim.rankingNote': 'The 24 group-stage runners in a single table, sorted highest to lowest points (no group tiebreaks, no separate tables). The top 8 qualify to the Round of 16 alongside the direct Top 8.',
    'sim.logTitleEmpty': 'No matchday played yet',
    'sim.logTitle': 'Matchday {n} results',
    'sim.logTitleFinal': 'Matchday {n} results (final)',
    'sim.raceResult': '<b>{a}</b> {timeA} vs <b>{b}</b> {timeB} — {winner} wins by {margin}',
    'sim.moveUp': '<span class="sim-move-up">▲</span> <b>{name}</b> moves up to Group {group} — group\'s best time ({time})',
    'sim.moveDown': '<span class="sim-move-down">▼</span> <b>{name}</b> moves down to Group {group} — group\'s worst time ({time})',
    'sim.boundaryLabel': 'Group {a} / Group {b} boundary',
    'sim.bracketTitle': 'Round of 16',
    'sim.wbTitle': 'Double elimination — play it',
    'sim.wbNote': 'BO1 races, same as the groups: the best time wins. Lose once and you drop to the Losers Bracket; lose again and you are out.',
    'sim.btnWbNext': 'Play {round}',
    'sim.wbDone': 'Tournament finished',
    'sim.btnWbEverything': 'Play everything to the Grand Final',
    'sim.champion': 'Ditman Cup champion',
    'sim.btnWbAll': 'Play to the Winners Final',
    'sim.btnWbReset': 'Reset results',
    'sim.wbChamp': 'Winners Bracket champion — straight to the Grand Final',
    'sim.bracketLocked': 'Finish all 4 matchdays to unlock the Round of 16 draw.',
    'sim.bracketExplainer': "The direct Top 8 keep the classic seeding (they can't meet each other before the semis). Draw them against the 8 group-stage qualifiers to complete the bracket.",
    'sim.btnDrawNext': 'Draw next',
    'sim.btnDrawAll': 'Draw all',
    'sim.btnDrawReset': 'Reset draw',
    'sim.sideA': 'Side A',
    'sim.sideB': 'Side B',
    'sim.seedTag': 'Top {n}',
    'sim.pending': 'To be drawn',
    'sim.footer': 'Simulation with placeholder data — meant to explain the format, not to predict real results.',
    'sim.doneLabel': 'Tournament complete',

    'testmode': 'TEST MODE · fake data',
  },
};

// Estado en memoria para poder re-renderizar al cambiar de idioma
// Idioma principal: inglés. / Primary language: English.
let currentLang = 'en';
let lastGroupsRows = null;
let lastStandingsRows = null;

function t(key, vars) {
  const dict = I18N[currentLang] || I18N.es;
  let s = dict[key] != null ? dict[key] : (I18N.es[key] != null ? I18N.es[key] : key);
  if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
  return s;
}

// Escape básico para texto que viene de la Sheet (evita romper el HTML)
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ======= BANDERAS / FLAGS =======
const COUNTRY_CODES = {
  argentina: 'AR', uruguay: 'UY', chile: 'CL', paraguay: 'PY', bolivia: 'BO', peru: 'PE',
  'perú': 'PE', brazil: 'BR', brasil: 'BR', colombia: 'CO', venezuela: 'VE', ecuador: 'EC',
  mexico: 'MX', 'méxico': 'MX', 'united states': 'US', usa: 'US', 'estados unidos': 'US',
  canada: 'CA', 'canadá': 'CA', spain: 'ES', 'españa': 'ES', portugal: 'PT', france: 'FR',
  'francia': 'FR', germany: 'DE', alemania: 'DE', italy: 'IT', italia: 'IT',
  'united kingdom': 'GB', uk: 'GB', england: 'GB', inglaterra: 'GB', ireland: 'IE',
  netherlands: 'NL', 'países bajos': 'NL', belgium: 'BE', poland: 'PL', polonia: 'PL',
  sweden: 'SE', norway: 'NO', finland: 'FI', denmark: 'DK', 'czech republic': 'CZ',
  czechia: 'CZ', austria: 'AT', switzerland: 'CH', suiza: 'CH', greece: 'GR', turkey: 'TR',
  russia: 'RU', ukraine: 'UA', romania: 'RO', hungary: 'HU', japan: 'JP', 'japón': 'JP',
  'south korea': 'KR', korea: 'KR', corea: 'KR', china: 'CN', taiwan: 'TW', 'hong kong': 'HK',
  indonesia: 'ID', philippines: 'PH', filipinas: 'PH', malaysia: 'MY', thailand: 'TH',
  vietnam: 'VN', india: 'IN', australia: 'AU', 'new zealand': 'NZ', morocco: 'MA',
  marruecos: 'MA', algeria: 'DZ', argelia: 'DZ', egypt: 'EG', 'south africa': 'ZA', israel: 'IL',
};

let _sheetFlags = {};   // { 'nombre en minúscula': 'UY' | '🇺🇾' | 'Uruguay' }

function indexFlags(rows) {
  (rows || []).forEach(r => {
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    const fl = r['Flag'] || r['Bandera'] || r['País'] || r['Pais'] || r['Country'];
    if (name && fl) _sheetFlags[String(name).toLowerCase().trim()] = fl;
  });
}

// Normaliza cualquier entrada (código ISO2 / emoji bandera / nombre de país) -> "uy"
function flagCode(input) {
  if (!input) return '';
  const s = String(input).trim();
  if (!s) return '';
  const ri = [...s].map(c => c.codePointAt(0)).filter(cp => cp >= 0x1F1E6 && cp <= 0x1F1FF);
  if (ri.length === 2) return String.fromCharCode(...ri.map(cp => cp - 0x1F1E6 + 97));
  if (/^[A-Za-z]{2}$/.test(s)) return s.toLowerCase();
  return (COUNTRY_CODES[s.toLowerCase()] || '').toLowerCase();
}

// <span> con la bandera SVG (flag-icons). Vacío si no hay país.
function flagSpan(code) {
  return code ? `<span class="fi fi-${code}" title="${esc(code.toUpperCase())}"></span>` : '';
}

function flagFor(name) {
  const k = String(name || '').toLowerCase().trim();
  return flagCode(_sheetFlags[k]) || flagCode(RUNNER_FLAGS[k]) || '';
}

// Devuelve HTML: "<bandera> Nombre" (nombre escapado)
function nameWithFlag(name) {
  const f = flagSpan(flagFor(name));
  return (f ? f + ' ' : '') + esc(name);
}

// ¿Modo prueba? / Test mode?
function isMock() {
  return TOURNAMENT_CONFIG.mock === true ||
    /[?&]mock=1(&|$)/.test(location.search) ||
    location.hash === '#mock';
}

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initTabs();
  initFacts();
  initCountdown();
  initSheetModal();
  if (isMock()) showTestBanner();
  loadGroups();
  loadStandings();
  loadSchedule();
  loadDonors();
  initVisitCounter();
  renderBracket();
  renderChampions();
  renderClips();
  renderLive();
  initSimulator();
});

// ======= IDIOMA / LANGUAGE =======
function initLang() {
  const saved = safeGet('dc-lang');
  // Inglés por defecto; solo recordamos si el visitante eligió español.
  applyLang(saved === 'es' || saved === 'en' ? saved : 'en');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val != null) el.textContent = val;
  });

  // Atributos: data-i18n-attr="aria-label:clave;title:clave2"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s && s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
  });

  safeSet('dc-lang', currentLang);

  // Re-render de lo dinámico
  renderCountdown();
  const tb = document.getElementById('test-banner');
  if (tb) tb.textContent = t('testmode');
  if (isMock()) {                       // en modo prueba, los datos falsos dependen del idioma
    lastGroupsRows = mockGroupsRows();
    lastStandingsRows = mockStandingsRows();
  }
  if (lastGroupsRows) renderGroups(lastGroupsRows, document.getElementById('groups-grid'));
  else document.getElementById('groups-grid').innerHTML = placeholderGroups();
  renderBracket();
  renderSchedule();
  renderDonors();
  renderVisits();
  renderChampions();
  renderClips();
  renderLive();
  renderSimulator();
}

function showTestBanner() {
  if (document.getElementById('test-banner')) return;
  const b = document.createElement('div');
  b.id = 'test-banner';
  b.textContent = t('testmode');
  document.body.prepend(b);
}

// ======= NAVEGACIÓN POR PESTAÑAS / TABS =======
function initTabs() {
  const buttons = Array.from(document.querySelectorAll('.tab-btn[data-tab]'));
  const drop = document.getElementById('nav-drop-btn');
  const sub = document.getElementById('nav-sub');
  const panels = document.querySelectorAll('.tab-panel');
  const toggle = document.getElementById('nav-toggle');
  const tabs = document.getElementById('tabs');

  function closeDrop() {
    sub.classList.remove('open');
    drop.setAttribute('aria-expanded', 'false');
  }

  function activate(btn, focusPanel) {
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
    });
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.tabIndex = 0;

    const panel = document.getElementById(btn.dataset.tab);
    panel.classList.add('active');
    const trailer = document.getElementById('trailer');
    if (trailer && btn.dataset.tab !== 'inicio') trailer.pause();
    document.body.dataset.tab = btn.dataset.tab;
    if (btn.dataset.tab === 'brackets' || btn.dataset.tab === 'simulations') { drawAllBracketLines(); requestAnimationFrame(drawAllBracketLines); }
    drop.classList.toggle('active', !!btn.closest('.nav-sub'));
    closeDrop();
    tabs.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (focusPanel) panel.focus();
  }

  buttons.forEach((btn, i) => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
    btn.setAttribute('aria-controls', btn.dataset.tab);
    btn.tabIndex = btn.classList.contains('active') ? 0 : -1;

    btn.addEventListener('click', () => activate(btn));

    // Flechas para moverse entre pestañas (patrón ARIA tabs)
    btn.addEventListener('keydown', e => {
      let next = null;
      const vis = buttons.filter(b => b.offsetParent !== null || b === btn);
      const vi = vis.indexOf(btn);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = vis[(vi + 1) % vis.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = vis[(vi - 1 + vis.length) % vis.length];
      else if (e.key === 'Home') next = vis[0];
      else if (e.key === 'End') next = vis[vis.length - 1];
      if (next) {
        e.preventDefault();
        activate(next);
        next.focus();
      }
    });
  });

  drop.addEventListener('click', e => {
    e.stopPropagation();
    const open = sub.classList.toggle('open');
    drop.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => { if (!e.target.closest('.nav-group')) closeDrop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrop(); });

  tabs.setAttribute('role', 'tablist');
  document.querySelectorAll('.tab-panel').forEach(p => p.setAttribute('role', 'tabpanel'));

  const active = document.querySelector('.tab-btn.active');
  document.body.dataset.tab = active ? active.dataset.tab : 'inicio';

  toggle.addEventListener('click', () => {
    const open = tabs.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// ======= NÚMEROS DEL HERO / HERO FACTS =======
function initFacts() {
  setText('fact-runners', TOURNAMENT_CONFIG.totalRunners);
  setText('fact-groups', TOURNAMENT_CONFIG.numGroups);
  setText('fact-qualify', TOURNAMENT_CONFIG.directQualifiers);
}

// ======= CONTADOR / COUNTDOWN =======
let _countdownTarget = null;

function initCountdown() {
  const target = new Date(TOURNAMENT_CONFIG.qualysOpen);
  _countdownTarget = isNaN(target.getTime()) ? null : target;
  renderCountdown();
  if (_countdownTarget) setInterval(renderCountdown, 1000);
}

function renderCountdown() {
  const box = document.getElementById('countdown');
  if (!box || !_countdownTarget) return;

  const dateLine = document.getElementById('countdown-date');
  const locale = currentLang === 'en' ? 'en-US' : 'es-ES';
  const fmtOpts = { day: 'numeric', month: 'long', year: 'numeric' };
  if (TOURNAMENT_CONFIG.qualysTimeZone) fmtOpts.timeZone = TOURNAMENT_CONFIG.qualysTimeZone;
  const fmtDate = d => {
    try { return d.toLocaleDateString(locale, fmtOpts); }
    catch (e) { return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }); }
  };
  if (dateLine) {
    let line = t('countdown.datePrefix') + ' ' + fmtDate(_countdownTarget);
    const closeDate = new Date(TOURNAMENT_CONFIG.qualysClose);
    if (!isNaN(closeDate.getTime())) line += '  ·  ' + t('countdown.closePrefix') + ' ' + fmtDate(closeDate);
    dateLine.textContent = line;
  }

  let diff = _countdownTarget.getTime() - Date.now();

  if (diff <= 0) {
    box.classList.add('is-open');
    setText('cd-days', '0'); setText('cd-hours', '00'); setText('cd-mins', '00'); setText('cd-secs', '00');
    return;
  }
  box.classList.remove('is-open');

  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);

  setText('cd-days', String(d));
  setText('cd-hours', String(h).padStart(2, '0'));
  setText('cd-mins', String(m).padStart(2, '0'));
  setText('cd-secs', String(s).padStart(2, '0'));
}

// ======= GRUPOS / GROUPS =======
async function loadGroups() {
  const container = document.getElementById('groups-grid');

  if (isMock()) {
    lastGroupsRows = mockGroupsRows();
    indexFlags(lastGroupsRows);
    renderGroups(lastGroupsRows, container);
    return;
  }
  if (!SHEET_URLS.groups) {
    container.innerHTML = placeholderGroups();
    return;
  }
  try {
    const rows = await fetchCSV(SHEET_URLS.groups);
    lastGroupsRows = rows;
    indexFlags(rows);
    renderGroups(rows, container);
    renderBracket();
  } catch (err) {
    console.error('Error cargando grupos:', err);
    container.innerHTML = '<p class="loading-msg">' + esc(t('grupos.sheetError')) + '</p>' + placeholderGroups();
  }
}

// Dos bloques bien separados: el Top 8 (clasifican directo, NO juegan la
// fase de grupos) y los 24 que si la juegan (3 grupos de 8).
function directBlockHtml(names) {
  const items = Array.from({ length: TOURNAMENT_CONFIG.directQualifiers }, (_, i) =>
    names[i] ? `<li>${nameWithFlag(names[i])}</li>` : `<li class="is-tbd">${esc(t('group.tbd'))}</li>`).join('');
  return `<section class="direct-block">
    <header class="block-head">
      <span class="block-badge">${esc(t('group.directBadge'))}</span>
      <h3>${esc(t('group.directTitle'))}</h3>
      <p>${esc(t('group.directNote'))}</p>
    </header>
    <ol class="direct-list">${items}</ol>
  </section>`;
}

function stageBlockHtml(cardsHtml) {
  return `<section class="stage-block">
    <header class="block-head">
      <span class="block-badge is-stage">${esc(t('group.stageBadge'))}</span>
      <h3>${esc(t('group.stageTitle'))}</h3>
      <p>${esc(t('group.stageNote'))}</p>
    </header>
    <div class="groups-grid">${cardsHtml}</div>
  </section>`;
}

function groupCardHtml(label, names, size) {
  const items = Array.from({ length: Math.max(size || 0, names.length) }, (_, i) =>
    names[i] ? `<li>${nameWithFlag(names[i])}</li>` : `<li>${esc(t('group.tbd'))}</li>`).join('');
  return `<div class="group-card"><h3>${esc(label)}</h3><ol>${items}</ol></div>`;
}

function placeholderGroups() {
  let cards = '';
  for (let g = 1; g <= TOURNAMENT_CONFIG.numGroups; g++) {
    cards += groupCardHtml(`${t('group.word')} ${g}`, [], TOURNAMENT_CONFIG.groupSize);
  }
  return directBlockHtml([]) + stageBlockHtml(cards);
}

// Espera columnas en la Sheet: Grupo, Corredor (una fila por corredor).
// El Top 8 de las clasificatorias va con Grupo = "0" (no juega la fase de
// grupos, ver directQualifiersFromData) — el resto usa Grupo = "1"/"2"/"3".
function renderGroups(rows, container) {
  const groups = groupRows(rows);
  const keys = Object.keys(groups).sort();
  if (!keys.length) {
    container.innerHTML = placeholderGroups();
    return;
  }
  const cards = keys.filter(g => g !== '0')
    .map(g => groupCardHtml(`${t('group.word')} ${g}`, groups[g], TOURNAMENT_CONFIG.groupSize)).join('');
  container.innerHTML = directBlockHtml(groups['0'] || []) + stageBlockHtml(cards);
}

// { "0": ["nombre", ...], "1": [...], ... } a partir de filas {Grupo, Corredor}
function groupRows(rows) {
  const groups = {};
  (rows || []).forEach(r => {
    const g = r['Grupo'] || r['Group'];
    const name = r['Corredor'] || r['Runner'] || r['Nombre'];
    if (!g || !name) return;
    if (!groups[g]) groups[g] = [];
    groups[g].push(name);
  });
  return groups;
}

// ======= SORTEO Y CALENDARIO / DRAW & SCHEDULE =======
// Lo que se sortea son los CRUCES dentro de cada grupo (no los grupos): antes
// de cada fecha hay un sorteo en vivo y de ahi sale quien juega contra quien y
// a que hora. Hoja esperada (una fila por partida):
//   Fecha | Grupo | Corredor 1 | Corredor 2 | Horario
// Fecha = 1..4, Grupo = 1..3, Horario = "2027-01-23 18:00" (hora Argentina) o
// ISO con zona horaria. Se muestra en la zona horaria de quien mira la pagina.
let lastScheduleRows = null;
const SCHEDULE_TZ_OFFSET = '-03:00'; // Argentina, sin horario de verano

function pickVal(row, names) {
  for (const n of names) if (row[n] != null && String(row[n]).trim() !== '') return String(row[n]).trim();
  return '';
}

function parseScheduleTime(str) {
  let s = String(str || '').trim().replace(' ', 'T');
  if (!s) return null;
  if (/^\d{4}-\d\d-\d\d$/.test(s)) s += 'T00:00';
  if (!/(Z|[+-]\d\d:?\d\d)$/i.test(s)) s += SCHEDULE_TZ_OFFSET;
  const d = new Date(s);
  return isNaN(d) ? null : d;
}

// { fecha: { grupo: [{a, b, when}] } }
function scheduleFromRows(rows) {
  const out = {};
  (rows || []).forEach(r => {
    const md = parseInt(pickVal(r, ['Fecha', 'Matchday', 'Jornada']), 10);
    const g = parseInt(pickVal(r, ['Grupo', 'Group']), 10);
    const a = pickVal(r, ['Corredor 1', 'Runner 1', 'Corredor A']);
    const b = pickVal(r, ['Corredor 2', 'Runner 2', 'Corredor B']);
    if (!md || !g || (!a && !b)) return;
    if (!out[md]) out[md] = {};
    if (!out[md][g]) out[md][g] = [];
    out[md][g].push({ a, b, when: parseScheduleTime(pickVal(r, ['Horario', 'Hora', 'Time', 'Date'])) });
  });
  return out;
}

async function loadSchedule() {
  if (isMock()) lastScheduleRows = mockScheduleRows();
  else if (SHEET_URLS.schedule) {
    try {
      lastScheduleRows = await fetchCSV(SHEET_URLS.schedule);
      indexFlags(lastScheduleRows);
    } catch (err) { console.error('Error cargando calendario:', err); }
  }
  renderSchedule();
}

const schedOpen = new Set();   // matchdays desplegados (se conservan al re-renderizar)
function renderSchedule() {
  const host = document.getElementById('schedule-container');
  if (!host) return;
  const data = scheduleFromRows(lastScheduleRows);
  const loc = currentLang === 'es' ? 'es-AR' : 'en-US';
  const fmtDay = new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtTime = new Intl.DateTimeFormat(loc, { hour: '2-digit', minute: '2-digit', hour12: false });
  const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').replace(/_/g, ' ');
  const tbd = `<span class="is-tbd">${esc(t('group.tbd'))}</span>`;
  const runner = n => n ? nameWithFlag(n) : tbd;

  let html = '';
  for (let md = 1; md <= TOURNAMENT_CONFIG.matchdays; md++) {
    const groups = data[md] || {};
    const times = Object.values(groups).flat().map(m => m.when).filter(Boolean).sort((x, y) => x - y);
    const rawDate = times.length ? fmtDay.format(times[0]) : t('sched.dateTbd');
    const dateLabel = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
    let cols = '';
    for (let g = 1; g <= TOURNAMENT_CONFIG.numGroups; g++) {
      const ms = (groups[g] || []).slice().sort((x, y) => (x.when || 0) - (y.when || 0));
      const rows = ms.length ? ms : Array.from({ length: TOURNAMENT_CONFIG.groupSize / 2 }, () => ({ a: '', b: '', when: null }));
      cols += `<div class="sched-group"><h4>${esc(t('group.word'))} ${g}</h4><ul>${rows.map(m => `
        <li class="sched-match">
          <span class="sched-time">${m.when ? fmtTime.format(m.when) : '--:--'}</span>
          <span class="sched-pair">${runner(m.a)}<span class="sched-vs">${esc(t('sched.vs'))}</span>${runner(m.b)}</span>
        </li>`).join('')}</ul></div>`;
    }
    html += `<details class="sched-day${times.length ? '' : ' is-tbd'}" data-md="${md}"${schedOpen.has(md) ? ' open' : ''}>
      <summary class="sched-day-head">
        <span class="sched-day-n">${esc(t('sched.matchday', { n: md }))}</span>
        <span class="sched-day-date">${esc(dateLabel)}</span>
      </summary>
      <p class="sched-day-note">${esc(t(md === 1 ? 'sched.note1' : 'sched.noteN'))}</p>
      <div class="sched-groups">${cols}</div>
    </details>`;
  }
  html += `<p class="section-note sched-tz">${esc(t('sched.tzNote', { tz }))}</p>`;
  host.innerHTML = html;
  host.querySelectorAll('details.sched-day').forEach(d => d.addEventListener('toggle', () => {
    const n = Number(d.dataset.md);
    if (d.open) schedOpen.add(n); else schedOpen.delete(n);
  }));
}

function mockScheduleRows() {
  const rows = [];
  for (let md = 1; md <= TOURNAMENT_CONFIG.matchdays; md++) {
    const day = new Date(Date.UTC(2027, 0, 23 + 7 * (md - 1))).toISOString().slice(0, 10);
    for (let g = 1; g <= TOURNAMENT_CONFIG.numGroups; g++) {
      for (let i = 0; i < TOURNAMENT_CONFIG.groupSize / 2; i++) {
        const base = ((md - 1) * 5 + (g - 1) * 8 + i * 2) % MOCK_NAMES.length;
        const mins = 14 * 60 + (g - 1) * 120 + i * 30;
        const hh = String(Math.floor(mins / 60)).padStart(2, '0'), mm = String(mins % 60).padStart(2, '0');
        rows.push({ Fecha: String(md), Grupo: String(g), 'Corredor 1': MOCK_NAMES[base], 'Corredor 2': MOCK_NAMES[(base + 1) % MOCK_NAMES.length], Horario: `${day} ${hh}:${mm}` });
      }
    }
  }
  return rows;
}

// ======= CLASIFICACIÓN / STANDINGS =======
async function loadStandings() {
  if (isMock()) {
    lastStandingsRows = mockStandingsRows();
    indexFlags(lastStandingsRows);
    return;
  }
  if (!SHEET_URLS.standings) return;
  try {
    const rows = await fetchCSV(SHEET_URLS.standings);
    lastStandingsRows = rows;
    indexFlags(rows);
    renderBracket();
  } catch (err) {
    console.error('Error cargando clasificación:', err);
  }
}

// ======= BRACKET / CUADRO DE ELIMINACIÓN (DOBLE ELIMINACIÓN) =======
// 16 entrantes: Top 8 directo (sembrados 1-8, por orden de clasificatorias)
// + 8 de la fase de grupos (9-16, por puntaje). Cuadro de ganadores, cuadro
// de perdedores y Gran Final. Perder una vez te manda a perdedores; perder
// ahi te elimina. Sin datos de resultados, los casilleros muestran "Ganador
// M3" / "Perdedor M5" para que se entienda el recorrido de cada llave.
let bracketLinks = [];

// Modelo: devuelve { wb:[[match]], lb:[[match]], gf:match, links:[[desde,hasta,tipo]] }.
// Cada match = { id, n, kind, round, idx, refs:[ref|null, ref|null] } donde
// ref = {w:n} (ganador del match n) o {l:n} (perdedor del match n).
function buildDoubleElim(size) {
  const k = Math.log2(size);
  let n = 0;
  const mk = (kind, round, idx) => ({ id: 'm' + (++n), n, kind, round, idx, refs: [null, null] });
  const wb = [];
  for (let r = 0; r < k; r++) {
    wb[r] = [];
    for (let i = 0; i < size / 2 ** (r + 1); i++) wb[r].push(mk('w', r, i));
  }
  const lb = [];
  const lrCount = 2 * (k - 1);
  for (let r = 0; r < lrCount; r++) {
    lb[r] = [];
    for (let i = 0; i < size / 2 ** (Math.floor(r / 2) + 2); i++) lb[r].push(mk('l', r, i));
  }
  const gf = mk('g', 0, 0);

  const W = m => ({ w: m.n }), L = m => ({ l: m.n });
  const links = [];
  for (let r = 1; r < k; r++) wb[r].forEach((m, i) => {
    m.refs = [W(wb[r - 1][2 * i]), W(wb[r - 1][2 * i + 1])];
  });
  lb.forEach((round, r) => round.forEach((m, i) => {
    if (r === 0) m.refs = [L(wb[0][2 * i]), L(wb[0][2 * i + 1])];
    else if (r % 2 === 1) {                      // ronda con "drop-in": viene de perdedores del cuadro de ganadores
      const drop = wb[(r + 1) / 2];
      m.refs = [W(lb[r - 1][i]), L(drop[drop.length - 1 - i])];
    } else m.refs = [W(lb[r - 1][2 * i]), W(lb[r - 1][2 * i + 1])];
  }));
  gf.refs = [W(wb[k - 1][0]), W(lb[lrCount - 1][0])];

  for (let r = 0; r < k - 1; r++) wb[r].forEach((m, i) => links.push([m.id, wb[r + 1][Math.floor(i / 2)].id, 'w']));
  links.push([wb[k - 1][0].id, gf.id, 'g']);
  lb.forEach((round, r) => round.forEach((m, i) => {
    if (r === lrCount - 1) links.push([m.id, gf.id, 'g']);
    else links.push([m.id, lb[r + 1][r % 2 === 0 ? i : Math.floor(i / 2)].id, 'l']);
  }));
  return { wb, lb, gf, links, k, lrCount };
}

function renderBracket() {
  const host = document.getElementById('bracket-container');
  if (!host) return;

  const nEntrants = TOURNAMENT_CONFIG.directQualifiers + TOURNAMENT_CONFIG.groupQualifiers;
  if (nEntrants < 4) { host.innerHTML = `<p>${esc(t('brackets.placeholder'))}</p>`; return; }

  const size = 1 << Math.ceil(Math.log2(nEntrants));   // proxima potencia de 2
  const order = seedOrder(size);
  const qualified = qualifiedFromData();                // [nombre1..nombre16] o null
  const model = buildDoubleElim(size);
  bracketLinks = model.links;

  const slotSeed = seed => {
    if (seed > nEntrants) return `<div class="slot is-bye"><span class="slot-name">${esc(t('bracket.bye'))}</span></div>`;
    const nm = qualified && qualified[seed - 1];
    return nm
      ? `<div class="slot"><span class="slot-seed">${seed}</span><span class="slot-name">${nameWithFlag(nm)}</span></div>`
      : `<div class="slot is-ref"><span class="slot-seed">${seed}</span><span class="slot-name">${esc(t('bracket.seedTag', { n: seed }))}</span></div>`;
  };
  const slotRef = ref => `<div class="slot is-ref"><span class="slot-name">${esc(t(ref.w ? 'bracket.winnerOf' : 'bracket.loserOf', { n: ref.w || ref.l }))}</span></div>`;
  const card = (m, seedPair) => `
    <div class="match is-${m.kind}" data-mid="${m.id}">
      <span class="match-num">M${m.n}</span>
      ${seedPair ? slotSeed(seedPair[0]) + slotSeed(seedPair[1]) : m.refs.map(slotRef).join('')}
    </div>`;
  const round = (title, cards) => `
    <div class="round"><div class="round-title">${esc(title)}</div><div class="round-inner">${cards}</div></div>`;

  const wbRounds = model.wb.map((ms, r) => {
    const teams = size / 2 ** r;
    const title = r === model.k - 1 ? t('bracket.round.winnersFinal') : roundName(teams);
    return round(title, ms.map((m, i) => card(m, r === 0 ? [order[2 * i], order[2 * i + 1]] : null)).join(''));
  }).join('');

  const lbRounds = model.lb.map((ms, r) => {
    const title = r === model.lrCount - 1 ? t('bracket.losersFinal')
      : r === model.lrCount - 2 ? t('bracket.losersSemi')
      : t('bracket.lr', { n: r + 1 });
    return round(title, ms.map(m => card(m, null)).join(''));
  }).join('');

  host.innerHTML = `
    <p class="section-note bracket-note">${esc(t('brackets.previewNote', { n: nEntrants }))}</p>
    <div class="bracket-scroll">
      <div class="bracket-canvas" id="bracket-canvas" role="group" aria-label="${esc(t('brackets.title'))}">
        <svg class="bracket-lines" aria-hidden="true"></svg>
        <div class="bracket-stack">
          <section class="bracket-section is-winners">
            <h3 class="bracket-heading">${esc(t('bracket.winners'))}</h3>
            <div class="bracket-rounds">${wbRounds}</div>
          </section>
          <section class="bracket-section is-losers">
            <h3 class="bracket-heading">${esc(t('bracket.losers'))}</h3>
            <div class="bracket-rounds">${lbRounds}</div>
          </section>
        </div>
        <div class="bracket-gf">
          ${round(t('bracket.grandFinal'), card(model.gf, null))}
          <div class="round"><div class="round-title">${esc(t('bracket.champion'))}</div>
            <div class="round-inner"><div class="match match-champion"><div class="slot is-ref"><span class="slot-name">${esc(t('bracket.tbd'))}</span></div></div></div></div>
        </div>
      </div>
    </div>`;
  drawBracketLines();
  requestAnimationFrame(drawBracketLines);
}

// Conectores de "avanza el ganador": se miden las cajas ya renderizadas y se
// dibujan codos en un SVG por encima. Hay que volver a llamarla cuando el tab
// pasa a ser visible (oculto, todo mide 0) y al cambiar el tamaño.
function drawLinesFor(canvasId, links) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.offsetWidth) return;
  const svg = canvas.querySelector('.bracket-lines');
  const base = canvas.getBoundingClientRect();
  const box = id => {
    const el = canvas.querySelector(`[data-mid="${id}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { l: r.left - base.left, r: r.right - base.left, y: r.top - base.top + r.height / 2 };
  };
  const paths = { w: '', l: '', g: '' };
  links.forEach(([from, to, kind]) => {
    const a = box(from), b = box(to);
    if (!a || !b) return;
    const mid = a.r + Math.min(28, (b.l - a.r) / 2);
    paths[kind] += `M${a.r} ${a.y}H${mid}V${b.y}H${b.l}`;
  });
  svg.setAttribute('width', canvas.scrollWidth);
  svg.setAttribute('height', canvas.scrollHeight);
  svg.innerHTML = ['w', 'l', 'g'].map(k => `<path class="line-${k}" d="${paths[k]}"/>`).join('');
}
function drawBracketLines() { drawLinesFor('bracket-canvas', bracketLinks); }
let simWBLinks = [];
function drawSimWBLines() { drawLinesFor('sim-wb-canvas', simWBLinks); }
function drawAllBracketLines() { drawBracketLines(); drawSimWBLines(); }
let _bracketResizeTimer;
window.addEventListener('resize', () => { clearTimeout(_bracketResizeTimer); _bracketResizeTimer = setTimeout(drawAllBracketLines, 120); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawAllBracketLines);

// Orden de siembra estándar para un cuadro de `n` (potencia de 2).
function seedOrder(n) {
  let seeds = [1, 2];
  while (seeds.length < n) {
    const sum = seeds.length * 2 + 1;
    const next = [];
    seeds.forEach(s => { next.push(s); next.push(sum - s); });
    seeds = next;
  }
  return seeds;
}

// Nombre de ronda según cuántos entran a esa ronda
function roundName(teams) {
  if (teams === 2) return t('bracket.round.final');
  if (teams === 4) return t('bracket.round.semi');
  if (teams === 8) return t('bracket.round.quarter');
  if (teams === 16) return t('bracket.round.r16');
  if (teams === 32) return t('bracket.round.r32');
  return t('bracket.round.generic', { n: teams });
}

// Los 16 clasificados a Octavos, en orden de sembrado 1..16: primero el
// Top 8 directo (por orden de la hoja de Clasificatorias, ya ordenada por
// tiempo), despues los mejores de la fase de grupos (por Pts si la hoja de
// Grupos la trae, si no en el orden en que esten cargados). Devuelve un
// array de nombres (puede venir incompleto) o null si no hay nada aun.
function qualifiedFromData() {
  const direct = directQualifiersFromData();
  const fromGroups = groupQualifiersFromData();
  if (!direct.length && !fromGroups.length) return null;
  return [...direct, ...fromGroups];
}

// Primeras N filas de la hoja de Clasificatorias (Qualifiers) = Top 8 real.
function directQualifiersFromData() {
  const rows = lastStandingsRows;
  if (!rows || !rows.length) return [];
  const rCol = pickKey(rows[0], ['Corredor', 'Runner', 'Nombre']);
  if (!rCol) return [];
  return rows.slice(0, TOURNAMENT_CONFIG.directQualifiers)
    .map(r => (r[rCol] || '').trim()).filter(Boolean);
}

// Mejores N de la hoja de Grupos (excluyendo el bloque "0" = Top 8 directo,
// por si vinieran mezclados en la misma hoja), ordenados por Pts si la
// columna existe.
function groupQualifiersFromData() {
  const rows = lastGroupsRows;
  if (!rows || !rows.length) return [];
  const rCol = pickKey(rows[0], ['Corredor', 'Runner', 'Nombre']);
  if (!rCol) return [];
  const gCol = pickKey(rows[0], ['Grupo', 'Group']);
  const ptsCol = pickKey(rows[0], ['Pts', 'Puntos', 'Points']);
  let entrants = rows.filter(r => !gCol || (r[gCol] || '').trim() !== '0');
  if (ptsCol) entrants = [...entrants].sort((a, b) => (parseFloat(b[ptsCol]) || 0) - (parseFloat(a[ptsCol]) || 0));
  return entrants.slice(0, TOURNAMENT_CONFIG.groupQualifiers)
    .map(r => (r[rCol] || '').trim()).filter(Boolean);
}

function pickKey(obj, names) {
  for (const n of names) if (n in obj) return n;
  return null;
}

// ======= CAMPEONES / PAST CHAMPIONS =======
// Lista de donadores de una edicion (sale de data/donors.json, por torneo de Matcherino)
function donationDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(currentLang === 'es' ? 'es-AR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) { return String(iso).slice(0, 10); }
}

function editionDonorsHtml(e) {
  const src = lastDonors && (lastDonors.sources || []).find(s => String(s.startAt || '').startsWith(String(e.year)));
  if (!src || !src.donors || !src.donors.length) return '';
  const hasTx = src.donors.every(d => d.donations && d.donations.length);
  const rows = src.donors.map((d, i) => {
    const head = `<span class="dl-rank">${i + 1}</span><span class="dl-name">${esc(d.name)}</span><span class="dl-amt">${esc(formatUSD(d.total))}</span>`;
    const cls = i < 3 ? 'rank-' + (i + 1) : '';
    if (!hasTx) return `<li class="${cls}"><div class="dl-row">${head}</div></li>`;
    const tx = d.donations.map(x => `<li><span class="dl-tx-date">${esc(donationDate(x.date))}</span><span class="dl-tx-amt">${esc(formatUSD(x.amount))}</span></li>`).join('');
    return `<li class="${cls}"><button type="button" class="dl-row dl-toggle" aria-expanded="false" title="${esc(t('champions.txToggle'))}">${head}</button><ul class="dl-tx" hidden>${tx}</ul></li>`;
  }).join('');
  let timeline = '';
  if (hasTx) {
    const all = [];
    src.donors.forEach(d => d.donations.forEach(x => all.push({ name: d.name, date: x.date, amount: x.amount })));
    all.sort((a, b) => String(a.date).localeCompare(String(b.date)));
    timeline = `<details class="edition-timeline">
      <summary><span class="ed-d-title">${esc(t('champions.timeline'))}</span><span class="ed-d-meta">${esc(String(all.length))}</span></summary>
      <ol class="timeline-list">${all.map(x => `<li><span class="tl-date">${esc(donationDate(x.date))}</span><span class="tl-name">${esc(x.name)}</span><span class="tl-amt">${esc(formatUSD(x.amount))}</span></li>`).join('')}</ol>
    </details>`;
  }
  return `<details class="edition-donors" open>
    <summary><span class="ed-d-title">${esc(t('champions.donors'))}</span><span class="ed-d-meta">${esc(src.donors.length + ' · ' + formatUSD(src.raised))}</span></summary>
    <ol class="donor-list">${rows}</ol>
    ${timeline}
  </details>`;
}

function renderChampions() {
  const host = document.getElementById('champions-content');
  if (!host) return;

  const spot = (labelKey, name, rank) => `
    <div class="podium-spot rank-${rank}">
      <span class="podium-role">${esc(t(labelKey))}</span>
      <span class="podium-name">${name ? nameWithFlag(name) : '<span class="tbd">' + esc(t('champions.tbd')) + '</span>'}</span>
    </div>`;

  const editions = PAST_EDITIONS.map(e => `
    <article class="edition">
      ${e.logo ? `<div class="edition-banner"><img src="${esc(e.logo)}" alt="${esc(e.name || 'Ditman Cup ' + e.year)}" loading="lazy"></div>` : ''}
      <div class="edition-head">
        <h3 class="edition-year">${esc(e.name || t('champions.edition', { year: e.year }))}</h3>
      </div>
      <div class="podium">
        ${spot('champions.champion', e.champion, 1)}
        ${spot('champions.runnerUp', e.runnerUp, 2)}
        ${spot('champions.third', e.third, 3)}
      </div>
      ${editionDonorsHtml(e)}
      ${e.prize ? `<div class="edition-prize"><span class="prize-label">${esc(t('champions.prize'))}</span><span class="prize-amount">${esc(e.prize)}</span></div>` : ''}
      <div class="edition-actions">
        ${e.vod ? `<a class="edition-vod" href="${esc(e.vod)}" target="_blank" rel="noopener">${esc(t('champions.vod'))} ↗</a>` : ''}
        ${e.sheetUrl ? `<button type="button" class="edition-data-btn" data-sheet-url="${esc(e.sheetUrl)}" data-sheet-title="${esc(e.name || t('champions.edition', { year: e.year }))}">${esc(t('champions.viewData'))}</button>` : ''}
      </div>
    </article>`).join('');

  host.innerHTML = `
    <div class="trophy-card">
      <h3>${esc(t('champions.trophyTitle'))}</h3>
      <p>${esc(t('champions.trophyPending'))}</p>
    </div>
    <div class="editions">${editions}</div>
  `;

  host.querySelectorAll('.edition-data-btn').forEach(btn => {
    btn.addEventListener('click', () => openSheetModal(btn.dataset.sheetUrl, btn.dataset.sheetTitle));
  });
  // Donador -> despliega cada donacion por separado
  host.querySelectorAll('.dl-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.nextElementSibling;
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      list.hidden = !open;
    });
  });
}

// ======= MODAL DE SHEET (botón "ver todos los datos") =======
function initSheetModal() {
  const modal = document.getElementById('sheet-modal');
  if (!modal) return;
  modal.querySelector('.sheet-modal-close').addEventListener('click', closeSheetModal);
  modal.querySelector('.sheet-modal-backdrop').addEventListener('click', closeSheetModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeSheetModal();
  });
}

function openSheetModal(url, title) {
  const modal = document.getElementById('sheet-modal');
  if (!modal || !url) return;
  document.getElementById('sheet-modal-title').textContent = title || '';
  document.getElementById('sheet-modal-frame').src = url;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.sheet-modal-close').focus();
}

function closeSheetModal() {
  const modal = document.getElementById('sheet-modal');
  if (!modal) return;
  modal.hidden = true;
  document.getElementById('sheet-modal-frame').src = 'about:blank'; // corta la carga
  document.body.classList.remove('modal-open');
}

// ======= CLIPS =======
function toEmbed(url) {
  try {
    const u = new URL(url);
    const host = location.hostname;
    if (/youtube\.com$/.test(u.hostname) && u.searchParams.get('v'))
      return 'https://www.youtube.com/embed/' + u.searchParams.get('v');
    if (u.hostname === 'youtu.be')
      return 'https://www.youtube.com/embed/' + u.pathname.slice(1);
    if (/youtube\.com$/.test(u.hostname) && u.pathname.startsWith('/embed/'))
      return url;
    if (u.hostname === 'clips.twitch.tv' && u.pathname.length > 1)
      return `https://clips.twitch.tv/embed?clip=${u.pathname.slice(1)}&parent=${host}`;
    const m = u.pathname.match(/\/clip\/([A-Za-z0-9_-]+)/);
    if (/twitch\.tv$/.test(u.hostname) && m)
      return `https://clips.twitch.tv/embed?clip=${m[1]}&parent=${host}`;
  } catch (e) {}
  return '';
}

function clipUrl(c) {
  return c.url || (c.s ? 'https://clips.twitch.tv/' + c.s : '');
}
function clipEmbed(c) {
  if (c.s) return `https://clips.twitch.tv/embed?clip=${encodeURIComponent(c.s)}&parent=${location.hostname}&autoplay=true`;
  return toEmbed(c.url || '');
}

function renderClips() {
  const host = document.getElementById('clips-grid');
  if (!host) return;

  // Soporta tanto [{section, items:[]}] como un array plano de clips
  const sections = Array.isArray(CLIPS) && CLIPS.length && CLIPS[0].items
    ? CLIPS
    : [{ section: '', items: CLIPS || [] }];

  const total = sections.reduce((n, s) => n + (s.items ? s.items.length : 0), 0);
  if (!total) { host.innerHTML = `<p class="loading-msg">${esc(t('clips.empty'))}</p>`; return; }

  host.innerHTML = sections.filter(s => s.items && s.items.length).map(s => `
    ${s.section ? `<h3 class="clips-section-title">${esc(s.section)} <span class="clips-count">${s.items.length}</span></h3>` : ''}
    <div class="clips-row">
      ${s.items.map((c, i) => {
        const title = c.t || c.title || '';
        const author = c.a || c.author || '';
        const meta = [author && ('by ' + author), c.d, c.v != null && (c.v + ' views')].filter(Boolean).join(' · ');
        return `<figure class="clip">
          <button class="clip-frame clip-play" type="button" data-clip='${esc(JSON.stringify({ s: c.s || '', url: c.url || '' }))}' aria-label="${esc(title || 'clip')}">
            ${c.s ? `<img class="clip-thumb" src="assets/clips/${esc(c.s)}.jpg" alt="" loading="lazy" onerror="this.remove()">` : ''}
            <span class="clip-play-icon" aria-hidden="true">▶</span>
          </button>
          <figcaption><span class="clip-title">${esc(title)}</span>${meta ? `<span class="clip-meta">${esc(meta)}</span>` : ''}</figcaption>
        </figure>`;
      }).join('')}
    </div>`).join('');

  host.querySelectorAll('.clip-play').forEach(btn => {
    btn.addEventListener('click', () => {
      let c; try { c = JSON.parse(btn.dataset.clip); } catch (e) { return; }
      const src = clipEmbed(c);
      if (!src) { window.open(clipUrl(c), '_blank', 'noopener'); return; }
      const frame = document.createElement('iframe');
      frame.src = src;
      frame.allowFullscreen = true;
      frame.title = btn.getAttribute('aria-label') || 'clip';
      btn.replaceWith(frame);
    });
  });
}

// ======= EN VIVO / LIVE (RE4 runners) =======
const TWITCH_GQL_CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // client-id público de solo lectura

async function twitchLiveStatus(logins) {
  if (!logins.length) return {};
  const q = `query{users(logins:[${logins.map(l => JSON.stringify(l.toLowerCase())).join(',')}]){login displayName stream{id game{name} viewersCount title}}}`;
  const res = await fetch('https://gql.twitch.tv/gql', {
    method: 'POST',
    headers: { 'Client-ID': TWITCH_GQL_CLIENT_ID, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q }),
  });
  const j = await res.json();
  const map = {};
  (j.data && j.data.users || []).forEach(u => { if (u) map[u.login] = u; });
  return map;
}

async function renderLive() {
  const host = document.getElementById('live-grid');
  if (!host) return;

  const tw = (RE4_LIVE_CHANNELS || []).filter(Boolean);
  const yt = (YOUTUBE_LIVE_CHANNELS || []).filter(Boolean);
  if (!tw.length && !yt.length) { host.innerHTML = `<p class="loading-msg">${esc(t('live.none'))}</p>`; return; }

  host.innerHTML = `<p class="loading-msg">${esc(t('live.checking'))}</p>`;
  const parent = location.hostname;

  let status = {};
  try { status = await twitchLiveStatus(tw); } catch (e) { console.error('Twitch live check falló:', e); }

  const rows = tw.map(ch => {
    const u = status[ch.toLowerCase()];
    return { ch, name: (u && u.displayName) || ch, live: !!(u && u.stream), stream: u && u.stream };
  }).sort((a, b) => (b.live - a.live) || a.name.localeCompare(b.name));

  const liveRows = rows.filter(r => r.live);
  const offRows = rows.filter(r => !r.live);

  const twIcon = '<svg class="ic" aria-hidden="true"><use href="#ic-twitch"/></svg>';
  const ytIcon = '<svg class="ic" aria-hidden="true"><use href="#ic-youtube"/></svg>';

  let html = '';

  if (liveRows.length) {
    html += `<div class="live-live">` + liveRows.map(r => `
      <div class="live-card is-live">
        <div class="live-frame"><iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(r.ch)}&parent=${parent}&muted=true" allowfullscreen title="${esc(r.name)}"></iframe></div>
        <div class="live-meta">
          <span class="live-badge">● ${esc(t('live.on'))}</span>
          <a href="https://twitch.tv/${encodeURIComponent(r.ch)}" target="_blank" rel="noopener">${twIcon}${esc(r.name)}</a>
          ${r.stream && r.stream.game ? `<span class="live-game">${esc(r.stream.game.name)}</span>` : ''}
        </div>
      </div>`).join('') + `</div>`;
  } else {
    html += `<p class="loading-msg">${esc(t('live.none'))}</p>`;
  }

  const offCards = offRows.map(r =>
    `<a class="live-card is-off" href="https://twitch.tv/${encodeURIComponent(r.ch)}" target="_blank" rel="noopener">
       <span class="live-name">${twIcon}${esc(r.name)}</span><span class="live-status">${esc(t('live.off'))}</span>
     </a>`);

  const ytCards = yt.map(c => {
    const href = c.url || (c.id ? `https://www.youtube.com/channel/${c.id}/live` : `https://www.youtube.com/results?search_query=${encodeURIComponent(c.name)}`);
    return `<a class="live-card is-off is-yt" href="${esc(href)}" target="_blank" rel="noopener">
       <span class="live-name">${ytIcon}${esc(c.name)}</span><span class="live-status">YouTube</span>
     </a>`;
  });

  const all = offCards.concat(ytCards);
  if (all.length) html += `<div class="live-roster">${all.join('')}</div>`;

  host.innerHTML = html;
}

// ======= TOP DONADORES (Matcherino) =======
// data/donors.json lo arma .github/workflows/update-donors.yml (la API de
// Matcherino no se puede leer directo desde el navegador por CORS).
let lastDonors = null;
let donorsLoaded = false;   // evita mostrar "error" mientras todavia esta cargando

// Une donadores que son la misma persona: nombres que solo difieren en
// mayusculas/guiones ("MajorRichy" = "Major_Richy") y alias conocidos.
const DONOR_ALIASES = { ditmancup: 'JokerUY' };
function donorKey(name) {
  const k = String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
  return DONOR_ALIASES[k] ? DONOR_ALIASES[k].toLowerCase().replace(/[^a-z0-9]/g, '') : k;
}
function mergeDonorList(list) {
  const map = new Map();
  (list || []).forEach(x => {
    const k = donorKey(x.name);
    const alias = DONOR_ALIASES[String(x.name).toLowerCase().replace(/[^a-z0-9]/g, '')];
    const cur = map.get(k);
    if (!cur) { map.set(k, { name: alias || x.name, total: x.total, count: x.count, best: x.total, tx: (x.donations || []).slice() }); return; }
    cur.total += x.total; cur.count += x.count; cur.tx = cur.tx.concat(x.donations || []);
    if (!alias && !DONOR_ALIASES[donorKey(cur.name)] && x.total > cur.best) { cur.name = x.name; cur.best = x.total; }
  });
  return [...map.values()].map(({ name, total, count, tx }) => ({ name, total: Math.round(total * 100) / 100, count, donations: tx.sort((a, b) => String(a.date).localeCompare(String(b.date))) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
}
function mergeDonorAliases(d) {
  if (!d) return d;
  d.donors = mergeDonorList(d.donors);
  d.donorCount = d.donors.length;
  (d.sources || []).forEach(src => { if (src.donors) { src.donors = mergeDonorList(src.donors); src.donorCount = src.donors.length; } });
  return d;
}

async function loadDonors() {
  try {
    const res = await fetch('data/donors.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    lastDonors = mergeDonorAliases(await res.json());
  } catch (err) {
    console.error('Error cargando donadores:', err);
    lastDonors = null;
  }
  donorsLoaded = true;
  renderChampions();
  renderDonors();
}

function formatUSD(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2,
  }).format(n);
}

function renderDonors() {
  const table = document.getElementById('donors-table');
  if (!table) return;
  const msg = document.getElementById('donors-msg');
  const total = document.getElementById('donors-total');
  const src = document.getElementById('donors-src');
  if (!donorsLoaded) { msg.textContent = t('donors.loading'); return; }
  const d = lastDonors;
  if (!d || !Array.isArray(d.donors) || !d.donors.length) {
    table.hidden = true; total.hidden = true; src.hidden = true; msg.hidden = false;
    msg.textContent = t(d ? 'donors.empty' : 'donors.error');
    return;
  }
  const TOP = 10;
  document.getElementById('donors-body').innerHTML = d.donors.slice(0, TOP).map((x, i) =>
    `<tr class="${i < 3 ? 'rank-' + (i + 1) : ''}"><td>${i + 1}</td><td class="donor-name">${esc(x.name)}</td><td class="donor-amt">${esc(formatUSD(x.total))}</td></tr>`).join('');
  table.hidden = false; msg.hidden = true;
  total.textContent = t('donors.total', { amount: formatUSD(d.total), n: d.donorCount });
  total.hidden = false;
  const years = [...new Set((d.sources || []).map(s => String(s.startAt || '').slice(0, 4)).filter(Boolean))].sort().join(' · ');
  src.textContent = t('donors.src', { years });
  src.hidden = !years;
  document.getElementById('donors-thanks-sub').textContent = t('donors.thanksSub', { n: d.donorCount });
}

// ======= CONTADOR DE VISITAS =======
// Servicio externo gratuito y sin cookies (Abacus). Cuenta 1 visita por sesion
// del navegador: recargar o cambiar de pestaña no suma. En localhost solo lee.
const VISITS_API = 'https://abacus.jasoncameron.dev';
const VISITS_PATH = 'ditmancup-2027/visits';
let visitValue = null;

async function initVisitCounter() {
  if (!document.getElementById('visit-counter')) return;
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  let counted = false;
  try { counted = sessionStorage.getItem('dc-visit') === '1'; } catch (e) { /* sin storage */ }
  const action = (isLocal || counted) ? 'get' : 'hit';
  try {
    const res = await fetch(`${VISITS_API}/${action}/${VISITS_PATH}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    visitValue = Number((await res.json()).value);
    if (action === 'hit') { try { sessionStorage.setItem('dc-visit', '1'); } catch (e) { /* sin storage */ } }
    renderVisits();
  } catch (err) { /* si el servicio no responde, simplemente no se muestra */ }
}

function renderVisits() {
  const box = document.getElementById('visit-counter');
  if (!box || visitValue == null || isNaN(visitValue)) return;
  document.getElementById('visit-count').textContent = visitValue.toLocaleString(currentLang === 'es' ? 'es-AR' : 'en-US');
  box.hidden = false;
}

// ======= DATOS FALSOS / MOCK DATA =======
const MOCK_NAMES = [
  'ditman', 'kael', 'v1rus', 'Noh', 'requiem', 'SlyFox', 'mercase', 'Trece',
  'Ada_W', 'Krauser', 'luisdlv', 'saddler99', 'ashley', 'wesk3r', 'HUNK', 'Salazar',
  'chris_r', 'jillsandwich', 'nemesis', 'carlos', 'sherry', 'claire', 'birkin', 'annette',
  'leon_k', 'ganado', 'plaga', 'verdugo', 'delLago', 'elGigante', 'novistador', 'regenerador',
];

// Primeros N nombres = Top 8 directo (Grupo "0"), el resto se reparte en
// los 3 grupos de 8 (Grupo "1"/"2"/"3") con puntos falsos para el sembrado.
function mockGroupsRows() {
  const rows = [];
  let k = 0;
  for (let i = 0; i < TOURNAMENT_CONFIG.directQualifiers; i++) {
    rows.push({ Grupo: '0', Corredor: MOCK_NAMES[k % MOCK_NAMES.length] });
    k++;
  }
  for (let g = 1; g <= TOURNAMENT_CONFIG.numGroups; g++) {
    for (let i = 0; i < TOURNAMENT_CONFIG.groupSize; i++) {
      rows.push({ Grupo: String(g), Corredor: MOCK_NAMES[k % MOCK_NAMES.length], Pts: String(Math.floor(Math.random() * 9)) });
      k++;
    }
  }
  return rows;
}

// Ranking plano de las clasificatorias (los 32, por tiempo) — de aca salen
// los primeros 8 (directQualifiersFromData) y se arman los grupos con el
// resto. No tiene columna Grupo: eso lo define la hoja de Grupos aparte.
function mockStandingsRows() {
  return MOCK_NAMES.map((name, i) => ({
    [t('clas.col.pos')]: String(i + 1),
    [t('clas.col.runner')]: name,
    [t('clas.col.time')]: mockTime(),
  }));
}

function mockTime() {
  const m = 5 + Math.floor(Math.random() * 3);
  const s = Math.floor(Math.random() * 60);
  const ms = Math.floor(Math.random() * 1000);
  return `${m}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

// ======= CSV: fetch + parseo robusto / robust parsing =======
// Soporta: comas dentro de comillas, comillas escapadas (""), CRLF, BOM,
// líneas vacías y salto final. / Handles quoted commas, "" escapes, CRLF, BOM, blank lines.
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);   // BOM
  const rows = [];
  let row = [], field = '', inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function csvToObjects(text) {
  const rows = parseCSV(text).filter(r => r.some(c => c.trim() !== ''));  // sin filas vacías
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const o = {};
    headers.forEach((h, i) => { o[h] = (r[i] != null ? r[i] : '').trim(); });
    return o;
  });
}

async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Sheet HTTP ' + res.status);
  return csvToObjects(await res.text());
}

// ======= SIMULADOR DE FORMATO / FORMAT SIMULATOR =======
// Pestaña "Simulations": simula una propuesta de formato tipo Nations League.
// El Top 8 de las clasificatorias (por PB real) va directo a Octavos de Final
// y NO juega la fase de grupos. Los otros 24 corredores juegan 3 grupos de 8,
// con ascensos/descensos, 4 fechas, y clasifican los 8 mejores por puntaje —
// esos 8 completan el cuadro de Octavos junto al Top 8 directo (16 en total).
// Usa nombres y PBs reales de la comunidad, pero los resultados son al azar —
// sirve para entender el formato, no predice nada real.
const SIM_GROUP_SIZE = 8;
const SIM_NUM_GROUPS = 3;
const SIM_MAX_FECHAS = 4;
const SIM_MOVE_COUNT = 4; // cuantos suben/bajan por frontera
// Puntos por victoria segun el grupo donde se consiguio: ganarle a los
// mejores (Grupo 1) vale mas que ganarle a los mas lentos (Grupo 3)
// (Grupo 1 = 2 pts, Grupo 2 = 1 pt, Grupo 3 = 1 pt).
function simWinPoints(group) { return [2, 1, 1][group - 1]; }
// Bonus por derrota ajustada: si perdiste tu carrera por menos de 30s
// (estuvo pareja), sumas algo igual aunque hayas perdido — Grupo 1 = +1 pt,
// Grupo 2 = +0.5 pt, Grupo 3 = +0.5 pt.
const SIM_CLOSE_MARGIN = 30;
function simLossBonus(group, margin) {
  if (margin >= SIM_CLOSE_MARGIN) return 0;
  return [1, 0.5, 0.5][group - 1];
}
const SIM_SEED_ORDER = [1, 8, 4, 5, 2, 7, 3, 6]; // sembrado clásico de 8 cabezas de serie

const SIM_RUNNER_NAMES = [
  'JokerUY', 'Sawken', '4rcadan', 'Missing', 'seppp', 'Frit', 'Pochoide', 'OtakuXD',
  'TheNevs', 'Youcri', 'ChampT', 'MikeWavRR', 'MateoUsh27', 'Muh', 'Pixiesaki', 'MattGael',
  'Zudinn', 'Lu1u', 'luis_sera', 'manboo', 'novi_fan', 'aqbilghilman', 'abdou_mz', 'doradori_dolph',
  'VAL', 'Gui19', 'Razie', 'Nobu_22', 'MajorRichy', 'HannNrY', 'InfamousLol8', 'Matiuss',
];
// PBs reales, mismo orden que SIM_RUNNER_NAMES (formato H:MM:SS)
const SIM_RUNNER_PBS = [
  '1:21:04', '1:21:27', '1:21:31', '1:21:48', '1:21:48', '1:21:57', '1:22:00', '1:22:21',
  '1:23:05', '1:23:16', '1:23:41', '1:23:42', '1:23:43', '1:23:50', '1:24:10', '1:24:11',
  '1:24:19', '1:24:22', '1:24:30', '1:24:48', '1:24:52', '1:24:56', '1:24:59', '1:25:00',
  '1:25:03', '1:25:06', '1:25:19', '1:25:35', '1:25:40', '1:25:45', '1:25:53', '1:25:59',
];

function simParseTime(str) {
  const parts = str.split(':').map(Number);
  return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1];
}
function simFormatSeconds(total) {
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = Math.floor(total % 60);
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function simFormatRaceTime(total) {
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
  return `${h}:${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`;
}
function simFormatMargin(seconds) {
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m ${(seconds % 60).toFixed(1)}s`;
  return `${seconds.toFixed(2)}s`;
}
function simShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let simRunners = [];
let simFecha = 0;
let simLastRaces = [];
let simLastMoves = [];
let simBracketReady = false;
let simBracketSeeds = [];
let simBracketPool = [];
let simBracketAssignments = [];
let simBracketDrawIndex = 0;

function simInitRunners() {
  simRunners = SIM_RUNNER_NAMES.map((name, i) => ({
    id: i + 1,
    name,
    pbSeconds: simParseTime(SIM_RUNNER_PBS[i]),
    pbLabel: SIM_RUNNER_PBS[i],
    // top 8 por PB real: clasifican directo a Octavos, no juegan la fase de
    // grupos (group=0). El resto (24) forma 3 grupos de 8.
    group: i < 8 ? 0 : Math.floor((i - 8) / SIM_GROUP_SIZE) + 1,
    isTop8Seed: i < 8,
    lastResult: null,
    lastMove: null,
    history: [],
    wins: 0,
    points: 0,
    bestTimeEver: Infinity,
    raceTimes: [], // tiempo de cada carrera jugada, para el desempate de las 2 mejores
  }));
  simFecha = 0;
  simLastRaces = [];
  simLastMoves = [];
  simBracketReady = false;
  simWB = null;
}

function simGetGroup(g) { return simRunners.filter(r => r.group === g); }
function simTimeOf(r) { return r.lastResult ? r.lastResult.time : Infinity; }

// Simula una carrera BO1: cada uno corre cerca de su PB, con variación —
// nadie corre su mejor marca siempre. Devuelve el tiempo de cada uno para
// poder comparar a todo el grupo, no solo este cruce puntual.
function simRace(a, b) {
  const timeA = a.pbSeconds + Math.pow(Math.random(), 2) * (a.isTop8Seed ? 120 : 180);
  const timeB = b.pbSeconds + Math.pow(Math.random(), 2) * (b.isTop8Seed ? 120 : 180);
  const winner = timeA < timeB ? a : b;
  const loser = winner === a ? b : a;
  const margin = Number(Math.abs(timeA - timeB).toFixed(2));
  return { winner, loser, margin, timeA, timeB };
}

function simAdvanceFecha() {
  if (simFecha >= SIM_MAX_FECHAS) return;
  simFecha++;
  simLastRaces = [];
  simRunners.forEach(r => { r.lastMove = null; });

  for (let g = 1; g <= SIM_NUM_GROUPS; g++) {
    const members = simShuffle(simGetGroup(g));
    for (let i = 0; i < members.length; i += 2) {
      const a = members[i], b = members[i + 1];
      const { winner, margin, timeA, timeB } = simRace(a, b);
      a.lastResult = { opponent: b.name, won: a === winner, margin, time: timeA };
      b.lastResult = { opponent: a.name, won: b === winner, margin, time: timeB };
      if (a === winner) { a.wins++; a.points += simWinPoints(a.group); b.points += simLossBonus(b.group, margin); }
      else { b.wins++; b.points += simWinPoints(b.group); a.points += simLossBonus(a.group, margin); }
      a.history.push(a.lastResult.won ? 'W' : 'L');
      b.history.push(b.lastResult.won ? 'W' : 'L');
      a.bestTimeEver = Math.min(a.bestTimeEver, timeA);
      b.bestTimeEver = Math.min(b.bestTimeEver, timeB);
      a.raceTimes.push(timeA);
      b.raceTimes.push(timeB);
      simLastRaces.push({ group: g, a: a.name, b: b.name, winner: winner.name, margin, timeA, timeB });
    }
  }

  // En cada frontera (1-2, 2-3, 3-4): bajan los SIM_MOVE_COUNT peores tiempos
  // ENTRE QUIENES PERDIERON su carrera en el grupo de arriba, suben los
  // SIM_MOVE_COUNT mejores tiempos ENTRE QUIENES GANARON en el grupo de abajo.
  // Ganar tu carrera es condicion necesaria para subir; perderla lo es para bajar.
  simLastMoves = [];
  const relegate = {}, promote = {};
  for (let g = 1; g < SIM_NUM_GROUPS; g++) {
    const upperLosers = simGetGroup(g).filter(r => r.lastResult && !r.lastResult.won).sort((a, b) => b.lastResult.time - a.lastResult.time).slice(0, SIM_MOVE_COUNT);
    const lowerWinners = simGetGroup(g + 1).filter(r => r.lastResult && r.lastResult.won).sort((a, b) => a.lastResult.time - b.lastResult.time).slice(0, SIM_MOVE_COUNT);
    upperLosers.forEach(r => { relegate[r.id] = g + 1; });
    lowerWinners.forEach(r => { promote[r.id] = g; });
    for (let i = 0; i < SIM_MOVE_COUNT; i++) {
      simLastMoves.push({
        up: lowerWinners[i], down: upperLosers[i],
        timeUp: lowerWinners[i].lastResult.time, timeDown: upperLosers[i].lastResult.time,
        fromGroup: g + 1, toGroup: g, boundary: `${g}-${g + 1}`,
      });
    }
  }
  simRunners.forEach(r => {
    if (promote[r.id] !== undefined) { r.group = promote[r.id]; r.lastMove = 'up'; }
    else if (relegate[r.id] !== undefined) { r.group = relegate[r.id]; r.lastMove = 'down'; }
  });

  renderSimulator();
}

// Orden de una tabla de grupo por mejor tiempo absoluto: los que bajan entran
// arriba de todo (vienen a reforzar), los que suben entran abajo (todavía no
// demostraron nada acá), los que se quedan van en el medio por su tiempo.
function simSortGroup(members) {
  const byTime = (a, b) => simTimeOf(a) - simTimeOf(b);
  const stayers = members.filter(r => !r.lastMove).sort(byTime);
  const promotedIn = members.filter(r => r.lastMove === 'up').sort(byTime);
  const relegatedIn = members.filter(r => r.lastMove === 'down').sort(byTime);
  if (!stayers.length) return [...relegatedIn, ...promotedIn].sort(byTime);
  return [...relegatedIn, ...stayers, ...promotedIn];
}

// Promedio de las 2 mejores carreras (de las 4 jugadas) — se usa como
// desempate: entre dos corredores con los mismos puntos, gana quien haya
// corrido mas rapido en sus 2 mejores fechas, no solo su mejor marca suelta.
function simBestAvg2(r) {
  if (!r.raceTimes.length) return Infinity;
  const top2 = [...r.raceTimes].sort((a, b) => a - b).slice(0, 2);
  return top2.reduce((sum, t) => sum + t, 0) / top2.length;
}

// Orden: primero puntos acumulados (ponderados segun el grupo de cada
// victoria — ganar en Grupo 1 vale mas que ganar en Grupo 3), desempate
// por el promedio de las 2 mejores carreras. Se usa para clasificar a los
// 8 mejores de la fase de grupos (no importa en que grupo termines) y
// para sembrar su parte del bracket.
function simRankByPoints(members) {
  return [...members].sort((a, b) => b.points - a.points || simBestAvg2(a) - simBestAvg2(b));
}
function simGroupRunners() { return simRunners.filter(r => !r.isTop8Seed); } // los 24 que juegan grupos
function simDirectSeeds() { return simRunners.filter(r => r.isTop8Seed).sort((a, b) => a.pbSeconds - b.pbSeconds); } // top 8 por PB, directo a Octavos
function simGroupQualifiers() { return simRankByPoints(simGroupRunners()).slice(0, 8); } // los 8 mejores de la fase de grupos
function simQualifiers() { return [...simDirectSeeds(), ...simGroupQualifiers()]; } // 16 en total (8 directos + 8 de grupos)

function simFormatPoints(n) { return Number.isInteger(n) ? String(n) : n.toFixed(1); }

function simRenderHistory(r) {
  if (!r.history.length) return '—';
  return [...r.history].reverse().map(res => `<span class="${res === 'W' ? 'sim-res-w' : 'sim-res-l'}">${res}</span>`).join('');
}

function simStatusClass(r, qualifiedIds) {
  if (simFecha === 0) return '';
  return qualifiedIds.has(r.id) ? 'sim-row-q' : 'sim-row-e';
}

function simInitBracket() {
  const seeded = simDirectSeeds(); // top 8 por PB real, sembrado clasico
  const pool = simGroupQualifiers(); // 8 mejores de la fase de grupos, por sorteo
  simBracketSeeds = SIM_SEED_ORDER.map(seedNum => ({ runner: seeded[seedNum - 1], seedNum }));
  simBracketPool = simShuffle(pool);
  simBracketAssignments = new Array(8).fill(null);
  simBracketDrawIndex = 0;
  simBracketReady = true;
}
function simDrawNext() {
  if (!simBracketReady || simBracketDrawIndex >= 8) return;
  simBracketAssignments[simBracketDrawIndex] = simBracketPool[simBracketDrawIndex];
  simBracketDrawIndex++;
  simRenderBracket();
}
function simDrawAll() {
  if (!simBracketReady) return;
  while (simBracketDrawIndex < 8) { simBracketAssignments[simBracketDrawIndex] = simBracketPool[simBracketDrawIndex]; simBracketDrawIndex++; }
  simRenderBracket();
}
function simResetDraw() {
  if (!simBracketReady) return;
  simBracketPool = simShuffle(simGroupQualifiers());
  simBracketAssignments = new Array(8).fill(null);
  simBracketDrawIndex = 0;
  simRenderBracket();
}

function simRenderBracket() {
  const isFinal = simFecha === SIM_MAX_FECHAS;
  const locked = document.getElementById('sim-bracket-locked');
  const explainer = document.getElementById('sim-bracket-explainer');
  const controls = document.getElementById('sim-bracket-controls');
  const sidesEl = document.getElementById('sim-bracket-sides');
  if (!locked || !sidesEl) return;

  if (!isFinal) {
    locked.hidden = false; explainer.hidden = true; controls.hidden = true;
    sidesEl.innerHTML = '';
    simBracketReady = false;
    simRenderWB();
    return;
  }
  if (!simBracketReady) simInitBracket();
  locked.hidden = true; explainer.hidden = false; controls.hidden = false;

  const sideLabels = [t('sim.sideA'), t('sim.sideB')];
  let html = '';
  for (let side = 0; side < 2; side++) {
    html += `<div class="sim-bracket-side"><h4>${esc(sideLabels[side])}</h4>`;
    for (let i = 0; i < 4; i++) {
      const idx = side * 4 + i;
      const seed = simBracketSeeds[idx];
      const opp = simBracketAssignments[idx];
      html += `<div class="sim-match-card">
        <div class="sim-match-seed">${nameWithFlag(seed.runner.name)}<span class="sim-seed-tag">${esc(t('sim.seedTag', { n: seed.seedNum }))}</span></div>
        <div class="sim-match-vs">vs</div>
        <div class="sim-match-slot${opp ? '' : ' sim-pending'}">${opp ? nameWithFlag(opp.name) : esc(t('sim.pending'))}</div>
      </div>`;
    }
    html += `</div>`;
  }
  sidesEl.innerHTML = html;

  const done = simBracketDrawIndex >= 8;
  const nextBtn = document.getElementById('sim-btn-draw-next');
  const allBtn = document.getElementById('sim-btn-draw-all');
  if (nextBtn) nextBtn.disabled = done;
  if (allBtn) allBtn.disabled = done;
  simRenderWB();
}

// ======= BRACKET JUGABLE: doble eliminacion completa =======
// Despues del sorteo de Octavos se juega todo el cuadro con carreras BO1 (mismo
// modelo que la fase de grupos): cuadro de ganadores, cuadro de perdedores y
// Gran Final (una sola partida, sin "reset"). Se usa el mismo modelo que el
// Bracket real (buildDoubleElim) y las rondas se juegan en este orden:
// R16, LR1, Cuartos, LR2, LR3, Semis, LR4, LR5, Final de ganadores, LR6, Gran Final.
let simWB = null;
const SIM_WB_STEPS = 11;

function simInitWB() {
  const model = buildDoubleElim(16);
  const r16 = simBracketSeeds.map((s, idx) => ({ a: s.runner, b: simBracketAssignments[idx], seedA: s.seedNum }));
  const { wb, lb, gf } = model;
  simWB = { model, r16, res: {}, step: 0, steps: [wb[0], lb[0], wb[1], lb[1], lb[2], wb[2], lb[3], lb[4], wb[3], lb[5], [gf]] };
}

function simWBResolve(ref) {
  const r = simWB.res[ref.w || ref.l];
  return r ? (ref.w ? r.winner : r.loser) : null;
}
function simWBPlayers(m) {
  if (m.kind === 'w' && m.round === 0) return [simWB.r16[m.idx].a, simWB.r16[m.idx].b];
  return m.refs.map(simWBResolve);
}
function simWBPlayStep() {
  if (!simWB || simWB.step >= SIM_WB_STEPS) return;
  simWB.steps[simWB.step].forEach(m => {
    const [a, b] = simWBPlayers(m);
    const race = simRace(a, b);
    simWB.res[m.n] = { winner: race.winner, loser: race.winner === a ? b : a, tA: race.timeA, tB: race.timeB };
  });
  simWB.step++;
}

function simRenderWB() {
  const host = document.getElementById('sim-wb');
  if (!host) return;
  const drawn = simBracketReady && simBracketDrawIndex >= 8;
  if (!drawn) { simWB = null; simWBLinks = []; host.hidden = true; host.innerHTML = ''; return; }
  if (!simWB) simInitWB();
  host.hidden = false;

  const { model, res } = simWB;
  const lr = n => t('bracket.lr', { n });
  const wbTitles = [roundName(16), roundName(8), roundName(4), t('bracket.round.winnersFinal')];
  const lbTitle = r => r === 5 ? t('bracket.losersFinal') : r === 4 ? t('bracket.losersSemi') : lr(r + 1);
  const stepTitles = [wbTitles[0], lr(1), wbTitles[1], lr(2), lr(3), wbTitles[2], lr(4), t('bracket.losersSemi'), wbTitles[3], t('bracket.losersFinal'), t('bracket.grandFinal')];
  const done = simWB.step >= SIM_WB_STEPS;

  const slot = (m, i) => {
    const p = simWBPlayers(m)[i];
    if (!p) {
      const ref = m.refs[i];
      return `<div class="slot is-ref"><span class="slot-name">${esc(t(ref.w ? 'bracket.winnerOf' : 'bracket.loserOf', { n: ref.w || ref.l }))}</span></div>`;
    }
    const r = res[m.n];
    const cls = r ? (r.winner === p ? ' is-win' : ' is-lose') : '';
    const time = r ? (i === 0 ? r.tA : r.tB) : null;
    const seed = m.kind === 'w' && m.round === 0 && i === 0 ? `<span class="slot-seed">${simWB.r16[m.idx].seedA}</span>` : '';
    return `<div class="slot${cls}">${seed}<span class="slot-name">${nameWithFlag(p.name)}</span>${time != null ? `<span class="slot-time">${esc(simFormatRaceTime(time))}</span>` : ''}</div>`;
  };
  const card = m => `<div class="match is-${m.kind}" data-mid="${m.id}"><span class="match-num">M${m.n}</span>${slot(m, 0)}${slot(m, 1)}</div>`;
  const round = (title, ms) => `<div class="round"><div class="round-title">${esc(title)}</div><div class="round-inner">${ms.map(card).join('')}</div></div>`;

  simWBLinks = model.links;
  const wbHtml = model.wb.map((ms, r) => round(wbTitles[r], ms)).join('');
  const lbHtml = model.lb.map((ms, r) => round(lbTitle(r), ms)).join('');
  const gfRes = res[model.gf.n];
  const wbFinalRes = res[model.wb[3][0].n];
  const champ = gfRes ? gfRes.winner : null;
  const wbChamp = !champ && wbFinalRes ? wbFinalRes.winner : null;

  host.innerHTML = `
    <h3 class="sim-wb-title">${esc(t('sim.wbTitle'))}</h3>
    <p class="section-note">${esc(t('sim.wbNote'))}</p>
    <div class="sim-controls">
      <button type="button" class="btn-sim btn-sim-primary" id="sim-btn-wb-next"${done ? ' disabled' : ''}>${esc(done ? t('sim.wbDone') : t('sim.btnWbNext', { round: stepTitles[simWB.step] }))}</button>
      <button type="button" class="btn-sim" id="sim-btn-wb-wf"${simWB.step >= 9 ? ' disabled' : ''}>${esc(t('sim.btnWbAll'))}</button>
      <button type="button" class="btn-sim" id="sim-btn-wb-all"${done ? ' disabled' : ''}>${esc(t('sim.btnWbEverything'))}</button>
      <button type="button" class="btn-sim btn-sim-ghost" id="sim-btn-wb-reset">${esc(t('sim.btnWbReset'))}</button>
    </div>
    <div class="bracket-scroll"><div class="bracket-canvas" id="sim-wb-canvas">
      <svg class="bracket-lines" aria-hidden="true"></svg>
      <div class="bracket-stack">
        <section class="bracket-section is-winners"><h3 class="bracket-heading">${esc(t('bracket.winners'))}</h3><div class="bracket-rounds">${wbHtml}</div></section>
        <section class="bracket-section is-losers"><h3 class="bracket-heading">${esc(t('bracket.losers'))}</h3><div class="bracket-rounds">${lbHtml}</div></section>
      </div>
      <div class="bracket-gf">${round(t('bracket.grandFinal'), [model.gf])}</div>
    </div></div>
    ${champ ? `<p class="sim-wb-champ"><span>${esc(t('sim.champion'))}</span><strong>${nameWithFlag(champ.name)}</strong></p>`
      : wbChamp ? `<p class="sim-wb-champ"><span>${esc(t('sim.wbChamp'))}</span><strong>${nameWithFlag(wbChamp.name)}</strong></p>` : ''}`;

  const on = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
  on('sim-btn-wb-next', () => { simWBPlayStep(); simRenderWB(); });
  on('sim-btn-wb-wf', () => { while (simWB.step < 9) simWBPlayStep(); simRenderWB(); });
  on('sim-btn-wb-all', () => { while (simWB.step < SIM_WB_STEPS) simWBPlayStep(); simRenderWB(); });
  on('sim-btn-wb-reset', () => { simInitWB(); simRenderWB(); });
  drawSimWBLines();
  requestAnimationFrame(drawSimWBLines);
}

function renderSimulator() {
  const panel = document.getElementById('sim-groups');
  if (!panel) return; // la sección todavía no existe en el DOM

  const isFinal = simFecha === SIM_MAX_FECHAS;
  setText('sim-fecha-counter', simFecha);
  const legend = document.getElementById('sim-legend');
  if (legend) legend.hidden = simFecha < 1;

  const top16 = simQualifiers();
  const qualifiedIds = new Set(top16.map(r => r.id));
  const qualified = top16.map(r => r.isTop8Seed
    ? `<strong>${nameWithFlag(r.name)}</strong> (${t('sim.directTag')} · ${esc(r.pbLabel)})`
    : `<strong>${nameWithFlag(r.name)}</strong> (${simFormatPoints(r.points)} pts · ${r.wins}/${simFecha} · G${r.group})`);
  setText('sim-qualify-title', t(isFinal ? 'sim.qualifyTitleFinal' : 'sim.qualifyTitleLive'));
  const namesEl = document.getElementById('sim-qualify-names');
  if (namesEl) namesEl.innerHTML = qualified.join(', ');

  const labels = { 1: t('sim.group1'), 2: t('sim.group2'), 3: t('sim.group3') };

  panel.innerHTML = '';
  for (let g = 1; g <= SIM_NUM_GROUPS; g++) {
    const members = simSortGroup(simGetGroup(g));
    const card = document.createElement('div');
    card.className = 'group-card';
    card.innerHTML = `
      <h3>${esc(labels[g])}</h3>
      <span class="group-tag">${esc(t('sim.runnersCount', { n: members.length }))}</span>
      <div class="table-scroll"><table>
        <thead><tr><th></th><th>${esc(t('sim.thRunner'))}</th><th>${esc(t('sim.thPB'))}</th><th>${esc(t('sim.thPts'))}</th><th>${esc(t('sim.thBest'))}</th><th>${esc(t('sim.thHistory'))}</th></tr></thead>
        <tbody>
          ${members.map((r, i) => `
            <tr class="${simStatusClass(r, qualifiedIds)}">
              <td class="sim-rank">${i + 1}</td>
              <td>${nameWithFlag(r.name)}${r.lastMove === 'up' ? ' <span class="sim-move-up">▲</span>' : ''}${r.lastMove === 'down' ? ' <span class="sim-move-down">▼</span>' : ''}</td>
              <td class="sim-pb">${esc(r.pbLabel)}</td>
              <td class="sim-pts">${simFormatPoints(r.points)}</td>
              <td class="sim-best">${Number.isFinite(r.bestTimeEver) ? esc(simFormatRaceTime(r.bestTimeEver)) : '—'}</td>
              <td class="sim-hist">${simRenderHistory(r)}</td>
            </tr>`).join('')}
        </tbody>
      </table></div>`;
    panel.appendChild(card);
  }

  setText('sim-log-title', simFecha === 0 ? t('sim.logTitleEmpty') : t(isFinal ? 'sim.logTitleFinal' : 'sim.logTitle', { n: simFecha }));

  const racesEl = document.getElementById('sim-log-races');
  if (racesEl) {
    racesEl.innerHTML = '';
    for (let g = 1; g <= SIM_NUM_GROUPS; g++) {
      const col = document.createElement('div');
      const races = simLastRaces.filter(r => r.group === g);
      col.innerHTML = `<div class="sim-log-group-label">${esc(labels[g])}</div>` +
        races.map(r => `<div class="sim-log-line">${t('sim.raceResult', {
          a: esc(r.a), timeA: simFormatRaceTime(r.timeA), b: esc(r.b), timeB: simFormatRaceTime(r.timeB),
          winner: esc(r.winner), margin: simFormatMargin(r.margin),
        })}</div>`).join('');
      racesEl.appendChild(col);
    }
  }

  const movesEl = document.getElementById('sim-log-moves');
  if (movesEl) {
    if (simLastMoves.length) {
      const byBoundary = {};
      simLastMoves.forEach(m => { (byBoundary[m.boundary] = byBoundary[m.boundary] || []).push(m); });
      movesEl.innerHTML = Object.keys(byBoundary).sort().map(b => {
        const [ga, gb] = b.split('-');
        return `<div class="sim-log-group-label">${esc(t('sim.boundaryLabel', { a: ga, b: gb }))}</div>` +
          byBoundary[b].map(m => `
            <div class="sim-log-line">${t('sim.moveUp', { name: esc(m.up.name), group: m.toGroup, time: simFormatSeconds(m.timeUp) })}</div>
            <div class="sim-log-line">${t('sim.moveDown', { name: esc(m.down.name), group: m.fromGroup, time: simFormatSeconds(m.timeDown) })}</div>`).join('');
      }).join('');
    } else {
      movesEl.innerHTML = '';
    }
  }

  const done = simFecha >= SIM_MAX_FECHAS;
  const nextBtn = document.getElementById('sim-btn-next');
  const next5Btn = document.getElementById('sim-btn-next5');
  if (nextBtn) { nextBtn.disabled = done; nextBtn.textContent = done ? t('sim.doneLabel') : t('sim.btnNext'); }
  if (next5Btn) next5Btn.disabled = done;

  simRenderBracket();
  simRenderRanking(qualifiedIds);
  simRenderDirect();
}

// Lista fija con el Top 8 de las clasificatorias (por PB real): van directo
// a Octavos, no juegan la fase de grupos. No cambia con la simulacion.
function simRenderDirect() {
  const el = document.getElementById('sim-direct-list');
  if (!el) return;
  const seeds = simDirectSeeds();
  el.innerHTML = `
    <div class="sim-groups"><div class="group-card">
      <div class="table-scroll"><table>
        <thead><tr><th></th><th>${esc(t('sim.thRunner'))}</th><th>${esc(t('sim.thPB'))}</th></tr></thead>
        <tbody>
          ${seeds.map((r, i) => `
            <tr>
              <td class="sim-rank">${i + 1}</td>
              <td>${nameWithFlag(r.name)}</td>
              <td class="sim-pb">${esc(r.pbLabel)}</td>
            </tr>`).join('')}
        </tbody>
      </table></div>
    </div></div>`;
}

// Tabla unica con los 24 corredores de la fase de grupos ordenados solo por
// puntaje (sin las 3 tablas por grupo ni sus criterios de orden por
// tiempo/historial) — para ver de un vistazo, claro, quien clasifica y quien no.
function simRenderRanking(qualifiedIds) {
  const el = document.getElementById('sim-ranking-table');
  if (!el) return;
  const ranked = simRankByPoints(simGroupRunners());
  el.innerHTML = `
    <div class="table-scroll"><table>
      <thead><tr><th></th><th>${esc(t('sim.thRunner'))}</th><th>${esc(t('sim.thPB'))}</th><th>${esc(t('sim.thPts'))}</th><th>${esc(t('sim.thBestAvg'))}</th><th>${esc(t('sim.thHistory'))}</th></tr></thead>
      <tbody>
        ${ranked.map((r, i) => `
          <tr class="${simStatusClass(r, qualifiedIds)}">
            <td class="sim-rank">${i + 1}</td>
            <td>${nameWithFlag(r.name)}</td>
            <td class="sim-pb">${esc(r.pbLabel)}</td>
            <td class="sim-pts">${simFormatPoints(r.points)}</td>
            <td class="sim-best">${Number.isFinite(simBestAvg2(r)) ? esc(simFormatRaceTime(simBestAvg2(r))) : '—'}</td>
            <td class="sim-hist">${simRenderHistory(r)}</td>
          </tr>`).join('')}
      </tbody>
    </table></div>`;
}

function initSimulator() {
  if (!document.getElementById('sim-groups')) return;
  simInitRunners();

  const on = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
  on('sim-btn-next', simAdvanceFecha);
  on('sim-btn-next5', () => { while (simFecha < SIM_MAX_FECHAS) simAdvanceFecha(); });
  on('sim-btn-reset', () => { simInitRunners(); renderSimulator(); });
  on('sim-btn-draw-next', simDrawNext);
  on('sim-btn-draw-all', simDrawAll);
  on('sim-btn-draw-reset', simResetDraw);

  renderSimulator();
}

// ======= UTILIDADES / UTILITIES =======
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

// Tarjetas de la bienvenida del Home: llevan directo a cada pestaña
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = document.querySelector(`.tab-btn[data-tab="${btn.dataset.go}"]`);
      if (tab) { tab.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
  });
});
