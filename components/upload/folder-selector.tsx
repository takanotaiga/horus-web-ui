"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface FolderListProps {
  folders: string[]
  onSet: (input: string) => void
}

export function FolderSelector({ folders, onSet }: FolderListProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select folder..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search folder..." className="h-9" />
          <CommandList>
            <CommandEmpty>No folder found.</CommandEmpty>
            <CommandGroup>
              {folders.map((folder, i) => (
                <CommandItem
                  key={`${folder}-${i}`}
                  value={folder}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onSet(currentValue)
                  }}
                >
                  {folder}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === folder ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
