export interface File {
    filename: string
    size: number
    mimetype: string
    url: string
}

export interface AutoVR {
    file: File
    _id: string
}