import { Engine } from '@/inerfaces/engine.interface';
import axios, { AxiosInstance } from 'axios';


class AutoVrsEngineUtils {

    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.API_URL ?? `https://api.demo.meanii.dev/auto-vrs-engine/`,
        })
    }

    /**
     * @description Uploads a file to the server
     * @param file - The file to upload
     * @returns 
     */
    async uploadFile(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        return this.axios.post('storage/upload', formData)
    }

    /**
     * @description Downloads a file from the server
     * @param filename - The name of the file to download
     * @returns 
     */
    async downloadFile(filename: string) {
        return this.axios.get(`storage/${filename}`)
    }

    /**
     * @description Gets all files from the server
     * @returns 
     */
    async getAll() {
        return this.axios.get('/')
    }

    /**
     * @description Gets a file by its id
     * @param id - The id of the file
     * @returns 
     */
    async getById(id: string) {
        return (await this.axios.get(`/${id}`))?.data
    }
    
    /**
     * @description: modifies model file, scale, position, subdivision, and undivision
     * @param options
     * @returns 
     */
    async process(options: any) {
        return this.axios.post(`engine/${options._id}`, options)
    }

}

export const autoVrsEngineUtils = new AutoVrsEngineUtils();