import { CommonModule } from '@angular/common';
import {
    Component,
    effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
} from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { EqualOperation } from '../../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../../models/filtering/operations/like-operation.model';
import { ComparisonOperation } from '../../models/filtering/operations/comparison-operation.model';
import { Filter } from '../../models/filtering/filter.model';
import { FilterManagerService } from '../../services/filter-manager.service';

@Component({
    selector: 'app-filter-manager',
    standalone: true,
    imports: [CommonModule, FilterComponent],
    templateUrl: './filter-manager.component.html',
})
// TODO:
// - Support adding new filters (take mapping of columns and the supported filter variants, but would be hard with select filter inputs)
export class FilterManagerComponent {
    public filters: InputSignal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > = input.required();
    public componentMap: InputSignal<Map<any, any>> = input.required();

    public change: OutputEmitterRef<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > =
        output<
            Filter<
                unknown,
                ComparisonOperation | EqualOperation | LikeOperation
            >[]
        >();

    constructor(protected readonly filterManagerService: FilterManagerService) {
        effect(
            () => {
                if (this.filters()) {
                    this.filterManagerService.setFilters(this.filters());
                }
            },
            { allowSignalWrites: true }
        );
    }

    protected filtersChanged() {
        this.change.emit(this.filterManagerService.filters());
        this.filterManagerService.notify();
    }
}
