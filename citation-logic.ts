import { abbreviations } from "./abbreviations"

interface CitationDetails {
  [key: string]: string
}

export function generateCitation(type: string, details: CitationDetails) {
  switch (type) {
    case "reportedCase":
      return generateReportedCaseCitation(details)
    case "unreportedCase":
      return generateUnreportedCaseCitation(details)
    case "pendingCase":
      return generatePendingCaseCitation(details)
    case "constitution":
      return generateConstitutionCitation(details)
    case "statute":
      return generateStatuteCitation(details)
    case "regulation":
      return generateRegulationCitation(details)
    case "legislativeMaterial":
      return generateLegislativeMaterialCitation(details)
    case "letter":
      return generateLetterCitation(details)
    case "interview":
      return generateInterviewCitation(details)
    case "treaty":
      return generateTreatyCitation(details)
    case "book":
      return generateBookCitation(details)
    case "workInCollection":
      return generateWorkInCollectionCitation(details)
    case "journal":
      return generateJournalArticleCitation(details)
    case "newspaper":
      return generateNewspaperCitation(details)
    case "forthcomingPublication":
      return generateForthcomingPublicationCitation(details)
    case "internetSource":
      return generateInternetSourceCitation(details)
    case "courtDocument":
      return generateCourtDocumentCitation(details)
    case "rule":
      return generateRuleCitation(details)
    default:
      return { full: "", short: {} }
  }
}

