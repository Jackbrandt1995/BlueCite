"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

import { generateCitation } from "./citation-logic"
import {
  CaseForm,
  ReportedCaseForm,
  UnreportedCaseForm,
  PendingCaseForm,
  ConstitutionForm,
  StatuteForm,
  RegulationForm,
  LegislativeMaterialForm,
  LetterForm,
  InterviewForm,
  TreatyForm,
  BookForm,
  WorkInCollectionForm,
  JournalArticleForm,
  NewspaperForm,
  ForthcomingPublicationForm,
  InternetSourceForm,
  CourtDocumentForm,
  RuleForm,
} from "./citation-forms"

interface Project {
  id: string
  name: string
  citations: Citation[]
}

interface Citation {
  id: string
  type: string
  details: any
  full: string
  short: {
    regular: string
    nameInSentence: string
    id: string
    idAt: string
  }
}

export default function CitationGenerator() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [citationType, setCitationType] = useState("case")
  const [details, setDetails] = useState({})
  const [fullCitation, setFullCitation] = useState("")
  const [shortCitations, setShortCitations] = useState({
    regular: "",
    nameInSentence: "",
    id: "",
    idAt: "",
  })
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { full, short } = generateCitation(citationType, details)
    setFullCitation(full)
    setShortCitations(short)

    if (currentProject) {
      const newCitation: Citation = {
        id: selectedCitation ? selectedCitation.id : Date.now().toString(),
        type: citationType,
        details,
        full,
        short,
      }

      if (selectedCitation) {
        // Update existing citation
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === currentProject.id
              ? {
                  ...project,
                  citations: project.citations.map((c) => (c.id === selectedCitation.id ? newCitation : c)),
                }
              : project,
          ),
        )
        setCurrentProject((prevProject) => {
          if (prevProject) {
            return {
              ...prevProject,
              citations: prevProject.citations.map((c) => (c.id === selectedCitation.id ? newCitation : c)),
            }
          }
          return null
        })
        toast({
          title: "Citation Updated",
          description: "Your citation has been updated in the current project.",
        })
      } else {
        // Add new citation
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === currentProject.id ? { ...project, citations: [...project.citations, newCitation] } : project,
          ),
        )
        setCurrentProject((prevProject) => {
          if (prevProject) {
            return { ...prevProject, citations: [...prevProject.citations, newCitation] }
          }
          return null
        })
        toast({
          title: "Citation Generated",
          description: "Your citation has been generated and saved to the current project.",
        })
      }
    } else {
      toast({
        title: "Citation Generated",
        description: "Your citation has been generated. Create a project to save it.",
      })
    }

    setSelectedCitation(null)
  }

  const convertItalics = (text: string) => {
    return text.replace(/\*(.*?)\*|\b(Id\.(?:\s+at)?)\b/g, (match, p1, p2) => {
      if (p1) {
        return `<i>${p1}</i>`
      } else if (p2) {
        return `<i>${p2}</i>`
      }
      return match
    })
  }

  const copyToClipboard = (text: string) => {
    const tempElement = document.createElement("div")
    tempElement.innerHTML = convertItalics(text)

    const range = document.createRange()
    range.selectNodeContents(tempElement)

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)

    document.execCommand("copy")
    selection?.removeAllRanges()

    toast({
      title: "Copied to clipboard",
      description: "The citation has been copied to your clipboard with proper formatting.",
    })
  }

  const renderForm = () => {
    switch (citationType) {
      case "case":
        return <CaseForm details={details} onChange={handleInputChange} />
      case "reportedCase":
        return <ReportedCaseForm details={details} onChange={handleInputChange} />
      case "unreportedCase":
        return <UnreportedCaseForm details={details} onChange={handleInputChange} />
      case "pendingCase":
        return <PendingCaseForm details={details} onChange={handleInputChange} />
      case "statute":
        return <StatuteForm details={details} onChange={handleInputChange} />
      case "regulation":
        return <RegulationForm details={details} onChange={handleInputChange} />
      case "constitution":
        return <ConstitutionForm details={details} onChange={handleInputChange} />
      case "legislativeMaterial":
        return <LegislativeMaterialForm details={details} onChange={handleInputChange} />
      case "letter":
        return <LetterForm details={details} onChange={handleInputChange} />
      case "interview":
        return <InterviewForm details={details} onChange={handleInputChange} />
      case "treaty":
        return <TreatyForm details={details} onChange={handleInputChange} />
      case "book":
        return <BookForm details={details} onChange={handleInputChange} />
      case "workInCollection":
        return <WorkInCollectionForm details={details} onChange={handleInputChange} />
      case "journal":
        return <JournalArticleForm details={details} onChange={handleInputChange} />
      case "newspaper":
        return <NewspaperForm details={details} onChange={handleInputChange} />
      case "forthcomingPublication":
        return <ForthcomingPublicationForm details={details} onChange={handleInputChange} />
      case "internetSource":
        return <InternetSourceForm details={details} onChange={handleInputChange} />
      case "courtDocument":
        return <CourtDocumentForm details={details} onChange={handleInputChange} />
      case "rule":
        return <RuleForm details={details} onChange={handleInputChange} />
      default:
        return null
    }
  }

  const createProject = () => {
    const projectName = prompt("Enter a name for the new project:")
    if (projectName) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName,
        citations: [],
      }
      setProjects((prevProjects) => [...prevProjects, newProject])
      setCurrentProject(newProject)
      toast({
        title: "Project Created",
        description: `New project "${projectName}" has been created and selected.`,
      })
    }
  }

  const selectProject = (projectId: string) => {
    const selected = projects.find((p) => p.id === projectId)
    if (selected) {
      setCurrentProject(selected)
      setSelectedCitation(null)
      setCitationType("case")
      setDetails({})
      setFullCitation("")
      setShortCitations({ regular: "", nameInSentence: "", id: "", idAt: "" })
      toast({
        title: "Project Selected",
        description: `Project "${selected.name}" has been selected.`,
      })
    }
  }

  const deleteCitation = (citationId: string) => {
    if (currentProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === currentProject.id
            ? { ...project, citations: project.citations.filter((c) => c.id !== citationId) }
            : project,
        ),
      )
      setCurrentProject((prevProject) => {
        if (prevProject) {
          return { ...prevProject, citations: prevProject.citations.filter((c) => c.id !== citationId) }
        }
        return null
      })
      if (selectedCitation && selectedCitation.id === citationId) {
        setSelectedCitation(null)
        setCitationType("case")
        setDetails({})
        setFullCitation("")
        setShortCitations({ regular: "", nameInSentence: "", id: "", idAt: "" })
      }
      toast({
        title: "Citation Deleted",
        description: "The citation has been removed from the current project.",
      })
    }
  }

  const selectCitation = (citation: Citation) => {
    setSelectedCitation(citation)
    setCitationType(citation.type)
    setDetails(citation.details)
    setFullCitation(citation.full)
    setShortCitations(citation.short)
    toast({
      title: "Citation Selected",
      description: "The citation has been loaded for editing.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BlueCite.jpg-GKOszRaLNomJ5VLGf8psjrKSezAZ8W.jpeg"
          alt="BlueCite Logo"
          className="w-16 h-16 mb-2"
        />
        <h1 className="text-2xl font-bold">BlueCite</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <div className="flex items-center space-x-2 mb-2">
          <Select onValueChange={selectProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={createProject}>Create New Project</Button>
        </div>
        {currentProject && <p className="text-sm text-gray-600">Current Project: {currentProject.name}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="citationType">Citation Type</Label>
          <Select onValueChange={(value) => setCitationType(value)} value={citationType}>
            <SelectTrigger>
              <SelectValue placeholder="Select citation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reportedCase">Reported Case</SelectItem>
              <SelectItem value="unreportedCase">Unreported Case</SelectItem>
              <SelectItem value="pendingCase">Pending Case</SelectItem>
              <SelectItem value="constitution">Constitution</SelectItem>
              <SelectItem value="statute">Statute</SelectItem>
              <SelectItem value="regulation">Regulation</SelectItem>
              <SelectItem value="legislativeMaterial">Legislative Material</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="treaty">Treaty</SelectItem>
              <SelectItem value="book">Book</SelectItem>
              <SelectItem value="workInCollection">Work in Collection</SelectItem>
              <SelectItem value="journal">Journal Article</SelectItem>
              <SelectItem value="newspaper">Newspaper</SelectItem>
              <SelectItem value="forthcomingPublication">Forthcoming Publication</SelectItem>
              <SelectItem value="internetSource">Internet Source</SelectItem>
              <SelectItem value="courtDocument">Court Document</SelectItem>
              <SelectItem value="rule">Rule</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {renderForm()}
        <Button type="submit">{selectedCitation ? "Update Citation" : "Generate Citation"}</Button>
      </form>

      {fullCitation && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Full Citation</h2>
          <div dangerouslySetInnerHTML={{ __html: convertItalics(fullCitation) }} className="mb-2 p-2 border rounded" />
          <Button onClick={() => copyToClipboard(fullCitation)}>Copy Full Citation</Button>
        </div>
      )}

      {shortCitations.regular && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Short Citations</h2>
          <div className="space-y-2">
            <div>
              <Label>Regular</Label>
              <div
                dangerouslySetInnerHTML={{ __html: convertItalics(shortCitations.regular) }}
                className="mb-2 p-2 border rounded"
              />
              <Button onClick={() => copyToClipboard(shortCitations.regular)}>Copy</Button>
            </div>
            <div>
              <Label>Name in Sentence</Label>
              <div
                dangerouslySetInnerHTML={{ __html: convertItalics(shortCitations.nameInSentence) }}
                className="mb-2 p-2 border rounded"
              />
              <Button onClick={() => copyToClipboard(shortCitations.nameInSentence)}>Copy</Button>
            </div>
            <div>
              <Label>Id.</Label>
              <div
                dangerouslySetInnerHTML={{ __html: convertItalics(shortCitations.id) }}
                className="mb-2 p-2 border rounded"
              />
              <Button onClick={() => copyToClipboard(shortCitations.id)}>Copy</Button>
            </div>
            <div>
              <Label>Id. at</Label>
              <div
                dangerouslySetInnerHTML={{ __html: convertItalics(shortCitations.idAt) }}
                className="mb-2 p-2 border rounded"
              />
              <Button onClick={() => copyToClipboard(shortCitations.idAt)}>Copy</Button>
            </div>
          </div>
        </div>
      )}

      {currentProject && currentProject.citations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Project Citations</h2>
          {currentProject.citations.map((citation) => (
            <div key={citation.id} className="mb-2 p-2 border rounded">
              <div dangerouslySetInnerHTML={{ __html: convertItalics(citation.full) }} />
              <div className="mt-2 space-x-2">
                <Button onClick={() => selectCitation(citation)}>Edit</Button>
                <Button onClick={() => copyToClipboard(citation.full)}>Copy Full</Button>
                <Button onClick={() => copyToClipboard(citation.short.regular)}>Copy Short</Button>
                <Button onClick={() => deleteCitation(citation.id)} variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

