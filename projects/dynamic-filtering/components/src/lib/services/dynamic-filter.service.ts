import { HttpParams } from "@angular/common/http";
import {
    Condition,
    DynamicQueryOption,
    Operation,
    Pagination,
    Sorting,
} from "@dynamic-filtering/core";

export abstract class DynamicFilterService {
    public static formatConditionsToHttpParams(
        conditions: Condition<any, Operation>[],
        httpParams: HttpParams,
    ): HttpParams {
        for (let index = 0; index < conditions.length; index++) {
            httpParams = httpParams.set(
                `Conditions[${index}].Column`,
                conditions[index].column,
            );
            httpParams = httpParams.set(
                `Conditions[${index}].Operation`,
                conditions[index].operation,
            );
            httpParams = httpParams.set(
                `Conditions[${index}].Value`,
                conditions[index].value,
            );
        }

        return httpParams;
    }

    public static formatSortingsToHttpParams(
        sortings: Sorting[],
        httpParams: HttpParams,
    ): HttpParams {
        for (let index = 0; index < sortings.length; index++) {
            httpParams = httpParams.set(
                `Sortings[${index}].Column`,
                sortings[index].column,
            );
            httpParams = httpParams.set(
                `Sortings[${index}].Direction`,
                sortings[index].direction,
            );
        }

        return httpParams;
    }

    public static formatPaginationToHttpParams(
        pagination: Pagination,
        httpParams: HttpParams,
    ): HttpParams {
        httpParams = httpParams.set(`Pagination.Skip`, pagination.skip);
        httpParams = httpParams.set(`Pagination.Take`, pagination.take);

        return httpParams;
    }

    public static formatDynamicQueryOptionToHttpParams(
        dynamicQueryOption: DynamicQueryOption,
        httpParams: HttpParams,
    ): HttpParams {
        httpParams = this.formatConditionsToHttpParams(
            dynamicQueryOption.conditions,
            httpParams,
        );
        httpParams = this.formatSortingsToHttpParams(
            dynamicQueryOption.sortings,
            httpParams,
        );
        httpParams = this.formatPaginationToHttpParams(
            dynamicQueryOption.pagination,
            httpParams,
        );

        return httpParams;
    }
}
