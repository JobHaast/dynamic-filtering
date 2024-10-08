import { CommonModule } from "@angular/common";
import {
    Component,
    ElementRef,
    HostListener,
    input,
    InputSignal,
} from "@angular/core";
import { ButtonComponent } from "../../../button/button.component";
import { SelectMenuComponent } from "../../../select-menu/select-menu.component";
import {
    ComparisonOperation,
    NumberRangeFilter,
    SelectOption,
} from "@dynamic-filtering/core";
import { AbstractFilterDirective } from "../../abstract-filter.directive";

@Component({
    selector: "app-number-range-filter",
    standalone: true,
    imports: [CommonModule, ButtonComponent, SelectMenuComponent],
    templateUrl: "./number-range-filter.component.html",
    styleUrls: [
        "../../../../styles/styles.scss",
        "./number-range-filter.component.scss",
    ],
})
export class NumberRangeFilterComponent extends AbstractFilterDirective {
    public filter: InputSignal<NumberRangeFilter> =
        input.required<NumberRangeFilter>();

    protected firstToggle: boolean = true;
    protected showingContent: boolean = false;

    public filterOptions: SelectOption<ComparisonOperation>[] = [
        {
            label: ">",
            value: ComparisonOperation.GreaterThan,
        },
        {
            label: ">=",
            value: ComparisonOperation.GreaterThanOrEqual,
        },
        {
            label: "<",
            value: ComparisonOperation.LowerThan,
        },
        {
            label: "<=",
            value: ComparisonOperation.LowerThanOrEqual,
        },
    ];

    @HostListener("document:click", ["$event"])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    protected toggleContent(): void {
        if (this.firstToggle) {
            this.firstToggle = false;
        }

        this.showingContent = !this.showingContent;
    }

    protected apply(): void {
        // Emit event??
        this.filter().apply(
            1,
            ComparisonOperation.GreaterThan,
            2,
            ComparisonOperation.LowerThan,
        );
        this.onApply.emit();
        this.toggleContent();
    }

    protected reset(): void {
        this.filter().reset();
        this.onReset.emit();
    }
}
