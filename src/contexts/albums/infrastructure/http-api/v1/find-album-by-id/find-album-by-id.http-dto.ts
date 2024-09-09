import { IsNotEmpty, IsUUID } from "class-validator";

export class FindAlbumByIdHttpDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}