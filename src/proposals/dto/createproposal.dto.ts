import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateProposalDto {
    @IsNotEmpty()
    @IsDateString()
    readonly initialdate: Date;

    @IsNotEmpty()
    @IsDateString()
    readonly finaldate: Date;

    @IsNotEmpty()
    readonly charges: object[];

    @IsNotEmpty()
    readonly supplytype: "CONVENCIONAL" | "RENOVÁVEL";

    @IsNotEmpty()
    readonly submarket: "NORTE" | "NORDESTE" | "SUL" | "SUDESTE";
}
