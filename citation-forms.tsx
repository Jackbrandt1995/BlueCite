import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react" // Added import for React

interface FormProps {
  details: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function CaseForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="caseName">Case Name</Label>
        <Input id="caseName" name="caseName" value={details.caseName || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="volume">Volume</Label>
        <Input id="volume" name="volume" value={details.volume || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="reporter">Reporter</Label>
        <Input id="reporter" name="reporter" value={details.reporter || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="page">Page</Label>
        <Input id="page" name="page" value={details.page || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="court">Court</Label>
        <Input id="court" name="court" value={details.court || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="pinCite">Pin Cite (optional)</Label>
        <Input id="pinCite" name="pinCite" value={details.pinCite || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function ReportedCaseForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="caseName">Case Name</Label>
        <Input id="caseName" name="caseName" value={details.caseName || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="volume">Volume</Label>
        <Input id="volume" name="volume" value={details.volume || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="reporter">Reporter</Label>
        <Input id="reporter" name="reporter" value={details.reporter || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="page">Page</Label>
        <Input id="page" name="page" value={details.page || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="court">Court</Label>
        <Input id="court" name="court" value={details.court || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="pinCite">Pin Cite (optional)</Label>
        <Input id="pinCite" name="pinCite" value={details.pinCite || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function UnreportedCaseForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="caseName">Case Name</Label>
        <Input id="caseName" name="caseName" value={details.caseName || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="docketNumber">Docket Number</Label>
        <Input id="docketNumber" name="docketNumber" value={details.docketNumber || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="court">Court</Label>
        <Input id="court" name="court" value={details.court || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={details.date || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function PendingCaseForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="caseName">Case Name</Label>
        <Input id="caseName" name="caseName" value={details.caseName || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="docketNumber">Docket Number</Label>
        <Input id="docketNumber" name="docketNumber" value={details.docketNumber || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="court">Court</Label>
        <Input id="court" name="court" value={details.court || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="filingDate">Filing Date</Label>
        <Input id="filingDate" name="filingDate" value={details.filingDate || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function ConstitutionForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="constitution">Constitution</Label>
        <Input id="constitution" name="constitution" value={details.constitution || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="article">Article</Label>
        <Input id="article" name="article" value={details.article || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="section">Section</Label>
        <Input id="section" name="section" value={details.section || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="clause">Clause (optional)</Label>
        <Input id="clause" name="clause" value={details.clause || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function StatuteForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="name">Name of Act</Label>
        <Input id="name" name="name" value={details.name || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="section">Section</Label>
        <Input id="section" name="section" value={details.section || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="pinCite">Pin Cite (optional)</Label>
        <Input id="pinCite" name="pinCite" value={details.pinCite || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function RegulationForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="section">Section</Label>
        <Input id="section" name="section" value={details.section || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="pinCite">Pin Cite (optional)</Label>
        <Input id="pinCite" name="pinCite" value={details.pinCite || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function LegislativeMaterialForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="billNumber">Bill Number</Label>
        <Input id="billNumber" name="billNumber" value={details.billNumber || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="congress">Congress</Label>
        <Input id="congress" name="congress" value={details.congress || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="session">Session</Label>
        <Input id="session" name="session" value={details.session || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function LetterForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="recipient">Recipient</Label>
        <Input id="recipient" name="recipient" value={details.recipient || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={details.date || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="location">Location (optional)</Label>
        <Input id="location" name="location" value={details.location || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function InterviewForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="interviewee">Interviewee</Label>
        <Input id="interviewee" name="interviewee" value={details.interviewee || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="interviewer">Interviewer</Label>
        <Input id="interviewer" name="interviewer" value={details.interviewer || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={details.date || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="location">Location (optional)</Label>
        <Input id="location" name="location" value={details.location || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function TreatyForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="name">Treaty Name</Label>
        <Input id="name" name="name" value={details.name || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="parties">Parties</Label>
        <Input id="parties" name="parties" value={details.parties || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={details.date || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="source">Source</Label>
        <Input id="source" name="source" value={details.source || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function BookForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="publisher">Publisher</Label>
        <Input id="publisher" name="publisher" value={details.publisher || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="pinCite">Pin Cite (optional)</Label>
        <Input id="pinCite" name="pinCite" value={details.pinCite || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function WorkInCollectionForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author of Work</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title of Work</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="collectionTitle">Title of Collection</Label>
        <Input
          id="collectionTitle"
          name="collectionTitle"
          value={details.collectionTitle || ""}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="editor">Editor</Label>
        <Input id="editor" name="editor" value={details.editor || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="publisher">Publisher</Label>
        <Input id="publisher" name="publisher" value={details.publisher || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="page">Page</Label>
        <Input id="page" name="page" value={details.page || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function JournalArticleForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="journal">Journal</Label>
        <Input id="journal" name="journal" value={details.journal || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="volume">Volume</Label>
        <Input id="volume" name="volume" value={details.volume || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="page">Page</Label>
        <Input id="page" name="page" value={details.page || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="pinCite">Pin Cite (optional)</Label>
        <Input id="pinCite" name="pinCite" value={details.pinCite || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function NewspaperForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="newspaper">Newspaper</Label>
        <Input id="newspaper" name="newspaper" value={details.newspaper || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={details.date || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="page">Page</Label>
        <Input id="page" name="page" value={details.page || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function ForthcomingPublicationForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="journal">Journal</Label>
        <Input id="journal" name="journal" value={details.journal || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function InternetSourceForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={details.author || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={details.title || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" value={details.website || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="url">URL</Label>
        <Input id="url" name="url" value={details.url || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="accessDate">Access Date</Label>
        <Input id="accessDate" name="accessDate" value={details.accessDate || ""} onChange={onChange} required />
      </div>
    </>
  )
}

export function CourtDocumentForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="documentType">Document Type</Label>
        <Input id="documentType" name="documentType" value={details.documentType || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="caseName">Case Name</Label>
        <Input id="caseName" name="caseName" value={details.caseName || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="docketNumber">Docket Number</Label>
        <Input id="docketNumber" name="docketNumber" value={details.docketNumber || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="court">Court</Label>
        <Input id="court" name="court" value={details.court || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={details.date || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="ecfNumber">ECF Number (optional)</Label>
        <Input id="ecfNumber" name="ecfNumber" value={details.ecfNumber || ""} onChange={onChange} />
      </div>
    </>
  )
}

export function RuleForm({ details, onChange }: FormProps) {
  return (
    <>
      <div>
        <Label htmlFor="ruleName">Rule Name</Label>
        <Input id="ruleName" name="ruleName" value={details.ruleName || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="ruleNumber">Rule Number</Label>
        <Input id="ruleNumber" name="ruleNumber" value={details.ruleNumber || ""} onChange={onChange} required />
      </div>
      <div>
        <Label htmlFor="subdivision">Subdivision (optional)</Label>
        <Input id="subdivision" name="subdivision" value={details.subdivision || ""} onChange={onChange} />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" value={details.year || ""} onChange={onChange} required />
      </div>
    </>
  )
}

