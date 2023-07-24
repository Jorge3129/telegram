export class MeasurableElement {
  constructor(
    public readonly scrollTop: number,
    public readonly clientHeight: number,
    private readonly boundingRect: {
      top: number;
    }
  ) {}

  public getBoundingClientRect() {
    return this.boundingRect;
  }

  public static fromHtml(element: HTMLElement) {
    return new MeasurableElement(element.scrollTop, element.clientHeight, {
      top: element.getBoundingClientRect().top,
    });
  }
}
