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
  derekt21288: 'GB-SCT',
  majorrichy: 'US',
  caciottafresca: 'IT',

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
  'luis_sera', 'joydurnyup', 'M4tiuss_', 'orchlon', 'droprecks', 'spicee', 'thecarpenter', 'androschka02', 'vynzsaki', 'yayostrife', 'nanonsbz', 'alantecnologiaymas', 'savitrue',
];

// Runners que streamean en YouTube. No hay forma sin API key de saber si están
// en vivo, así que el card lleva a youtube.com/.../live (YouTube redirige al
// stream si están transmitiendo).
const YOUTUBE_LIVE_CHANNELS = [
  { name: 'seppp', url: 'https://www.youtube.com/@sepppx/live', tiktok: 'seppvlr', noMark: true },
  { name: 'Bang Gori', url: 'https://www.youtube.com/@banggori2.0/live', tiktok: 'bang_gori2.0', noMark: true },
  { name: 'nyr9468', url: 'https://www.youtube.com/@nyr9468/live' },
  { name: 'Fedo_Ras', url: 'https://www.youtube.com/@Fedo_Ras/live' },
  { name: 'NETJU', url: 'https://www.youtube.com/@junetkhairulamri9336/live' },
  { name: 'aqbilghilman', url: 'https://www.youtube.com/@aqbilghilman30/live' },
  { name: 'Mrchampppt', url: 'https://www.youtube.com/@mrchampppt/live', tiktok: 'mrchampppt' },
  { name: 'Zudinnn', id: 'UCkX2rtFOeywknZ0ibu-ajWA', tiktok: 'zudinnnnvls' },
  { name: 'VAL', url: 'https://www.youtube.com/@valyorleza/live', tiktok: 'valyorleza' },
  { name: 'HannNrY', url: 'https://www.youtube.com/@HannNrY/live', tiktok: 'layhan301' },
  { name: 'Orchlon', url: 'https://www.youtube.com/@OrchlonSR/live', twitch: 'orchlon' },   // multistream: su tarjeta es la de Twitch, con boton de YouTube
  { name: 'JokerUY', url: 'https://www.youtube.com/@JokerUY/live', twitch: 'jokeruy' },
  { name: 'ryllmen', url: 'https://www.youtube.com/@ryllmen/live', tiktok: 'ryllmen' },   // Beryl
  { name: 'Muh01', url: 'https://www.youtube.com/results?search_query=Muh01+resident+evil+4' }, // handle sin confirmar
];

// Runners que streamean en Kick. Kick no se puede consultar desde el navegador: el estado
// (en vivo, espectadores, juego) lo arma scripts/update-live-status.js en GitHub Actions.
const KICK_LIVE_CHANNELS = ['chacoide'];

// Runners que streamean SOLO en TikTok (sin @); los que tambien estan en YouTube llevan `tiktok: 'usuario'`
// en YOUTUBE_LIVE_CHANNELS y su boton sale en la misma tarjeta. TikTok bloquea las consultas automaticas (anti-bots),
// asi que no se detecta si estan en vivo: la tarjeta lleva directo a @usuario/live.
// Cada uno es 'usuario' o { tiktok: 'usuario', name: 'Como se muestra' }.
const TIKTOK_LIVE_CHANNELS = [];
const ttEntry = e => typeof e === 'string' ? { tiktok: e, name: e } : { tiktok: e.tiktok, name: e.name || e.tiktok };

// Runners de Twitch que tambien streamean en TikTok: { 'canal de twitch en minusculas': 'usuario de tiktok' }.
// Su boton de TikTok sale en la misma tarjeta, igual que en YOUTUBE_LIVE_CHANNELS.
const TWITCH_TIKTOK = { 'ezequiel_kazama': 'ezequiel._.kazama', 'gabrielsinmarr': 'gabrielsinmar' };

