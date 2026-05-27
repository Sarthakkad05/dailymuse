import { Save, Loader2, Menu } from "lucide-react"
import ThemeToggle from "@/components/common/ThemeToggle"

interface TopBarProps {
  onSave?: () => Promise<void>
  isSaving?: boolean
  saveStatus?: "idle" | "success" | "error"
  title?: string
  subtitle?: string
  showSave?: boolean
  onMenuOpen?: () => void
}

export default function TopBar({ 
  onSave, 
  isSaving = false, 
  saveStatus = "idle",
  title = "Journal Entry",
  subtitle = "Express your thoughts and feelings",
  showSave = true,
  onMenuOpen,
}: TopBarProps) {
  return (
    <div className="bg-background border-b border-border px-3 py-3 md:px-4 md:py-4">
      <div className="flex items-center justify-between gap-3">
        {/* Left: hamburger (mobile) + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuOpen}
            className="md:hidden flex-shrink-0 p-1.5 rounded-lg hover:bg-accent transition-colors text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-base md:text-xl font-semibold text-card-foreground leading-tight truncate">{title}</h2>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{subtitle}</p>
          </div>
        </div>

        {/* Right: status + theme + save */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {saveStatus === "success" && (
            <span className="hidden sm:inline text-sm text-green-600 dark:text-green-400">
              Saved!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="hidden sm:inline text-sm text-red-600 dark:text-red-400">
              Error saving
            </span>
          )}
          <ThemeToggle />
          {showSave && (
            <button 
              onClick={onSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-1.5 md:gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}