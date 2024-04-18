"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { AutoVR } from "@/inerfaces/autovr.interface";
import { autoVrsEngineUtils } from "@/lib/autovrs-engine.utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"


const FormSchema = z.object({
    _id: z.string(),
    scale: z.number().min(0, 'Scale must be a positive number'),
    position: z.object({
        y: z.number().min(0, 'Y must be a positive number'),
        x: z.number().min(0, 'X must be a positive number'),
        z: z.number().min(0, 'Z must be a positive number')
    }),
    subdivision: z.number().min(0, 'Subdivision must be a positive number'),
    unsubdivide: z.number().min(0, 'Unsubdivide must be a positive number'),
    export: z.enum(['glb', 'fbx', 'obj', 'usdz'])
})


export default function Edit({ params }: { params: { slug: string } }) {

    const { toast } = useToast();
    const [file, setFile] = useState<AutoVR | null>(null);
    const [loading, setLoading] = useState(true);
    const [waiting, setWaiting] = useState(false);
    const [processedFile, setProcessedFile] = useState(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            _id: ``,
            scale: 1,
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            subdivision: 1,
            unsubdivide: 1,
            export: `glb`
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setWaiting(true)
        setLoading(true)

        console.log(`processing`, data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        const response = await autoVrsEngineUtils.process(data);
        setProcessedFile(response?.data?.data?.url);
        setLoading(false);
        setWaiting(false);
    }

    useEffect(() => {
        (async () => {
            form.setValue("_id", params.slug);
            const file = await autoVrsEngineUtils.getById(params.slug);
            setFile(file?.data);
            setLoading(false);
        })();
    }, [params.slug]);

    return (
        <div className="m-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                    <FormField
                        control={form.control}
                        name="_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="id" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="scale"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Scale</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Scale the model size. Example: 2 (double the size)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="position.x"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postition X</FormLabel>
                                        <FormControl>
                                            <Input placeholder="X" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="position.y"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postition Y</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Y" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="position.z"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postition Z</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Z" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormDescription>
                                Position of the model. Example: (0, 0, 0) will be at the center
                            </FormDescription>
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="subdivision"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subdivision</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Subdivide the model. Example: 2 (double the subdivision)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unsubdivide"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unsubdivide</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Unsubdivide the model. Example: 2 (double the unsubdivision)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="export"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Export</FormLabel>
                                <FormControl>
                                    <Input placeholder="glb" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Export the model to the selected format. Example: glb, fbx, obj, usdz
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex flex-row gap-2">
                        {processedFile ?
                            <>
                                <Button type="button" onClick={() => window.open(processedFile, '_blank')}>
                                    Download
                                </Button>
                                <Button type="button">
                                    <Link href={`/xview/${btoa(processedFile)}`}>View</Link>
                                </Button>
                            </>
                            : <Button disabled={loading} type="submit">
                                {waiting ? <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </> : `Export`}
                            </Button>}

                    </div>
                </form>
            </Form>
        </div>
    )

}