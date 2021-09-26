import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { DataResponseDto, DatumResponseDto } from "./api-responses.dto";
import { Observable } from "rxjs";
import {Request } from "express";
import { map } from "rxjs/operators";

@Injectable()
export class ApiDataInterceptor<T> implements NestInterceptor<T, DataResponseDto<T>> {   
    intercept(context: ExecutionContext, next: CallHandler): Observable<DataResponseDto<T>> {
        const req: Request = context.switchToHttp().getRequest();

        return next.handle().pipe(map(data => <DataResponseDto<T>> {
            data,
            _self: req.originalUrl,
            _count: data.length
        }));
    }
}

@Injectable()
export class ApiDatumInterceptor<T> implements NestInterceptor<T, DatumResponseDto<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<DatumResponseDto<T>> {
        const req: Request = context.switchToHttp().getRequest();

        return next.handle().pipe(map(datum => <DatumResponseDto<T>> {
            datum,
            _self: req.originalUrl,
        }));
    }
}