// ======= TEXTOS BILINGÜES / BILINGUAL STRINGS =======
const I18N = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.home': 'Ir al inicio',
    'nav.sorteo': 'Calendario',
    'nav.torneo': 'Torneo',
    'nav.jugar': 'Jugar',
    'nav.comunidad': 'Comunidad',
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

    'facts.runners': 'corredores',
    'facts.groups': 'grupos',
    'facts.qualify': 'clasifican directo',

    'trailer.title': 'Ditman Cup 2027: video de anuncio',
    'trailer.yt': 'Ver en YouTube',
    'hero.emblemAlt': 'Emblema de la Ditman Cup 2027: el trofeo dorado dentro de un aro',
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
    'sorteo.r2.t': 'Un sorteo nuevo en vivo antes de cada ronda, cuando los resultados anteriores ya movieron a los corredores entre grupos.',
    'sorteo.r3.l': 'Donde',
    'sorteo.r3.t': 'En vivo por twitch.tv/ditmancup. Los cruces aparecen abajo con dia y hora.',
    'sorteo.r4.l': 'Top 8',
    'sorteo.r4.t': 'Van directo a Octavos de Final: no juegan grupos, asi que no se sortean.',
    'sched.title': 'Calendario',
    'sched.round': 'Ronda {n}',
    'sched.dateTbd': 'Fecha a confirmar',
    'sched.note1': 'Los grupos salen del ranking de clasificatorias.',
    'sched.noteN': 'Los grupos se arman con los resultados de la ronda anterior.',
    'sched.vs': 'vs',
    'sched.tzNote': 'Horarios en tu zona horaria ({tz}).',
    'donors.title': 'Top donadores',
    'donors.colName': 'Donador',
    'donors.colAmount': 'Donado',
    'donors.loading': 'Cargando donadores…',
    'donors.empty': 'Todavia no hay donadores.',
    'donors.error': 'No se pudo cargar la lista de donadores.',
    'donors.total': '{amount} recaudados · {n} donadores',
    'donors.totalOne': '{amount} recaudados · 1 donador',
    'donors.thisTitle': 'Este torneo · Ditman Cup {year}',
    'donors.allTimeTitle': 'Top histórico',
    'donors.curEmpty': 'Todavía no hay donaciones para este torneo. ¡Sé el primero!',
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
    'group.stageTitle': '24 corredores · 3 grupos de 8',
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
    'bracket.grandFinalReset': 'Gran Final (revancha)',
    'sim.resetNote': 'Revancha: el campeon del cuadro de perdedores gano la Gran Final y el de ganadores todavia no perdio dos veces. Se juega otra Gran Final.',
    'bracket.round.winnersFinal': 'Final de ganadores',
    'bracket.lr': 'Ronda de perdedores {n}',
    'bracket.losersSemi': 'Semifinal de perdedores',
    'bracket.losersFinal': 'Final de perdedores',
    'bracket.winnerOf': 'Ganador M{n}',
    'bracket.loserOf': 'Perdedor M{n}',

    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Corredor',
    'clas.col.group': 'Grupo',
    'clas.col.time': 'Mejor tiempo',
    'clas.col.pts': 'Pts',

    'don.title': 'Donaciones',
    'don.body': 'La Ditman Cup se sostiene gracias a la comunidad. Si queres colaborar con los premios y los gastos del torneo, podes hacerlo aca:',
    'don.btn': 'Donar',
    'don.pool.title': 'Bolsa de premios y gastos del torneo',
    'don.me.title': 'Apoyame a mi',
    'don.me.body': 'Esto es totalmente opcional, pero si te gusta la pagina y queres apoyarme directamente, se aprecia un monton. Gracias por ser parte de esta comunidad!',
    'don.me.btn': 'Donar a JokerUY',

    'org.title': 'Organizacion y staff',
    'org.tier.organizers': 'Organizadores',
    'org.tier.mods': 'Moderadores de SRC',
    'org.tier.helpers': 'Helpers y casters',
    'org.tier.design': 'Arte y diseño',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderador',
    'org.role.helper': 'Ayudante',
    'org.role.helperCaster': 'Ayudante / Comentarista',
    'org.role.artDesign': 'Arte y diseño',
    'org.role.artDesignWeb': 'Arte y diseño, Diseñador web',

    'link.discord': 'Discord',
    'link.rules': 'Documento',
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
    'champions.prize': 'Bolsa de premios',
    'champions.trophyTitle': 'El trofeo',
    'champions.trophyPending': 'El trofeo oficial de la Ditman Cup 2027.',
    'champions.viewData': 'Ver todos los datos',
    'champions.modalHint': 'Datos originales de la planilla del torneo.',

    'clips.title': 'Mejores clips',
    'clips.intro': 'Momentos destacados de ediciones y torneos anteriores.',
    'clips.empty': 'Todavia no hay clips cargados. ¿Tenes uno? Pasalo por Discord.',

    'live.title': 'Corredores de RE4 en vivo',
    'live.intro': 'Canales de la comunidad que estan corriendo o haciendo glitch hunting en Resident Evil 4 ahora mismo.',
    'live.on': 'EN VIVO',
    'live.off': 'Desconectado',
    'live.none': 'Ningun canal de la lista esta jugando Resident Evil 4 en este momento.',
    'live.otherGame': 'En vivo · otro juego',
    'live.play': 'Reproducir el stream de',
    'live.watch': 'Ver en Twitch',
    'live.watchYt': 'Ver en YouTube',
    'live.watchKick': 'Ver en Kick',
    'live.watchTt': 'Ver en TikTok',
    'live.ttNote': 'TikTok no permite detectar los vivos automaticamente: los que transmiten por TikTok se marcan solos aca, y solo cuando juegan Resident Evil 4.',
    'live.ttLogin': 'Entrar con Discord',
    'live.ttPick': 'Tu TikTok',
    'live.ttGo': 'Estoy en vivo en TikTok',
    'live.ttMine': 'Marcado en vivo como @{name} hasta las {time}',
    'live.ttEnd': 'Ya termine',
    'live.ttBusy': 'Ese TikTok ya lo eligio otra persona. Si es tuyo, avisale a Joker.',
    'live.ttYours': 'Tu TikTok: @{name}',
    'live.ttClaim': 'Elegir este TikTok',
    'live.ttLockNote': 'Elegi tu TikTok. Mientras lo tengas, nadie mas puede usarlo. Lo podes soltar cuando quieras.',
    'live.ttConfirm': 'Elegir @{name}? Nadie mas podra usarlo hasta que lo sueltes.',
    'live.ttRelease': 'Soltar mi TikTok',
    'live.ttClaimed': 'TikToks ya elegidos. Si alguno no es de quien lo eligio, avisale a Joker:',
    'live.ttBy': 'elegido por {name}',
    'live.ttErr': 'No se pudo guardar. Proba de nuevo.',
    'nav.predictions': 'Predicciones',
    'pred.title': 'Predicciones',
    'pred.intro': 'La penca de la Ditman Cup: pronosticá el ganador de cada partida y, si te animás, la diferencia de tiempo. Sumá puntos y subí en el ranking.',
    'pred.sub.picks': 'Mis pronósticos',
    'pred.sub.board': 'Ranking',
    'pred.sub.rules': 'Reglas',
    'pred.login': 'Entrar con Discord',
    'pred.logout': 'Salir',
    'pred.hello': 'Jugando como {name}',
    'pred.needLogin': 'Entrá con Discord para guardar tus pronósticos y aparecer en el ranking.',
    'pred.local': 'Modo local: tus pronósticos se guardan solo en este navegador. El ranking compartido todavía no está conectado.',
    'pred.myPts': 'puntos',
    'pred.myHits': 'aciertos',
    'pred.myRank': 'en el ranking',
    'pred.noMatches': 'Las partidas aparecen acá apenas se anuncie el calendario.',
    'pred.timeTbd': 'Horario a definir',
    'pred.underdog': 'Sorpresa',
    'pred.underdogTip': 'Peor puesto en la clasificatoria: si gana, vale más',
    'pred.diffLabel': 'Diferencia de tiempo (opcional)',
    'pred.saving': 'Guardando…',
    'pred.saved': 'Guardado ✓',
    'pred.saveError': 'No se pudo guardar. Probá de nuevo.',
    'pred.closed': 'Cerrada',
    'pred.noPick': 'Sin pronóstico',
    'pred.yourPick': 'Tu pronóstico: {name}',
    'pred.gap': 'diferencia {d}',
    'pred.pts': '{n} pts',
    'pred.kind.diff': 'ganador + diferencia',
    'pred.kind.underdog': 'ganó la sorpresa',
    'pred.kind.winner': 'ganador',
    'pred.kind.miss': 'fallaste',
    'pred.board.player': 'Jugador',
    'pred.board.hits': 'Aciertos',
    'pred.board.pts': 'Pts',
    'pred.board.loading': 'Cargando el ranking…',
    'pred.board.error': 'No se pudo cargar el ranking. Probá de nuevo en un rato.',
    'pred.board.empty': 'Todavía no hay puntos. El ranking se llena cuando se cargan los primeros resultados.',
    'pred.board.local': 'El ranking compartido todavía no está conectado.',
    'pred.rules.1': 'Elegí el ganador de cada partida antes de que empiece. Podés cambiar tu elección hasta que arranque la carrera.',
    'pred.rules.2': 'Acertás solo el ganador: {n} pts.',
    'pred.rules.3': 'Acertás el ganador y era la sorpresa (el corredor con peor puesto en la clasificatoria): {n} pts.',
    'pred.rules.4': 'Acertás el ganador y además la diferencia de tiempo (la carrera termina con una diferencia de hasta {s} segundos más o menos de la que pusiste): {n} pts.',
    'pred.rules.5': 'El máximo por partida es {n} pts y los puntos no se suman entre sí. La diferencia de tiempo es opcional.',
    'nav.wager': 'Merchant\'s Wager',
    'wg.title': 'Merchant\'s Wager',
    'wg.intro': 'Apostá tus Pesetas (PTAS) a las partidas, cobrá el bono de cada día y gastalas en la tienda del Mercader.',
    'wg.soon': 'El Mercader todavía no abrió su tienda. Volvé pronto.',
    'wg.inactive': 'Solo lo ves vos (admin): todavía no está activo para el resto.',
    'wg.needLogin': 'Entrá con Discord para jugar y juntar PTAS.',
    'wg.daily': 'Cobrar {n} PTAS de hoy',
    'wg.dailyDone': 'Ya cobraste hoy',
    'wg.sound': 'Sonido y música',
    'wg.item.discord-role.name': 'Rol de Discord',
    'wg.item.discord-role.desc': 'Rol exclusivo en el servidor de Discord.',
    'wg.item.twitch-vip.name': 'VIP en Twitch',
    'wg.item.twitch-vip.desc': 'VIP en el canal de Twitch.',
    'wg.dailySoon': 'Bono diario: desde que empiece el torneo',
    'wg.sub.bets': 'Apuestas',
    'wg.sub.mine': 'Mis apuestas',
    'wg.sub.shop': 'Tienda',
    'wg.sub.board': 'Ranking',
    'wg.sub.rules': 'Reglas',
    'wg.sub.admin': 'Admin',
    'wg.noMarkets': 'Todavía no hay partidas para apostar. Aparecen cuando se anuncia el calendario.',
    'wg.noBets': 'Todavía no apostaste en ninguna partida.',
    'wg.odds': 'x{n}',
    'wg.stake': 'PTAS',
    'wg.all': 'Todo',
    'wg.win': 'Ganarías {n} PTAS',
    'wg.pickFirst': 'Elegí un corredor y cuánto apostar',
    'wg.bet': 'Apostar',
    'wg.yourBet': 'Apostaste {n} PTAS a {name} (x{odds})',
    'wg.status.open': 'En juego',
    'wg.status.won': 'Ganada: +{n} PTAS',
    'wg.status.lost': 'Perdida',
    'wg.status.void': 'Anulada: te devolvimos las PTAS',
    'wg.closed': 'Cerrada: la partida ya empezó',
    'wg.ended': 'Partida terminada',
    'wg.shop.empty': 'La tienda está vacía por ahora.',
    'wg.shop.buy': 'Comprar · {n} PTAS',
    'wg.shop.owned': 'Ya es tuyo',
    'wg.shop.pending': 'Comprado: lo entregamos pronto',
    'wg.shop.delivered': 'Entregado',
    'wg.shop.confirm': '¿Comprar "{name}" por {n} PTAS?',
    'wg.shop.kind.badge': 'Badge de la página',
    'wg.shop.kind.discord_role': 'Rol de Discord',
    'wg.shop.kind.twitch_vip': 'VIP de Twitch',
    'wg.rules.1': 'Desde que empiece el torneo podés cobrar {n} PTAS por día (una vez por día, hora de Uruguay). Si no cobrás, no se acumula.',
    'wg.rules.2': 'En cada partida elegís un corredor y cuántas PTAS apostar (mínimo {m}). Se descuentan en el momento y solo podés apostar una vez por partida, antes de que empiece.',
    'wg.rules.3': 'La cuota sale de los tiempos de clasificatoria: cuanto más rápido fue un corredor, más probable es que gane y menos paga; el sorpresa paga más. La cuota que ves al apostar queda fija.',
    'wg.rules.4': 'Si acertás, recibís lo apostado multiplicado por la cuota. Si fallás, perdés lo apostado. Si una partida se anula, se devuelve todo.',
    'wg.rules.5': 'Con las PTAS comprás en la tienda: badges para tu nombre, un rol en el Discord o el VIP de Twitch. Los roles y el VIP los entrega Joker a mano.',
    'wg.rules.6': 'Las PTAS son solo de juego: no se compran, no se cambian por dinero ni se pueden pasar a otra persona. Una cuenta de Discord, una billetera.',
    'wg.err.daily_off': 'El bono diario todavía no está activo: arranca con el torneo.', 'wg.err.funds': 'No te alcanzan las PTAS.',
    'wg.err.closed': 'Esa partida ya está cerrada.',
    'wg.err.already_bet': 'Ya apostaste en esa partida.',
    'wg.err.min_bet': 'La apuesta mínima es {n} PTAS.',
    'wg.err.inactive': 'Todavía no está activo.',
    'wg.err.already_claimed': 'Ya cobraste hoy: volvé mañana.',
    'wg.err.already_owned': 'Ya lo tenés.',
    'wg.err.login': 'Tenés que entrar con Discord.',
    'wg.err.no_market': 'Esa partida no está habilitada para apostar.',
    'wg.err.no_item': 'Ese artículo ya no está.',
    'wg.err.pick': 'Primero elegí un corredor.',
    'wg.err.generic': 'No se pudo. Probá de nuevo en un momento.',
    'wg.admin.on': 'El sistema está ACTIVO para todos.',
    'wg.admin.off': 'El sistema está apagado para el público. Para activarlo: update public.wager_config set active = true;',
    'wg.admin.sync': 'Sincronizar partidas y resultados',
    'wg.admin.synced': 'Sincronizado: {up} partidas publicadas o actualizadas, {st} liquidadas.',
    'wg.admin.markets': '{n} partidas publicadas',
    'wg.admin.pending': 'Compras por entregar (rol de Discord / VIP de Twitch)',
    'wg.admin.none': 'No hay compras pendientes.',
    'wg.admin.done': 'Entregado',
    'live.checking': 'Chequeando canales…',

    'footer.text': 'Ditman Cup 2027 · Hecho para la comunidad',
    'footer.credit': 'Sitio web por',

    'sim.title': 'Simulador — formato tipo Nations League',
    'sim.r1.l': 'Directo',
    'sim.r1.t': 'El Top 8 de las clasificatorias no juega grupos y va directo a Octavos de Final.',
    'sim.r2.l': 'Grupos',
    'sim.r2.t': 'Los otros 24 juegan 3 grupos de 8 en 4 rondas. Un BO1 por ronda, dentro de tu grupo.',
    'sim.r3.l': 'Movimiento',
    'sim.r3.t': 'Si ganas, subis de grupo. Si perdes, bajas.',
    'sim.r4.l': 'Puntos',
    'sim.r4.t': 'Victoria: 2 pts en Grupo 1, 1 pt en Grupos 2 y 3. Si perdes por menos de 30s: bono de +1 (Grupo 1) o +0.5 (Grupos 2 y 3).',
    'sim.r6.l': 'Cruces',
    'sim.r6.t': 'Los 4 que bajan juntos no pueden enfrentarse en la fecha siguiente, y lo mismo vale para los que suben al Grupo 2 o 3. En el Grupo 1 los que suben quedan libres, asi los que se quedan pueden cruzarse entre si. Nunca te toca dos veces el mismo rival.',
    'sim.r5.l': 'Clasifican',
    'sim.r5.t': 'Tras la ronda 4, los 8 mejores por puntos pasan a Octavos. Desempate: promedio de tus 2 mejores carreras.',
    'sim.proposal': 'Propuesta de formato — todavia no es el definitivo.',
    'sim.dateBadge': 'Ronda',
    'sim.btnNext': 'Simular siguiente ronda',
    'sim.btnNext5': 'Simular hasta el final',
    'sim.btnReset': 'Reiniciar',
    'sim.legendQualified': 'Clasificado a Octavos (Top 8 de la fase de grupos)',
    'sim.legendEliminated': 'Eliminado',
    'sim.directTag': 'clasificado directo',
    'sim.directTitle': 'Top 8 — clasificados directo a Octavos',
    'sim.directNote': 'Los 8 mejores tiempos de las clasificatorias no juegan la fase de grupos: quedan sembrados directo en Octavos de Final.',
    'sim.logColGroup': 'Grupo',
    'sim.logColWinner': 'Gana',
    'sim.logColLoser': 'Pierde',
    'sim.logColMargin': 'Diferencia',
    'sim.logColMove': 'Movimiento',
    'sim.stays': 'se queda en Grupo {g}',
    'sim.movesUp': 'sube a Grupo {g}',
    'sim.movesDown': 'baja a Grupo {g}',
    'sim.swapTitle': 'Probate vos: cambia a un corredor por una reserva',
    'sim.swapNote': 'Si no estas entre los 32 del simulador y queres ver como te iria, elegi a quien reemplazar y entra vos (o cualquiera de las reservas: PB menor a 1:30:00 y run del ultimo año). Tambien podes escribir un nombre y un PB a mano. Se reordena por PB y el simulador se reinicia.',
    'sim.swapOut': 'Reemplazar a',
    'sim.swapIn': 'por',
    'sim.swapCustom': 'Otro (escribir nombre y PB)…',
    'sim.swapName': 'Nombre',
    'sim.swapPb': 'PB (H:MM:SS.cc)',
    'sim.swapApply': 'Cambiar',
    'sim.swapRestore': 'Volver al plantel original',
    'sim.swapBadName': 'Escribi un nombre (maximo 24 caracteres).',
    'sim.swapBadPb': 'El PB tiene que ser H:MM:SS o H:MM:SS.cc, entre 1:00:00 y 2:30:00 (ej. 1:25:30.45).',
    'sim.swapDup': 'Ese nombre ya esta en el simulador.',
    'sim.swapDone': '{name} entra al simulador en lugar de {out}. Se reordeno por PB y se reinicio.',
    'sim.swapRestored': 'Plantel original restaurado.',
    'sim.group1': 'Grupo 1',
    'sim.group2': 'Grupo 2',
    'sim.group3': 'Grupo 3',
    'sim.runnersCount': '{n} corredores',
    'sim.thRunner': 'Corredor',
    'sim.thPB': 'PB',
    'sim.thPts': 'Pts',
    'sim.thBest': 'Mejor tiempo',
    'sim.thBestAvg': 'Mejor promedio',
    'sim.thHistory': 'Historial',
    'sim.rankingTitle': 'Ranking de grupos — ordenado solo por puntaje',
    'sim.rankingNote': 'Los 24 corredores de la fase de grupos en una sola tabla, ordenados de mayor a menor puntaje (sin desempates de grupo ni tabla por tabla). Los primeros 8 clasifican a Octavos junto al Top 8 directo.',
    'sim.logTitleEmpty': 'Todavia no se corrio ninguna ronda',
    'sim.logTitle': 'Resultados de la ronda {n}',
    'sim.logTitleFinal': 'Resultados de la ronda {n} (final)',
    'sim.bracketTitle': 'Octavos de Final',
    'sim.wbTitle': 'Doble eliminacion — jugala',
    'sim.wbNote': 'Octavos y Cuartos: si la diferencia del primer race es de 2:00 o mas, es el unico race (BO1); si no, es BO3. Semis y Finales son siempre BO3 y la Gran Final es BO5. Si perdes una vez bajas al cuadro de perdedores; si perdes de nuevo, quedas eliminado. Si el campeon del cuadro de perdedores gana la Gran Final, se juega una revancha (reset), tambien BO5.',
    'sim.btnWbNext': 'Jugar {round}',
    'sim.wbDone': 'Torneo terminado',
    'sim.btnWbEverything': 'Jugar todo hasta la Gran Final',
    'sim.champion': 'Campeon de la Ditman Cup',
    'sim.btnWbAll': 'Jugar hasta la final de ganadores',
    'sim.btnWbReset': 'Reiniciar resultados',
    'sim.wbChamp': 'Campeon del cuadro de ganadores — directo a la Gran Final',
    'sim.bracketLocked': 'Termina las 4 rondas para desbloquear el sorteo de octavos.',
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
    'nav.home': 'Go to home',
    'nav.sorteo': 'Schedule',
    'nav.torneo': 'Tournament',
    'nav.jugar': 'Play',
    'nav.comunidad': 'Community',
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

    'trailer.title': 'Ditman Cup 2027 Announcement video',
    'trailer.yt': 'Watch on YouTube',
    'hero.emblemAlt': 'Ditman Cup 2027 emblem: the golden trophy inside a ring',
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
    'sorteo.r2.t': 'A new live draw before each round, once the previous results have moved runners between groups.',
    'sorteo.r3.l': 'Where',
    'sorteo.r3.t': 'Live on twitch.tv/ditmancup. Matchups appear below with day and time.',
    'sorteo.r4.l': 'Top 8',
    'sorteo.r4.t': 'Straight to the Round of 16: they skip the groups, so they are not drawn.',
    'sched.title': 'Schedule',
    'sched.round': 'Round {n}',
    'sched.dateTbd': 'Date TBD',
    'sched.note1': 'Groups come from the qualifier ranking.',
    'sched.noteN': 'Groups are set from the previous round results.',
    'sched.vs': 'vs',
    'sched.tzNote': 'Times shown in your local time zone ({tz}).',
    'donors.title': 'Top donors',
    'donors.colName': 'Donor',
    'donors.colAmount': 'Donated',
    'donors.loading': 'Loading donors…',
    'donors.empty': 'No donors yet.',
    'donors.error': 'Could not load the donors list.',
    'donors.total': '{amount} raised · {n} donors',
    'donors.totalOne': '{amount} raised · 1 donor',
    'donors.thisTitle': 'This tournament · Ditman Cup {year}',
    'donors.allTimeTitle': 'All-time top donors',
    'donors.curEmpty': 'No donations for this tournament yet. Be the first!',
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
    'bracket.grandFinalReset': 'Grand Final (reset)',
    'sim.resetNote': 'Reset: the Losers Bracket champion won the Grand Final, and the Winners Bracket champion has not lost twice yet. A second Grand Final is played.',
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
    'link.rules': 'Document',
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
    'champions.trophyPending': 'The official Ditman Cup 2027 trophy.',
    'champions.viewData': 'View all data',
    'champions.modalHint': 'Original data from the tournament spreadsheet.',

    'clips.title': 'Best clips',
    'clips.intro': 'Highlights from past editions and other tournaments.',
    'clips.empty': "No clips added yet. Got one? Drop it in the Discord.",

    'live.title': 'RE4 runners live',
    'live.intro': 'Community channels running or glitch hunting Resident Evil 4 right now.',
    'live.on': 'LIVE',
    'live.off': 'Offline',
    'live.none': 'No channel from the list is streaming Resident Evil 4 right now.',
    'live.otherGame': 'Live · other game',
    'live.play': 'Play the stream of',
    'live.watch': 'Watch on Twitch',
    'live.watchYt': 'Watch on YouTube',
    'live.watchKick': 'Watch on Kick',
    'live.watchTt': 'Watch on TikTok',
    'live.ttNote': 'TikTok does not allow live streams to be detected automatically: streamers on TikTok mark themselves live here, only while playing Resident Evil 4.',
    'live.ttLogin': 'Log in with Discord',
    'live.ttPick': 'Your TikTok',
    'live.ttGo': "I'm live on TikTok",
    'live.ttMine': 'Marked live as @{name} until {time}',
    'live.ttEnd': "I'm done",
    'live.ttBusy': 'That TikTok was already chosen by someone else. If it is yours, tell Joker.',
    'live.ttYours': 'Your TikTok: @{name}',
    'live.ttClaim': 'Choose this TikTok',
    'live.ttLockNote': 'Choose your TikTok. While you have it, nobody else can use it. You can release it any time.',
    'live.ttConfirm': 'Choose @{name}? Nobody else can use it until you release it.',
    'live.ttRelease': 'Release my TikTok',
    'live.ttClaimed': 'TikToks already chosen. If one does not belong to who chose it, tell Joker:',
    'live.ttBy': 'chosen by {name}',
    'live.ttErr': 'Could not save. Please try again.',
    'nav.predictions': 'Predictions',
    'pred.title': 'Predictions',
    'pred.intro': 'The Ditman Cup prediction game: pick the winner of every match and, if you dare, the time gap. Earn points and climb the leaderboard.',
    'pred.sub.picks': 'My picks',
    'pred.sub.board': 'Leaderboard',
    'pred.sub.rules': 'Rules',
    'pred.login': 'Log in with Discord',
    'pred.logout': 'Log out',
    'pred.hello': 'Playing as {name}',
    'pred.needLogin': 'Log in with Discord to save your picks and join the leaderboard.',
    'pred.local': 'Local mode: your picks are saved only in this browser. The shared leaderboard is not connected yet.',
    'pred.myPts': 'points',
    'pred.myHits': 'hits',
    'pred.myRank': 'rank',
    'pred.noMatches': 'Matches will show up here as soon as the schedule is announced.',
    'pred.timeTbd': 'Time TBD',
    'pred.underdog': 'Underdog',
    'pred.underdogTip': 'Worse qualifier ranking: a win is worth more',
    'pred.diffLabel': 'Time gap (optional)',
    'pred.saving': 'Saving…',
    'pred.saved': 'Saved ✓',
    'pred.saveError': 'Could not save. Try again.',
    'pred.closed': 'Closed',
    'pred.noPick': 'No pick',
    'pred.yourPick': 'Your pick: {name}',
    'pred.gap': 'gap {d}',
    'pred.pts': '{n} pts',
    'pred.kind.diff': 'winner + time gap',
    'pred.kind.underdog': 'underdog winner',
    'pred.kind.winner': 'winner',
    'pred.kind.miss': 'missed',
    'pred.board.player': 'Player',
    'pred.board.hits': 'Hits',
    'pred.board.pts': 'Pts',
    'pred.board.loading': 'Loading the leaderboard…',
    'pred.board.error': 'Could not load the leaderboard. Try again in a bit.',
    'pred.board.empty': 'No points yet. The leaderboard fills in once the first results are in.',
    'pred.board.local': 'The shared leaderboard is not connected yet.',
    'pred.rules.1': 'Pick the winner of each match before it starts. You can change your pick until the race begins.',
    'pred.rules.2': 'Correct winner only: {n} pts.',
    'pred.rules.3': 'Correct winner and it was the underdog (the runner with the worse qualifier ranking): {n} pts.',
    'pred.rules.4': 'Correct winner and the time gap too (the race ends with a gap within {s} seconds, plus or minus, of the one you entered): {n} pts.',
    'pred.rules.5': 'The maximum per match is {n} pts and points do not stack. The time gap is optional.',
    'nav.wager': 'Merchant\'s Wager',
    'wg.title': 'Merchant\'s Wager',
    'wg.intro': 'Bet your Pesetas (PTAS) on the matches, claim the daily bonus and spend them at the Merchant\'s shop.',
    'wg.soon': 'The Merchant has not opened his shop yet. Come back soon.',
    'wg.inactive': 'Only you (admin) can see this: it is not active for everyone else yet.',
    'wg.needLogin': 'Log in with Discord to play and earn PTAS.',
    'wg.daily': 'Claim today\'s {n} PTAS',
    'wg.dailyDone': 'Already claimed today',
    'wg.sound': 'Sound and music',
    'wg.item.discord-role.name': 'Discord role',
    'wg.item.discord-role.desc': 'Exclusive role in the Discord server.',
    'wg.item.twitch-vip.name': 'Twitch VIP',
    'wg.item.twitch-vip.desc': 'VIP status on the Twitch channel.',
    'wg.dailySoon': 'Daily bonus: starts with the tournament',
    'wg.sub.bets': 'Bets',
    'wg.sub.mine': 'My bets',
    'wg.sub.shop': 'Shop',
    'wg.sub.board': 'Leaderboard',
    'wg.sub.rules': 'Rules',
    'wg.sub.admin': 'Admin',
    'wg.noMarkets': 'No matches to bet on yet. They show up once the schedule is announced.',
    'wg.noBets': 'You have not bet on any match yet.',
    'wg.odds': 'x{n}',
    'wg.stake': 'PTAS',
    'wg.all': 'All',
    'wg.win': 'You would win {n} PTAS',
    'wg.pickFirst': 'Pick a runner and an amount',
    'wg.bet': 'Place bet',
    'wg.yourBet': 'You bet {n} PTAS on {name} (x{odds})',
    'wg.status.open': 'In play',
    'wg.status.won': 'Won: +{n} PTAS',
    'wg.status.lost': 'Lost',
    'wg.status.void': 'Void: your PTAS were refunded',
    'wg.closed': 'Closed: the match already started',
    'wg.ended': 'Match finished',
    'wg.shop.empty': 'The shop is empty for now.',
    'wg.shop.buy': 'Buy · {n} PTAS',
    'wg.shop.owned': 'You own this',
    'wg.shop.pending': 'Bought: delivered soon',
    'wg.shop.delivered': 'Delivered',
    'wg.shop.confirm': 'Buy "{name}" for {n} PTAS?',
    'wg.shop.kind.badge': 'Site badge',
    'wg.shop.kind.discord_role': 'Discord role',
    'wg.shop.kind.twitch_vip': 'Twitch VIP',
    'wg.rules.1': 'Once the tournament starts you can claim {n} PTAS every day (once a day, Uruguay time). If you skip a day it does not stack.',
    'wg.rules.2': 'On each match you pick a runner and how many PTAS to bet (minimum {m}). They are deducted right away and you can bet only once per match, before it starts.',
    'wg.rules.3': 'Odds come from the qualifier times: the faster a runner was, the more likely they win and the less they pay; the underdog pays more. The odds you see when betting are locked in.',
    'wg.rules.4': 'If you are right you get your stake times the odds. If you are wrong you lose the stake. If a match is voided, everything is refunded.',
    'wg.rules.5': 'Spend PTAS in the shop: badges next to your name, a Discord role or Twitch VIP. Roles and VIP are delivered by Joker by hand.',
    'wg.rules.6': 'PTAS are play money only: they cannot be bought, cashed out or sent to someone else. One Discord account, one wallet.',
    'wg.err.daily_off': 'The daily bonus is not active yet: it starts with the tournament.', 'wg.err.funds': 'Not enough PTAS.',
    'wg.err.closed': 'That match is already closed.',
    'wg.err.already_bet': 'You already bet on that match.',
    'wg.err.min_bet': 'The minimum bet is {n} PTAS.',
    'wg.err.inactive': 'Not active yet.',
    'wg.err.already_claimed': 'Already claimed today: come back tomorrow.',
    'wg.err.already_owned': 'You already own it.',
    'wg.err.login': 'You need to log in with Discord.',
    'wg.err.no_market': 'That match is not open for betting.',
    'wg.err.no_item': 'That item is gone.',
    'wg.err.pick': 'Pick a runner first.',
    'wg.err.generic': 'Something went wrong. Try again in a moment.',
    'wg.admin.on': 'The system is ACTIVE for everyone.',
    'wg.admin.off': 'The system is off for the public. To turn it on: update public.wager_config set active = true;',
    'wg.admin.sync': 'Sync matches and results',
    'wg.admin.synced': 'Synced: {up} matches published or updated, {st} settled.',
    'wg.admin.markets': '{n} matches published',
    'wg.admin.pending': 'Purchases to deliver (Discord role / Twitch VIP)',
    'wg.admin.none': 'No pending purchases.',
    'wg.admin.done': 'Delivered',
    'live.checking': 'Checking channels…',

    'footer.text': 'Ditman Cup 2027 · Made for the community',
    'footer.credit': 'Website by',

    'sim.title': 'Simulator — Nations League–style format',
    'sim.r1.l': 'Direct',
    'sim.r1.t': 'The Top 8 from qualifiers skip the groups and go straight to the Round of 16.',
    'sim.r2.l': 'Groups',
    'sim.r2.t': 'The other 24 play 3 groups of 8 over 4 rounds. One BO1 per round, inside your group.',
    'sim.r3.l': 'Movement',
    'sim.r3.t': 'Win and you move up a group. Lose and you move down.',
    'sim.r4.l': 'Points',
    'sim.r4.t': 'Win: 2 pts in Group 1, 1 pt in Groups 2 and 3. Lose by under 30s: bonus of +1 (Group 1) or +0.5 (Groups 2 and 3).',
    'sim.r6.l': 'Matchups',
    'sim.r6.t': 'The 4 runners who drop together cannot face each other in the next round, and the same goes for those who climb into Group 2 or 3. In Group 1 the rule is lifted for climbers, so the winners who stay can meet each other. You never get the same opponent twice.',
    'sim.r5.l': 'Qualify',
    'sim.r5.t': 'After round 4 the 8 best by points join the Round of 16. Tiebreak: average of your 2 best races.',
    'sim.proposal': 'Format proposal — not final yet.',
    'sim.dateBadge': 'Round',
    'sim.btnNext': 'Simulate next round',
    'sim.btnNext5': 'Simulate to the end',
    'sim.btnReset': 'Reset',
    'sim.legendQualified': 'Qualified to Round of 16 (Top 8 from groups)',
    'sim.legendEliminated': 'Eliminated',
    'sim.directTag': 'direct qualifier',
    'sim.directTitle': 'Top 8 — direct qualifiers to the Round of 16',
    'sim.directNote': "The 8 fastest qualifier times skip the group stage entirely: they're seeded straight into the Round of 16.",
    'sim.logColGroup': 'Group',
    'sim.logColWinner': 'Winner',
    'sim.logColLoser': 'Loser',
    'sim.logColMargin': 'Margin',
    'sim.logColMove': 'Movement',
    'sim.stays': 'stays in Group {g}',
    'sim.movesUp': 'moves up to Group {g}',
    'sim.movesDown': 'moves down to Group {g}',
    'sim.swapTitle': 'Try yourself: swap a runner for a reserve',
    'sim.swapNote': 'If you are not among the 32 in the simulator and want to see how you would do, pick who to replace and jump in (or any of the reserves: PB under 1:30:00 and a run in the last year). You can also type a name and a PB by hand. The roster is re-sorted by PB and the simulator restarts.',
    'sim.swapOut': 'Replace',
    'sim.swapIn': 'with',
    'sim.swapCustom': 'Other (type a name and PB)…',
    'sim.swapName': 'Name',
    'sim.swapPb': 'PB (H:MM:SS.cc)',
    'sim.swapApply': 'Swap',
    'sim.swapRestore': 'Restore original roster',
    'sim.swapBadName': 'Type a name (24 characters max).',
    'sim.swapBadPb': 'The PB must be H:MM:SS or H:MM:SS.cc, between 1:00:00 and 2:30:00 (e.g. 1:25:30.45).',
    'sim.swapDup': 'That name is already in the simulator.',
    'sim.swapDone': '{name} joins the simulator in place of {out}. Re-sorted by PB and restarted.',
    'sim.swapRestored': 'Original roster restored.',
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
    'sim.logTitleEmpty': 'No round played yet',
    'sim.logTitle': 'Round {n} results',
    'sim.logTitleFinal': 'Round {n} results (final)',
    'sim.bracketTitle': 'Round of 16',
    'sim.wbTitle': 'Double elimination — play it',
    'sim.wbNote': 'Round of 16 and Quarterfinals: if the first race is decided by 2:00 or more, that is the only race (BO1); otherwise it becomes a BO3. Semifinals and Finals are always BO3, and the Grand Final is BO5. Lose once and you drop to the Losers Bracket; lose again and you are out. If the Losers Bracket champion wins the Grand Final, a second Grand Final (reset) is played, also BO5.',
    'sim.btnWbNext': 'Play {round}',
    'sim.wbDone': 'Tournament finished',
    'sim.btnWbEverything': 'Play everything to the Grand Final',
    'sim.champion': 'Ditman Cup champion',
    'sim.btnWbAll': 'Play to the Winners Final',
    'sim.btnWbReset': 'Reset results',
    'sim.wbChamp': 'Winners Bracket champion — straight to the Grand Final',
    'sim.bracketLocked': 'Finish all 4 rounds to unlock the Round of 16 draw.',
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
  id: {
    'nav.inicio': 'Beranda',
    'nav.home': 'Ke beranda',
    'nav.sorteo': 'Jadwal',
    'nav.torneo': 'Turnamen',
    'intro.t1': 'Jadwal',
    'nav.grupos': 'Grup',
    'nav.brackets': 'Bagan',
    'nav.simulations': 'Simulasi',
    'nav.champions': 'Riwayat',
    'nav.clips': 'Klip',
    'nav.live': 'Live',
    'nav.donaciones': 'Donasi',
    'nav.organizadores': 'Panitia',
    'nav.menu': 'Buka menu',

    'hero.subtitle': 'Turnamen speedrun Resident Evil 4 buatan komunitas.',

    'countdown.label': 'Hingga kualifikasi dibuka',
    'countdown.days': 'hari',
    'countdown.hours': 'jam',
    'countdown.mins': 'mnt',
    'countdown.secs': 'dtk',
    'countdown.open': 'Kualifikasi sudah dibuka!',
    'countdown.datePrefix': 'Dibuka:',
    'countdown.closePrefix': 'Ditutup:',

    'facts.runners': 'runner',
    'facts.groups': 'grup',
    'facts.qualify': 'lolos langsung',

    'trailer.title': 'Video pengumuman Ditman Cup 2027',
    'trailer.yt': 'Tonton di YouTube',
    'hero.emblemAlt': 'Emblem Ditman Cup 2027: trofi emas di dalam sebuah cincin',
    'intro.title': 'Selamat datang di Ditman Cup 2027',
    'intro.lead': 'Semua yang kamu butuhkan untuk mengikuti turnamen, di satu tempat.',
    'intro.d1': 'Siapa lawanmu, dan kapan',
    'intro.d2': 'Top 8 langsung + 24 di 3 grup',
    'intro.d3': 'Double elimination sampai final',
    'intro.d4': 'Coba mainkan formatnya sendiri',

    'sorteo.title': 'Jadwal',
    'sorteo.r1.l': 'Apa yang diundi',
    'sorteo.r1.t': 'Bukan grupnya, melainkan lawannya. Grupmu ditentukan dari peringkat kualifikasi, dan undian menentukan siapa lawanmu di dalam grup itu.',
    'sorteo.r2.l': 'Kapan',
    'sorteo.r2.t': 'Undian live baru sebelum setiap ronde, setelah hasil ronde sebelumnya memindahkan runner antar grup.',
    'sorteo.r3.l': 'Di mana',
    'sorteo.r3.t': 'Live di twitch.tv/ditmancup. Pertandingan ditampilkan di bawah lengkap dengan hari dan jam.',
    'sorteo.r4.l': 'Top 8',
    'sorteo.r4.t': 'Langsung ke Babak 16 Besar: mereka tidak bermain di grup, jadi tidak ikut diundi.',
    'sched.title': 'Jadwal',
    'sched.round': 'Ronde {n}',
    'sched.dateTbd': 'Tanggal menyusul',
    'sched.note1': 'Grup ditentukan dari peringkat kualifikasi.',
    'sched.noteN': 'Grup ditentukan dari hasil ronde sebelumnya.',
    'sched.vs': 'vs',
    'sched.tzNote': 'Waktu ditampilkan sesuai zona waktumu ({tz}).',
    'donors.title': 'Donatur teratas',
    'donors.colName': 'Donatur',
    'donors.colAmount': 'Donasi',
    'donors.loading': 'Memuat donatur…',
    'donors.empty': 'Belum ada donatur.',
    'donors.error': 'Daftar donatur tidak dapat dimuat.',
    'donors.total': '{amount} terkumpul · {n} donatur',
    'donors.totalOne': '{amount} terkumpul · 1 donatur',
    'donors.thisTitle': 'Turnamen ini · Ditman Cup {year}',
    'donors.allTimeTitle': 'Donatur teratas sepanjang masa',
    'donors.curEmpty': 'Belum ada donasi untuk turnamen ini. Jadilah yang pertama!',
    'donors.src': 'Sumber: Matcherino · {years} edisi',
    'donors.thanks': 'Terima kasih!',
    'donors.thanksGeneric': 'Terima kasih kepada semua donatur yang telah mendukung Ditman Cup.',
    'donors.thanksSub': 'Terima kasih kepada {n} donatur kami yang telah mendukung Ditman Cup.',
    'visits.label': 'Kunjungan halaman',

    'grupos.title': 'Fase grup',
    'grupos.loading': 'Memuat grup…',
    'grupos.sheetError': 'Sheet tidak dapat dimuat. Menampilkan data contoh.',
    'group.word': 'Grup',
    'group.tbd': 'Menyusul',
    'group.directTitle': 'Top 8 — langsung ke Babak 16 Besar',
    'group.directBadge': 'Lewati fase grup',
    'group.directNote': 'Lolos langsung dari kualifikasi: mereka masuk bagan di Babak 16 Besar.',
    'group.stageBadge': 'Fase grup',
    'group.stageTitle': '24 runner · 3 grup berisi 8',
    'group.stageNote': 'Merekalah yang bertanding: lawan diundi di dalam setiap grup (lihat Turnamen > Jadwal).',

    'brackets.title': 'Bagan',
    'brackets.placeholder': 'Bagan gugur akan tampil setelah fase grup selesai.',
    'brackets.previewNote': 'Double elimination · {n} peserta. Kalah sekali, kamu turun ke Bagan Pecundang; kalah lagi, kamu tersingkir. Pertandingan sebenarnya ditentukan setelah fase grup selesai.',
    'bracket.champion': 'Juara',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.seedTag': 'Unggulan {n}',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinal',
    'bracket.round.quarter': 'Perempat final',
    'bracket.round.r16': 'Babak 16 Besar',
    'bracket.round.r32': 'Babak 32 Besar',
    'bracket.round.generic': 'Babak {n} Besar',
    'bracket.winners': 'Bagan Pemenang',
    'bracket.losers': 'Bagan Pecundang',
    'bracket.grandFinal': 'Grand Final',
    'bracket.grandFinalReset': 'Grand Final (reset)',
    'sim.resetNote': 'Reset: juara Bagan Pecundang memenangkan Grand Final, dan juara Bagan Pemenang belum kalah dua kali. Grand Final kedua dimainkan.',
    'bracket.round.winnersFinal': 'Final Pemenang',
    'bracket.lr': 'Ronde Pecundang {n}',
    'bracket.losersSemi': 'Semifinal Pecundang',
    'bracket.losersFinal': 'Final Pecundang',
    'bracket.winnerOf': 'Pemenang M{n}',
    'bracket.loserOf': 'Pecundang M{n}',

    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Runner',
    'clas.col.group': 'Grup',
    'clas.col.time': 'Waktu terbaik',
    'clas.col.pts': 'Poin',

    'don.title': 'Donasi',
    'don.body': 'Ditman Cup berjalan berkat dukungan komunitas. Kalau kamu ingin ikut menyumbang untuk total hadiah dan biaya turnamen, bisa lewat sini:',
    'don.btn': 'Donasi',
    'don.pool.title': 'Total hadiah & biaya turnamen',
    'don.me.title': 'Dukung saya',
    'don.me.body': 'Ini sepenuhnya opsional, tapi kalau kamu suka websitenya dan ingin mendukung saya secara langsung, saya sangat menghargainya. Terima kasih sudah menjadi bagian dari komunitas ini!',
    'don.me.btn': 'Donasi ke JokerUY',

    'org.title': 'Panitia & staf',
    'org.tier.organizers': 'Panitia',
    'org.tier.mods': 'Moderator SRC',
    'org.tier.helpers': 'Helper & caster',
    'org.tier.design': 'Seni & desain',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderator',
    'org.role.helper': 'Asisten',
    'org.role.helperCaster': 'Asisten / Komentator',
    'org.role.artDesign': 'Seni & desain',
    'org.role.artDesignWeb': 'Seni & desain, Desainer website',

    'link.discord': 'Discord',
    'link.rules': 'Dokumen',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': 'Riwayat',
    'champions.edition': 'Ditman Cup {year}',
    'champions.donors': 'Donatur',
    'champions.timeline': 'Semua donasi (kronologis)',
    'champions.txToggle': 'Tampilkan setiap donasi',
    'champions.champion': 'Juara',
    'champions.runnerUp': 'Juara 2',
    'champions.third': 'Juara 3',
    'champions.tbd': 'Menunggu konfirmasi',
    'champions.vod': 'Tonton final',
    'champions.prize': 'Total hadiah',
    'champions.trophyTitle': 'Trofi',
    'champions.trophyPending': 'Trofi resmi Ditman Cup 2027.',
    'champions.viewData': 'Lihat semua data',
    'champions.modalHint': 'Data asli dari spreadsheet turnamen.',

    'clips.title': 'Klip terbaik',
    'clips.intro': 'Momen terbaik dari edisi sebelumnya dan turnamen lainnya.',
    'clips.empty': 'Belum ada klip. Punya klip bagus? Kirim ke Discord.',

    'live.title': 'Runner RE4 yang sedang live',
    'live.intro': 'Channel komunitas yang sedang menjalankan atau glitch hunting Resident Evil 4 sekarang.',
    'live.on': 'LIVE',
    'live.off': 'Offline',
    'live.none': 'Tidak ada channel dari daftar yang sedang streaming Resident Evil 4 saat ini.',
    'live.otherGame': 'Live · game lain',
    'live.play': 'Putar stream dari',
    'live.watch': 'Tonton di Twitch',
    'live.watchYt': 'Tonton di YouTube',
    'live.watchKick': 'Tonton di Kick',
    'live.watchTt': 'Tonton di TikTok',
    'live.ttNote': 'TikTok tidak mengizinkan deteksi live otomatis: streamer TikTok menandai dirinya sendiri di sini, hanya saat bermain Resident Evil 4.',
    'live.ttLogin': 'Masuk dengan Discord',
    'live.ttPick': 'TikTok kamu',
    'live.ttGo': 'Saya live di TikTok',
    'live.ttMine': 'Ditandai live sebagai @{name} sampai {time}',
    'live.ttEnd': 'Sudah selesai',
    'live.ttBusy': 'TikTok itu sudah dipilih orang lain. Kalau itu milikmu, kabari Joker.',
    'live.ttYours': 'TikTok kamu: @{name}',
    'live.ttClaim': 'Pilih TikTok ini',
    'live.ttLockNote': 'Pilih TikTok kamu. Selama kamu memilikinya, tidak ada orang lain yang bisa memakainya. Kamu bisa melepaskannya kapan saja.',
    'live.ttConfirm': 'Pilih @{name}? Tidak ada orang lain yang bisa memakainya sampai kamu melepaskannya.',
    'live.ttRelease': 'Lepaskan TikTok saya',
    'live.ttClaimed': 'TikTok yang sudah dipilih. Kalau ada yang bukan milik pemilihnya, kabari Joker:',
    'live.ttBy': 'dipilih oleh {name}',
    'live.ttErr': 'Gagal menyimpan. Coba lagi.',
    'nav.predictions': 'Prediksi',
    'pred.title': 'Prediksi',
    'pred.intro': 'Game tebak-tebakan Ditman Cup: pilih pemenang setiap match dan, kalau berani, selisih waktunya. Kumpulkan poin dan naik di papan peringkat.',
    'pred.sub.picks': 'Pilihanku',
    'pred.sub.board': 'Papan peringkat',
    'pred.sub.rules': 'Aturan',
    'pred.login': 'Masuk dengan Discord',
    'pred.logout': 'Keluar',
    'pred.hello': 'Bermain sebagai {name}',
    'pred.needLogin': 'Masuk dengan Discord untuk menyimpan pilihanmu dan tampil di papan peringkat.',
    'pred.local': 'Mode lokal: pilihanmu hanya tersimpan di browser ini. Papan peringkat bersama belum terhubung.',
    'pred.myPts': 'poin',
    'pred.myHits': 'tebakan benar',
    'pred.myRank': 'peringkat',
    'pred.noMatches': 'Match akan muncul di sini begitu jadwal diumumkan.',
    'pred.timeTbd': 'Jam belum ditentukan',
    'pred.underdog': 'Unggulan bawah',
    'pred.underdogTip': 'Peringkat kualifikasi lebih rendah: kalau menang, nilainya lebih besar',
    'pred.diffLabel': 'Selisih waktu (opsional)',
    'pred.saving': 'Menyimpan…',
    'pred.saved': 'Tersimpan ✓',
    'pred.saveError': 'Gagal menyimpan. Coba lagi.',
    'pred.closed': 'Ditutup',
    'pred.noPick': 'Tidak ada pilihan',
    'pred.yourPick': 'Pilihanmu: {name}',
    'pred.gap': 'selisih {d}',
    'pred.pts': '{n} poin',
    'pred.kind.diff': 'pemenang + selisih waktu',
    'pred.kind.underdog': 'pemenang underdog',
    'pred.kind.winner': 'pemenang',
    'pred.kind.miss': 'meleset',
    'pred.board.player': 'Pemain',
    'pred.board.hits': 'Benar',
    'pred.board.pts': 'Poin',
    'pred.board.loading': 'Memuat papan peringkat…',
    'pred.board.error': 'Papan peringkat gagal dimuat. Coba lagi nanti.',
    'pred.board.empty': 'Belum ada poin. Papan peringkat terisi setelah hasil pertama masuk.',
    'pred.board.local': 'Papan peringkat bersama belum terhubung.',
    'pred.rules.1': 'Pilih pemenang setiap match sebelum dimulai. Pilihanmu bisa diubah sampai race dimulai.',
    'pred.rules.2': 'Hanya pemenang yang benar: {n} poin.',
    'pred.rules.3': 'Pemenang benar dan ia adalah underdog (runner dengan peringkat kualifikasi lebih rendah): {n} poin.',
    'pred.rules.4': 'Pemenang benar dan selisih waktu juga tepat (race berakhir dengan selisih dalam kisaran {s} detik lebih atau kurang dari yang kamu isi): {n} poin.',
    'pred.rules.5': 'Poin maksimal per match adalah {n} dan poin tidak dijumlahkan. Selisih waktu bersifat opsional.',
    'live.checking': 'Memeriksa channel…',

    'footer.text': 'Ditman Cup 2027 · Dibuat untuk komunitas',
    'footer.credit': 'Website oleh',

    'sim.title': 'Simulator — format ala Nations League',
    'sim.r1.l': 'Langsung',
    'sim.r1.t': 'Top 8 dari kualifikasi melewati fase grup dan langsung ke Babak 16 Besar.',
    'sim.r2.l': 'Grup',
    'sim.r2.t': '24 runner lainnya bermain di 3 grup berisi 8 selama 4 ronde. Satu BO1 per ronde, di dalam grupmu.',
    'sim.r3.l': 'Perpindahan',
    'sim.r3.t': 'Menang, kamu naik satu grup. Kalah, kamu turun satu grup.',
    'sim.r4.l': 'Poin',
    'sim.r4.t': 'Menang: 2 poin di Grup 1, 1 poin di Grup 2 dan 3. Kalah kurang dari 30 detik: bonus +1 (Grup 1) atau +0,5 (Grup 2 dan 3).',
    'sim.r6.l': 'Pasangan lawan',
    'sim.r6.t': '4 runner yang turun bersama tidak bisa saling bertemu di ronde berikutnya, begitu juga yang naik ke Grup 2 atau 3. Di Grup 1 aturan ini tidak berlaku bagi yang naik, sehingga yang bertahan bisa saling bertemu. Kamu tidak akan bertemu lawan yang sama dua kali.',
    'sim.r5.l': 'Lolos',
    'sim.r5.t': 'Setelah ronde 4, 8 runner dengan poin terbanyak masuk ke Babak 16 Besar. Tiebreak: rata-rata 2 race terbaikmu.',
    'sim.proposal': 'Usulan format — belum final.',
    'sim.dateBadge': 'Ronde',
    'sim.btnNext': 'Simulasikan ronde berikutnya',
    'sim.btnNext5': 'Simulasikan sampai akhir',
    'sim.btnReset': 'Atur ulang',
    'sim.legendQualified': 'Lolos ke Babak 16 Besar (Top 8 dari grup)',
    'sim.legendEliminated': 'Tersingkir',
    'sim.directTag': 'lolos langsung',
    'sim.directTitle': 'Top 8 — lolos langsung ke Babak 16 Besar',
    'sim.directNote': '8 waktu tercepat dari kualifikasi melewati fase grup sepenuhnya: mereka langsung ditempatkan di Babak 16 Besar.',
    'sim.logColGroup': 'Grup',
    'sim.logColWinner': 'Menang',
    'sim.logColLoser': 'Kalah',
    'sim.logColMargin': 'Selisih',
    'sim.logColMove': 'Perpindahan',
    'sim.stays': 'tetap di Grup {g}',
    'sim.movesUp': 'naik ke Grup {g}',
    'sim.movesDown': 'turun ke Grup {g}',
    'sim.swapTitle': 'Coba sendiri: tukar seorang runner dengan cadangan',
    'sim.swapNote': 'Kalau kamu tidak termasuk 32 runner di simulator dan ingin tahu bagaimana hasilmu, pilih siapa yang digantikan lalu masuklah (atau pilih salah satu cadangan: PB di bawah 1:30:00 dan punya run dalam setahun terakhir). Kamu juga bisa mengetik nama dan PB secara manual. Daftar diurutkan ulang berdasarkan PB dan simulator dimulai dari awal.',
    'sim.swapOut': 'Ganti',
    'sim.swapIn': 'dengan',
    'sim.swapCustom': 'Lainnya (ketik nama dan PB)…',
    'sim.swapName': 'Nama',
    'sim.swapPb': 'PB (H:MM:SS.cc)',
    'sim.swapApply': 'Tukar',
    'sim.swapRestore': 'Kembalikan daftar asli',
    'sim.swapBadName': 'Ketik sebuah nama (maksimal 24 karakter).',
    'sim.swapBadPb': 'PB harus berformat H:MM:SS atau H:MM:SS.cc, antara 1:00:00 dan 2:30:00 (contoh: 1:25:30.45).',
    'sim.swapDup': 'Nama itu sudah ada di simulator.',
    'sim.swapDone': '{name} masuk ke simulator menggantikan {out}. Diurutkan ulang berdasarkan PB dan dimulai dari awal.',
    'sim.swapRestored': 'Daftar asli dikembalikan.',
    'sim.group1': 'Grup 1',
    'sim.group2': 'Grup 2',
    'sim.group3': 'Grup 3',
    'sim.runnersCount': '{n} runner',
    'sim.thRunner': 'Runner',
    'sim.thPB': 'PB',
    'sim.thPts': 'Poin',
    'sim.thBest': 'Waktu terbaik',
    'sim.thBestAvg': 'Rata-rata waktu terbaik',
    'sim.thHistory': 'Riwayat',
    'sim.rankingTitle': 'Peringkat fase grup — diurutkan hanya berdasarkan poin',
    'sim.rankingNote': '24 runner fase grup dalam satu tabel, diurutkan dari poin tertinggi ke terendah (tanpa tiebreak grup, tanpa tabel terpisah). 8 teratas lolos ke Babak 16 Besar bersama Top 8 langsung.',
    'sim.logTitleEmpty': 'Belum ada ronde yang dimainkan',
    'sim.logTitle': 'Hasil Ronde {n}',
    'sim.logTitleFinal': 'Hasil Ronde {n} (final)',
    'sim.bracketTitle': 'Babak 16 Besar',
    'sim.wbTitle': 'Double elimination — mainkan',
    'sim.wbNote': 'Babak 16 Besar dan Perempat final: jika race pertama dimenangkan dengan selisih 2:00 atau lebih, itu menjadi satu-satunya race (BO1); jika tidak, menjadi BO3. Semifinal dan Final selalu BO3, dan Grand Final BO5. Kalah sekali, kamu turun ke Bagan Pecundang; kalah lagi, kamu tersingkir. Jika juara Bagan Pecundang memenangkan Grand Final, Grand Final kedua (reset) dimainkan, juga BO5.',
    'sim.btnWbNext': 'Mainkan {round}',
    'sim.wbDone': 'Turnamen selesai',
    'sim.btnWbEverything': 'Mainkan semuanya sampai Grand Final',
    'sim.champion': 'Juara Ditman Cup',
    'sim.btnWbAll': 'Mainkan sampai Final Winners',
    'sim.btnWbReset': 'Reset hasil',
    'sim.wbChamp': 'Juara Bagan Pemenang — langsung ke Grand Final',
    'sim.bracketLocked': 'Selesaikan semua 4 ronde untuk membuka undian Babak 16 Besar.',
    'sim.bracketExplainer': 'Top 8 langsung mempertahankan seeding klasik (mereka tidak bisa saling bertemu sebelum semifinal). Undi mereka melawan 8 peserta lolos dari fase grup untuk melengkapi bagan.',
    'sim.btnDrawNext': 'Undi berikutnya',
    'sim.btnDrawAll': 'Undi semua',
    'sim.btnDrawReset': 'Reset undian',
    'sim.sideA': 'Sisi A',
    'sim.sideB': 'Sisi B',
    'sim.seedTag': 'Top {n}',
    'sim.pending': 'Belum diundi',
    'sim.footer': 'Simulasi dengan data contoh — dibuat untuk menjelaskan format, bukan untuk memprediksi hasil sebenarnya.',
    'sim.doneLabel': 'Turnamen selesai',

    'testmode': 'MODE UJI COBA · data palsu',
    'nav.jugar': 'Main',
    'nav.comunidad': 'Komunitas',
    'nav.wager': 'Merchant\'s Wager',
    'wg.title': 'Merchant\'s Wager',
    'wg.intro': 'Taruhkan Peseta (PTAS) kamu pada pertandingan, klaim bonus harian, dan belanjakan di toko Merchant.',
    'wg.soon': 'Merchant belum membuka tokonya. Kembali lagi nanti.',
    'wg.inactive': 'Hanya kamu (admin) yang bisa melihat ini: belum aktif untuk yang lain.',
    'wg.needLogin': 'Masuk dengan Discord untuk bermain dan mengumpulkan PTAS.',
    'wg.daily': 'Klaim {n} PTAS hari ini',
    'wg.dailyDone': 'Sudah diklaim hari ini',
    'wg.dailySoon': 'Bonus harian: mulai saat turnamen dimulai',
    'wg.sound': 'Suara dan musik',
    'wg.item.discord-role.name': 'Role Discord',
    'wg.item.discord-role.desc': 'Role eksklusif di server Discord.',
    'wg.item.twitch-vip.name': 'VIP Twitch',
    'wg.item.twitch-vip.desc': 'Status VIP di channel Twitch.',
    'wg.sub.bets': 'Taruhan',
    'wg.sub.mine': 'Taruhanku',
    'wg.sub.shop': 'Toko',
    'wg.sub.board': 'Peringkat',
    'wg.sub.rules': 'Aturan',
    'wg.sub.admin': 'Admin',
    'wg.noMarkets': 'Belum ada pertandingan untuk ditaruhkan. Akan muncul setelah jadwal diumumkan.',
    'wg.noBets': 'Kamu belum bertaruh di pertandingan mana pun.',
    'wg.odds': 'x{n}',
    'wg.stake': 'PTAS',
    'wg.all': 'Semua',
    'wg.win': 'Kamu akan menang {n} PTAS',
    'wg.pickFirst': 'Pilih runner dan jumlah taruhan',
    'wg.bet': 'Pasang taruhan',
    'wg.yourBet': 'Kamu menaruh {n} PTAS pada {name} (x{odds})',
    'wg.status.open': 'Berlangsung',
    'wg.status.won': 'Menang: +{n} PTAS',
    'wg.status.lost': 'Kalah',
    'wg.status.void': 'Dibatalkan: PTAS dikembalikan',
    'wg.closed': 'Ditutup: pertandingan sudah dimulai',
    'wg.ended': 'Pertandingan selesai',
    'wg.shop.empty': 'Toko masih kosong.',
    'wg.shop.buy': 'Beli · {n} PTAS',
    'wg.shop.owned': 'Sudah jadi milikmu',
    'wg.shop.pending': 'Dibeli: segera dikirim',
    'wg.shop.delivered': 'Terkirim',
    'wg.shop.confirm': 'Beli "{name}" seharga {n} PTAS?',
    'wg.shop.kind.badge': 'Badge situs',
    'wg.shop.kind.discord_role': 'Role Discord',
    'wg.shop.kind.twitch_vip': 'VIP Twitch',
    'wg.rules.1': 'Setelah turnamen dimulai, kamu bisa mengklaim {n} PTAS setiap hari (sekali sehari, waktu Uruguay). Kalau dilewatkan, tidak menumpuk.',
    'wg.rules.2': 'Di setiap pertandingan kamu memilih satu runner dan jumlah PTAS yang ditaruhkan (minimal {m}). PTAS langsung dipotong dan kamu hanya bisa bertaruh sekali per pertandingan, sebelum dimulai.',
    'wg.rules.3': 'Odds berasal dari waktu kualifikasi: makin cepat seorang runner, makin besar peluang menangnya dan makin kecil bayarannya; yang kurang diunggulkan membayar lebih. Odds yang kamu lihat saat bertaruh dikunci.',
    'wg.rules.4': 'Kalau tebakanmu benar, kamu menerima taruhan dikali odds. Kalau salah, taruhan hilang. Kalau pertandingan dibatalkan, semuanya dikembalikan.',
    'wg.rules.5': 'Belanjakan PTAS di toko: badge di samping namamu, role Discord, atau VIP Twitch. Role dan VIP dikirim Joker secara manual.',
    'wg.rules.6': 'PTAS hanya uang permainan: tidak bisa dibeli, diuangkan, atau dikirim ke orang lain. Satu akun Discord, satu dompet.',
    'wg.err.daily_off': 'Bonus harian belum aktif: mulai saat turnamen dimulai.',
    'wg.err.funds': 'PTAS tidak cukup.',
    'wg.err.closed': 'Pertandingan itu sudah ditutup.',
    'wg.err.already_bet': 'Kamu sudah bertaruh di pertandingan itu.',
    'wg.err.min_bet': 'Taruhan minimal {n} PTAS.',
    'wg.err.inactive': 'Belum aktif.',
    'wg.err.already_claimed': 'Sudah diklaim hari ini: kembali besok.',
    'wg.err.already_owned': 'Kamu sudah memilikinya.',
    'wg.err.login': 'Kamu harus masuk dengan Discord.',
    'wg.err.no_market': 'Pertandingan itu belum dibuka untuk taruhan.',
    'wg.err.no_item': 'Barang itu sudah tidak ada.',
    'wg.err.pick': 'Pilih runner dulu.',
    'wg.err.generic': 'Terjadi kesalahan. Coba lagi sebentar lagi.',
    'wg.admin.on': 'Sistem AKTIF untuk semua orang.',
    'wg.admin.off': 'Sistem nonaktif untuk publik. Untuk mengaktifkan: update public.wager_config set active = true;',
    'wg.admin.sync': 'Sinkronkan pertandingan dan hasil',
    'wg.admin.synced': 'Tersinkron: {up} pertandingan dipublikasikan atau diperbarui, {st} diselesaikan.',
    'wg.admin.markets': '{n} pertandingan dipublikasikan',
    'wg.admin.pending': 'Pembelian yang perlu dikirim (role Discord / VIP Twitch)',
    'wg.admin.none': 'Tidak ada pembelian tertunda.',
    'wg.admin.done': 'Terkirim',
  },
  ja: {
    'nav.inicio': 'ホーム',
    'nav.home': 'ホームへ',
    'nav.sorteo': 'スケジュール',
    'nav.torneo': '大会',
    'intro.t1': 'スケジュール',
    'nav.grupos': 'グループ',
    'nav.brackets': 'ブラケット',
    'nav.simulations': 'シミュレーション',
    'nav.champions': '歴代大会',
    'nav.clips': 'クリップ',
    'nav.live': 'ライブ',
    'nav.donaciones': '寄付',
    'nav.organizadores': '運営',
    'nav.menu': 'メニューを開く',

    'hero.subtitle': 'コミュニティ主催の Resident Evil 4 スピードラン大会。',

    'countdown.label': '予選開始まで',
    'countdown.days': '日',
    'countdown.hours': '時間',
    'countdown.mins': '分',
    'countdown.secs': '秒',
    'countdown.open': '予選がスタートしました！',
    'countdown.datePrefix': '開始：',
    'countdown.closePrefix': '終了：',

    'facts.runners': 'runner',
    'facts.groups': 'グループ',
    'facts.qualify': '本戦直行',

    'trailer.title': 'Ditman Cup 2027 告知ビデオ',
    'trailer.yt': 'YouTubeで見る',
    'hero.emblemAlt': 'Ditman Cup 2027のエンブレム：リングの中の金のトロフィー',
    'intro.title': 'Ditman Cup 2027へようこそ',
    'intro.lead': '大会をフォローするために必要な情報を、すべてここに。',
    'intro.d1': '対戦相手と日程',
    'intro.d2': '上位8人は本戦直行 + 24人が3グループ',
    'intro.d3': 'Double eliminationで決勝まで',
    'intro.d4': 'フォーマットを実際に試してみよう',

    'sorteo.title': 'スケジュール',
    'sorteo.r1.l': '抽選する内容',
    'sorteo.r1.t': 'グループではなく、対戦カードを抽選します。グループは予選のランキングで決まり、抽選ではそのグループ内の対戦相手が決まります。',
    'sorteo.r2.l': '日時',
    'sorteo.r2.t': '各ラウンドの前に、前ラウンドの結果でrunnerがグループ間を移動したあと、ライブ抽選を行います。',
    'sorteo.r3.l': '場所',
    'sorteo.r3.t': 'twitch.tv/ditmancupでライブ配信。対戦カードは日時とともに下に表示されます。',
    'sorteo.r4.l': '上位8人',
    'sorteo.r4.t': 'グループステージを経ずにベスト16へ直行するため、抽選の対象外です。',
    'sched.title': 'スケジュール',
    'sched.round': 'ラウンド{n}',
    'sched.dateTbd': '日程未定',
    'sched.note1': 'グループは予選のランキングで決まります。',
    'sched.noteN': 'グループは前ラウンドの結果で決まります。',
    'sched.vs': 'vs',
    'sched.tzNote': '時刻はお使いのタイムゾーン（{tz}）で表示されます。',
    'donors.title': 'トップ寄付者',
    'donors.colName': '寄付者',
    'donors.colAmount': '寄付額',
    'donors.loading': '寄付者を読み込み中…',
    'donors.empty': 'まだ寄付者はいません。',
    'donors.error': '寄付者リストを読み込めませんでした。',
    'donors.total': '{amount} 集まりました · {n}人の寄付者',
    'donors.totalOne': '{amount} 集まりました · 1人の寄付者',
    'donors.thisTitle': 'この大会 · Ditman Cup {year}',
    'donors.allTimeTitle': '歴代トップ寄付者',
    'donors.curEmpty': 'この大会への寄付はまだありません。最初の寄付者になりましょう！',
    'donors.src': '出典：Matcherino · {years} 大会',
    'donors.thanks': 'ありがとうございます！',
    'donors.thanksGeneric': 'Ditman Cupを支えてくださったすべての寄付者の皆さまに感謝します。',
    'donors.thanksSub': 'Ditman Cupを支えてくださった{n}人の寄付者の皆さまに感謝します。',
    'visits.label': 'ページ閲覧数',

    'grupos.title': 'グループステージ',
    'grupos.loading': 'グループを読み込み中…',
    'grupos.sheetError': 'シートを読み込めませんでした。サンプルデータを表示しています。',
    'group.word': 'グループ',
    'group.tbd': '未定',
    'group.directTitle': '上位8人 — ベスト16へ直行',
    'group.directBadge': 'グループをスキップ',
    'group.directNote': '予選から直接勝ち上がり、ベスト16からブラケットに入ります。',
    'group.stageBadge': 'グループステージ',
    'group.stageTitle': '24 runner · 8人ずつ3グループ',
    'group.stageNote': 'ここで戦うのはこの24人です。対戦相手は各グループ内で抽選されます（大会 > スケジュール を参照）。',

    'brackets.title': 'ブラケット',
    'brackets.placeholder': 'グループステージ確定後に、トーナメント表が公開されます。',
    'brackets.previewNote': 'Double elimination · {n}人が出場。1回負けると敗者ブラケットへ、もう1回負けると敗退です。実際の対戦カードはグループステージ確定後に決まります。',
    'bracket.champion': '優勝',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.seedTag': 'シード{n}',
    'bracket.round.final': '決勝',
    'bracket.round.semi': '準決勝',
    'bracket.round.quarter': '準々決勝',
    'bracket.round.r16': 'ベスト16',
    'bracket.round.r32': 'ベスト32',
    'bracket.round.generic': 'ベスト{n}',
    'bracket.winners': '勝者ブラケット',
    'bracket.losers': '敗者ブラケット',
    'bracket.grandFinal': 'グランドファイナル',
    'bracket.grandFinalReset': 'グランドファイナル（リセット）',
    'sim.resetNote': 'リセット：敗者ブラケットの優勝者がグランドファイナルに勝ったため、勝者ブラケットの優勝者はまだ2回負けていません。もう一度グランドファイナルを行います。',
    'bracket.round.winnersFinal': '勝者決勝',
    'bracket.lr': '敗者ラウンド{n}',
    'bracket.losersSemi': '敗者準決勝',
    'bracket.losersFinal': '敗者決勝',
    'bracket.winnerOf': '勝者 M{n}',
    'bracket.loserOf': '敗者 M{n}',

    'clas.col.pos': '順位',
    'clas.col.runner': 'ランナー',
    'clas.col.group': 'グループ',
    'clas.col.time': 'ベストタイム',
    'clas.col.pts': 'Pts',

    'don.title': '寄付',
    'don.body': 'Ditman Cupはコミュニティの支援で成り立っています。賞金プールや大会運営費への支援は、こちらからお願いします：',
    'don.btn': '寄付する',
    'don.pool.title': '賞金プールと大会運営費',
    'don.me.title': '私を応援する',
    'don.me.body': 'これは完全に任意ですが、このウェブサイトを気に入っていただけたら、直接応援していただけると本当に嬉しいです。このコミュニティの一員でいてくれてありがとうございます！',
    'don.me.btn': 'JokerUYに寄付する',

    'org.title': '運営・スタッフ',
    'org.tier.organizers': '運営',
    'org.tier.mods': 'SRCモデレーター',
    'org.tier.helpers': 'ヘルパー・実況',
    'org.tier.design': 'アート・デザイン',
    'org.role.admin': '管理者',
    'org.role.mod': 'モデレーター',
    'org.role.helper': 'ヘルパー',
    'org.role.helperCaster': 'ヘルパー / 実況',
    'org.role.artDesign': 'アート・デザイン',
    'org.role.artDesignWeb': 'アート・デザイン、ウェブサイトデザイナー',

    'link.discord': 'Discord',
    'link.rules': 'ドキュメント',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',

    'champions.title': '歴代大会',
    'champions.edition': 'Ditman Cup {year}',
    'champions.donors': '寄付者',
    'champions.timeline': 'すべての寄付（時系列）',
    'champions.txToggle': '各寄付を表示',
    'champions.champion': '優勝',
    'champions.runnerUp': '準優勝',
    'champions.third': '3位',
    'champions.tbd': '未確定',
    'champions.vod': '決勝を見る',
    'champions.prize': '賞金プール',
    'champions.trophyTitle': 'トロフィー',
    'champions.trophyPending': 'Ditman Cup 2027 公式トロフィー。',
    'champions.viewData': 'すべてのデータを見る',
    'champions.modalHint': '大会スプレッドシートの元データです。',

    'clips.title': 'ベストクリップ',
    'clips.intro': '過去の大会やその他の大会からのハイライト。',
    'clips.empty': 'まだクリップが追加されていません。持っている方はDiscordで共有してください。',

    'live.title': 'RE4 runnerライブ',
    'live.intro': 'いま Resident Evil 4 の run や glitch hunting をしているコミュニティチャンネル。',
    'live.on': 'ライブ',
    'live.off': 'オフライン',
    'live.none': 'リストのチャンネルで、いま Resident Evil 4 を配信している人はいません。',
    'live.otherGame': 'Live · 別のゲーム',
    'live.play': '配信を再生：',
    'live.watch': 'Twitchで見る',
    'live.watchYt': 'YouTubeで見る',
    'live.watchKick': 'Kickで見る',
    'live.watchTt': 'TikTokで見る',
    'live.ttNote': 'TikTokのライブは自動で検出できないため、TikTokで配信する人はバイオハザード4をプレイ中のみ、ここで自分で「配信中」に設定します。',
    'live.ttLogin': 'Discordでログイン',
    'live.ttPick': 'あなたのTikTok',
    'live.ttGo': 'TikTokで配信中',
    'live.ttMine': '@{name} として {time} まで配信中に設定済み',
    'live.ttEnd': '配信終了',
    'live.ttBusy': 'そのTikTokはすでに他の人が選択しています。あなたのものならJokerに連絡してください。',
    'live.ttYours': 'あなたのTikTok: @{name}',
    'live.ttClaim': 'このTikTokを選ぶ',
    'live.ttLockNote': 'あなたのTikTokを選んでください。持っている間は他の人は使えません。いつでも解除できます。',
    'live.ttConfirm': '@{name} を選びますか？解除するまで、他の人は使えません。',
    'live.ttRelease': 'TikTokを解除',
    'live.ttClaimed': '選択済みのTikTok。選んだ本人のものでない場合はJokerに連絡してください:',
    'live.ttBy': '{name} が選択',
    'live.ttErr': '保存できませんでした。もう一度お試しください。',
    'nav.predictions': '予想',
    'pred.title': '予想',
    'pred.intro': 'Ditman Cup の勝敗予想ゲーム。各マッチの勝者と、自信があればタイム差も予想しよう。ポイントを稼いでリーダーボードを駆け上がろう。',
    'pred.sub.picks': 'マイ予想',
    'pred.sub.board': 'リーダーボード',
    'pred.sub.rules': 'ルール',
    'pred.login': 'Discordでログイン',
    'pred.logout': 'ログアウト',
    'pred.hello': '{name} としてプレイ中',
    'pred.needLogin': 'Discordでログインすると、予想が保存されリーダーボードに載ります。',
    'pred.local': 'ローカルモード：予想はこのブラウザにのみ保存されます。共有リーダーボードはまだ接続されていません。',
    'pred.myPts': 'ポイント',
    'pred.myHits': '的中',
    'pred.myRank': '順位',
    'pred.noMatches': 'スケジュールが発表されると、ここにマッチが表示されます。',
    'pred.timeTbd': '時間未定',
    'pred.underdog': 'アンダードッグ',
    'pred.underdogTip': '予選の順位が低い方：勝つと高得点',
    'pred.diffLabel': 'タイム差（任意）',
    'pred.saving': '保存中…',
    'pred.saved': '保存しました ✓',
    'pred.saveError': '保存できませんでした。もう一度お試しください。',
    'pred.closed': '締め切り',
    'pred.noPick': '予想なし',
    'pred.yourPick': 'あなたの予想：{name}',
    'pred.gap': '差 {d}',
    'pred.pts': '{n} pt',
    'pred.kind.diff': '勝者＋タイム差',
    'pred.kind.underdog': 'underdog 勝者',
    'pred.kind.winner': '勝者',
    'pred.kind.miss': '不的中',
    'pred.board.player': 'プレイヤー',
    'pred.board.hits': '的中',
    'pred.board.pts': 'pt',
    'pred.board.loading': 'リーダーボードを読み込み中…',
    'pred.board.error': 'リーダーボードを読み込めませんでした。しばらくしてからもう一度お試しください。',
    'pred.board.empty': 'まだポイントがありません。最初の結果が入るとリーダーボードが埋まります。',
    'pred.board.local': '共有リーダーボードはまだ接続されていません。',
    'pred.rules.1': '各マッチの開始前に勝者を選びます。レースが始まるまで予想は変更できます。',
    'pred.rules.2': '勝者のみ的中：{n} pt。',
    'pred.rules.3': '勝者が的中し、それが underdog（予選順位が低い方のランナー）だった場合：{n} pt。',
    'pred.rules.4': '勝者に加えてタイム差も的中（レースの結果が、入力したタイム差の前後 {s} 秒以内）：{n} pt。',
    'pred.rules.5': '1マッチの最大は {n} pt で、ポイントは加算されません。タイム差の入力は任意です。',
    'live.checking': 'チャンネルを確認中…',

    'footer.text': 'Ditman Cup 2027 · コミュニティのために',
    'footer.credit': 'ウェブサイト制作',

    'sim.title': 'シミュレーター — Nations League形式',
    'sim.r1.l': '直行',
    'sim.r1.t': '予選の上位8人はグループステージを飛ばして、ベスト16へ直行します。',
    'sim.r2.l': 'グループ',
    'sim.r2.t': '残りの24人が8人ずつ3グループに分かれ、4ラウンド戦います。1ラウンドにつき、自分のグループ内でBO1を1試合。',
    'sim.r3.l': '移動',
    'sim.r3.t': '勝てば1つ上のグループへ、負ければ1つ下のグループへ移動します。',
    'sim.r4.l': 'ポイント',
    'sim.r4.t': '勝利：グループ1で2pt、グループ2と3で1pt。30秒未満の差で敗れた場合はボーナス +1（グループ1）または +0.5（グループ2と3）。',
    'sim.r5.l': '勝ち上がり',
    'sim.r5.t': '4ラウンド終了後、ポイント上位8人がベスト16に進出します。同点の場合は、ベスト2レースの平均タイムで決まります。',
    'sim.r6.l': '対戦',
    'sim.r6.t': '一緒に降格する4人は次のラウンドで対戦できません。グループ2または3に昇格する4人も同様です。グループ1に昇格する人にはこの制限がなく、グループ1に残った人同士も対戦できます。同じ相手と2度当たることもありません。',
    'sim.proposal': 'フォーマット案 — まだ確定ではありません。',
    'sim.dateBadge': 'ラウンド',
    'sim.btnNext': '次のラウンドをシミュレート',
    'sim.btnNext5': '最後までシミュレート',
    'sim.btnReset': 'リセット',
    'sim.legendQualified': 'ベスト16進出（グループの上位8人）',
    'sim.legendEliminated': '敗退',
    'sim.directTag': '本戦直行',
    'sim.directTitle': '上位8人 — ベスト16へ直行',
    'sim.directNote': '予選タイム上位8人はグループステージを完全にスキップし、ベスト16に直接シードされます。',
    'sim.logColGroup': 'グループ',
    'sim.logColWinner': '勝者',
    'sim.logColLoser': '敗者',
    'sim.logColMargin': '差',
    'sim.logColMove': '移動',
    'sim.stays': 'グループ{g}に残留',
    'sim.movesUp': 'グループ{g}に昇格',
    'sim.movesDown': 'グループ{g}に降格',
    'sim.swapTitle': '自分で試す：runnerを控えと入れ替える',
    'sim.swapNote': 'シミュレーターの32人に入っていないけれど、自分ならどうなるか見てみたい場合は、入れ替える相手を選んで参加してみましょう（控えのいずれかでもOK：PBが1:30:00未満で、直近1年以内に走った人）。名前とPBを手入力することもできます。ロースターはPB順に並べ直され、シミュレーターは最初からやり直しになります。',
    'sim.swapOut': '交代される人',
    'sim.swapIn': '交代で入る人',
    'sim.swapCustom': 'その他（名前とPBを入力）…',
    'sim.swapName': '名前',
    'sim.swapPb': 'PB (H:MM:SS.cc)',
    'sim.swapApply': '入れ替える',
    'sim.swapRestore': '元のロースターに戻す',
    'sim.swapBadName': '名前を入力してください（24文字まで）。',
    'sim.swapBadPb': 'PBはH:MM:SSまたはH:MM:SS.cc形式で、1:00:00〜2:30:00の範囲で入力してください（例：1:25:30.45）。',
    'sim.swapDup': 'その名前はすでにシミュレーターに入っています。',
    'sim.swapDone': '{name}が{out}に代わってシミュレーターに参加しました。PB順に並べ直して、最初からやり直します。',
    'sim.swapRestored': '元のロースターに戻しました。',
    'sim.group1': 'グループ1',
    'sim.group2': 'グループ2',
    'sim.group3': 'グループ3',
    'sim.runnersCount': '{n} runner',
    'sim.thRunner': 'ランナー',
    'sim.thPB': 'PB',
    'sim.thPts': 'Pts',
    'sim.thBest': 'ベストタイム',
    'sim.thBestAvg': 'ベスト平均タイム',
    'sim.thHistory': '履歴',
    'sim.rankingTitle': 'グループステージ順位 — ポイントのみで並び替え',
    'sim.rankingNote': 'グループステージの24人を1つの表にまとめ、ポイントの高い順に並べています（グループ内の同点処理や個別の表はありません）。上位8人が、直行の上位8人とともにベスト16に進みます。',
    'sim.logTitleEmpty': 'まだラウンドが行われていません',
    'sim.logTitle': 'ラウンド{n} 結果',
    'sim.logTitleFinal': 'ラウンド{n} 結果（最終）',
    'sim.bracketTitle': 'ベスト16',
    'sim.wbTitle': 'Double elimination — プレイしてみよう',
    'sim.wbNote': 'ベスト16と準々決勝：最初のレースの差が2:00以上なら、それが唯一のレース（BO1）。そうでなければBO3になります。準決勝と決勝は常にBO3、グランドファイナルはBO5です。1回負けると敗者ブラケットへ、もう1回負けると敗退です。グランドファイナルで敗者ブラケットの優勝者が勝った場合は、もう一度グランドファイナル（リセット）をBO5で行います。',
    'sim.btnWbNext': '{round}をプレイ',
    'sim.wbDone': '大会終了',
    'sim.btnWbEverything': 'グランドファイナルまですべてプレイ',
    'sim.champion': 'Ditman Cup 優勝者',
    'sim.btnWbAll': '勝者決勝までプレイ',
    'sim.btnWbReset': '結果をリセット',
    'sim.wbChamp': '勝者ブラケット優勝 — そのままグランドファイナルへ',
    'sim.bracketLocked': '4ラウンドをすべて終えると、ベスト16の抽選が解放されます。',
    'sim.bracketExplainer': '直行の上位8人は従来のシード配置を維持します（準決勝より前にお互いが当たることはありません）。グループステージを勝ち上がった8人と抽選で組み合わせ、ブラケットを完成させましょう。',
    'sim.btnDrawNext': '次を抽選',
    'sim.btnDrawAll': 'すべて抽選',
    'sim.btnDrawReset': '抽選をリセット',
    'sim.sideA': 'サイドA',
    'sim.sideB': 'サイドB',
    'sim.seedTag': 'Top {n}',
    'sim.pending': '抽選待ち',
    'sim.footer': 'サンプルデータによるシミュレーションです。フォーマットの説明が目的で、実際の結果を予測するものではありません。',
    'sim.doneLabel': '大会終了',

    'testmode': 'テストモード · ダミーデータ',
    'nav.jugar': 'プレイ',
    'nav.comunidad': 'コミュニティ',
    'nav.wager': 'Merchant\'s Wager',
    'wg.title': 'Merchant\'s Wager',
    'wg.intro': 'ペセタ（PTAS）を試合に賭けて、毎日のボーナスを受け取り、商人のショップで使いましょう。',
    'wg.soon': '商人はまだ店を開いていません。もう少しお待ちください。',
    'wg.inactive': 'あなた（管理者）にだけ表示されています。他の人にはまだ有効になっていません。',
    'wg.needLogin': 'Discordでログインして、PTASを集めましょう。',
    'wg.daily': '今日の{n} PTASを受け取る',
    'wg.dailyDone': '今日はすでに受け取り済み',
    'wg.dailySoon': 'デイリーボーナス：大会開始から',
    'wg.sound': 'サウンドと音楽',
    'wg.item.discord-role.name': 'Discordロール',
    'wg.item.discord-role.desc': 'Discordサーバーの限定ロール。',
    'wg.item.twitch-vip.name': 'Twitch VIP',
    'wg.item.twitch-vip.desc': 'TwitchチャンネルのVIP。',
    'wg.sub.bets': 'ベット',
    'wg.sub.mine': 'マイベット',
    'wg.sub.shop': 'ショップ',
    'wg.sub.board': 'ランキング',
    'wg.sub.rules': 'ルール',
    'wg.sub.admin': '管理',
    'wg.noMarkets': 'ベットできる試合はまだありません。スケジュール発表後に表示されます。',
    'wg.noBets': 'まだどの試合にもベットしていません。',
    'wg.odds': 'x{n}',
    'wg.stake': 'PTAS',
    'wg.all': '全部',
    'wg.win': '{n} PTAS獲得できます',
    'wg.pickFirst': 'ランナーと金額を選んでください',
    'wg.bet': 'ベットする',
    'wg.yourBet': '{name}に{n} PTASをベット（x{odds}）',
    'wg.status.open': '進行中',
    'wg.status.won': '的中：+{n} PTAS',
    'wg.status.lost': 'はずれ',
    'wg.status.void': '無効：PTASは返却されました',
    'wg.closed': '締切：試合はすでに始まっています',
    'wg.ended': '試合終了',
    'wg.shop.empty': 'ショップは今のところ空です。',
    'wg.shop.buy': '購入 · {n} PTAS',
    'wg.shop.owned': '所持済み',
    'wg.shop.pending': '購入済み：まもなくお届けします',
    'wg.shop.delivered': '配布済み',
    'wg.shop.confirm': '「{name}」を{n} PTASで購入しますか？',
    'wg.shop.kind.badge': 'サイトのバッジ',
    'wg.shop.kind.discord_role': 'Discordロール',
    'wg.shop.kind.twitch_vip': 'Twitch VIP',
    'wg.rules.1': '大会が始まると、毎日{n} PTASを受け取れます（1日1回、ウルグアイ時間）。受け取らなかった日の分は繰り越されません。',
    'wg.rules.2': '各試合でランナーを1人選び、賭けるPTASを決めます（最低{m}）。PTASはその場で引かれ、1試合につき開始前に1回だけベットできます。',
    'wg.rules.3': 'オッズは予選タイムから決まります。速かったランナーほど勝つ確率が高く、配当は小さくなります。アンダードッグは配当が大きくなります。ベット時に表示されたオッズは固定されます。',
    'wg.rules.4': '的中すると賭けたPTASにオッズを掛けた分を受け取り、はずれると賭けたPTASを失います。試合が無効になった場合は全額返却されます。',
    'wg.rules.5': 'PTASはショップで、名前の横のバッジ、Discordロール、Twitch VIPと交換できます。ロールとVIPはJokerが手動で付与します。',
    'wg.rules.6': 'PTASはゲーム内通貨です。購入、換金、他の人への譲渡はできません。Discordアカウント1つにつきウォレット1つです。',
    'wg.err.daily_off': 'デイリーボーナスはまだ有効ではありません。大会開始から利用できます。',
    'wg.err.funds': 'PTASが足りません。',
    'wg.err.closed': 'その試合はすでに締め切られています。',
    'wg.err.already_bet': 'その試合にはすでにベットしています。',
    'wg.err.min_bet': '最低ベットは{n} PTASです。',
    'wg.err.inactive': 'まだ有効ではありません。',
    'wg.err.already_claimed': '今日はすでに受け取り済みです。また明日。',
    'wg.err.already_owned': 'すでに持っています。',
    'wg.err.login': 'Discordでログインしてください。',
    'wg.err.no_market': 'その試合はまだベットできません。',
    'wg.err.no_item': 'そのアイテムはもうありません。',
    'wg.err.pick': '先にランナーを選んでください。',
    'wg.err.generic': 'うまくいきませんでした。少し待ってからもう一度お試しください。',
    'wg.admin.on': 'システムは全員に有効です。',
    'wg.admin.off': 'システムは一般には無効です。有効にするには: update public.wager_config set active = true;',
    'wg.admin.sync': '試合と結果を同期',
    'wg.admin.synced': '同期完了：{up}試合を公開・更新、{st}試合を精算。',
    'wg.admin.markets': '{n}試合を公開中',
    'wg.admin.pending': '配布待ちの購入（Discordロール / Twitch VIP）',
    'wg.admin.none': '保留中の購入はありません。',
    'wg.admin.done': '配布済み',
  },
  pt: {
    'nav.inicio': 'Início',
    'nav.home': 'Ir para o início',
    'nav.sorteo': 'Calendário',
    'nav.torneo': 'Torneio',
    'nav.jugar': 'Jogar',
    'nav.comunidad': 'Comunidade',
    'intro.t1': 'Calendário',
    'nav.grupos': 'Grupos',
    'nav.brackets': 'Chaves',
    'nav.simulations': 'Simulações',
    'nav.champions': 'História',
    'nav.clips': 'Clipes',
    'nav.live': 'Ao vivo',
    'nav.donaciones': 'Doações',
    'nav.organizadores': 'Organizadores',
    'nav.menu': 'Abrir menu',
    'hero.subtitle': 'Torneio comunitário de speedrun de Resident Evil 4.',
    'countdown.label': 'Faltam para abrirem as classificatórias',
    'countdown.days': 'dias',
    'countdown.hours': 'horas',
    'countdown.mins': 'min',
    'countdown.secs': 'seg',
    'countdown.open': 'As classificatórias já estão abertas!',
    'countdown.datePrefix': 'Abertura:',
    'countdown.closePrefix': 'Encerramento:',
    'facts.runners': 'corredores',
    'facts.groups': 'grupos',
    'facts.qualify': 'classificam direto',
    'trailer.title': 'Ditman Cup 2027: vídeo de anúncio',
    'trailer.yt': 'Ver no YouTube',
    'hero.emblemAlt': 'Emblema da Ditman Cup 2027: o troféu dourado dentro de um aro',
    'intro.title': 'Bem-vindos à Ditman Cup 2027',
    'intro.lead': 'Tudo para acompanhar o torneio, em um só lugar.',
    'intro.d1': 'Contra quem você joga e quando',
    'intro.d2': 'Top 8 direto + 24 em 3 grupos',
    'intro.d3': 'Dupla eliminação até a final',
    'intro.d4': 'Teste o formato você mesmo',
    'sorteo.title': 'Calendário',
    'sorteo.r1.l': 'O que é sorteado',
    'sorteo.r1.t': 'Não os grupos: os confrontos. Seu grupo sai do ranking das classificatórias e o sorteio define contra quem você joga dentro dele.',
    'sorteo.r2.l': 'Quando',
    'sorteo.r2.t': 'Um novo sorteio ao vivo antes de cada rodada, depois que os resultados anteriores já moveram os corredores entre os grupos.',
    'sorteo.r3.l': 'Onde',
    'sorteo.r3.t': 'Ao vivo em twitch.tv/ditmancup. Os confrontos aparecem abaixo com dia e hora.',
    'sorteo.r4.l': 'Top 8',
    'sorteo.r4.t': 'Vão direto para as oitavas de final: não jogam a fase de grupos, então não entram no sorteio.',
    'sched.title': 'Calendário',
    'sched.round': 'Rodada {n}',
    'sched.dateTbd': 'Data a confirmar',
    'sched.note1': 'Os grupos saem do ranking das classificatórias.',
    'sched.noteN': 'Os grupos são montados com os resultados da rodada anterior.',
    'sched.vs': 'vs',
    'sched.tzNote': 'Horários no seu fuso horário ({tz}).',
    'donors.title': 'Maiores doadores',
    'donors.colName': 'Doador',
    'donors.colAmount': 'Doado',
    'donors.loading': 'Carregando doadores…',
    'donors.empty': 'Ainda não há doadores.',
    'donors.error': 'Não foi possível carregar a lista de doadores.',
    'donors.total': '{amount} arrecadados · {n} doadores',
    'donors.totalOne': '{amount} arrecadados · 1 doador',
    'donors.thisTitle': 'Este torneio · Ditman Cup {year}',
    'donors.allTimeTitle': 'Maiores de todos os tempos',
    'donors.curEmpty': 'Ainda não há doações para este torneio. Seja o primeiro!',
    'donors.src': 'Fonte: Matcherino · edições {years}',
    'donors.thanks': 'Obrigado!',
    'donors.thanksGeneric': 'Obrigado a todos que apoiaram a Ditman Cup.',
    'donors.thanksSub': 'Obrigado aos nossos {n} doadores por apoiarem a Ditman Cup.',
    'visits.label': 'Visitas à página',
    'grupos.title': 'Fase de grupos',
    'grupos.loading': 'Carregando grupos…',
    'grupos.sheetError': 'Não foi possível carregar a planilha. Mostrando dados de exemplo.',
    'group.word': 'Grupo',
    'group.tbd': 'A definir',
    'group.directTitle': 'Top 8 — direto para as oitavas',
    'group.directBadge': 'Não jogam grupos',
    'group.directNote': 'Classificaram direto pelas classificatórias: entram na chave nas oitavas de final.',
    'group.stageBadge': 'Fase de grupos',
    'group.stageTitle': '24 corredores · 3 grupos de 8',
    'group.stageNote': 'Esses jogam: os confrontos são sorteados dentro de cada grupo (veja Torneio > Calendário).',
    'brackets.title': 'Chaves',
    'brackets.placeholder': 'A chave eliminatória é montada quando a fase de grupos terminar.',
    'brackets.previewNote': 'Dupla eliminação · {n} classificados. Se você perder uma vez, cai para a chave dos perdedores; se perder de novo, está eliminado. Os confrontos reais são definidos ao fim da fase de grupos.',
    'bracket.champion': 'Campeão/ã',
    'bracket.tbd': '—',
    'bracket.bye': 'BYE',
    'bracket.seedTag': 'Seed {n}',
    'bracket.round.final': 'Final',
    'bracket.round.semi': 'Semifinal',
    'bracket.round.quarter': 'Quartas de final',
    'bracket.round.r16': 'Oitavas de final',
    'bracket.round.r32': '16-avos de final',
    'bracket.round.generic': 'Rodada de {n}',
    'bracket.winners': 'Chave dos vencedores',
    'bracket.losers': 'Chave dos perdedores',
    'bracket.grandFinal': 'Grande final',
    'bracket.grandFinalReset': 'Grande final (reset)',
    'sim.resetNote': 'Reset: o campeão da chave dos perdedores venceu a grande final e o campeão da chave dos vencedores ainda não perdeu duas vezes. Será disputada outra grande final.',
    'bracket.round.winnersFinal': 'Final dos vencedores',
    'bracket.lr': 'Rodada dos perdedores {n}',
    'bracket.losersSemi': 'Semifinal dos perdedores',
    'bracket.losersFinal': 'Final dos perdedores',
    'bracket.winnerOf': 'Vencedor M{n}',
    'bracket.loserOf': 'Perdedor M{n}',
    'clas.col.pos': 'Pos',
    'clas.col.runner': 'Corredor',
    'clas.col.group': 'Grupo',
    'clas.col.time': 'Melhor tempo',
    'clas.col.pts': 'Pts',
    'don.title': 'Doações',
    'don.body': 'A Ditman Cup se sustenta graças à comunidade. Se você quiser ajudar com os prêmios e os custos do torneio, pode fazer isso aqui:',
    'don.btn': 'Doar',
    'don.pool.title': 'Premiação e custos do torneio',
    'don.me.title': 'Apoie a mim',
    'don.me.body': 'Isso é totalmente opcional, mas se você gosta da página e quer me apoiar diretamente, eu agradeço muito. Obrigado por fazer parte desta comunidade!',
    'don.me.btn': 'Doar para o JokerUY',
    'org.title': 'Organização e staff',
    'org.tier.organizers': 'Organizadores',
    'org.tier.mods': 'Moderadores do SRC',
    'org.tier.helpers': 'Ajudantes e comentaristas',
    'org.tier.design': 'Arte e design',
    'org.role.admin': 'Admin',
    'org.role.mod': 'Moderador',
    'org.role.helper': 'Ajudante',
    'org.role.helperCaster': 'Ajudante / Comentarista',
    'org.role.artDesign': 'Arte e design',
    'org.role.artDesignWeb': 'Arte e design, Designer web',
    'link.discord': 'Discord',
    'link.rules': 'Documento',
    'link.youtube': 'YouTube',
    'link.twitch': 'Twitch',
    'champions.title': 'História',
    'champions.edition': 'Ditman Cup {year}',
    'champions.donors': 'Doadores',
    'champions.timeline': 'Todas as doações (cronologia)',
    'champions.txToggle': 'Ver cada doação',
    'champions.champion': 'Campeão',
    'champions.runnerUp': '2º lugar',
    'champions.third': '3º lugar',
    'champions.tbd': 'A confirmar',
    'champions.vod': 'Ver a final',
    'champions.prize': 'Premiação',
    'champions.trophyTitle': 'O troféu',
    'champions.trophyPending': 'O troféu oficial da Ditman Cup 2027.',
    'champions.viewData': 'Ver todos os dados',
    'champions.modalHint': 'Dados originais da planilha do torneio.',
    'clips.title': 'Melhores clipes',
    'clips.intro': 'Momentos marcantes de edições e torneios anteriores.',
    'clips.empty': 'Ainda não há clipes carregados. Tem algum? Mande pelo Discord.',
    'live.title': 'Corredores de RE4 ao vivo',
    'live.intro': 'Canais da comunidade que estão fazendo speedrun ou caçando glitches em Resident Evil 4 agora mesmo.',
    'live.on': 'AO VIVO',
    'live.off': 'Offline',
    'live.none': 'Nenhum canal da lista está jogando Resident Evil 4 neste momento.',
    'live.otherGame': 'Ao vivo · outro jogo',
    'live.play': 'Reproduzir a stream de',
    'live.watch': 'Assistir na Twitch',
    'live.watchYt': 'Assistir no YouTube',
    'live.watchKick': 'Assistir na Kick',
    'live.watchTt': 'Assistir no TikTok',
    'live.ttNote': 'O TikTok não permite detectar lives automaticamente: quem transmite pelo TikTok se marca aqui mesmo, e só quando joga Resident Evil 4.',
    'live.ttLogin': 'Entrar com o Discord',
    'live.ttPick': 'Seu TikTok',
    'live.ttGo': 'Estou ao vivo no TikTok',
    'live.ttMine': 'Marcado ao vivo como @{name} até as {time}',
    'live.ttEnd': 'Já terminei',
    'live.ttBusy': 'Esse TikTok já foi escolhido por outra pessoa. Se for seu, avise o Joker.',
    'live.ttYours': 'Seu TikTok: @{name}',
    'live.ttClaim': 'Escolher este TikTok',
    'live.ttLockNote': 'Escolha o seu TikTok. Enquanto estiver com você, ninguém mais pode usá-lo. Você pode soltá-lo quando quiser.',
    'live.ttConfirm': 'Escolher @{name}? Ninguém mais poderá usá-lo até você soltar.',
    'live.ttRelease': 'Soltar meu TikTok',
    'live.ttClaimed': 'TikToks já escolhidos. Se algum não for de quem o escolheu, avise o Joker:',
    'live.ttBy': 'escolhido por {name}',
    'live.ttErr': 'Não foi possível salvar. Tente de novo.',
    'nav.predictions': 'Palpites',
    'pred.title': 'Palpites',
    'pred.intro': 'O bolão da Ditman Cup: dê seu palpite no vencedor de cada partida e, se tiver coragem, na diferença de tempo. Some pontos e suba no ranking.',
    'pred.sub.picks': 'Meus palpites',
    'pred.sub.board': 'Ranking',
    'pred.sub.rules': 'Regras',
    'pred.login': 'Entrar com o Discord',
    'pred.logout': 'Sair',
    'pred.hello': 'Jogando como {name}',
    'pred.needLogin': 'Entre com o Discord para salvar seus palpites e aparecer no ranking.',
    'pred.local': 'Modo local: seus palpites ficam salvos só neste navegador. O ranking compartilhado ainda não está conectado.',
    'pred.myPts': 'pontos',
    'pred.myHits': 'acertos',
    'pred.myRank': 'no ranking',
    'pred.noMatches': 'As partidas aparecem aqui assim que o calendário for anunciado.',
    'pred.timeTbd': 'Horário a definir',
    'pred.underdog': 'Zebra',
    'pred.underdogTip': 'Pior colocação na classificatória: se ganhar, vale mais',
    'pred.diffLabel': 'Diferença de tempo (opcional)',
    'pred.saving': 'Salvando…',
    'pred.saved': 'Salvo ✓',
    'pred.saveError': 'Não foi possível salvar. Tente de novo.',
    'pred.closed': 'Encerrada',
    'pred.noPick': 'Sem palpite',
    'pred.yourPick': 'Seu palpite: {name}',
    'pred.gap': 'diferença {d}',
    'pred.pts': '{n} pts',
    'pred.kind.diff': 'vencedor + diferença',
    'pred.kind.underdog': 'acertou a zebra',
    'pred.kind.winner': 'vencedor',
    'pred.kind.miss': 'errou',
    'pred.board.player': 'Jogador',
    'pred.board.hits': 'Acertos',
    'pred.board.pts': 'Pts',
    'pred.board.loading': 'Carregando o ranking…',
    'pred.board.error': 'Não foi possível carregar o ranking. Tente de novo daqui a pouco.',
    'pred.board.empty': 'Ainda não há pontos. O ranking se enche quando os primeiros resultados forem carregados.',
    'pred.board.local': 'O ranking compartilhado ainda não está conectado.',
    'pred.rules.1': 'Escolha o vencedor de cada partida antes de ela começar. Você pode mudar sua escolha até a corrida começar.',
    'pred.rules.2': 'Acertou só o vencedor: {n} pts.',
    'pred.rules.3': 'Acertou o vencedor e era a zebra (o corredor com pior colocação na classificatória): {n} pts.',
    'pred.rules.4': 'Acertou o vencedor e também a diferença de tempo (a corrida termina com uma diferença de até {s} segundos para mais ou para menos do que você indicou): {n} pts.',
    'pred.rules.5': 'O máximo por partida é {n} pts e os pontos não se acumulam. A diferença de tempo é opcional.',
    'nav.wager': 'Merchant\'s Wager',
    'wg.title': 'Merchant\'s Wager',
    'wg.intro': 'Aposte suas Pesetas (PTAS) nas partidas, receba o bônus de cada dia e gaste na loja do Mercador.',
    'wg.soon': 'O Mercador ainda não abriu a loja. Volte em breve.',
    'wg.inactive': 'Só você (admin) está vendo isto: ainda não está ativo para os outros.',
    'wg.needLogin': 'Entre com o Discord para jogar e juntar PTAS.',
    'wg.daily': 'Receber as {n} PTAS de hoje',
    'wg.dailyDone': 'Você já recebeu hoje',
    'wg.sound': 'Som e música',
    'wg.item.discord-role.name': 'Cargo no Discord',
    'wg.item.discord-role.desc': 'Cargo exclusivo no servidor do Discord.',
    'wg.item.twitch-vip.name': 'VIP na Twitch',
    'wg.item.twitch-vip.desc': 'VIP no canal da Twitch.',
    'wg.dailySoon': 'Bônus diário: a partir do início do torneio',
    'wg.sub.bets': 'Apostas',
    'wg.sub.mine': 'Minhas apostas',
    'wg.sub.shop': 'Loja',
    'wg.sub.board': 'Ranking',
    'wg.sub.rules': 'Regras',
    'wg.sub.admin': 'Admin',
    'wg.noMarkets': 'Ainda não há partidas para apostar. Elas aparecem quando o calendário for anunciado.',
    'wg.noBets': 'Você ainda não apostou em nenhuma partida.',
    'wg.odds': 'x{n}',
    'wg.stake': 'PTAS',
    'wg.all': 'Tudo',
    'wg.win': 'Você ganharia {n} PTAS',
    'wg.pickFirst': 'Escolha um corredor e quanto apostar',
    'wg.bet': 'Apostar',
    'wg.yourBet': 'Você apostou {n} PTAS em {name} (x{odds})',
    'wg.status.open': 'Em andamento',
    'wg.status.won': 'Ganhou: +{n} PTAS',
    'wg.status.lost': 'Perdeu',
    'wg.status.void': 'Anulada: devolvemos suas PTAS',
    'wg.closed': 'Encerrada: a partida já começou',
    'wg.ended': 'Partida finalizada',
    'wg.shop.empty': 'A loja está vazia por enquanto.',
    'wg.shop.buy': 'Comprar · {n} PTAS',
    'wg.shop.owned': 'Já é seu',
    'wg.shop.pending': 'Comprado: entregamos em breve',
    'wg.shop.delivered': 'Entregue',
    'wg.shop.confirm': 'Comprar "{name}" por {n} PTAS?',
    'wg.shop.kind.badge': 'Emblema da página',
    'wg.shop.kind.discord_role': 'Cargo no Discord',
    'wg.shop.kind.twitch_vip': 'VIP da Twitch',
    'wg.rules.1': 'A partir do início do torneio você pode receber {n} PTAS por dia (uma vez por dia, horário do Uruguai). Se não receber, não acumula.',
    'wg.rules.2': 'Em cada partida você escolhe um corredor e quantas PTAS apostar (mínimo {m}). Elas são descontadas na hora e você só pode apostar uma vez por partida, antes de ela começar.',
    'wg.rules.3': 'A cotação vem dos tempos da classificatória: quanto mais rápido foi um corredor, mais provável é que ele ganhe e menos ele paga; a zebra paga mais. A cotação que você vê ao apostar fica fixa.',
    'wg.rules.4': 'Se você acertar, recebe o valor apostado multiplicado pela cotação. Se errar, perde o que apostou. Se uma partida for anulada, tudo é devolvido.',
    'wg.rules.5': 'Com as PTAS você compra na loja: emblemas para o seu nome, um cargo no Discord ou o VIP da Twitch. Os cargos e o VIP são entregues pelo Joker manualmente.',
    'wg.rules.6': 'As PTAS são só de jogo: não podem ser compradas, trocadas por dinheiro nem passadas para outra pessoa. Uma conta do Discord, uma carteira.',
    'wg.err.daily_off': 'O bônus diário ainda não está ativo: começa com o torneio.',
    'wg.err.funds': 'Você não tem PTAS suficientes.',
    'wg.err.closed': 'Essa partida já está encerrada.',
    'wg.err.already_bet': 'Você já apostou nessa partida.',
    'wg.err.min_bet': 'A aposta mínima é {n} PTAS.',
    'wg.err.inactive': 'Ainda não está ativo.',
    'wg.err.already_claimed': 'Você já recebeu hoje: volte amanhã.',
    'wg.err.already_owned': 'Você já tem isso.',
    'wg.err.login': 'Você precisa entrar com o Discord.',
    'wg.err.no_market': 'Essa partida não está liberada para apostas.',
    'wg.err.no_item': 'Esse item não está mais disponível.',
    'wg.err.pick': 'Primeiro escolha um corredor.',
    'wg.err.generic': 'Não foi possível. Tente de novo em um momento.',
    'wg.admin.on': 'O sistema está ATIVO para todos.',
    'wg.admin.off': 'O sistema está desligado para o público. Para ativar: update public.wager_config set active = true;',
    'wg.admin.sync': 'Sincronizar partidas e resultados',
    'wg.admin.synced': 'Sincronizado: {up} partidas publicadas ou atualizadas, {st} liquidadas.',
    'wg.admin.markets': '{n} partidas publicadas',
    'wg.admin.pending': 'Compras a entregar (cargo no Discord / VIP da Twitch)',
    'wg.admin.none': 'Não há compras pendentes.',
    'wg.admin.done': 'Entregue',
    'live.checking': 'Verificando canais…',
    'footer.text': 'Ditman Cup 2027 · Feito para a comunidade',
    'footer.credit': 'Site por',
    'sim.title': 'Simulador — formato tipo Nations League',
    'sim.r1.l': 'Direto',
    'sim.r1.t': 'O Top 8 das classificatórias não joga a fase de grupos e vai direto para as oitavas de final.',
    'sim.r2.l': 'Grupos',
    'sim.r2.t': 'Os outros 24 jogam 3 grupos de 8 em 4 rodadas. Uma BO1 por rodada, dentro do seu grupo.',
    'sim.r3.l': 'Movimentação',
    'sim.r3.t': 'Se você ganhar, sobe de grupo. Se perder, desce.',
    'sim.r4.l': 'Pontos',
    'sim.r4.t': 'Vitória: 2 pts no Grupo 1, 1 pt nos Grupos 2 e 3. Se perder por menos de 30s: bônus de +1 (Grupo 1) ou +0,5 (Grupos 2 e 3).',
    'sim.r6.l': 'Confrontos',
    'sim.r6.t': 'Os 4 que descem juntos não podem se enfrentar na rodada seguinte, e o mesmo vale para os que sobem para o Grupo 2 ou 3. No Grupo 1 os que sobem ficam livres, então os que ficam podem se enfrentar. Você nunca pega o mesmo adversário duas vezes.',
    'sim.r5.l': 'Classificam',
    'sim.r5.t': 'Depois da rodada 4, os 8 melhores por pontos passam para as oitavas. Desempate: média das suas 2 melhores corridas.',
    'sim.proposal': 'Proposta de formato — ainda não é o definitivo.',
    'sim.dateBadge': 'Rodada',
    'sim.btnNext': 'Simular próxima rodada',
    'sim.btnNext5': 'Simular até o fim',
    'sim.btnReset': 'Reiniciar',
    'sim.legendQualified': 'Classificado para as oitavas (Top 8 da fase de grupos)',
    'sim.legendEliminated': 'Eliminado',
    'sim.directTag': 'classificado direto',
    'sim.directTitle': 'Top 8 — classificados direto para as oitavas',
    'sim.directNote': 'Os 8 melhores tempos das classificatórias não jogam a fase de grupos: ficam posicionados direto nas oitavas de final.',
    'sim.logColGroup': 'Grupo',
    'sim.logColWinner': 'Vence',
    'sim.logColLoser': 'Perde',
    'sim.logColMargin': 'Diferença',
    'sim.logColMove': 'Movimentação',
    'sim.stays': 'fica no Grupo {g}',
    'sim.movesUp': 'sobe para o Grupo {g}',
    'sim.movesDown': 'desce para o Grupo {g}',
    'sim.swapTitle': 'Teste você mesmo: troque um corredor por um reserva',
    'sim.swapNote': 'Se você não está entre os 32 do simulador e quer ver como se sairia, escolha quem substituir e entre no lugar (ou qualquer um dos reservas: PB abaixo de 1:30:00 e run no último ano). Você também pode digitar um nome e um PB à mão. A ordem é refeita por PB e o simulador reinicia.',
    'sim.swapOut': 'Substituir',
    'sim.swapIn': 'por',
    'sim.swapCustom': 'Outro (digitar nome e PB)…',
    'sim.swapName': 'Nome',
    'sim.swapPb': 'PB (H:MM:SS.cc)',
    'sim.swapApply': 'Trocar',
    'sim.swapRestore': 'Voltar ao elenco original',
    'sim.swapBadName': 'Digite um nome (máximo de 24 caracteres).',
    'sim.swapBadPb': 'O PB precisa estar no formato H:MM:SS ou H:MM:SS.cc, entre 1:00:00 e 2:30:00 (ex.: 1:25:30.45).',
    'sim.swapDup': 'Esse nome já está no simulador.',
    'sim.swapDone': '{name} entra no simulador no lugar de {out}. A ordem foi refeita por PB e o simulador reiniciou.',
    'sim.swapRestored': 'Elenco original restaurado.',
    'sim.group1': 'Grupo 1',
    'sim.group2': 'Grupo 2',
    'sim.group3': 'Grupo 3',
    'sim.runnersCount': '{n} corredores',
    'sim.thRunner': 'Corredor',
    'sim.thPB': 'PB',
    'sim.thPts': 'Pts',
    'sim.thBest': 'Melhor tempo',
    'sim.thBestAvg': 'Melhor média',
    'sim.thHistory': 'Histórico',
    'sim.rankingTitle': 'Ranking dos grupos — ordenado só por pontuação',
    'sim.rankingNote': 'Os 24 corredores da fase de grupos em uma única tabela, ordenados da maior para a menor pontuação (sem desempates de grupo nem tabela por tabela). Os 8 primeiros classificam para as oitavas junto com o Top 8 direto.',
    'sim.logTitleEmpty': 'Nenhuma rodada foi disputada ainda',
    'sim.logTitle': 'Resultados da rodada {n}',
    'sim.logTitleFinal': 'Resultados da rodada {n} (final)',
    'sim.bracketTitle': 'Oitavas de final',
    'sim.wbTitle': 'Dupla eliminação — jogue você mesmo',
    'sim.wbNote': 'Oitavas e quartas: se a diferença da primeira corrida for de 2:00 ou mais, é a única corrida (BO1); se não, é BO3. Semifinais e finais são sempre BO3 e a grande final é BO5. Se você perder uma vez, cai para a chave dos perdedores; se perder de novo, está eliminado. Se o campeão da chave dos perdedores vencer a grande final, é disputada uma segunda grande final (reset), também em BO5.',
    'sim.btnWbNext': 'Jogar {round}',
    'sim.wbDone': 'Torneio encerrado',
    'sim.btnWbEverything': 'Jogar tudo até a grande final',
    'sim.champion': 'Campeão da Ditman Cup',
    'sim.btnWbAll': 'Jogar até a final dos vencedores',
    'sim.btnWbReset': 'Reiniciar resultados',
    'sim.wbChamp': 'Campeão da chave dos vencedores — direto para a grande final',
    'sim.bracketLocked': 'Termine as 4 rodadas para liberar o sorteio das oitavas.',
    'sim.bracketExplainer': 'O Top 8 direto fica fixo com o seeding clássico (eles não se enfrentam até as semifinais). Sorteie-os contra os 8 classificados da fase de grupos para completar os confrontos.',
    'sim.btnDrawNext': 'Sortear o próximo',
    'sim.btnDrawAll': 'Sortear todos',
    'sim.btnDrawReset': 'Reiniciar sorteio',
    'sim.sideA': 'Lado A',
    'sim.sideB': 'Lado B',
    'sim.seedTag': 'Top {n}',
    'sim.pending': 'A sortear',
    'sim.footer': 'Simulação com dados fictícios — feita para entender o formato, não para prever resultados reais.',
    'sim.doneLabel': 'Torneio encerrado',
    'testmode': 'MODO DE TESTE · dados falsos',
  },
};

