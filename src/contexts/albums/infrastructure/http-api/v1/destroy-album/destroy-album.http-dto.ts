import { IsNotEmpty, IsUUID } from "class-validator";

export class DestroyAlbumHttpDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}