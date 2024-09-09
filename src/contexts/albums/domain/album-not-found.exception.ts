export class AlbumNotFoundException extends Error {
    constructor(public readonly uuid?: string) {
        super(`Album not found ${uuid}`)
    }
}