// Estado en memoria para poder re-renderizar al cambiar de idioma
// Idioma principal: inglés. / Primary language: English.
let currentLang = 'en';
let lastGroupsRows = null;
let lastStandingsRows = null;

// Locale de fechas/numeros por idioma
const LOCALES = { en: 'en-US', es: 'es-AR', pt: 'pt-BR', id: 'id-ID', ja: 'ja-JP' };

function t(key, vars) {
  const dict = I18N[currentLang] || I18N.en;
  let s = dict[key] != null ? dict[key] : (I18N.en[key] != null ? I18N.en[key] : (I18N.es[key] != null ? I18N.es[key] : key));
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
  if (/^[A-Za-z]{2}-[A-Za-z]{2,3}$/.test(s)) return s.toLowerCase();   // subdivisiones: GB-SCT (Escocia)...
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
  initPredictions();
  initWager();
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
  // Inglés por defecto; recordamos el idioma que haya elegido el visitante.
  applyLang(I18N[saved] ? saved : 'en');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'en';
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
  renderPredictions();
  renderWager();
  renderSimulator();
  if (typeof simSwapRefresh === 'function') simSwapRefresh();
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
  const groups = Array.from(document.querySelectorAll('.nav-group'));
  const panels = document.querySelectorAll('.tab-panel');
  const toggle = document.getElementById('nav-toggle');
  const tabs = document.getElementById('tabs');

  function closeDrop(except) {
    groups.forEach(g => {
      if (g === except) return;
      g.querySelector('.nav-sub').classList.remove('open');
      g.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false');
    });
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
    groups.forEach(g => g.querySelector('.nav-drop-btn').classList.toggle('active', g.contains(btn)));
    closeDrop();
    tabs.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    wgAudioTab(btn.dataset.tab);
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

  groups.forEach(g => {
    const drop = g.querySelector('.nav-drop-btn'), sub = g.querySelector('.nav-sub');
    drop.addEventListener('click', e => {
      e.stopPropagation();
      closeDrop(g);
      const open = sub.classList.toggle('open');
      drop.setAttribute('aria-expanded', String(open));
    });
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
  const locale = currentLang === 'es' ? 'es-ES' : LOCALES[currentLang];
  const fmtOpts = { day: 'numeric', month: 'long', year: 'numeric' };
  if (TOURNAMENT_CONFIG.qualysTimeZone) fmtOpts.timeZone = TOURNAMENT_CONFIG.qualysTimeZone;
  const fmtDate = d => {
    try { return d.toLocaleDateString(locale, fmtOpts); }
    catch (e) { return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }); }
  };
  // Hora de apertura en la zona de la config (ej. "00:00 (UTC-3)"), igual para todos
  const fmtTime = d => {
    const o = String(TOURNAMENT_CONFIG.qualysOpen).match(/([+-])(\d{2}):(\d{2})$/);
    let utc = 'UTC';
    if (o) utc += o[1] + String(Number(o[2])) + (o[3] !== '00' ? ':' + o[3] : '');
    let hm;
    try {
      const topts = { hour: '2-digit', minute: '2-digit', hour12: false };
      if (TOURNAMENT_CONFIG.qualysTimeZone) topts.timeZone = TOURNAMENT_CONFIG.qualysTimeZone;
      hm = d.toLocaleTimeString('en-GB', topts);
    } catch (e) { hm = '00:00'; }
    return hm + ' (' + utc + ')';
  };
  if (dateLine) {
    let line = t('countdown.datePrefix') + ' ' + fmtDate(_countdownTarget) + ', ' + fmtTime(_countdownTarget);
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
    const md = parseInt(pickVal(r, ['Fecha', 'Matchday', 'Round', 'Ronda', 'Jornada']), 10);
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
  renderPredictions();
}

const schedOpen = new Set();   // matchdays desplegados (se conservan al re-renderizar)
function renderSchedule() {
  const host = document.getElementById('schedule-container');
  if (!host) return;
  const data = scheduleFromRows(lastScheduleRows);
  const loc = LOCALES[currentLang];
  const fmtDay = new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtTime = new Intl.DateTimeFormat(currentLang === 'id' || currentLang === 'ja' ? 'en-GB' : loc, { hour: '2-digit', minute: '2-digit', hour12: false });
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
        <span class="sched-day-n">${esc(t('sched.round', { n: md }))}</span>
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
        const row = { Fecha: String(md), Grupo: String(g), 'Corredor 1': MOCK_NAMES[base], 'Corredor 2': MOCK_NAMES[(base + 1) % MOCK_NAMES.length], Horario: `${day} ${hh}:${mm}` };
        if (md === 1 && i < 3) {   // algunas partidas con resultado, para probar los puntos
          const t1 = 480 + (i * 7 + g * 3) % 40, t2 = t1 + ((i * 13 + g * 5) % 50) - 20;
          row['Tiempo 1'] = fmtRaceTime(t1); row['Tiempo 2'] = fmtRaceTime(t2);
        }
        rows.push(row);
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
    renderPredictions();
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
// Ajusta el cuadro al ancho disponible: lo achica (transform: scale) para que se
// vea completo sin scroll horizontal con el zoom normal del navegador.
const BRACKET_MIN_SCALE = 0.3;
function fitBracketCanvas(canvas) {
  const wrap = canvas.closest('.bracket-scroll');
  if (!wrap) return;
  canvas.style.transform = '';
  wrap.style.height = '';
  wrap.style.overflowX = '';
  const natural = canvas.offsetWidth;
  const avail = wrap.clientWidth;
  if (!natural || !avail) return;
  const k = Math.max(BRACKET_MIN_SCALE, Math.min(1, avail / natural));
  if (k >= 0.999) return;
  canvas.style.transformOrigin = '0 0';
  canvas.style.transform = `scale(${k})`;
  const cs = getComputedStyle(wrap);
  wrap.style.height = (canvas.offsetHeight * k + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)) + 'px';
  if (k > BRACKET_MIN_SCALE + 0.001) wrap.style.overflowX = 'hidden';
}

function drawLinesFor(canvasId, links) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.offsetWidth) return;
  fitBracketCanvas(canvas);
  const svg = canvas.querySelector('.bracket-lines');
  const base = canvas.getBoundingClientRect();
  const k = (base.width / canvas.offsetWidth) || 1;   // escala actual del cuadro
  const box = id => {
    const el = canvas.querySelector(`[data-mid="${id}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { l: (r.left - base.left) / k, r: (r.right - base.left) / k, y: (r.top - base.top + r.height / 2) / k };
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
    return new Date(iso).toLocaleDateString(LOCALES[currentLang], { day: 'numeric', month: 'short', year: 'numeric' });
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
      <img class="trophy-logo" src="assets/logo-2027.webp" width="800" height="800" alt="${esc(t('hero.emblemAlt'))}" loading="lazy">
      <div class="trophy-text">
        <h3>${esc(t('champions.trophyTitle'))}</h3>
        <p>${esc(t('champions.trophyPending'))}</p>
      </div>
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
  const q = `query{users(logins:[${logins.map(l => JSON.stringify(l.toLowerCase())).join(',')}]){login displayName followers{totalCount} stream{id game{name} viewersCount title}}}`;
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

// data/live-status.json lo arma .github/workflows/update-live-status.yml (cada ~5 min):
// { youtube: { "<nombre>": { live, videoId, title, viewers, embed } },
//   kick: { "<slug>": { name, live, viewers, game, title, thumb, followers } } }
async function liveStatusData() {
  try {
    const res = await fetch('data/live-status.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const d = await res.json();
    // Si el chequeo lleva mas de 12 h sin actualizarse, no se confia en los datos
    if (!d.updatedAt || Date.now() - Date.parse(d.updatedAt) > 12 * 3600 * 1000) return { youtube: {}, kick: {} };
    return { youtube: d.youtube || {}, kick: d.kick || {} };
  } catch (e) {
    console.error('YouTube/Kick live check falló:', e);
    return { youtube: {}, kick: {} };
  }
}

// Kick le da 403 a los servidores de GitHub (el bot no lo ve), pero deja que lo consulte el navegador del visitante
// (CORS abierto): se pregunta aca, igual que Twitch. Si falla, queda lo que diga el archivo del bot.
async function kickLiveStatusBrowser(slugs) {
  const out = {};
  await Promise.all((slugs || []).filter(Boolean).map(async slug => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    try {
      const res = await fetch(`https://kick.com/api/v2/channels/${encodeURIComponent(slug)}`, { signal: ctl.signal });
      if (!res.ok) return;
      const j = await res.json();
      const name = (j.user && j.user.username) || slug, followers = j.followers_count || 0, ls = j.livestream;
      out[slug.toLowerCase()] = ls
        ? { name, live: true, viewers: ls.viewer_count || 0, game: (ls.categories && ls.categories[0] && ls.categories[0].name) || '',
            title: ls.session_title || '', thumb: (ls.thumbnail && (ls.thumbnail.url || ls.thumbnail.src)) || '', followers }
        : { name, live: false, followers };
    } catch (e) { /* sin respuesta: se usa el archivo del bot */ }
    finally { clearTimeout(timer); }
  }));
  return out;
}

