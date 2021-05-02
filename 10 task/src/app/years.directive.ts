import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
	selector: "[years]"
})
export class YearsDirective {

	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

	old;

	@HostListener("mouseenter") onMouseEnter(): void {
		const date = new Date();
		const arr = this.elementRef.nativeElement.innerHTML.split(".");
		date.setDate(+arr[0]);
		date.setMonth(+(arr[1] - 1));
		date.setFullYear(+arr[2]);
		this.old = this.calcAge(date);
		this.renderer.setAttribute(this.elementRef.nativeElement, "title", "Years old: " + this.old);
	}

	@HostListener("mouseleave") onMouseOut(): void {
		this.renderer.removeAttribute(this.elementRef.nativeElement, "title", "Years old: " + this.old);
	}

	calcAge(birthDate: Date): number {
		const currentDate = new Date();
		let years = currentDate.getFullYear() - birthDate.getFullYear();
		if (currentDate.getMonth() < birthDate.getMonth() || currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
			years--;
		}
		return years;
	}

}
