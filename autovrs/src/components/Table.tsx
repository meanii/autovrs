import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AutoVR } from "@/inerfaces/autovr.interface"
import { formatBytes } from "@/lib/utils"
import { Button } from "./ui/button"
import Link from "next/link"


export function AutoVrsTable({ autoVrs }: { autoVrs: AutoVR[] }) {

  return (
    <Table>
      <TableCaption>A list of your uploaded FDX files.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Mimetype</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {autoVrs.map((file, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{file.file.filename}</TableCell>
            <TableCell>{file.file.mimetype}</TableCell>
            <TableCell className="text-right">{formatBytes(file.file.size)}</TableCell>
            <TableCell className="text-right">

              <div className="flex flex-row gap-2">
                <Button variant='secondary'>
                  <Link href={`/view/${file._id}`}>View</Link>
                </Button>

                <Button variant='outline'>
                  <Link href={`/edit/${file._id}`}>Edit</Link>
                </Button>
              </div>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}
