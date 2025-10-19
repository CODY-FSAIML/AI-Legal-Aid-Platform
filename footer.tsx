"use client"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Made with care for underserved communities. This tool does not replace professional advice. In emergencies,
          call <span className="font-bold text-red-600">108 (Ambulance)</span> or{" "}
          <span className="font-bold text-red-600">100 (Police)</span>.
        </p>
      </div>
    </footer>
  )
}