// ---- Vivos de TikTok: no se pueden detectar solos, asi que cada streamer se marca en la tabla
// tiktok_live de Supabase (supabase/tiktok-live.sql) con su login de Discord. Vence solo.
// Cada cuenta elige un TikTok una sola vez (tiktok_claims, supabase/tiktok-claims.sql) y queda fijo:
// solo su dueno puede marcarse en vivo con el.
const ttState = { rows: [], claims: [], names: {}, ok: false, busy: false, err: '' };
const TT_LIVE_HOURS = 6;

async function ttLoadLive() {
  if (!PRED_CONFIG.supabaseUrl || !PRED_CONFIG.supabaseKey) { ttState.rows = []; ttState.claims = []; ttState.ok = false; return; }
  const get = async q => {
    const res = await fetch(`${PRED_CONFIG.supabaseUrl}/rest/v1/${q}`, { headers: { apikey: PRED_CONFIG.supabaseKey, Authorization: 'Bearer ' + PRED_CONFIG.supabaseKey }, cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  };
  try {
    [ttState.rows, ttState.claims] = await Promise.all([
      get(`tiktok_live?select=handle,user_id,live_until&live_until=gt.${encodeURIComponent(new Date().toISOString())}`),
      get('tiktok_claims?select=handle,user_id'),
    ]);
    // Nombre de Discord de quien eligio cada TikTok (los perfiles son publicos); si falla, se muestra sin nombre
    ttState.names = {};
    if (ttState.claims.length) {
      try {
        const ps = await get(`profiles?select=user_id,name&user_id=in.(${ttState.claims.map(c => c.user_id).join(',')})`);
        ps.forEach(p => { ttState.names[p.user_id] = p.name; });
      } catch (e) { console.error('No se pudieron leer los nombres de los TikToks elegidos:', e); }
    }
    ttState.ok = true;
  } catch (e) {
    console.error('TikTok live check falló:', e);
    ttState.rows = []; ttState.claims = []; ttState.ok = false;
  }
}

// usuario de TikTok (minusculas) -> nombre para mostrar, de todos los canales de la lista que tienen TikTok
function ttHandles() {
  const m = new Map();
  // Los de TWITCH_TIKTOK (multistream Twitch + TikTok) no estan: su Twitch se detecta solo, no necesitan marcarse.
  // `noMark`: igual para los que transmiten a la vez en YouTube y TikTok (su YouTube se detecta solo)
  (YOUTUBE_LIVE_CHANNELS || []).forEach(c => { if (c && c.tiktok && !c.noMark) m.set(c.tiktok.toLowerCase(), c.name); });
  (TIKTOK_LIVE_CHANNELS || []).filter(Boolean).map(ttEntry).forEach(e => m.set(e.tiktok.toLowerCase(), e.name));
  return m;
}

async function ttSetLive(handle) {
  const sb = predState.sb, u = predState.user;
  if (!sb || !u || ttState.busy) return;
  ttState.busy = true; ttState.err = ''; renderTtBox();
  try {
    if (handle) {
      const { error } = await sb.from('tiktok_live').upsert({ handle, user_id: u.id, live_until: new Date(Date.now() + TT_LIVE_HOURS * 3600e3).toISOString() }, { onConflict: 'handle' });
      if (error) throw error;
    } else {
      const { error } = await sb.from('tiktok_live').delete().eq('user_id', u.id);
      if (error) throw error;
    }
  } catch (e) {
    console.error('No se pudo marcar el vivo de TikTok:', e);
    ttState.err = 'live.ttErr';
  }
  ttState.busy = false;
  renderLive();
}

// Admin (JokerUY): apagar el "en vivo" de cualquier TikTok. La base solo lo deja a esta cuenta (supabase/tiktok-claims.sql).
const TT_ADMIN_ID = '27e68739-f0d9-414e-a63f-f58ed15538d6';
async function ttAdminOff(handle) {
  const sb = predState.sb, u = predState.user;
  if (!sb || !u || u.id !== TT_ADMIN_ID || ttState.busy) return;
  ttState.busy = true; ttState.err = ''; renderTtBox();
  try {
    const { error } = await sb.from('tiktok_live').delete().eq('handle', handle);
    if (error) throw error;
  } catch (e) {
    console.error('No se pudo apagar el TikTok:', e);
    ttState.err = 'live.ttErr';
  }
  ttState.busy = false;
  renderLive();
}

// Soltar el TikTok propio (y apagar su "en vivo"): queda libre para que otro lo elija
async function ttRelease() {
  const sb = predState.sb, u = predState.user;
  if (!sb || !u || ttState.busy) return;
  ttState.busy = true; ttState.err = ''; renderTtBox();
  try {
    const { error } = await sb.from('tiktok_claims').delete().eq('user_id', u.id);
    if (error) throw error;
    await sb.from('tiktok_live').delete().eq('user_id', u.id);
  } catch (e) {
    console.error('No se pudo soltar el TikTok:', e);
    ttState.err = 'live.ttErr';
  }
  ttState.busy = false;
  renderLive();
}

// Elegir el TikTok propio: mientras lo tenga, nadie mas puede (la base rechaza si ya lo tiene otra cuenta o si ya elegiste uno)
async function ttClaim(handle) {
  const sb = predState.sb, u = predState.user;
  if (!sb || !u || ttState.busy) return;
  ttState.busy = true; ttState.err = ''; renderTtBox();
  try {
    const { error } = await sb.from('tiktok_claims').insert({ handle, user_id: u.id });
    if (error) throw error;
  } catch (e) {
    console.error('No se pudo elegir el TikTok:', e);
    ttState.err = e && (e.code === '42501' || e.code === '23505') ? 'live.ttBusy' : 'live.ttErr';
  }
  ttState.busy = false;
  renderLive();
}

function renderTtBox() {
  const box = document.getElementById('live-tt-box');
  if (!box) return;
  let html = `<p class="live-ttnote">${esc(t('live.ttNote'))}</p>`;
  const u = predState.user;
  if (ttState.ok && predState.sb) {
    const dis = ttState.busy ? ' disabled' : '';
    const claim = u && ttState.claims.find(c => c.user_id === u.id);
    const live = u && ttState.rows.find(r => r.user_id === u.id);
    if (!u) {
      html += `<div class="live-ttrow"><button class="live-ttbtn" type="button" data-tt="login">${esc(t('live.ttLogin'))}</button></div>`;
    } else if (live) {
      const time = new Date(live.live_until).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      html += `<div class="live-ttrow"><span class="live-ttmine">${esc(t('live.ttMine', { name: live.handle, time }))}</span>
        <button class="live-ttbtn" type="button" data-tt="end"${dis}>${esc(t('live.ttEnd'))}</button>
        <button class="live-ttbtn live-ttbtn-alt" type="button" data-tt="release"${dis}>${esc(t('live.ttRelease'))}</button></div>`;
    } else if (claim) {
      html += `<div class="live-ttrow"><span class="live-ttmine">${esc(t('live.ttYours', { name: claim.handle }))}</span>
        <button class="live-ttbtn" type="button" data-tt="go" data-handle="${esc(claim.handle)}"${dis}>${esc(t('live.ttGo'))}</button>
        <button class="live-ttbtn live-ttbtn-alt" type="button" data-tt="release"${dis}>${esc(t('live.ttRelease'))}</button></div>`;
    } else {
      const taken = new Set(ttState.claims.map(c => c.handle));
      const opts = [...ttHandles()].filter(([h]) => !taken.has(h))
        .sort((a, b) => a[1].localeCompare(b[1], undefined, { sensitivity: 'base' }))
        .map(([h, name]) => `<option value="${esc(h)}">${esc(name)} (@${esc(h)})</option>`).join('');
      if (opts) html += `<p class="live-ttnote">${esc(t('live.ttLockNote'))}</p>
        <div class="live-ttrow"><select id="live-tt-pick" aria-label="${esc(t('live.ttPick'))}">${opts}</select>
        <button class="live-ttbtn" type="button" data-tt="claim"${dis}>${esc(t('live.ttClaim'))}</button></div>`;
    }
    if (u) html += `<div class="live-ttrow live-ttuser"><span>${esc(t('pred.hello', { name: predState.name || '' }))}</span>
      <button class="live-ttbtn live-ttbtn-alt" type="button" data-tt="logout">${esc(t('pred.logout'))}</button></div>`;
    if (u && u.id === TT_ADMIN_ID && ttState.rows.length) {
      const names = ttHandles();
      html += `<p class="live-ttnote live-ttclaimed-h">Admin: TikToks marcados en vivo</p>` + ttState.rows.map(r =>
        `<div class="live-ttrow"><span class="live-ttmine">${esc(names.get(r.handle) || r.handle)} (@${esc(r.handle)})</span>
        <button class="live-ttbtn" type="button" data-tt="adminoff" data-handle="${esc(r.handle)}"${dis}>Apagar</button></div>`).join('');
    }
    if (ttState.err) html += `<p class="live-tterr">${esc(t(ttState.err))}</p>`;
    // Publico: quien eligio cada TikTok, para que se note si alguien eligio uno que no es suyo
    if (ttState.claims.length) {
      const names = ttHandles();
      html += `<p class="live-ttnote live-ttclaimed-h">${esc(t('live.ttClaimed'))}</p><ul class="live-ttclaimed">` +
        ttState.claims.slice().sort((a, b) => a.handle.localeCompare(b.handle))
          .map(c => `<li><a href="https://www.tiktok.com/@${encodeURIComponent(c.handle)}" target="_blank" rel="noopener">${esc(names.get(c.handle) || c.handle)} (@${esc(c.handle)})</a> <span>${esc(t('live.ttBy', { name: ttState.names[c.user_id] || '?' }))}</span></li>`).join('') + '</ul>';
    }
  }
  box.innerHTML = html;
  box.querySelectorAll('[data-tt]').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.tt;
    if (a === 'login') predLogin('live');
    else if (a === 'end') ttSetLive(null);
    else if (a === 'release') ttRelease();
    else if (a === 'logout') predLogout();
    else if (a === 'go') ttSetLive(b.dataset.handle);
    else if (a === 'adminoff') ttAdminOff(b.dataset.handle);
    else if (a === 'claim') {
      const s = box.querySelector('#live-tt-pick');
      if (s && s.value && confirm(t('live.ttConfirm', { name: s.value }))) ttClaim(s.value);
    }
  }));
}

