"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { signUp, signIn, signOut, getCurrentUser, supabase } from "./auth"
import {
  createProject,
  getProjects,
  createCitation,
  getCitations,
  type Project,
  type Citation,
} from "./project-manager"

export default function CitationGenerator() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [citations, setCitations] = useState<Citation[]>([])
  const [citationType, setCitationType] = useState("case")
  const [details, setDetails] = useState({})
  const [fullCitation, setFullCitation] = useState("")
  const [shortCitations, setShortCitations] = useState<Citation["short"]>({
    regular: "",
    nameInSentence: "",
    id: "",
    idAt: "",
  })
  const [isSupabaseInitialized, setIsSupabaseInitialized] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadUser = async () => {
      if (!supabase) {
        setIsSupabaseInitialized(false)
        return
      }
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      if (currentUser) {
        loadProjects(currentUser.id)
      }
    }
    loadUser()
  }, [])

  const loadProjects = async (userId: string) => {
    const { data: projectsData, error } = await getProjects(userId)
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
      })
    } else if (projectsData) {
      setProjects(projectsData)
      if (projectsData.length > 0) {
        setCurrentProject(projectsData[0])
        loadCitations(projectsData[0].id)
      }
    }
  }

  const loadCitations = async (projectId: string) => {
    const { data: citationsData, error } = await getCitations(projectId)
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load citations",
      })
    } else if (citationsData) {
      setCitations(citationsData)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { full, short } = generateCitation(citationType, details)
    setFullCitation(full)
    setShortCitations(short)

    if (currentProject) {
      const newCitation: Omit<Citation, "id"> = {
        project_id: currentProject.id,
        type: citationType,
        details,
        full,
        short,
      }

      const { data, error } = await createCitation(newCitation)
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save citation",
        })
      } else if (data) {
        setCitations((prev) => [...prev, data[0]])
        toast({
          title: "Success",
          description: "Citation saved",
        })
      }
    }
  }

  const convertItalics = (text: string) => {
    return text.replace(/\*(.*?)\*/g, "<i>$1</i>")
  }

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea")
    textArea.innerHTML = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    toast({
      title: "Copied to clipboard",
      description: "The citation has been copied to your clipboard.",
    })
  }

  const loadCitation = (citation: Citation) => {
    setCitationType(citation.type)
    setDetails(citation.details)
    setFullCitation(citation.full)
    setShortCitations(citation.short)
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

  const handleCreateProject = async () => {
    const projectName = prompt("Enter project name:")
    if (projectName && user) {
      const { data, error } = await createProject(projectName, user.id)
      if (error) {
        toast({
          title: "Error",
          description: "Failed to create project",
        })
      } else if (data) {
        setProjects((prev) => [...prev, data[0]])
        setCurrentProject(data[0])
        setCitations([])
      }
    }
  }

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      setCurrentProject(project)
      loadCitations(project.id)
    }
  }

  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await signUp(email, password)
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign up",
      })
    } else if (data.user) {
      setUser(data.user)
      toast({
        title: "Success",
        description: "Signed up successfully",
      })
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await signIn(email, password)
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign in",
      })
    } else if (data.user) {
      setUser(data.user)
      loadProjects(data.user.id)
      toast({
        title: "Success",
        description: "Signed in successfully",
      })
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
      })
    } else {
      setUser(null)
      setProjects([])
      setCurrentProject(null)
      setCitations([])
      toast({
        title: "Success",
        description: "Signed out successfully",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Legal Citation Generator (Bluebook 21st Edition)</h1>

      {!isSupabaseInitialized && (
        <div className="mb-6 text-red-500">
          <p>Error: Supabase is not initialized. Please check your environment variables.</p>
        </div>
      )}

      {isSupabaseInitialized && (
        <>
          {!user ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Sign In / Sign Up</h2>
              <Input type="email" placeholder="Email" className="mb-2" id="email" />
              <Input type="password" placeholder="Password" className="mb-2" id="password" />
              <Button
                onClick={() =>
                  handleSignIn(
                    (document.getElementById("email") as HTMLInputElement).value,
                    (document.getElementById("password") as HTMLInputElement).value,
                  )
                }
                className="mr-2"
              >
                Sign In
              </Button>
              <Button
                onClick={() =>
                  handleSignUp(
                    (document.getElementById("email") as HTMLInputElement).value,
                    (document.getElementById("password") as HTMLInputElement).value,
                  )
                }
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="mb-6">
              <p>Signed in as {user.email}</p>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
          )}

          {user && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Projects</h2>
                <Select onValueChange={handleProjectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleCreateProject} className="mt-2">
                  Create New Project
                </Button>
              </div>

              {currentProject && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="citationType">Citation Type</Label>
                    <Select onValueChange={(value) => setCitationType(value)}>
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
                  <Button type="submit">Generate Citation</Button>
                </form>
              )}

              {fullCitation && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Full Citation</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: convertItalics(fullCitation) }}
                    className="mb-2 p-2 border rounded"
                  />
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

              {currentProject && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Project Citations</h2>
                  {citations.map((citation) => (
                    <div key={citation.id} className="mb-2">
                      <Button onClick={() => loadCitation(citation)}>{citation.full}</Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

