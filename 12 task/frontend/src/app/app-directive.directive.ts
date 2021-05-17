import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
	selector: "[filter-color]"
})
export class AppDirectiveDirective {

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	@HostListener("mouseenter") onMouseEnter(): void {
		if (+this.elementRef.nativeElement.innerHTML <= 3) {
			this.renderer.setStyle(this.elementRef.nativeElement, "background", "#F6416C");
		} else if (+this.elementRef.nativeElement.innerHTML <= 4) {
			this.renderer.addClass(this.elementRef.nativeElement, "yellow");
		} else if (+this.elementRef.nativeElement.innerHTML <= 5) {
			this.renderer.addClass(this.elementRef.nativeElement, "green");
		}
	}

	@HostListener("mouseleave") onMouseOut(): void {
		this.renderer.setStyle(this.elementRef.nativeElement, "background",  null);
		this.renderer.removeClass(this.elementRef.nativeElement, "yellow");
		this.renderer.removeClass(this.elementRef.nativeElement, "green");
	}

}
