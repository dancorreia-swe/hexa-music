import { IsNotEmpty, IsUUID } from "class-validator";

export class RestoreAlbumHttpDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}