async function renderLive() {
  const host = document.getElementById('live-grid');
  if (!host) return;

  const tw = (RE4_LIVE_CHANNELS || []).filter(Boolean);
  const yt = (YOUTUBE_LIVE_CHANNELS || []).filter(Boolean);
  if (!tw.length && !yt.length) { host.innerHTML = `<p class="loading-msg">${esc(t('live.none'))}</p>`; return; }

  host.innerHTML = `<p class="loading-msg">${esc(t('live.checking'))}</p>`;
  const parent = location.hostname;

  const [status, extra, kickNow] = await Promise.all([
    twitchLiveStatus(tw).catch(e => { console.error('Twitch live check falló:', e); return {}; }),
    liveStatusData(),
    kickLiveStatusBrowser(KICK_LIVE_CHANNELS),
    ttLoadLive(),
  ]);
  extra.kick = Object.assign({}, extra.kick, kickNow);   // lo que respondio Kick directo pisa lo del bot
  renderTtBox();
  const ytStatus = extra.youtube;

  const rows = tw.map(ch => {
    const u = status[ch.toLowerCase()];
    return { ch, name: (u && u.displayName) || ch, live: !!(u && u.stream), stream: u && u.stream,
             followers: (u && u.followers && u.followers.totalCount) || 0 };
  // Popularidad: en vivo primero (mas espectadores arriba); luego el resto por seguidores
  }).sort((a, b) => (b.live - a.live)
    || (a.live ? (b.stream.viewersCount || 0) - (a.stream.viewersCount || 0) : 0)
    || (b.followers - a.followers)
    || a.name.localeCompare(b.name));

  // Arriba (en vivo) solo los de Twitch que estan jugando Resident Evil 4; el resto va abajo con el roster
  const isRE4 = r => r.live && /resident\s*evil\s*4/i.test((r.stream.game && r.stream.game.name) || '');
  const offRows = rows.filter(r => !isRE4(r));

  // Los canales de YouTube que estan en vivo ahora (el link del vivo cambia, viene del chequeo automatico)
  // Si ese runner esta en vivo en Twitch (RE4), su YouTube no va como tarjeta aparte: es un boton de la de Twitch
  const re4Ch = new Set(rows.filter(isRE4).map(r => r.ch.toLowerCase()));
  const ytOf = ch => yt.find(c => c.twitch && c.twitch.toLowerCase() === ch.toLowerCase());
  const ytHref = c => c.url || (c.id ? `https://www.youtube.com/channel/${c.id}/live` : '');
  const ytLive = yt.filter(c => ytStatus[c.name] && ytStatus[c.name].live && !(c.twitch && re4Ch.has(c.twitch.toLowerCase())))
    .map(c => ({ kind: 'yt', name: c.name, tiktok: c.tiktok, ...ytStatus[c.name] }));

  // Kick: igual que en Twitch, arriba solo los que juegan Resident Evil 4
  const kickRows = (KICK_LIVE_CHANNELS || []).filter(Boolean).map(slug => {
    const k = extra.kick[slug.toLowerCase()] || {};
    return { kind: 'kick', slug, name: k.name || slug, live: !!k.live, game: k.game || '', viewers: k.viewers || 0, thumb: k.thumb || '', followers: k.followers || 0 };
  });
  const kickTop = kickRows.filter(r => r.live && /resident\s*evil\s*4/i.test(r.game));
  const kickOther = kickRows.filter(r => !kickTop.includes(r));

  // Todos los vivos juntos, de mas a menos espectadores
  const liveRows = rows.filter(isRE4)
    .map(r => ({ kind: 'tw', ch: r.ch, name: r.name, tiktok: TWITCH_TIKTOK[r.ch.toLowerCase()], alt: ytOf(r.ch), viewers: (r.stream && r.stream.viewersCount) || 0 }))
    .concat(ytLive.map(r => ({ ...r, viewers: r.viewers || 0 })))
    .concat(kickTop)
    .sort((a, b) => b.viewers - a.viewers);
  // Los que se marcaron en vivo en TikTok (sin espectadores conocidos, van al final); si ya salen arriba
  // por otra plataforma, su TikTok es un boton de esa tarjeta
  const ttNames = ttHandles();
  const ttShown = new Set(liveRows.map(r => r.tiktok && r.tiktok.toLowerCase()).filter(Boolean));
  ttState.rows.filter(r => ttNames.has(r.handle) && !ttShown.has(r.handle))
    .forEach(r => liveRows.push({ kind: 'tt', handle: r.handle, name: ttNames.get(r.handle), viewers: 0 }));

  // Cantidad de vivos de Resident Evil 4 junto a la pestaña Live del menu
  const liveBadge = document.getElementById('live-count');
  if (liveBadge) { liveBadge.textContent = liveRows.length; liveBadge.hidden = !liveRows.length; }

  const twIcon = '<svg class="ic" aria-hidden="true"><use href="#ic-twitch"/></svg>';
  const ytIcon = '<svg class="ic" aria-hidden="true"><use href="#ic-youtube"/></svg>';
  const kickIcon = '<svg class="ic" aria-hidden="true"><use href="#ic-kick"/></svg>';
  const ttIcon = '<svg class="ic" aria-hidden="true"><use href="#ic-tiktok"/></svg>';
  // Al perfil y no a /@usuario/live: TikTok le da 403 (acceso denegado) a esa direccion directa en algunas conexiones; el perfil abre siempre
  // y, si estan en vivo, se ve el aro rojo de LIVE y se entra con un clic.
  const ttUrl = u => `https://www.tiktok.com/@${encodeURIComponent(u)}`;

  // Reproductor de cada vivo; autoplay=1 solo se usa en el primero
  const playerSrc = r => r.kind === 'yt'
    ? `https://www.youtube.com/embed/${encodeURIComponent(r.videoId)}?autoplay=1&mute=1&playsinline=1`
    : r.kind === 'kick'
      ? `https://player.kick.com/${encodeURIComponent(r.slug)}?autoplay=true&muted=true`
      : `https://player.twitch.tv/?channel=${encodeURIComponent(r.ch)}&parent=${parent}&muted=true`;
  const pageUrl = r => r.kind === 'yt' ? `https://www.youtube.com/watch?v=${encodeURIComponent(r.videoId)}`
    : r.kind === 'kick' ? `https://kick.com/${encodeURIComponent(r.slug)}`
    : `https://twitch.tv/${encodeURIComponent(r.ch)}`;
  const thumbUrl = r => r.kind === 'yt'
    ? `https://i.ytimg.com/vi/${encodeURIComponent(r.videoId)}/mqdefault_live.jpg`
    : r.kind === 'kick' ? r.thumb
    : `https://static-cdn.jtvnw.net/previews-ttv/live_user_${encodeURIComponent(r.ch.toLowerCase())}-640x360.jpg`;

  let html = '';

  if (liveRows.length) {
    // Ningun stream arranca solo: todos muestran la miniatura con un play y cargan al hacer clic,
    // asi no se reproducen varios a la vez ni se lagea la PC.
    const playBtn = r => {
      const inner = `${thumbUrl(r) ? `<img class="clip-thumb" src="${esc(thumbUrl(r))}" alt="" loading="lazy" onerror="this.remove()">` : ''}
               <span class="clip-play-icon" aria-hidden="true">▶</span>`;
      const label = esc(t('live.play') + ' ' + r.name);
      // Un vivo de YouTube que no deja embeberse se abre directo en YouTube
      if (r.kind === 'yt' && r.embed === false) return `<a class="live-play" href="${esc(pageUrl(r))}" target="_blank" rel="noopener" aria-label="${label}">${inner}</a>`;
      return `<button class="live-play" type="button" data-src="${esc(playerSrc(r))}" data-name="${esc(r.name)}" aria-label="${label}">${inner}</button>`;
    };
    // TikTok no se puede embeber: la tarjeta lleva a su live
    const ttCard = r => `
      <div class="live-card is-live is-tiktok">
        <div class="live-frame"><a class="live-play live-play-tt" href="${esc(ttUrl(r.handle))}" target="_blank" rel="noopener" aria-label="${esc(t('live.watchTt') + ' ' + r.name)}">${ttIcon}<span>${esc(t('live.watchTt'))}</span></a></div>
        <div class="live-meta">
          <span class="live-badge">● ${esc(t('live.on'))}</span>
          <a href="${esc(ttUrl(r.handle))}" target="_blank" rel="noopener">${ttIcon}${esc(r.name)}</a>
          <span class="live-btns"><a class="live-watch live-watch-tt" href="${esc(ttUrl(r.handle))}" target="_blank" rel="noopener">${ttIcon}<span>${esc(t('live.watchTt'))}</span></a></span>
        </div>
      </div>`;
    html += `<div class="live-live">` + liveRows.map(r => r.kind === 'tt' ? ttCard(r) : `
      <div class="live-card is-live">
        <div class="live-frame">${playBtn(r)}</div>
        <div class="live-meta">
          <span class="live-badge">● ${esc(t('live.on'))}</span>
          <a href="${esc(pageUrl(r))}" target="_blank" rel="noopener">${r.kind === 'yt' ? ytIcon : r.kind === 'kick' ? kickIcon : twIcon}${esc(r.name)}</a>
          <span class="live-btns">
          <a class="live-watch live-watch-${r.kind}" href="${esc(pageUrl(r))}" target="_blank" rel="noopener">${r.kind === 'yt' ? ytIcon : r.kind === 'kick' ? kickIcon : twIcon}<span>${esc(t(r.kind === 'yt' ? 'live.watchYt' : r.kind === 'kick' ? 'live.watchKick' : 'live.watch'))}</span></a>
          ${r.alt ? `<a class="live-watch live-watch-yt" href="${esc(ytStatus[r.alt.name] && ytStatus[r.alt.name].live ? `https://www.youtube.com/watch?v=${encodeURIComponent(ytStatus[r.alt.name].videoId)}` : ytHref(r.alt))}" target="_blank" rel="noopener">${ytIcon}<span>${esc(t('live.watchYt'))}</span></a>` : ''}
          ${r.tiktok ? `<a class="live-watch live-watch-tt" href="${esc(ttUrl(r.tiktok))}" target="_blank" rel="noopener">${ttIcon}<span>${esc(t('live.watchTt'))}</span></a>` : ''}
          </span>
        </div>
      </div>`).join('') + `</div>`;
  } else {
    html += `<p class="loading-msg">${esc(t('live.none'))}</p>`;
  }

  const offCards = offRows.map(r => {
    const href = `https://twitch.tv/${encodeURIComponent(r.ch)}`;
    const status = esc(t(r.live ? 'live.otherGame' : 'live.off'));
    const tt = TWITCH_TIKTOK[r.ch.toLowerCase()];
    const y = ytOf(r.ch);
    if (tt || y) return `<div class="live-card is-off">
       <a class="live-name" href="${href}" target="_blank" rel="noopener">${twIcon}${esc(r.name)}</a><span class="live-status">${status}</span>
       ${y ? `<a class="live-tt live-tt-yt" href="${esc(ytHref(y))}" target="_blank" rel="noopener">${ytIcon}YouTube</a>` : ''}${tt ? `<a class="live-tt" href="${esc(ttUrl(tt))}" target="_blank" rel="noopener">${ttIcon}TikTok</a>` : ''}
     </div>`;
    return `<a class="live-card is-off" href="${href}" target="_blank" rel="noopener">
       <span class="live-name">${twIcon}${esc(r.name)}</span><span class="live-status">${status}</span>
     </a>`;
  });

  // Los de YouTube que estan en vivo ya salieron arriba; el resto queda en el listado
  // (los que tienen Twitch en la lista ya llevan su boton de YouTube en la tarjeta de Twitch)
  const ytCards = yt.filter(c => !(ytStatus[c.name] && ytStatus[c.name].live) && !(c.twitch && tw.some(x => x.toLowerCase() === c.twitch.toLowerCase()))).map(c => {
    const href = c.url || (c.id ? `https://www.youtube.com/channel/${c.id}/live` : `https://www.youtube.com/results?search_query=${encodeURIComponent(c.name)}`);
    if (c.tiktok) return `<div class="live-card is-off is-yt">
       <a class="live-name" href="${esc(href)}" target="_blank" rel="noopener">${ytIcon}${esc(c.name)}</a><span class="live-status">YouTube</span>
       <a class="live-tt" href="${esc(ttUrl(c.tiktok))}" target="_blank" rel="noopener">${ttIcon}TikTok</a>
     </div>`;
    return `<a class="live-card is-off is-yt" href="${esc(href)}" target="_blank" rel="noopener">
       <span class="live-name">${ytIcon}${esc(c.name)}</span><span class="live-status">YouTube</span>
     </a>`;
  });

  const kickCards = kickOther.map(r =>
    `<a class="live-card is-off is-kick" href="https://kick.com/${encodeURIComponent(r.slug)}" target="_blank" rel="noopener">
       <span class="live-name">${kickIcon}${esc(r.name)}</span><span class="live-status">${esc(t(r.live ? 'live.otherGame' : 'live.off'))}</span>
     </a>`);

  const tiktokCards = (TIKTOK_LIVE_CHANNELS || []).filter(Boolean).map(ttEntry).map(e =>
    `<a class="live-card is-off is-tiktok" href="${esc(ttUrl(e.tiktok))}" target="_blank" rel="noopener">
       <span class="live-name">${ttIcon}${esc(e.name)}</span><span class="live-status">TikTok</span>
     </a>`);

  const all = offCards.concat(kickCards, ytCards, tiktokCards);
  if (all.length) html += `<div class="live-roster">${all.join('')}</div>`;

  host.innerHTML = html;

  host.querySelectorAll('button.live-play').forEach(btn => {
    btn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = btn.dataset.src;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      frame.title = btn.dataset.name || '';
      btn.replaceWith(frame);
    });
  });
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
  const rows = list => list.slice(0, TOP).map((x, i) =>
    `<tr class="${i < 3 ? 'rank-' + (i + 1) : ''}"><td>${i + 1}</td><td class="donor-name">${esc(x.name)}</td><td class="donor-amt">${esc(formatUSD(x.total))}</td></tr>`).join('');
  const totalLine = (amount, n) => t(n === 1 ? 'donors.totalOne' : 'donors.total', { amount: formatUSD(amount), n });
  // Este torneo (la edicion mas reciente de Matcherino) arriba; el top historico abajo
  const cur = (d.sources || []).filter(x => x.startAt).sort((a, b) => String(b.startAt).localeCompare(String(a.startAt)))[0];
  const curList = cur && cur.donors || [];
  document.getElementById('donors-cur-title').textContent = t('donors.thisTitle', { year: cur ? String(cur.startAt).slice(0, 4) : '' });
  const curTable = document.getElementById('donors-cur-table'), curMsg = document.getElementById('donors-cur-msg'), curTotal = document.getElementById('donors-cur-total');
  curTable.hidden = !curList.length; curTotal.hidden = !curList.length; curMsg.hidden = !!curList.length;
  curMsg.textContent = t('donors.curEmpty');
  if (curList.length) {
    document.getElementById('donors-cur-body').innerHTML = rows(curList);
    curTotal.textContent = totalLine(cur.raised != null ? cur.raised : curList.reduce((a, x) => a + x.total, 0), curList.length);
  }
  document.getElementById('donors-body').innerHTML = rows(d.donors);
  table.hidden = false; msg.hidden = true;
  total.textContent = totalLine(d.total, d.donorCount);
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
  document.getElementById('visit-count').textContent = visitValue.toLocaleString(LOCALES[currentLang]);
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
  'JokerUY', 'Sawken', 'Missing', 'seppp', 'Frit', '4rcadan', 'OtakuXD', 'Pochoide',
  'ChampT', 'MateoUsh27', 'Zudinn', 'eidenfir', 'MikeWavRR', 'Youcri', 'luis_sera', 'VAL',
  'Muh', 'Pixiesaki', 'novi_fan', 'MattGael', 'caciottafresca', 'Lu1u', 'JoydurnYup', 'Matiuss',
  'abdou_mz', 'Gui19', 'Razie', 'aqbilghilman', 'doradori_dolph', 'Nobu_22', 'HannNrY', 'MajorRichy',
];
// PBs de speedrun.com/re4steam (New Game, Professional, Single Segment, 60 FPS; tiempo sin loads),
// con centesimas (el tercer decimal de speedrun.com es siempre 0, asi que se usan 2), mismo orden que
// SIM_RUNNER_NAMES (de menor a mayor: los primeros 8 son el Top 8 directo). Actualizado el 05/11/2026.
// Equivalencias: ChampT = MRChampT01, VAL = _VAL_, Muh = MUHnster, aqbilghilman = aqbilghilman_.
// A pedido del organizador: luis_sera 1:24:10 y caciottafresca 1:24:47 (italiano, no esta en speedrun.com) son PBs indicados a mano.
// DerekT21288, TheNevs y manboo no juegan el torneo (quedan de reserva); entran eidenfir, JoydurnYup y caciottafresca.
const SIM_RUNNER_PBS = [
  '1:21:04.81', '1:21:27.13', '1:21:48.13', '1:21:48.90', '1:21:57.01', '1:22:01.13',
  '1:22:14.68', '1:22:30.78', '1:23:26.23', '1:23:28.60', '1:23:37.03', '1:23:39.63',
  '1:23:42.41', '1:23:46.08', '1:24:10.00', '1:24:19.00', '1:24:20.56', '1:24:27.06',
  '1:24:40.15', '1:24:41.50', '1:24:47.00', '1:24:52.66', '1:24:54.01', '1:24:58.48',
  '1:24:59.21', '1:25:19.43', '1:25:26.18', '1:25:26.56', '1:25:33.83', '1:25:35.85',
  '1:25:45.16', '1:26:10.70',
];

