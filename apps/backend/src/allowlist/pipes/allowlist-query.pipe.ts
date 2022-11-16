import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseAllowlistQueryPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    const parsedQuery = {};

    Object.keys(value).map((key) => {
      if (key === 'id') {
        parsedQuery[key] = Number(value[key]);
      } else {
        parsedQuery[key] = value[key];
      }
    });

    return parsedQuery;
  }
}
