import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"
import { Button } from "./ui/button"
import axios from 'axios';
import { autoVrsEngineUtils } from "@/lib/autovrs-engine.utils";

export function InputFile() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const onInput = (cxt: any) => {
    const file = cxt.target.files?.[0];
    if (file) setFile(file)
  }

  const remove = () => {
    setFile(null);
    setLoading(false);
    if (!inputRef?.current) return
    inputRef.current.value = '' 
  }

  const onUpload = () => {
    setLoading(true)
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    autoVrsEngineUtils.uploadFile(file)
    .then(remove)
    .catch(err => {
      setLoading(false)
      console.error(err)
    })

  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="fbx">FBX File</Label>
      <Input ref={inputRef} id="fbx" type="file" accept=".fbx" onInput={onInput} />
      <div>
        {file ? (
          <div className="flex justify-between" >
          <span>{file.name}</span>
          <Button variant='secondary' disabled={loading} onClick={remove}>Remove</Button>
          <Button variant='secondary' disabled={loading} onClick={onUpload} > Upload </Button>
        </div>
        ) : null}
      </div>
    </div>
  )
}