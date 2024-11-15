import { type ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import "mdui/components/button"
import "mdui/components/dialog"

import type { Dialog } from "mdui/components/dialog"

export function useDialog({
  headline,
  children,
  loading,
  open,
  onOk,
  onOkClosed,
  onOpen,
  onClose,
  onCancel,
}: {
  headline: string
  children: ReactNode
  loading?: boolean
  open?: boolean
  onOk?: (self: Dialog) => void
  onOkClosed?: (self: Dialog) => void
  onOpen?: (self: Dialog) => void
  onClose?: (self: Dialog) => void
  onCancel?: (self: Dialog) => void
}) {
  const dialog = useRef<Dialog>(null)

  const [isOpen, setIsOpen] = useState(open ?? false)

  useEffect(() => {
    dialog.current?.addEventListener("open", () => {
      setIsOpen(true)
      onOpen?.(dialog.current!)
    })
    dialog.current?.addEventListener("close", () => {
      setIsOpen(false)
      onClose?.(dialog.current!)
    })
  })

  return {
    dialog,
    setIsOpen,
    Dialog: createPortal(
      <mdui-dialog
        close-on-esc
        close-on-overlay-click
        open={isOpen}
        ref={dialog}
        className="[&::part(panel)]:w-1/2"
      >
        <span slot="headline">{headline}</span>
        {children}
        <mdui-button
          slot="action"
          variant="text"
          onClick={() => {
            setIsOpen(false)
            onCancel?.(dialog.current!)
          }}
        >
          Cancel
        </mdui-button>
        <mdui-button
          slot="action"
          variant="filled"
          loading={loading}
          onClick={() => {
            if (onOk) {
              onOk(dialog.current!)
            } else {
              dialog.current?.addEventListener(
                "closed",
                () => {
                  onOkClosed?.(dialog.current!)
                },
                {
                  once: true,
                }
              )

              setIsOpen(false)
            }
          }}
        >
          Ok
        </mdui-button>
      </mdui-dialog>,
      document.body
    ),
  }
}