// Reservas: runners de speedrun.com con PB menor a 1:30:00 y run de los ultimos 12 meses
// que NO estan en el simulador. Se pueden meter desde el panel "Try yourself" de la pestana
// Simulations (cambian a un runner del simulador). Formato: [puesto en la leaderboard, nombre, PB, fecha del run]
const SIM_SUBSTITUTES = [
  [9, 'DerekT21288', '1:22:54.53', '2025-08-15'],
  [12, 'TheNevs', '1:23:35.11', '2026-01-19'],
  [25, 'manboo', '1:24:48.70', '2026-07-28'],
  [40, 'Ryllmen', '1:25:52.03', '2026-10-30'],
  [41, 'Sachire', '1:26:07.78', '2025-12-21'],
  [41, 'Fedo_Kuhaku', '1:26:09.00', '2026-09-27'],
  [45, 'erOotea', '1:26:18.68', '2026-08-12'],
  [46, 'NETJU', '1:26:21.91', '2026-08-25'],
  [47, 'InfamousLol8', '1:26:23.26', '2026-01-10'],
  [48, '_slifer_', '1:26:23.55', '2026-02-28'],
  [52, 'Egg_Cangying', '1:26:35.13', '2026-08-01'],
  [53, 'ShulaRune', '1:26:35.40', '2026-08-16'],
  [55, 'Vechman', '1:26:38.80', '2026-10-08'],
  [56, 'alvinnn', '1:26:42.23', '2026-10-04'],
  [57, 'Chanwi', '1:26:43.51', '2026-09-23'],
  [61, 'Prastry', '1:26:53.10', '2026-06-11'],
  [62, 'Bang_Gori', '1:26:54.16', '2026-09-01'],
  [64, 'libee', '1:26:57.76', '2026-09-25'],
  [65, 'GLAISON_GAMES_MOBILE', '1:27:01.13', '2026-05-16'],
  [66, 'IanPriaMisterius', '1:27:07.80', '2026-04-21'],
  [68, 'Clementinee', '1:27:22.40', '2026-03-24'],
  [70, 'Dims_jesse', '1:27:27.46', '2026-07-12'],
  [71, 'Ornot_ms', '1:27:31.88', '2026-05-01'],
  [72, 'fiveskill', '1:27:36.38', '2026-06-20'],
  [76, 'FrancoBv17', '1:27:59.30', '2026-08-17'],
  [78, 'gabrielsinmarr', '1:28:07.65', '2026-10-23'],
  [79, 'NanonSBz', '1:28:09.08', '2026-10-16'],
  [83, 'KaykyBeck', '1:28:30.05', '2026-08-05'],
  [87, 'Neoxz', '1:28:43.63', '2026-05-10'],
  [90, 'oldust_', '1:29:01.86', '2026-08-13'],
  [95, 'bigbloo77', '1:29:14.81', '2026-06-05'],
  [101, 'Dhannn', '1:29:36.88', '2026-07-21'],
  [105, 'redshines', '1:29:57.01', '2026-07-09'],
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

// Plantel del simulador (se puede modificar desde el panel de reservas)
let simRoster = null;
function simRosterDefault() { return SIM_RUNNER_NAMES.map((name, i) => ({ name, pb: SIM_RUNNER_PBS[i] })); }

function simInitRunners() {
  if (!simRoster) simRoster = simRosterDefault();
  simRunners = simRoster.map(({ name, pb }, i) => ({
    id: i + 1,
    name,
    pbSeconds: simParseTime(pb),
    pbLabel: pb,
    // top 8 por PB real: clasifican directo a Octavos, no juegan la fase de
    // grupos (group=0). El resto (24) forma 3 grupos de 8.
    group: i < 8 ? 0 : Math.floor((i - 8) / SIM_GROUP_SIZE) + 1,
    isTop8Seed: i < 8,
    lastResult: null,
    lastMove: null,
    cohort: null,    // con quienes se movio la ultima vez (misma frontera y sentido)
    opponents: [],   // ids de los rivales que ya enfrento
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

// Cruces de un grupo. Dos reglas duras:
//  1) no repetir un rival ya enfrentado en una fecha anterior;
//  2) los que se movieron juntos (misma frontera y mismo sentido: los 4 que bajan
//     o los 4 que suben al Grupo 2 o 3) no se enfrentan entre si en la fecha siguiente.
//     Los que suben al Grupo 1 no tienen esta restriccion.
// Si con ambas no hay ningun cruce posible, se relajan en ese orden.
let simPairRelaxed = 0;
function simMatch(list, ok) {
  if (!list.length) return [];
  const [a, ...rest] = list;
  for (let i = 0; i < rest.length; i++) {
    const b = rest[i];
    if (!ok(a, b)) continue;
    const sub = simMatch(rest.filter((_, j) => j !== i), ok);
    if (sub) return [[a, b], ...sub];
  }
  return null;
}
function simPairGroup(members) {
  const fresh = (a, b) => !a.opponents.includes(b.id);
  const apart = (a, b) => !(a.cohort && a.cohort === b.cohort);
  const rules = [(a, b) => fresh(a, b) && apart(a, b), fresh, apart, () => true];
  for (let k = 0; k < rules.length; k++) {
    const pairs = simMatch(simShuffle(members), rules[k]);
    if (pairs) { if (k) simPairRelaxed++; return pairs; }
  }
  return [];
}

function simAdvanceFecha() {
  if (simFecha >= SIM_MAX_FECHAS) return;
  simFecha++;
  simLastRaces = [];
  simRunners.forEach(r => { r.lastMove = null; });

  for (let g = 1; g <= SIM_NUM_GROUPS; g++) {
    for (const [a, b] of simPairGroup(simGetGroup(g))) {
      a.opponents.push(b.id); b.opponents.push(a.id);
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
    r.cohort = null;
    // Los que suben al Grupo 1 (vienen del 2) quedan libres: asi los que se quedan en el 1 pueden cruzarse entre si
    if (promote[r.id] !== undefined) { r.cohort = r.group === 2 ? null : 'up' + r.group; r.group = promote[r.id]; r.lastMove = 'up'; }
    else if (relegate[r.id] !== undefined) { r.cohort = 'down' + r.group; r.group = relegate[r.id]; r.lastMove = 'down'; }
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
// Despues del sorteo de Octavos se juega todo el cuadro con series BO1/BO3/BO5
// segun la ronda (ver SIM_WB_FORMAT): cuadro de ganadores, cuadro de perdedores y
// Gran Final. Se usa el mismo modelo que el Bracket real (buildDoubleElim) y las
// rondas se juegan en este orden:
// R16, LR1, Cuartos, LR2, LR3, Semis, LR4, LR5, Final de ganadores, LR6, Gran Final.
// Reset: el campeon del cuadro de ganadores llega sin derrotas, asi que si pierde la
// Gran Final se juega una revancha (otra serie BO5) entre los mismos dos.
let simWB = null;
const SIM_WB_STEPS = 11;        // pasos fijos; la revancha de la Gran Final es un paso 12 que solo existe si hace falta
const SIM_WB_GF_STEP = 10;

function simInitWB() {
  const model = buildDoubleElim(16);
  const r16 = simBracketSeeds.map((s, idx) => ({ a: s.runner, b: simBracketAssignments[idx], seedA: s.seedNum }));
  const { wb, lb, gf } = model;
  simWB = { model, r16, res: {}, step: 0, reset: null, steps: [wb[0], lb[0], wb[1], lb[1], lb[2], wb[2], lb[3], lb[4], wb[3], lb[5], [gf]] };
}

function simWBResolve(ref) {
  const r = simWB.res[ref.w || ref.l];
  return r ? (ref.w ? r.winner : r.loser) : null;
}
function simWBPlayers(m) {
  if (m.kind === 'w' && m.round === 0) return [simWB.r16[m.idx].a, simWB.r16[m.idx].b];
  return m.refs.map(simWBResolve);
}
// Formato de cada paso del cuadro (igual que el reglamento): Octavos y Cuartos
// (ganadores y perdedores) son BO1 si el primer race se decide por 2:00 o mas,
// si no pasan a BO3; Semis y Finales siempre BO3; la Gran Final es BO5.
const SIM_WB_FORMAT = ['cond', 'cond', 'cond', 'cond', 'cond', 3, 3, 3, 3, 3, 5, 5];   // el ultimo es la revancha de la Gran Final
const SIM_BO1_GAP = 120; // segundos

function simPlaySeries(a, b, mode) {
  const need = mode === 5 ? 3 : 2;
  let wa = 0, wb = 0;
  const first = simRace(a, b);
  first.winner === a ? wa++ : wb++;
  if (mode === 'cond' && first.margin >= SIM_BO1_GAP) {
    return { winner: first.winner, loser: first.winner === a ? b : a, tA: first.timeA, tB: first.timeB, games: 1, wa, wb, fmt: 'BO1' };
  }
  while (wa < need && wb < need) {
    const g = simRace(a, b);
    g.winner === a ? wa++ : wb++;
  }
  const winner = wa > wb ? a : b;
  return { winner, loser: winner === a ? b : a, tA: first.timeA, tB: first.timeB, games: wa + wb, wa, wb, fmt: mode === 5 ? 'BO5' : 'BO3' };
}

function simWBPlayStep() {
  if (!simWB || simWB.step >= simWB.steps.length) return;
  const mode = SIM_WB_FORMAT[simWB.step];
  simWB.steps[simWB.step].forEach(m => {
    const [a, b] = simWBPlayers(m);
    simWB.res[m.n] = simPlaySeries(a, b, mode);
  });
  // Si el campeon del cuadro de perdedores gana la Gran Final, el de ganadores todavia no perdio dos veces: revancha
  if (simWB.step === SIM_WB_GF_STEP) {
    const { gf } = simWB.model;
    const [fromWinners, fromLosers] = simWBPlayers(gf);
    if (simWB.res[gf.n].winner === fromLosers && fromLosers !== fromWinners) {
      simWB.reset = { id: 'mgf2', n: gf.n + 1, kind: 'g', round: 1, idx: 0, refs: gf.refs };   // mismos dos jugadores, mismo orden
      simWB.steps.push([simWB.reset]);
    }
  }
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
  const stepTitles = [wbTitles[0], lr(1), wbTitles[1], lr(2), lr(3), wbTitles[2], lr(4), t('bracket.losersSemi'), wbTitles[3], t('bracket.losersFinal'), t('bracket.grandFinal'), t('bracket.grandFinalReset')];
  const done = simWB.step >= simWB.steps.length;

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
    const score = r && r.games > 1 ? `<span class="slot-score">${i === 0 ? r.wa : r.wb}</span>` : '';
    return `<div class="slot${cls}">${seed}<span class="slot-name">${nameWithFlag(p.name)}</span>${time != null ? `<span class="slot-time">${esc(simFormatRaceTime(time))}</span>` : ''}${score}</div>`;
  };
  const card = m => `<div class="match is-${m.kind}" data-mid="${m.id}"><span class="match-num">M${m.n}${res[m.n] ? ` · <span class="match-fmt">${res[m.n].fmt}</span>` : ''}</span>${slot(m, 0)}${slot(m, 1)}</div>`;
  const round = (title, ms) => `<div class="round"><div class="round-title">${esc(title)}</div><div class="round-inner">${ms.map(card).join('')}</div></div>`;

  simWBLinks = model.links;
  const wbHtml = model.wb.map((ms, r) => round(wbTitles[r], ms)).join('');
  const lbHtml = model.lb.map((ms, r) => round(lbTitle(r), ms)).join('');
  const gfRes = res[model.gf.n];
  const wbFinalRes = res[model.wb[3][0].n];
  // Con revancha, el campeon sale de la revancha; sin ella, de la Gran Final
  const finalRes = simWB.reset ? res[simWB.reset.n] : gfRes;
  const champ = finalRes ? finalRes.winner : null;
  const resetPending = !!simWB.reset && !champ;
  const wbChamp = !champ && !resetPending && wbFinalRes ? wbFinalRes.winner : null;

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
      <div class="bracket-gf">${round(t('bracket.grandFinal'), simWB.reset ? [model.gf, simWB.reset] : [model.gf])}</div>
    </div></div>
    ${champ ? `<p class="sim-wb-champ"><span>${esc(t('sim.champion'))}</span><strong>${nameWithFlag(champ.name)}</strong></p>`
      : resetPending ? `<p class="sim-wb-champ"><span>${esc(t('sim.resetNote'))}</span></p>`
      : wbChamp ? `<p class="sim-wb-champ"><span>${esc(t('sim.wbChamp'))}</span><strong>${nameWithFlag(wbChamp.name)}</strong></p>` : ''}`;

  const on = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
  on('sim-btn-wb-next', () => { simWBPlayStep(); simRenderWB(); });
  on('sim-btn-wb-wf', () => { while (simWB.step < 9) simWBPlayStep(); simRenderWB(); });
  on('sim-btn-wb-all', () => { while (simWB.step < simWB.steps.length) simWBPlayStep(); simRenderWB(); });
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
    if (!simLastRaces.length) { racesEl.innerHTML = ''; }
    else {
      // Una fila por carrera: ganador vs perdedor y a que grupo va cada uno
      const where = (name, g, won) => {
        if (won) return g === 1
          ? `<b>${esc(name)}</b> ${t('sim.stays', { g })}`
          : `<span class="sim-move-up">▲</span> <b>${esc(name)}</b> ${t('sim.movesUp', { g: g - 1 })}`;
        return g === SIM_NUM_GROUPS
          ? `<b>${esc(name)}</b> ${t('sim.stays', { g })}`
          : `<span class="sim-move-down">▼</span> <b>${esc(name)}</b> ${t('sim.movesDown', { g: g + 1 })}`;
      };
      const rows = simLastRaces.map((r, i) => {
        const aWon = r.winner === r.a;
        const wName = aWon ? r.a : r.b, lName = aWon ? r.b : r.a;
        const wTime = aWon ? r.timeA : r.timeB, lTime = aWon ? r.timeB : r.timeA;
        return `<tr class="sim-log-g${r.group}">
          <td class="sl-n">${i + 1}</td>
          <td class="sl-g">G${r.group}</td>
          <td class="sl-w"><b>${esc(wName)}</b> <span class="sl-time">${simFormatRaceTime(wTime)}</span></td>
          <td class="sl-l"><b>${esc(lName)}</b> <span class="sl-time">${simFormatRaceTime(lTime)}</span></td>
          <td class="sl-d">${simFormatMargin(r.margin)}</td>
          <td class="sl-m">${where(wName, r.group, true)}<span class="sl-sep"> · </span>${where(lName, r.group, false)}</td>
        </tr>`;
      }).join('');
      racesEl.innerHTML = `<div class="table-scroll"><table class="sim-log-table">
        <thead><tr><th>#</th><th>${esc(t('sim.logColGroup'))}</th><th>${esc(t('sim.logColWinner'))}</th><th>${esc(t('sim.logColLoser'))}</th><th>${esc(t('sim.logColMargin'))}</th><th>${esc(t('sim.logColMove'))}</th></tr></thead>
        <tbody>${rows}</tbody></table></div>`;
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

// Lista desplegable propia en lugar del <select> nativo: la lista abierta del nativo la dibuja el sistema con su
// fuente (y no la de la pagina). El <select> queda oculto y sigue guardando el valor (value / change).
// Devuelve la funcion que hay que llamar cuando se vuelven a cargar sus opciones.
function ddEnhance(sel) {
  const wrap = document.createElement('div');
  wrap.className = 'dd';
  wrap.innerHTML = '<button type="button" class="dd-btn" aria-haspopup="listbox" aria-expanded="false"></button><ul class="dd-list" role="listbox" hidden></ul>';
  sel.classList.add('dd-native');
  sel.after(wrap);
  const btn = wrap.querySelector('.dd-btn'), list = wrap.querySelector('.dd-list');
  let active = -1;
  const close = () => { list.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  const mark = i => {
    active = i;
    [...list.children].forEach((li, k) => li.classList.toggle('is-active', k === i));
    const li = list.children[i];
    if (li) li.scrollIntoView({ block: 'nearest' });
  };
  const open = () => { list.hidden = false; btn.setAttribute('aria-expanded', 'true'); mark(sel.selectedIndex); };
  function refresh() {
    list.innerHTML = [...sel.options].map((o, i) => `<li role="option" data-i="${i}" aria-selected="${i === sel.selectedIndex}">${esc(o.textContent)}</li>`).join('');
    const cur = sel.options[sel.selectedIndex];
    btn.textContent = cur ? cur.textContent : '';
  }
  const pick = i => {
    if (!sel.options[i]) return;
    sel.selectedIndex = i;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    refresh(); close(); btn.focus();
  };
  btn.addEventListener('click', () => { list.hidden ? open() : close(); });
  list.addEventListener('click', e => { const li = e.target.closest('li'); if (li) pick(Number(li.dataset.i)); });
  list.addEventListener('mousemove', e => { const li = e.target.closest('li'); if (li) mark(Number(li.dataset.i)); });
  wrap.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (list.hidden) { open(); return; }
      mark(Math.min(sel.options.length - 1, Math.max(0, active + (e.key === 'ArrowDown' ? 1 : -1))));
    } else if ((e.key === 'Enter' || e.key === ' ') && !list.hidden) { e.preventDefault(); pick(active); }
  });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
  refresh();
  return refresh;
}

// Panel "Try yourself": cambia a un runner del simulador por una reserva (o un nombre/PB a mano)
let simSwapRefresh = null;
function initSimSwap() {
  const outSel = document.getElementById('sim-swap-out');
  const inSel = document.getElementById('sim-swap-in');
  if (!outSel || !inSel) return;
  const customBox = document.getElementById('sim-swap-custom');
  const msg = document.getElementById('sim-swap-msg');
  const say = (key, vars) => { msg.hidden = !key; if (key) msg.textContent = t(key, vars); };

  let refreshOut = null, refreshIn = null;
  const fill = () => {
    outSel.innerHTML = simRoster.map((r, i) => `<option value="${i}">${esc(r.name)} · ${esc(r.pb)}</option>`).join('');
    const used = new Set(simRoster.map(r => r.name.toLowerCase()));
    inSel.innerHTML = SIM_SUBSTITUTES.filter(r => !used.has(r[1].toLowerCase()))
      .map(r => `<option value="${esc(r[1])}|${esc(r[2])}">${esc(r[1])} · ${esc(r[2])}</option>`).join('')
      + `<option value="__custom">${esc(t('sim.swapCustom'))}</option>`;
    customBox.hidden = inSel.value !== '__custom';
    if (refreshOut) { refreshOut(); refreshIn(); }
  };
  if (!simRoster) simRoster = simRosterDefault();
  fill();
  refreshOut = ddEnhance(outSel);
  refreshIn = ddEnhance(inSel);
  inSel.addEventListener('change', () => { customBox.hidden = inSel.value !== '__custom'; });

  document.getElementById('sim-swap-apply').addEventListener('click', () => {
    let name, pb;
    if (inSel.value === '__custom') {
      name = document.getElementById('sim-swap-name').value.trim();
      pb = document.getElementById('sim-swap-pb').value.trim();
      if (!name || name.length > 24) return say('sim.swapBadName');
      if (!/^[1-2]:[0-5]\d:[0-5]\d(\.\d{1,2})?$/.test(pb) || simParseTime(pb) < 3600 || simParseTime(pb) > 9000) return say('sim.swapBadPb');
      if (simRoster.some(r => r.name.toLowerCase() === name.toLowerCase())) return say('sim.swapDup');
      pb = simFormatRaceTime(simParseTime(pb));   // siempre con 2 decimales, como el resto de los PBs
    } else {
      [name, pb] = inSel.value.split('|');
    }
    const outIdx = Number(outSel.value);
    const outName = simRoster[outIdx].name;
    simRoster[outIdx] = { name, pb };
    simRoster.sort((a, b) => simParseTime(a.pb) - simParseTime(b.pb));
    simInitRunners();
    renderSimulator();
    fill();
    say('sim.swapDone', { name, out: outName });
  });
  document.getElementById('sim-swap-restore').addEventListener('click', () => {
    simRoster = simRosterDefault();
    simInitRunners();
    renderSimulator();
    fill();
    say('sim.swapRestored');
  });
  // al cambiar de idioma se vuelve a armar el selector (la opcion "Otro")
  simSwapRefresh = fill;
}

function initSimulator() {
  if (!document.getElementById('sim-groups')) return;
  simInitRunners();
  initSimSwap();

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

// ======= PREDICCIONES / PREDICTIONS (penca) =======
// Cada jugador pronostica el ganador de cada partida (y, si quiere, la diferencia de tiempo).
// Puntos por partida (maximo 8): ganador = 3, ganador que era el "underdog" (peor puesto en la
// clasificatoria) = 5, ganador + diferencia de tiempo dentro de +-diffMargin segundos = 8.
// Las partidas y los resultados salen de la hoja del calendario (SHEET_URLS.schedule), con estas
// columnas opcionales ademas de Fecha | Grupo | Corredor 1 | Corredor 2 | Horario:
//   Tiempo 1 | Tiempo 2   -> tiempo final de cada runner ("12:34" o "1:02:34"); al cargarlos se puntua solo
//   Seed 1 | Seed 2       -> puesto de cada runner (menor = mejor); si no estan, se usa el orden de la hoja Qualifiers
// Para fases eliminatorias, en "Fecha" se puede poner el nombre de la ronda (ej. "Octavos") en vez de un numero.
//
// Guardado: sin configurar Supabase, los pronosticos quedan solo en este navegador. Con la URL y la
// clave publica de Supabase (ver supabase/predictions.sql) hay login con Discord y ranking compartido.
const PRED_CONFIG = {
  supabaseUrl: 'https://ybolqwigdwehyptgruuw.supabase.co',
  supabaseKey: 'sb_publishable_Eyx8H_UPJ6W0SxGk4rNX4g_MayNklbC',   // clave publica (publishable): es publica por diseno, la seguridad la dan las reglas de supabase/predictions.sql
  diffMargin: 15,    // segundos de margen para acertar la diferencia de tiempo
  pts: { winner: 3, underdog: 5, diff: 8 },
};
const PRED_LS = 'dc-predictions';
const predState = { sb: null, user: null, local: {}, remote: {}, board: null, boardErr: false, boardAt: 0, sub: 'picks', status: {} };

function predSlug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

// "45" -> 45 s, "1:15" -> 75 s, "1:02:34" -> 3754 s. Devuelve null si no se entiende.
function parseRaceTime(str) {
  const s = String(str == null ? '' : str).trim().replace(',', '.');
  if (!s) return null;
  const parts = s.split(':');
  if (parts.length > 3 || parts.some(p => !/^\d+(\.\d+)?$/.test(p))) return null;
  return parts.reduce((acc, p) => acc * 60 + parseFloat(p), 0);
}
function fmtRaceTime(sec) {
  sec = Math.round(sec);
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
}

// Puesto de un runner en la hoja Qualifiers (1 = mejor); null si no se sabe
function predRank(name) {
  const rows = lastStandingsRows;
  if (!rows || !rows.length || !name) return null;
  const col = pickKey(rows[0], ['Corredor', 'Runner', 'Nombre']) || Object.keys(rows[0])[1];
  const i = rows.findIndex(r => String(r[col] || '').trim().toLowerCase() === String(name).trim().toLowerCase());
  return i < 0 ? null : i + 1;
}

// Todas las partidas con los dos runners ya definidos
function predMatches() {
  const out = [];
  (lastScheduleRows || []).forEach(r => {
    const a = pickVal(r, ['Corredor 1', 'Runner 1', 'Corredor A']);
    const b = pickVal(r, ['Corredor 2', 'Runner 2', 'Corredor B']);
    if (!a || !b) return;
    const rawMd = pickVal(r, ['Fecha', 'Matchday', 'Round', 'Ronda', 'Jornada']);
    const md = parseInt(rawMd, 10) || 0;
    const g = parseInt(pickVal(r, ['Grupo', 'Group']), 10) || 0;
    const stage = pickVal(r, ['Fase', 'Stage']) || (md ? '' : rawMd);
    const tA = parseRaceTime(pickVal(r, ['Tiempo 1', 'Time 1', 'Resultado 1']));
    const tB = parseRaceTime(pickVal(r, ['Tiempo 2', 'Time 2', 'Resultado 2']));
    const sA = parseInt(pickVal(r, ['Seed 1', 'Rank 1', 'Puesto 1']), 10);
    const sB = parseInt(pickVal(r, ['Seed 2', 'Rank 2', 'Puesto 2']), 10);
    out.push({
      id: [rawMd, g, predSlug(a), predSlug(b)].join('|'),
      md, g, stage, a, b,
      when: parseScheduleTime(pickVal(r, ['Horario', 'Hora', 'Time', 'Date'])),
      tA, tB,
      seedA: isNaN(sA) ? null : sA, seedB: isNaN(sB) ? null : sB,
    });
  });
  return out.sort((x, y) => (x.md || 99) - (y.md || 99) || (x.when || 0) - (y.when || 0) || x.g - y.g);
}

const predHasResult = m => m.tA != null && m.tB != null && m.tA !== m.tB;
// Cerrada si ya empezo (o ya tiene resultado). Sin horario no se puede pronosticar.
const predLocked = m => predHasResult(m) || (m.when ? Date.now() >= m.when.getTime() : true);

function predUnderdog(m) {
  const ra = m.seedA != null ? m.seedA : predRank(m.a);
  const rb = m.seedB != null ? m.seedB : predRank(m.b);
  if (ra == null || rb == null || ra === rb) return null;
  return ra > rb ? 'a' : 'b';
}

// { pts, kind } o null si todavia no hay resultado
function scorePrediction(pick, m) {
  if (!predHasResult(m)) return null;
  const winner = m.tA < m.tB ? 'a' : 'b';
  if (!pick || pick.pick !== winner) return { pts: 0, kind: 'miss' };
  if (pick.diff != null && Math.abs(Math.abs(m.tA - m.tB) - pick.diff) <= PRED_CONFIG.diffMargin) return { pts: PRED_CONFIG.pts.diff, kind: 'diff' };
  if (predUnderdog(m) === winner) return { pts: PRED_CONFIG.pts.underdog, kind: 'underdog' };
  return { pts: PRED_CONFIG.pts.winner, kind: 'winner' };
}

// ---- guardado ----
function predLoadLocal() {
  try { predState.local = JSON.parse(safeGet(PRED_LS) || '{}') || {}; } catch (e) { predState.local = {}; }
}
const predPicks = () => predState.user ? predState.remote : predState.local;
function predSaveLocal() { safeSet(PRED_LS, JSON.stringify(predState.local)); }

function predRow(m, p) {
  return { user_id: predState.user.id, match_id: m.id, pick: p.pick, diff: p.diff == null ? null : Math.round(p.diff), start_at: m.when ? m.when.toISOString() : null };
}

async function predSave(m, pick, diff) {
  if (predLocked(m)) return;
  const picks = predPicks();
  picks[m.id] = { pick, diff };
  if (!predState.user) { predSaveLocal(); predSetStatus(m.id, 'saved'); return; }
  predSetStatus(m.id, 'saving');
  try {
    const { error } = await predState.sb.from('predictions').upsert(predRow(m, picks[m.id]), { onConflict: 'user_id,match_id' });
    if (error) throw error;
    predSetStatus(m.id, 'saved');
  } catch (e) {
    console.error('No se pudo guardar el pronostico:', e);
    predSetStatus(m.id, 'error');
  }
}

function predSetStatus(id, st) {
  predState.status[id] = st;
  const el = document.querySelector(`.pred-match[data-id="${CSS.escape(id)}"] .pred-status`);
  if (el) { el.textContent = st === 'saving' ? t('pred.saving') : st === 'saved' ? t('pred.saved') : st === 'error' ? t('pred.saveError') : ''; el.dataset.st = st; }
}

// ---- Supabase (login con Discord + ranking compartido) ----
function predLoadScript(src) {
  return new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = src; s.onload = ok; s.onerror = () => fail(new Error('No se pudo cargar ' + src));
    document.head.appendChild(s);
  });
}

async function predInitBackend() {
  if (!PRED_CONFIG.supabaseUrl || !PRED_CONFIG.supabaseKey) return;
  try {
    await predLoadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js');
    predState.sb = window.supabase.createClient(PRED_CONFIG.supabaseUrl, PRED_CONFIG.supabaseKey);
    const { data } = await predState.sb.auth.getSession();
    await predSetUser(data.session && data.session.user);
    predState.sb.auth.onAuthStateChange((ev, session) => {
      const u = session && session.user;
      if ((u && u.id) !== (predState.user && predState.user.id)) predSetUser(u);
    });
    let back = null;
    try { back = sessionStorage.getItem('dc-after-login'); sessionStorage.removeItem('dc-after-login'); } catch (e) {}
    if (back && predState.user) { const b = document.querySelector(`.tab-btn[data-tab="${back}"]`); if (b) b.click(); }
  } catch (e) {
    console.error('Predicciones: no se pudo conectar con Supabase:', e);
    predState.sb = null;
  }
  renderPredictions();
}

async function predSetUser(user) {
  predState.user = user || null;
  predState.remote = {};
  if (user) {
    const meta = user.user_metadata || {};
    const name = (meta.custom_claims && meta.custom_claims.global_name) || meta.full_name || meta.name || meta.user_name || 'Player';
    predState.name = name;
    predState.avatar = meta.avatar_url || null;
    try {
      await predState.sb.from('profiles').upsert({ user_id: user.id, name, avatar: meta.avatar_url || null }, { onConflict: 'user_id' });
      const { data, error } = await predState.sb.from('predictions').select('match_id,pick,diff').eq('user_id', user.id);
      if (error) throw error;
      (data || []).forEach(r => { predState.remote[r.match_id] = { pick: r.pick, diff: r.diff }; });
      // Lo pronosticado antes de loguearse en este navegador se sube (si la partida sigue abierta)
      const rows = predMatches().filter(m => !predLocked(m) && predState.local[m.id] && !predState.remote[m.id])
        .map(m => { predState.remote[m.id] = predState.local[m.id]; return predRow(m, predState.local[m.id]); });
      if (rows.length) await predState.sb.from('predictions').upsert(rows, { onConflict: 'user_id,match_id' });
    } catch (e) { console.error('No se pudieron cargar los pronosticos:', e); }
  }
  predState.board = null; predState.boardAt = 0;
  renderUserChip();
  renderPredictions();
  renderTtBox();
  predLoadBoard();
  wgLoad();
}

async function predLogin(backTab = 'predictions') {
  if (!predState.sb) return;
  try { sessionStorage.setItem('dc-after-login', backTab); } catch (e) {}
  await predState.sb.auth.signInWithOAuth({ provider: 'discord', options: { redirectTo: location.origin + location.pathname } });
}
async function predLogout() { if (predState.sb) await predState.sb.auth.signOut(); }

async function predPageAll(table, cols) {
  const all = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await predState.sb.from(table).select(cols).order('user_id').order(table === 'profiles' ? 'user_id' : 'match_id').range(from, from + 999);
    if (error) throw error;
    all.push(...data);
    if (data.length < 1000) break;
  }
  return all;
}

// Puntos de cada jugador: se cuentan solo los pronosticos guardados ANTES de que empiece la partida
// (la fecha de guardado la pone el servidor, no se puede falsificar).
function predComputeBoard(rows, profiles) {
  const byId = {}; predMatches().forEach(m => { byId[m.id] = m; });
  const prof = {}; profiles.forEach(p => { prof[p.user_id] = p; });
  const users = {};
  rows.forEach(r => {
    const m = byId[r.match_id];
    if (!m || !predHasResult(m) || !m.when || new Date(r.updated_at) >= m.when) return;
    const sc = scorePrediction({ pick: r.pick, diff: r.diff }, m);
    const u = users[r.user_id] || (users[r.user_id] = { id: r.user_id, name: (prof[r.user_id] || {}).name || 'Player', avatar: (prof[r.user_id] || {}).avatar, pts: 0, hits: 0, gaps: 0 });
    u.pts += sc.pts;
    if (sc.pts > 0) u.hits++;
    if (sc.kind === 'diff') u.gaps++;
  });
  return Object.values(users).sort((x, y) => y.pts - x.pts || y.gaps - x.gaps || y.hits - x.hits || x.name.localeCompare(y.name));
}

async function predLoadBoard(force) {
  if (!predState.sb) return;
  if (!force && predState.board && Date.now() - predState.boardAt < 60000) return;
  try {
    const [rows, profiles] = await Promise.all([
      predPageAll('predictions', 'user_id,match_id,pick,diff,updated_at'),
      predPageAll('profiles', 'user_id,name,avatar'),
    ]);
    predState.board = predComputeBoard(rows, profiles);
    predState.boardErr = false;
  } catch (e) {
    console.error('No se pudo cargar el ranking:', e);
    predState.boardErr = true;
  }
  predState.boardAt = Date.now();
  if (predState.sub === 'board') renderPredictions();
  else renderPredSummary();
}

// ---- pantalla ----
function predMine() {
  let pts = 0, hits = 0;
  predMatches().forEach(m => {
    const sc = scorePrediction(predPicks()[m.id], m);
    if (sc) { pts += sc.pts; if (sc.pts > 0) hits++; }
  });
  return { pts, hits };
}

function renderPredSummary() {
  const el = document.getElementById('pred-summary');
  if (!el) return;
  const mine = predMine();
  let rank = '—';
  if (predState.board && predState.user) {
    const i = predState.board.findIndex(u => u.id === predState.user.id);
    if (i >= 0) rank = '#' + (i + 1);
  }
  el.innerHTML = `<span><b>${mine.pts}</b> ${esc(t('pred.myPts'))}</span><span><b>${mine.hits}</b> ${esc(t('pred.myHits'))}</span>${predState.sb ? `<span><b>${esc(rank)}</b> ${esc(t('pred.myRank'))}</span>` : ''}`;
}

function predMatchCard(m, fmtDay, fmtTime) {
  const picks = predPicks(), p = picks[m.id] || null;
  const locked = predLocked(m), has = predHasResult(m), under = predUnderdog(m);
  const sc = scorePrediction(p, m);
  const side = (k, name) => {
    const cls = ['pred-side'];
    if (p && p.pick === k) cls.push('is-picked');
    if (has && (m.tA < m.tB ? 'a' : 'b') === k) cls.push('is-winner');
    return `<button type="button" class="${cls.join(' ')}" data-side="${k}"${locked ? ' disabled' : ''}>
      <span class="pred-name">${nameWithFlag(name)}</span>
      ${under === k ? `<span class="pred-under" title="${esc(t('pred.underdogTip'))}">${esc(t('pred.underdog'))}</span>` : ''}
      ${has ? `<span class="pred-time">${esc(fmtRaceTime(k === 'a' ? m.tA : m.tB))}</span>` : ''}
    </button>`;
  };
  const when = m.when ? `${fmtDay.format(m.when)} · ${fmtTime.format(m.when)}` : t('pred.timeTbd');
  const grp = m.g ? ` · ${t('group.word')} ${m.g}` : '';
  let foot;
  if (!locked) {
    foot = `<label class="pred-diff">${esc(t('pred.diffLabel'))}
        <input class="pred-diff-input" type="text" inputmode="numeric" autocomplete="off" placeholder="m:ss" value="${p && p.diff != null ? esc(fmtRaceTime(p.diff)) : ''}"${p ? '' : ' disabled'}>
      </label><span class="pred-status" aria-live="polite"></span>`;
  } else {
    const mine = p ? t('pred.yourPick', { name: p.pick === 'a' ? m.a : m.b }) + (p.diff != null ? ' · ' + t('pred.gap', { d: fmtRaceTime(p.diff) }) : '') : t('pred.noPick');
    foot = `<span class="pred-mine">${esc(mine)}</span>` + (has
      ? `<span class="pred-gap">${esc(t('pred.gap', { d: fmtRaceTime(Math.abs(m.tA - m.tB)) }))}</span>` + (sc && p ? `<span class="pred-pts pred-${sc.kind}">${esc(t('pred.pts', { n: sc.pts }))} · ${esc(t('pred.kind.' + sc.kind))}</span>` : '')
      : `<span class="pred-closed">${esc(t('pred.closed'))}</span>`);
  }
  return `<article class="pred-match${locked ? ' is-locked' : ''}" data-id="${esc(m.id)}">
    <div class="pred-when">${esc(when)}${esc(grp)}</div>
    <div class="pred-pair">${side('a', m.a)}<span class="pred-vs">${esc(t('sched.vs'))}</span>${side('b', m.b)}</div>
    <div class="pred-foot">${foot}</div>
  </article>`;
}

function renderPredictions() {
  const root = document.getElementById('pred-root');
  if (!root) return;
  const ms = predMatches();
  const loc = LOCALES[currentLang];
  const fmtDay = new Intl.DateTimeFormat(loc, { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtTime = new Intl.DateTimeFormat(currentLang === 'id' || currentLang === 'ja' ? 'en-GB' : loc, { hour: '2-digit', minute: '2-digit', hour12: false });

  const account = predState.sb
    ? (predState.user
      ? `<span class="pred-user">${esc(t('pred.hello', { name: predState.name || '' }))}</span><button type="button" class="pred-btn pred-btn-alt" data-act="logout">${esc(t('pred.logout'))}</button>`
      : `<span class="pred-user">${esc(t('pred.needLogin'))}</span><button type="button" class="pred-btn" data-act="login"><svg class="ic" aria-hidden="true"><use href="#ic-discord"/></svg> ${esc(t('pred.login'))}</button>`)
    : `<span class="pred-user">${esc(t('pred.local'))}</span>`;

  const subs = ['picks', 'board', 'rules'].map(k =>
    `<button type="button" class="pred-sub${predState.sub === k ? ' active' : ''}" data-sub="${k}">${esc(t('pred.sub.' + k))}</button>`).join('');

  let body = '';
  if (predState.sub === 'picks') {
    if (!ms.length) body = `<p class="loading-msg">${esc(t('pred.noMatches'))}</p>`;
    else {
      const rounds = [];
      ms.forEach(m => {
        const key = m.md ? 'r' + m.md : 's' + m.stage;
        let r = rounds.find(x => x.key === key);
        if (!r) rounds.push(r = { key, label: m.md ? t('sched.round', { n: m.md }) : m.stage, list: [] });
        r.list.push(m);
      });
      // Se abre la primera ronda que todavia tenga partidas por pronosticar
      const openKey = (rounds.find(r => r.list.some(m => !predLocked(m))) || rounds[rounds.length - 1]).key;
      body = rounds.map(r => `<details class="pred-round" data-key="${esc(r.key)}"${(predState.openSet ? predState.openSet.has(r.key) : r.key === openKey) ? ' open' : ''}>
          <summary><span>${esc(r.label)}</span><span class="pred-round-n">${r.list.filter(m => !predLocked(m)).length}/${r.list.length}</span></summary>
          <div class="pred-grid">${r.list.map(m => predMatchCard(m, fmtDay, fmtTime)).join('')}</div>
        </details>`).join('');
    }
  } else if (predState.sub === 'board') {
    if (!predState.sb) body = `<p class="loading-msg">${esc(t('pred.board.local'))}</p>`;
    else if (predState.boardErr) body = `<p class="loading-msg">${esc(t('pred.board.error'))}</p>`;
    else if (!predState.board) body = `<p class="loading-msg">${esc(t('pred.board.loading'))}</p>`;
    else if (!predState.board.length) body = `<p class="loading-msg">${esc(t('pred.board.empty'))}</p>`;
    else body = `<table class="pred-board"><thead><tr><th>#</th><th>${esc(t('pred.board.player'))}</th><th>${esc(t('pred.board.hits'))}</th><th>${esc(t('pred.board.pts'))}</th></tr></thead><tbody>${
      predState.board.slice(0, 100).map((u, i) => `<tr${predState.user && u.id === predState.user.id ? ' class="is-me"' : ''}>
        <td>${i + 1}</td>
        <td><span class="pred-player">${u.avatar && /^https:\/\//.test(u.avatar) ? `<img src="${esc(u.avatar)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ''}${esc(u.name)}</span></td>
        <td>${u.hits}</td><td class="pred-total">${u.pts}</td></tr>`).join('')}</tbody></table>`;
  } else {
    const P = PRED_CONFIG.pts, M = PRED_CONFIG.diffMargin;
    body = `<ol class="pred-rules">
      <li>${esc(t('pred.rules.1'))}</li>
      <li>${esc(t('pred.rules.2', { n: P.winner }))}</li>
      <li>${esc(t('pred.rules.3', { n: P.underdog }))}</li>
      <li>${esc(t('pred.rules.4', { n: P.diff, s: M }))}</li>
      <li>${esc(t('pred.rules.5', { n: P.diff }))}</li>
    </ol>`;
  }

  root.innerHTML = `<div class="pred-bar">${account}</div>
    <div class="pred-summary" id="pred-summary"></div>
    <div class="pred-subs" role="tablist">${subs}</div>
    <div class="pred-body">${body}</div>`;
  renderPredSummary();
  root.querySelectorAll('details.pred-round').forEach(d => d.addEventListener('toggle', () => {
    predState.openSet = predState.openSet || new Set();
    if (d.open) predState.openSet.add(d.dataset.key); else predState.openSet.delete(d.dataset.key);
  }));
}

function initPredictions() {
  predLoadLocal();
  const root = document.getElementById('pred-root');
  if (!root) return;
  root.addEventListener('click', e => {
    const sub = e.target.closest('[data-sub]');
    if (sub) { predState.sub = sub.dataset.sub; if (predState.sub === 'board') predLoadBoard(true); renderPredictions(); return; }
    const act = e.target.closest('[data-act]');
    if (act) { act.dataset.act === 'login' ? predLogin() : predLogout(); return; }
    const sideBtn = e.target.closest('.pred-side');
    if (sideBtn && !sideBtn.disabled) {
      const card = sideBtn.closest('.pred-match');
      const m = predMatches().find(x => x.id === card.dataset.id);
      if (!m) return;
      const prev = predPicks()[m.id];
      predSave(m, sideBtn.dataset.side, prev ? prev.diff : null);
      card.querySelectorAll('.pred-side').forEach(b => b.classList.toggle('is-picked', b === sideBtn));
      const inp = card.querySelector('.pred-diff-input'); if (inp) inp.disabled = false;
      renderPredSummary();
    }
  });
  root.addEventListener('change', e => {
    const inp = e.target.closest('.pred-diff-input');
    if (!inp) return;
    const card = inp.closest('.pred-match');
    const m = predMatches().find(x => x.id === card.dataset.id);
    const prev = m && predPicks()[m.id];
    if (!m || !prev) return;
    const v = inp.value.trim() === '' ? null : parseRaceTime(inp.value);
    inp.classList.toggle('is-invalid', inp.value.trim() !== '' && v == null);
    if (inp.value.trim() !== '' && v == null) return;
    predSave(m, prev.pick, v);
    if (v != null) inp.value = fmtRaceTime(v);
  });
  const tab = document.querySelector('.tab-btn[data-tab="predictions"]');
  if (tab) tab.addEventListener('click', () => { renderPredictions(); predLoadBoard(); });
  renderPredictions();
  predInitBackend();
}

// ======= MERCHANT'S WAGER: PTAS, apuestas a las partidas y tienda =======
// Todo el dinero vive en Supabase (supabase/wager.sql): la pagina solo muestra y pide operaciones, y las
// funciones de la base validan saldo, horario y cuota. La cuota de cada partida la publica el admin (JokerUY)
// al abrir la pagina, calculada con los tiempos de clasificatoria; tambien es quien liquida con el resultado de la hoja.
// PTAS son una moneda de juego: no se compran ni se canjean por dinero.
const WG_K = 40;                              // pendiente de la curva: p(gana el mas rapido) = 1 / (1 + e^(-K * d))
const WG_ODDS_MIN = 1.05, WG_ODDS_MAX = 30;   // tope de la cuota para que ni el favorito pague nada ni el sorpresa pague mil veces
const WG_ERRORS = ['daily_off', 'funds', 'closed', 'already_bet', 'min_bet', 'inactive', 'already_claimed', 'already_owned', 'login', 'no_market', 'no_item'];
const wg = { ok: false, cfg: null, wallet: null, markets: [], bets: {}, shop: [], buys: [], badges: {}, pending: [], names: {},
  board: null, boardErr: false, sub: 'bets', sel: {}, busy: false, err: '', msg: '', syncAt: 0, syncing: false };
const wgAdmin = () => !!(predState.user && predState.user.id === TT_ADMIN_ID);
const wgFmt = n => Number(n || 0).toLocaleString(LOCALES[currentLang] || 'en-US');
const wgToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Montevideo' }).format(new Date());   // mismo dia que usa la base

// Tiempo de clasificatoria (segundos) de un runner, de la hoja Qualifiers; null si no esta
function wgQualTime(name) {
  const rows = lastStandingsRows;
  if (!rows || !rows.length || !name) return null;
  const head = rows[0];
  const rCol = pickKey(head, ['Corredor', 'Runner', 'Nombre']) || Object.keys(head)[1];
  const row = rows.find(r => String(r[rCol] || '').trim().toLowerCase() === String(name).trim().toLowerCase());
  if (!row) return null;
  const tCol = pickKey(head, [t('clas.col.time'), 'Mejor tiempo', 'Best time', 'Tiempo', 'Time', 'Qualifier time'])
    || Object.keys(head).find(k => k !== rCol && /[:.]/.test(row[k] || '') && parseRaceTime(row[k]) != null);
  return tCol ? parseRaceTime(row[tCol]) : null;
}

// Cuotas (multiplicador de lo apostado) a partir de los tiempos de clasificatoria; null si falta alguno.
// d = (tiempo del mas lento - tiempo del mas rapido) / tiempo del mas rapido; cuota justa = 1 / probabilidad.
function wgOdds(tA, tB) {
  if (!(tA > 0 && tB > 0)) return null;
  const fast = Math.min(tA, tB), d = (Math.max(tA, tB) - fast) / fast;
  const pFast = 1 / (1 + Math.exp(-WG_K * d));
  const cl = p => Math.round(Math.min(WG_ODDS_MAX, Math.max(WG_ODDS_MIN, 1 / p)) * 100) / 100;
  const f = cl(pFast), s = cl(1 - pFast);
  return tA <= tB ? { a: f, b: s } : { a: s, b: f };
}

async function wgLoad(skipSync) {
  const sb = predState.sb, u = predState.user;
  if (!sb) return;
  try {
    const none = Promise.resolve({ data: null, error: null });
    const [cfg, mk, shop, buys, wal, bets] = await Promise.all([
      sb.from('wager_config').select('*').eq('id', 1).maybeSingle(),
      sb.from('wager_markets').select('*').order('start_at'),
      sb.from('shop_items').select('*').order('sort'),
      sb.from('shop_purchases').select('id,user_id,item_id,fulfilled,created_at'),   // la base deja: las propias, los badges de todos y (admin) todas
      u ? sb.from('wallets').select('balance,last_daily').eq('user_id', u.id).maybeSingle() : none,
      u ? sb.from('wager_bets').select('*').eq('user_id', u.id) : none,
    ]);
    for (const r of [cfg, mk, shop, buys, wal, bets]) if (r.error) throw r.error;
    if (!cfg.data) throw new Error('sin configuracion');
    wg.cfg = cfg.data; wg.markets = mk.data || []; wg.shop = (shop.data || []).filter(i => i.active);
    wg.wallet = wal.data || { balance: 0, last_daily: null };
    wg.bets = {}; (bets.data || []).forEach(b => { wg.bets[b.match_id] = b; });
    const kind = {}; wg.shop.forEach(i => { kind[i.id] = i; });
    wg.buys = u ? (buys.data || []).filter(p => p.user_id === u.id) : [];
    wg.badges = {};
    (buys.data || []).forEach(p => { const it = kind[p.item_id]; if (it && it.kind === 'badge' && it.icon) (wg.badges[p.user_id] = wg.badges[p.user_id] || []).push(it.icon); });
    wg.pending = wgAdmin() ? (buys.data || []).filter(p => !p.fulfilled) : [];
    if (wg.pending.length) {
      const ids = [...new Set(wg.pending.map(p => p.user_id))];
      const { data } = await sb.from('profiles').select('user_id,name').in('user_id', ids);
      (data || []).forEach(p => { wg.names[p.user_id] = p.name; });
    }
    wg.ok = true;
  } catch (e) {
    console.error('Merchant\'s Wager: no se pudo cargar (¿falta correr supabase/wager.sql?):', e);
    wg.ok = false;
  }
  wgUpdateTab();
  renderWager();
  if (wg.ok && !skipSync && wgAdmin() && Date.now() - wg.syncAt > 60000) wgAdminSync();
}

// La pestaña solo se ve cuando el admin activa el sistema (o para el admin, para probarlo)
function wgUpdateTab() {
  const show = wg.ok && (wg.cfg.active || wgAdmin());
  const tab = document.querySelector('.tab-btn[data-tab="wager"]');
  if (tab) tab.hidden = !show;
  renderUserChip();
}

// Arriba a la derecha de las pestañas: las PTAS de la cuenta y la foto de perfil de Discord (con menu para cerrar sesion);
// sin sesion, el boton para entrar con Discord
function renderUserChip() {
  const chip = document.getElementById('user-chip');
  if (!chip) return;
  const u = predState.user;
  chip.hidden = !predState.sb;
  const hud = document.getElementById('wg-hud');
  if (hud) {
    hud.hidden = !(u && wg.ok && (wg.cfg.active || wgAdmin()));
    const n = document.getElementById('wg-hud-n');
    if (n) n.textContent = wgFmt(wg.wallet ? wg.wallet.balance : 0);
  }
  const av = document.getElementById('user-avatar'), login = document.getElementById('user-login'), menu = document.getElementById('user-menu');
  if (login) login.hidden = !!u;
  if (av) av.hidden = !u;
  if (!u) { if (menu) menu.hidden = true; return; }
  const name = predState.name || '';
  av.title = name;
  av.innerHTML = predState.avatar && /^https:///.test(predState.avatar)
    ? `<img src="${esc(predState.avatar)}" alt="${esc(name)}" referrerpolicy="no-referrer">`
    : `<span>${esc((name || '?').charAt(0).toUpperCase())}</span>`;
  const nm = document.getElementById('user-menu-name');
  if (nm) nm.textContent = name;
}

// En pantallas chicas las pestañas se esconden tras el menú: el recuadro pasa a la fila del logo para seguir visible
function initUserChip() {
  const chip = document.getElementById('user-chip');
  if (!chip) return;
  const av = document.getElementById('user-avatar'), menu = document.getElementById('user-menu');
  const closeMenu = () => { menu.hidden = true; av.setAttribute('aria-expanded', 'false'); };
  av.addEventListener('click', e => { e.stopPropagation(); menu.hidden = !menu.hidden; av.setAttribute('aria-expanded', String(!menu.hidden)); });
  document.getElementById('user-logout').addEventListener('click', () => { closeMenu(); predLogout(); });
  document.getElementById('user-login').addEventListener('click', () => predLogin(document.body.dataset.tab || 'predictions'));
  document.addEventListener('click', e => { if (!e.target.closest('.user-menu-wrap')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  if (!window.matchMedia) return;
  const mq = window.matchMedia('(max-width: 1200px)');
  const place = () => {
    if (mq.matches) document.querySelector('.topbar-inner').insertBefore(chip, document.querySelector('.topbar-actions'));
    else document.getElementById('tabs').appendChild(chip);
  };
  place();
  mq.addEventListener ? mq.addEventListener('change', place) : mq.addListener(place);
}

// Logo de cada articulo: Discord y VIP de Twitch con su simbolo; los badges, su emoji
function wgIcon(it) {
  if (it.kind === 'discord_role') return '<svg class="ic" aria-hidden="true"><use href="#ic-discord"/></svg>';
  if (it.kind === 'twitch_vip') return '<svg class="ic" aria-hidden="true"><use href="#ic-vip"/></svg>';
  return esc(it.icon || '🎁');
}

// Nombre y descripcion de un articulo en el idioma de la persona (la base los guarda en espanol; los articulos nuevos sin traduccion usan el texto de la base)
function wgItemText(it, field) {
  const k = 'wg.item.' + it.id + '.' + field;
  const v = t(k);
  return v !== k ? v : (field === 'name' ? it.name : it.description);
}

function wgBadgeHtml(userId) {
  const b = wg.badges[userId];
  return b && b.length ? ` <span class="wg-badges">${b.map(esc).join('')}</span>` : '';
}

async function wgRpc(fn, args) {
  const sb = predState.sb;
  if (!sb || !predState.user || wg.busy) return false;
  wg.busy = true; wg.err = ''; wg.msg = ''; renderWager();
  let ok = false;
  try {
    const { error } = await sb.rpc(fn, args);
    if (error) throw error;
    ok = true;
  } catch (e) {
    const code = WG_ERRORS.find(c => String((e && e.message) || '').includes(c));
    if (!code) console.error('Merchant\'s Wager:', e);
    wg.err = code || 'generic';
  }
  wg.busy = false;
  await wgLoad(true);
  return ok;
}

// ADMIN: publica las cuotas de las partidas nuevas y liquida las que ya tienen resultado en la hoja
async function wgAdminSync(manual) {
  const sb = predState.sb;
  if (!sb || !wgAdmin() || !wg.ok || wg.syncing) return;
  wg.syncing = true; wg.syncAt = Date.now();
  let up = 0, st = 0;
  try {
    const byId = new Map(wg.markets.map(m => [m.match_id, m]));
    for (const m of predMatches()) {
      const mk = byId.get(m.id);
      if (mk && mk.winner == null && predHasResult(m)) {
        const { error } = await sb.rpc('wager_admin_settle', { p_match: m.id, p_winner: m.tA < m.tB ? 'a' : 'b' });
        if (error) throw error;
        st++;
      } else if (!predLocked(m) && m.when) {
        const o = wgOdds(wgQualTime(m.a), wgQualTime(m.b));
        if (o && (!mk || mk.odds_a !== o.a || mk.odds_b !== o.b || mk.a !== m.a || mk.b !== m.b || new Date(mk.start_at).getTime() !== m.when.getTime())) {
          const { error } = await sb.rpc('wager_admin_upsert_market', { p_match: m.id, p_a: m.a, p_b: m.b, p_odds_a: o.a, p_odds_b: o.b, p_start: m.when.toISOString() });
          if (error) throw error;
          up++;
        }
      }
    }
    wg.msg = t('wg.admin.synced', { up, st });
  } catch (e) {
    console.error('Merchant\'s Wager: fallo la sincronizacion:', e);
    wg.err = 'generic';
  }
  wg.syncing = false;
  if (up || st) await wgLoad(true); else if (manual) renderWager();
}

async function wgLoadBoard() {
  const sb = predState.sb;
  if (!sb) return;
  try {
    const { data: ws, error } = await sb.from('wallets').select('user_id,balance').order('balance', { ascending: false }).limit(50);
    if (error) throw error;
    const ids = (ws || []).map(w => w.user_id);
    const { data: ps } = ids.length ? await sb.from('profiles').select('user_id,name,avatar').in('user_id', ids) : { data: [] };
    const prof = {}; (ps || []).forEach(p => { prof[p.user_id] = p; });
    wg.board = (ws || []).map(w => ({ id: w.user_id, bal: w.balance, name: (prof[w.user_id] || {}).name || 'Player', avatar: (prof[w.user_id] || {}).avatar }));
    wg.boardErr = false;
  } catch (e) {
    console.error('Merchant\'s Wager: no se pudo cargar el ranking:', e);
    wg.boardErr = true;
  }
  if (wg.sub === 'board') renderWager();
}

function wgMarketCard(mk, fmtDay, fmtTime) {
  const bet = wg.bets[mk.match_id], sel = wg.sel[mk.match_id] || {};
  const start = new Date(mk.start_at);
  const closed = mk.winner != null || start <= new Date();
  const user = predState.user;
  const side = (k, name) => {
    const cls = ['pred-side', 'wg-side'];
    if (bet ? bet.pick === k : sel.pick === k) cls.push('is-picked');
    if (mk.winner === k) cls.push('is-winner');
    return `<button type="button" class="${cls.join(' ')}" data-wg="pick" data-side="${k}"${closed || bet || !user || wg.busy ? ' disabled' : ''}>
      <span class="pred-name">${nameWithFlag(name)}</span>
      <span class="wg-odds">${esc(t('wg.odds', { n: Number(k === 'a' ? mk.odds_a : mk.odds_b).toFixed(2) }))}</span>
    </button>`;
  };
  let foot;
  if (bet) {
    const who = bet.pick === 'a' ? mk.a : mk.b;
    const st = bet.status === 'won' ? t('wg.status.won', { n: wgFmt(bet.payout) }) : t('wg.status.' + bet.status);
    foot = `<span class="pred-mine">${esc(t('wg.yourBet', { n: wgFmt(bet.stake), name: who, odds: Number(bet.odds).toFixed(2) }))}</span>
      <span class="pred-pts wg-st-${bet.status}">${esc(st)}</span>`;
  } else if (closed) {
    foot = `<span class="pred-closed">${esc(mk.winner ? t('wg.ended') : t('wg.closed'))}</span>`;
  } else if (!user) {
    foot = `<span class="pred-closed">${esc(t('wg.needLogin'))}</span>`;
  } else {
    const min = (wg.cfg && wg.cfg.min_bet) || 10;
    const stake = sel.stake || '';
    const win = sel.pick && stake ? Math.floor(stake * Number(sel.pick === 'a' ? mk.odds_a : mk.odds_b)) : 0;
    foot = `<div class="wg-bet">
        <input class="wg-stake" type="number" inputmode="numeric" min="${min}" step="1" placeholder="${esc(t('wg.stake'))}" value="${stake}"${wg.busy ? ' disabled' : ''}>
        <button type="button" class="wg-preset" data-wg="preset" data-v="${min}">${min}</button>
        <button type="button" class="wg-preset" data-wg="preset" data-v="100">100</button>
        <button type="button" class="wg-preset" data-wg="preset" data-v="500">500</button>
        <button type="button" class="wg-preset" data-wg="preset" data-v="all">${esc(t('wg.all'))}</button>
      </div>
      <span class="wg-win">${win ? esc(t('wg.win', { n: wgFmt(win) })) : esc(t('wg.pickFirst'))}</span>
      <button type="button" class="pred-btn wg-go" data-wg="bet"${wg.busy ? ' disabled' : ''}>${esc(t('wg.bet'))}</button>`;
  }
  return `<article class="pred-match wg-match${closed ? ' is-locked' : ''}" data-id="${esc(mk.match_id)}">
    <div class="pred-when">${esc(fmtDay.format(start))} · ${esc(fmtTime.format(start))}</div>
    <div class="pred-pair">${side('a', mk.a)}<span class="pred-vs">${esc(t('sched.vs'))}</span>${side('b', mk.b)}</div>
    <div class="pred-foot wg-foot">${foot}</div>
  </article>`;
}

function renderWager() {
  const root = document.getElementById('wg-root');
  if (!root) return;
  if (!predState.sb) { root.innerHTML = `<p class="loading-msg">${esc(t('pred.local'))}</p>`; return; }
  if (!wg.ok) { root.innerHTML = `<p class="loading-msg">${esc(t('wg.soon'))}</p>`; return; }
  const user = predState.user, admin = wgAdmin(), cfg = wg.cfg;
  const loc = LOCALES[currentLang];
  const fmtDay = new Intl.DateTimeFormat(loc, { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtTime = new Intl.DateTimeFormat(currentLang === 'id' || currentLang === 'ja' ? 'en-GB' : loc, { hour: '2-digit', minute: '2-digit', hour12: false });

  const claimed = user && wg.wallet && wg.wallet.last_daily === wgToday();
  const bar = user
    ? `<div class="wg-wallet"><span class="wg-bal">${wgFmt(wg.wallet.balance)}</span><span class="wg-cur">PTAS</span></div>
       <button type="button" class="pred-btn wg-daily" data-wg="daily"${claimed || wg.busy || !cfg.active || !cfg.daily_enabled ? ' disabled' : ''}>${esc(!cfg.daily_enabled ? t('wg.dailySoon') : claimed ? t('wg.dailyDone') : t('wg.daily', { n: wgFmt(cfg.daily) }))}</button>
       <span class="pred-user">${esc(t('pred.hello', { name: predState.name || '' }))}${wgBadgeHtml(user.id)}</span>
       <button type="button" class="pred-btn pred-btn-alt" data-wg="logout">${esc(t('pred.logout'))}</button>`
    : `<span class="pred-user">${esc(t('wg.needLogin'))}</span>
       <button type="button" class="pred-btn" data-wg="login"><svg class="ic" aria-hidden="true"><use href="#ic-discord"/></svg> ${esc(t('pred.login'))}</button>`;

  const tabs = ['bets', 'mine', 'shop', 'board', 'rules'].concat(admin ? ['admin'] : []);
  const subs = tabs.map(k => `<button type="button" class="pred-sub${wg.sub === k ? ' active' : ''}" data-wg="sub" data-sub="${k}">${esc(t('wg.sub.' + k))}</button>`).join('');

  let body = '';
  if (wg.sub === 'bets') {
    const now = Date.now();
    const open = wg.markets.filter(m => m.winner == null && new Date(m.start_at) > now);
    const rest = wg.markets.filter(m => !open.includes(m)).sort((a, b) => new Date(b.start_at) - new Date(a.start_at)).slice(0, 30);
    body = !wg.markets.length ? `<p class="loading-msg">${esc(t('wg.noMarkets'))}</p>`
      : `<div class="pred-grid wg-grid">${open.concat(rest).map(m => wgMarketCard(m, fmtDay, fmtTime)).join('')}</div>`;
  } else if (wg.sub === 'mine') {
    const mk = {}; wg.markets.forEach(m => { mk[m.match_id] = m; });
    const list = Object.values(wg.bets).filter(b => mk[b.match_id]).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    body = !user ? `<p class="loading-msg">${esc(t('wg.needLogin'))}</p>`
      : !list.length ? `<p class="loading-msg">${esc(t('wg.noBets'))}</p>`
      : `<div class="pred-grid wg-grid">${list.map(b => wgMarketCard(mk[b.match_id], fmtDay, fmtTime)).join('')}</div>`;
  } else if (wg.sub === 'shop') {
    const mine = new Map(wg.buys.map(p => [p.item_id, p]));
    body = !wg.shop.length ? `<p class="loading-msg">${esc(t('wg.shop.empty'))}</p>` : `<div class="wg-shop">${wg.shop.map(it => {
      const own = mine.get(it.id);
      const afford = user && wg.wallet.balance >= it.price;
      const act = own
        ? `<span class="wg-owned">${esc(it.kind === 'badge' ? t('wg.shop.owned') : own.fulfilled ? t('wg.shop.delivered') : t('wg.shop.pending'))}</span>`
        : `<button type="button" class="pred-btn wg-buy" data-wg="buy" data-id="${esc(it.id)}"${!user || !afford || wg.busy || !cfg.active ? ' disabled' : ''}>${esc(t('wg.shop.buy', { n: wgFmt(it.price) }))}</button>`;
      return `<article class="wg-item"><div class="wg-item-icon wg-ic-${esc(it.kind)}" aria-hidden="true">${wgIcon(it)}</div>
        <div class="wg-item-body"><h4>${esc(wgItemText(it, 'name'))}</h4><span class="wg-item-kind">${esc(t('wg.shop.kind.' + it.kind))}</span><p>${esc(wgItemText(it, 'desc'))}</p></div>
        <div class="wg-item-act">${act}</div></article>`;
    }).join('')}</div>`;
  } else if (wg.sub === 'board') {
    if (wg.boardErr) body = `<p class="loading-msg">${esc(t('pred.board.error'))}</p>`;
    else if (!wg.board) body = `<p class="loading-msg">${esc(t('pred.board.loading'))}</p>`;
    else if (!wg.board.length) body = `<p class="loading-msg">${esc(t('pred.board.empty'))}</p>`;
    else body = `<table class="pred-board"><thead><tr><th>#</th><th>${esc(t('pred.board.player'))}</th><th>PTAS</th></tr></thead><tbody>${
      wg.board.map((u, i) => `<tr${user && u.id === user.id ? ' class="is-me"' : ''}><td>${i + 1}</td>
        <td><span class="pred-player">${u.avatar && /^https:\/\//.test(u.avatar) ? `<img src="${esc(u.avatar)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ''}${esc(u.name)}${wgBadgeHtml(u.id)}</span></td>
        <td class="pred-total">${wgFmt(u.bal)}</td></tr>`).join('')}</tbody></table>`;
  } else if (wg.sub === 'rules') {
    body = `<ol class="pred-rules">${[1, 2, 3, 4, 5, 6].map(i => `<li>${esc(t('wg.rules.' + i, { n: cfg.daily, m: cfg.min_bet }))}</li>`).join('')}</ol>`;
  } else {
    body = `<div class="wg-admin"><p class="pred-user">${esc(cfg.active ? t('wg.admin.on') : t('wg.admin.off'))}</p>
      <div class="wg-adminrow"><button type="button" class="pred-btn" data-wg="sync"${wg.syncing ? ' disabled' : ''}>${esc(t('wg.admin.sync'))}</button>
      <span class="pred-user">${esc(t('wg.admin.markets', { n: wg.markets.length }))}</span></div>
      <h4 class="wg-h">${esc(t('wg.admin.pending'))}</h4>` + (wg.pending.length
      ? wg.pending.map(p => { const it = wg.shop.find(i => i.id === p.item_id) || { name: p.item_id, kind: '' };
          return `<div class="wg-adminrow"><span class="pred-user">${esc(wg.names[p.user_id] || p.user_id)} — ${esc(wgItemText(it, 'name'))}</span>
            <button type="button" class="pred-btn pred-btn-alt" data-wg="fulfill" data-id="${p.id}">${esc(t('wg.admin.done'))}</button></div>`; }).join('')
      : `<p class="loading-msg">${esc(t('wg.admin.none'))}</p>`) + `</div>`;
  }

  const err = wg.err ? `<p class="live-tterr">${esc(t('wg.err.' + wg.err, { n: cfg.min_bet }))}</p>` : '';
  const msg = wg.msg ? `<p class="live-ttnote">${esc(wg.msg)}</p>` : '';
  const off = !cfg.active ? `<p class="live-tterr">${esc(t('wg.inactive'))}</p>` : '';
  root.innerHTML = `${off}<div class="pred-bar wg-bar">${bar}</div>${err}${msg}
    <div class="pred-subs" role="tablist">${subs}</div><div class="pred-body">${body}</div>`;
}

function initWager() {
  initUserChip();
  initWagerSound();
  const root = document.getElementById('wg-root');
  if (!root) return;
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-wg]');
    if (!b || b.disabled) return;
    const a = b.dataset.wg, card = b.closest('.wg-match');
    if (a === 'sub') { wg.sub = b.dataset.sub; if (wg.sub === 'board') wgLoadBoard(); renderWager(); }
    else if (a === 'login') predLogin('wager');
    else if (a === 'logout') predLogout();
    else if (a === 'daily') wgRpc('wager_claim_daily', {});
    else if (a === 'sync') wgAdminSync(true);
    else if (a === 'fulfill') wgRpc('wager_admin_fulfill', { p_id: Number(b.dataset.id) });
    else if (a === 'buy') {
      const it = wg.shop.find(i => i.id === b.dataset.id);
      if (it && confirm(t('wg.shop.confirm', { name: wgItemText(it, 'name'), n: wgFmt(it.price) }))) wgRpc('wager_buy', { p_item: it.id });
    } else if (a === 'pick' && card) {
      const id = card.dataset.id, s = wg.sel[id] = wg.sel[id] || {};
      s.pick = b.dataset.side;
      card.querySelectorAll('.wg-side').forEach(x => x.classList.toggle('is-picked', x === b));
      wgUpdateWin(card);
    } else if (a === 'preset' && card) {
      const inp = card.querySelector('.wg-stake');
      inp.value = b.dataset.v === 'all' ? wg.wallet.balance : b.dataset.v;
      inp.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (a === 'bet' && card) {
      const id = card.dataset.id, s = wg.sel[id] || {};
      if (!s.pick) { wg.err = 'pick'; wg.msg = ''; renderWager(); return; }
      wgRpc('wager_place_bet', { p_match: id, p_pick: s.pick, p_stake: Math.floor(Number(s.stake) || 0) }).then(ok => { if (ok) delete wg.sel[id]; });
    }
  });
  root.addEventListener('input', e => {
    const inp = e.target.closest('.wg-stake');
    if (!inp) return;
    const card = inp.closest('.wg-match');
    const s = wg.sel[card.dataset.id] = wg.sel[card.dataset.id] || {};
    s.stake = Math.floor(Number(inp.value) || 0) || '';
    wgUpdateWin(card);
  });
  const tab = document.querySelector('.tab-btn[data-tab="wager"]');
  if (tab) tab.addEventListener('click', () => { wgLoad(); });
  const hud = document.getElementById('wg-hud');
  if (hud) hud.addEventListener('click', () => { if (tab) tab.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  renderWager();
  setInterval(() => { if (wgAdmin() && wg.ok) wgAdminSync(); }, 5 * 60 * 1000);
}

// ---- Sonido de Merchant's Wager: saludo del Mercader al entrar + musica ambiente de fondo, con control de volumen ----
// El volumen general (0 a 1) lo elige la persona con la barra; la musica y el saludo salen a una fraccion fija de ese valor.
const WG_VOL_LS = 'dc-wg-vol', WG_VOL_LAST_LS = 'dc-wg-vol-last';
const WG_VOL_DEFAULT = 0.25;   // un cuarto de la barra: arranca bajito
const WG_WELCOME_SS = 'dc-wg-welcomed';
const wgSnd = { welcome: null, music: null, on: false, fade: 0, welcomed: false };
function wgVol() {
  const v = parseFloat(safeGet(WG_VOL_LS));
  return isNaN(v) ? WG_VOL_DEFAULT : Math.min(1, Math.max(0, v));
}
const wgMusicVol = () => wgVol() * 0.5;     // al 100 % la musica sale a 0.5
const wgWelcomeVol = () => wgVol() * 0.6;
const wgMuted = () => wgVol() === 0;

function wgSndInit() {
  if (wgSnd.music) return;
  try { wgSnd.welcomed = sessionStorage.getItem(WG_WELCOME_SS) === '1'; } catch (e) {}
  wgSnd.welcome = new Audio('assets/audio/merchant-welcome.mp3');
  wgSnd.music = new Audio('assets/audio/merchant-ambient.mp3?v=2');
  wgSnd.music.loop = true;
}
function wgSndPlay(withWelcome) {
  if (wgMuted()) return;
  wgSndInit();
  clearInterval(wgSnd.fade);
  wgSnd.music.volume = wgMusicVol();
  wgSnd.welcome.volume = wgWelcomeVol();
  wgSnd.music.play().catch(() => {});
  // El saludo suena una sola vez por visita (no al volver a entrar a la pestaña ni al recargar)
  if (withWelcome && !wgSnd.welcomed) {
    wgSnd.welcomed = true;
    try { sessionStorage.setItem(WG_WELCOME_SS, '1'); } catch (e) {}
    wgSnd.welcome.currentTime = 0;
    wgSnd.welcome.play().catch(() => {});
  }
}
function wgSndStop(now) {
  if (!wgSnd.music) return;
  clearInterval(wgSnd.fade);
  wgSnd.welcome.pause();
  if (now) { wgSnd.music.pause(); return; }
  wgSnd.fade = setInterval(() => {   // se apaga de a poco al salir de la pestaña
    const v = wgSnd.music.volume - 0.03;
    if (v <= 0.01) { clearInterval(wgSnd.fade); wgSnd.music.pause(); }
    else wgSnd.music.volume = v;
  }, 60);
}
// Video de fondo en loop, mudo (se descarga recien la primera vez que se entra; solo se omite con ahorro de datos, y queda la foto).
// No se bloquea por "reducir movimiento": es un fondo ambiental lento y muchos Windows tienen las animaciones apagadas.
function wgVideoTab(here) {
  const v = document.getElementById('wg-bgvideo');
  if (!v) return;
  if (!here) { v.pause(); return; }
  if (navigator.connection && navigator.connection.saveData) return;
  if (!v.getAttribute('src')) v.src = 'assets/wager-bg.mp4?v=2';
  v.play().catch(() => {});
}

function wgAudioTab(tab) {
  const here = tab === 'wager';
  if (here === wgSnd.on) return;
  wgSnd.on = here;
  wgVideoTab(here);
  if (here) wgSndPlay(true); else wgSndStop(false);
}
function initWagerSound() {
  const box = document.getElementById('wg-sound'), btn = document.getElementById('wg-sound-btn'), range = document.getElementById('wg-vol');
  if (!box || !btn || !range) return;
  const paint = () => {
    const v = wgVol();
    range.value = Math.round(v * 100);
    range.style.setProperty('--fill', Math.round(v * 100) + '%');
    box.dataset.level = v === 0 ? 'off' : 'on';
  };
  paint();
  const apply = () => {   // aplica el volumen nuevo al instante (y arranca o corta el sonido segun corresponda)
    paint();
    if (wgMuted()) wgSndStop(true);
    else if (wgSnd.on) {
      if (wgSnd.music && !wgSnd.music.paused) { wgSnd.music.volume = wgMusicVol(); wgSnd.welcome.volume = wgWelcomeVol(); }
      else wgSndPlay(false);
    }
  };
  range.addEventListener('input', () => {
    const v = Number(range.value) / 100;
    safeSet(WG_VOL_LS, String(v));
    if (v > 0) safeSet(WG_VOL_LAST_LS, String(v));
    apply();
  });
  btn.addEventListener('click', () => {   // el parlante sigue sirviendo para silenciar y volver al volumen anterior
    if (wgMuted()) { const last = parseFloat(safeGet(WG_VOL_LAST_LS)); safeSet(WG_VOL_LS, String(isNaN(last) || last <= 0 ? WG_VOL_DEFAULT : last)); }
    else { safeSet(WG_VOL_LAST_LS, String(wgVol())); safeSet(WG_VOL_LS, '0'); }
    apply();
  });
  document.addEventListener('visibilitychange', () => {   // en segundo plano no suena
    if (!wgSnd.music) return;
    if (document.hidden) wgSnd.music.pause();
    else if (wgSnd.on && !wgMuted()) wgSnd.music.play().catch(() => {});
  });
}

// Actualiza "Ganarias X PTAS" sin volver a dibujar la tarjeta (para no perder el foco del input)
function wgUpdateWin(card) {
  const mk = wg.markets.find(m => m.match_id === card.dataset.id), s = wg.sel[card.dataset.id] || {};
  const el = card.querySelector('.wg-win');
  if (!mk || !el) return;
  const win = s.pick && s.stake ? Math.floor(s.stake * Number(s.pick === 'a' ? mk.odds_a : mk.odds_b)) : 0;
  el.textContent = win ? t('wg.win', { n: wgFmt(win) }) : t('wg.pickFirst');
}

// Tarjetas de la bienvenida del Home: llevan directo a cada pestaña
document.addEventListener('DOMContentLoaded', () => {
  // Logo de arriba: vuelve al Home
  const brand = document.getElementById('brand-home');
  if (brand) brand.addEventListener('click', e => {
    e.preventDefault();
    const home = document.querySelector('.tab-btn[data-tab="inicio"]');
    if (home) { home.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });
  document.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = document.querySelector(`.tab-btn[data-tab="${btn.dataset.go}"]`);
      if (tab) { tab.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
  });
});
