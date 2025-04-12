"use client"

import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import { useState } from "react"
import { JitsiMeet } from "@/components/jitsi-meet"

export function FloatingMeetingButton() {
  const [isMeetingOpen, setIsMeetingOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-28 right-8 z-50">
        <Button
          variant="destructive"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 flex items-center justify-center"
          onClick={() => setIsMeetingOpen(true)}
        >
          <Video className="h-6 w-6" />
        </Button>
      </div>

      {isMeetingOpen && (
        <JitsiMeet onClose={() => setIsMeetingOpen(false)} />
      )}
    </>
  )
} 