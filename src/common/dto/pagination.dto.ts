import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;
}

/**
 *  @Type(() => Number) can be removed if globally added below property to convert property to Number
 *  transformOptions: { enableImplicitConversion: true }
 */

// @IsOptional()
// @IsPositive()
// @Type(() => Number)
// limit: number;

// @IsOptional()
// @IsPositive()
// @Type(() => Number)
// offset: number;
