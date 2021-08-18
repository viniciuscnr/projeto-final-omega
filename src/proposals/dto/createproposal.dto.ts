import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateProposalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly initialdate: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly finaldate: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly charges: object[];
    
    @ApiProperty()
    @IsNotEmpty()
    readonly supplytype: "CONVENCIONAL" | "RENOVÁVEL";
    
    @ApiProperty()
    @IsNotEmpty()
    readonly submarket: "NORTE" | "NORDESTE" | "SUL" | "SUDESTE";
}
