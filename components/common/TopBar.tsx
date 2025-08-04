import { Save, Mic, Smile, Loader2 } from "lucide-react"
import ThemeToggle from "@/components/common/ThemeToggle"

interface TopBarProps {
  onSave?: () => Promise<void>
  isSaving?: boolean
  saveStatus?: "idle" | "success" | "error"
}

export default function TopBar({ onSave, isSaving = false, saveStatus = "idle" }: TopBarProps) {
  return (
    <div className="bg-background border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Journal Entry</h2>
          <p className="text-sm text-muted-foreground">Express your thoughts and feelings</p>
        </div>
        <div className="flex items-center gap-4">
          {saveStatus === "success" && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Saved successfully!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-sm text-red-600 dark:text-red-400">
              Error saving journal
            </span>
          )}
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          <ThemeToggle />
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}