function generateReportedCaseCitation(details: CitationDetails) {
  const { caseName, volume, reporter, page, court, year, pinCite } = details

  let fullCitation = `*${caseName}*, ${volume} ${abbreviations.reporters[reporter] || reporter} ${page}`

  if (pinCite) {
    fullCitation += `, ${pinCite}`
  }

  if (court.toLowerCase() !== "supreme court") {
    fullCitation += ` (${abbreviations.courts[court] || court} ${year})`
  } else {
    fullCitation += ` (${year})`
  }

  fullCitation += "."

  const shortName = getShortName(caseName)
  const shortCitations = {
    regular: `*${shortName}*, ${volume} ${abbreviations.reporters[reporter] || reporter} at ${pinCite || page}.`,
    nameInSentence: `${volume} ${abbreviations.reporters[reporter] || reporter} at ${pinCite || page}.`,
    id: "Id.",
    idAt: `Id. at ${pinCite || page}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateUnreportedCaseCitation(details: CitationDetails) {
  const { caseName, docketNumber, court, date } = details

  const fullCitation = `*${caseName}*, No. ${docketNumber}, ${date} ${abbreviations.courts[court] || court}.`

  const shortName = getShortName(caseName)
  const shortCitations = {
    regular: `*${shortName}*, No. ${docketNumber}.`,
    nameInSentence: `No. ${docketNumber}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generatePendingCaseCitation(details: CitationDetails) {
  const { caseName, docketNumber, court, filingDate } = details

  const fullCitation = `*${caseName}*, No. ${docketNumber} (${abbreviations.courts[court] || court} filed ${filingDate}).`

  const shortName = getShortName(caseName)
  const shortCitations = {
    regular: `*${shortName}*, No. ${docketNumber}.`,
    nameInSentence: `No. ${docketNumber}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateConstitutionCitation(details: CitationDetails) {
  const { constitution, article, section, clause } = details

  const fullCitation = `${abbreviations.constitutions[constitution] || constitution} art. ${article}, § ${section}${clause ? `, cl. ${clause}` : ""}.`

  const shortCitations = {
    regular: fullCitation,
    nameInSentence: `art. ${article}, § ${section}${clause ? `, cl. ${clause}` : ""}.`,
    id: "Id.",
    idAt: `Id. art. ${article}, § ${section}${clause ? `, cl. ${clause}` : ""}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateStatuteCitation(details: CitationDetails) {
  const { name, title, section, year, pinCite } = details

  let fullCitation = `${name}, ${title} U.S.C. § ${section}`
  if (year) fullCitation += ` (${year})`
  if (pinCite) fullCitation += `, ${pinCite}`
  fullCitation += "."

  const shortCitations = {
    regular: `${title} U.S.C. § ${section}${pinCite ? `, ${pinCite}` : ""}.`,
    nameInSentence: `§ ${section}${pinCite ? `, ${pinCite}` : ""}.`,
    id: "Id.",
    idAt: `Id. ${pinCite ? `at ${pinCite}` : ""}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateRegulationCitation(details: CitationDetails) {
  const { title, section, year, pinCite } = details

  let fullCitation = `${title} C.F.R. § ${section}`
  if (year) fullCitation += ` (${year})`
  if (pinCite) fullCitation += `, ${pinCite}`
  fullCitation += "."

  const shortCitations = {
    regular: `${title} C.F.R. § ${section}${pinCite ? `, ${pinCite}` : ""}.`,
    nameInSentence: `§ ${section}${pinCite ? `, ${pinCite}` : ""}.`,
    id: "Id.",
    idAt: `Id. ${pinCite ? `at ${pinCite}` : ""}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateLegislativeMaterialCitation(details: CitationDetails) {
  const { title, billNumber, congress, session, year } = details

  const fullCitation = `${title}, ${billNumber}, ${congress} Cong. ${session} (${year}).`

  const shortCitations = {
    regular: `${billNumber}.`,
    nameInSentence: `${billNumber}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateLetterCitation(details: CitationDetails) {
  const { author, recipient, date, location } = details

  let fullCitation = `Letter from ${author} to ${recipient}`
  if (date) fullCitation += ` (${date})`
  if (location) fullCitation += ` (on file with ${location})`
  fullCitation += "."

  const shortCitations = {
    regular: `Letter from ${author} to ${recipient}.`,
    nameInSentence: `Letter from ${author} to ${recipient}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateInterviewCitation(details: CitationDetails) {
  const { interviewee, interviewer, date, location } = details

  let fullCitation = `Interview with ${interviewee}`
  if (interviewer) fullCitation += `, by ${interviewer}`
  if (date) fullCitation += ` (${date})`
  if (location) fullCitation += ` in ${location}`
  fullCitation += "."

  const shortCitations = {
    regular: `Interview with ${interviewee}.`,
    nameInSentence: `Interview with ${interviewee}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateTreatyCitation(details: CitationDetails) {
  const { name, parties, date, source } = details

  const fullCitation = `${name}, ${parties}, ${date}, ${source}.`

  const shortCitations = {
    regular: `${name}.`,
    nameInSentence: `${name}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateBookCitation(details: CitationDetails) {
  const { author, title, publisher, year, pinCite } = details

  let fullCitation = `${author}, ${title} (${publisher} ${year})`
  if (pinCite) fullCitation += `, ${pinCite}`
  fullCitation += "."

  const shortCitations = {
    regular: `${author}, supra note X, at ${pinCite || "Y"}.`, // Note: X and Y would need to be determined based on context
    nameInSentence: `supra note X, at ${pinCite || "Y"}.`,
    id: "Id.",
    idAt: `Id. at ${pinCite || "Y"}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateWorkInCollectionCitation(details: CitationDetails) {
  const { author, title, collectionTitle, editor, publisher, year, page } = details

  const fullCitation = `${author}, ${title}, in ${collectionTitle} ${page} (${editor} ed., ${publisher} ${year}).`

  const shortCitations = {
    regular: `${author}, supra note X, at ${page}.`, // Note: X would need to be determined based on context
    nameInSentence: `supra note X, at ${page}.`,
    id: "Id.",
    idAt: `Id. at ${page}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateJournalArticleCitation(details: CitationDetails) {
  const { author, title, journal, volume, page, year, pinCite } = details

  let fullCitation = `${author}, ${title}, ${volume} ${abbreviations.journals[journal] || journal} ${page}`
  if (year) fullCitation += ` (${year})`
  if (pinCite) fullCitation += `, ${pinCite}`
  fullCitation += "."

  const shortCitations = {
    regular: `${author}, supra note X, at ${pinCite || page}.`, // Note: X would need to be determined based on context
    nameInSentence: `supra note X, at ${pinCite || page}.`,
    id: "Id.",
    idAt: `Id. at ${pinCite || page}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateNewspaperCitation(details: CitationDetails) {
  const { author, title, newspaper, date, page } = details

  const fullCitation = `${author}, ${title}, ${newspaper}, ${date}, at ${page}.`

  const shortCitations = {
    regular: `${author}, supra note X.`, // Note: X would need to be determined based on context
    nameInSentence: `supra note X.`,
    id: "Id.",
    idAt: `Id. at ${page}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function generateForthcomingPublicationCitation(details: CitationDetails) {
  const { author, title, journal, year } = details

  const fullCitation = `${author}, ${title}, ${abbreviations.journals[journal] || journal} (forthcoming ${year}).`

  const shortCitations = {
    regular: `${author}, supra note X.`, // Note: X would need to be determined based on context
    nameInSentence: `supra note X.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateInternetSourceCitation(details: CitationDetails) {
  const { author, title, website, url, accessDate } = details

  const fullCitation = `${author}, ${title}, ${website}, ${url} (last visited ${accessDate}).`

  const shortCitations = {
    regular: `${author}, supra note X.`, // Note: X would need to be determined based on context
    nameInSentence: `supra note X.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateCourtDocumentCitation(details: CitationDetails) {
  const { documentType, caseName, docketNumber, court, date, ecfNumber } = details

  let fullCitation = `${documentType}, ${caseName}, No. ${docketNumber} (${abbreviations.courts[court] || court} ${date})`
  if (ecfNumber) fullCitation += `, ECF No. ${ecfNumber}`
  fullCitation += "."

  const shortCitations = {
    regular: `${documentType}, ${caseName}, No. ${docketNumber}.`,
    nameInSentence: `${documentType}, No. ${docketNumber}.`,
    id: "Id.",
    idAt: "Id.",
  }

  return { full: fullCitation, short: shortCitations }
}

function generateRuleCitation(details: CitationDetails) {
  const { ruleName, ruleNumber, subdivision, year } = details

  const fullCitation = `${abbreviations.rules[ruleName] || ruleName} ${ruleNumber}${subdivision ? `(${subdivision})` : ""}${year ? ` (${year})` : ""}.`

  const shortCitations = {
    regular: fullCitation,
    nameInSentence: `${ruleNumber}${subdivision ? `(${subdivision})` : ""}.`,
    id: "Id.",
    idAt: `Id. ${ruleNumber}${subdivision ? `(${subdivision})` : ""}.`,
  }

  return { full: fullCitation, short: shortCitations }
}

function getShortName(name: string) {
  const words = name.split(" ")
  if (words.length > 1) {
    return words[0]
  }
  return name
}

