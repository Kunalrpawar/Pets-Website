"use client"

import { useEffect, useRef } from 'react'
import { Button } from './ui/button'

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export function JitsiMeet({ onClose }: { onClose: () => void }) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null)
  const jitsiApiRef = useRef<any>(null)

  useEffect(() => {
    const loadJitsiScript = () => {
      const script = document.createElement('script')
      script.src = 'https://meet.jit.si/external_api.js'
      script.async = true
      document.body.appendChild(script)
      return script
    }

    const initJitsi = () => {
      const domain = 'meet.jit.si'
      const options = {
        roomName: 'PetPalsVirtualMeeting' + Math.random().toString(36).substring(7),
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
          ],
        },
        configOverwrite: {
          prejoinPageEnabled: false
        }
      }

      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options)

      jitsiApiRef.current.addEventListeners({
        readyToClose: onClose,
        participantLeft: onClose,
      })
    }

    const script = loadJitsiScript()
    script.onload = () => {
      if (jitsiContainerRef.current) {
        initJitsi()
      }
    }

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose()
      }
      document.body.removeChild(script)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] h-[80vh] max-w-[1200px]">
        <div className="relative w-full h-full">
          <Button 
            className="absolute right-4 top-4 z-10" 
            variant="destructive"
            onClick={onClose}
          >
            Close Meeting
          </Button>
          <div ref={jitsiContainerRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  )
} 