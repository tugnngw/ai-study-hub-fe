declare module "docx-preview" {
  export function renderAsync(
    file: ArrayBuffer,
    container: HTMLElement,
    options?: { renderImages?: boolean; className?: string },
  ): Promise<void>;

  export function renderOnInit(
    file: ArrayBuffer,
    container: HTMLElement,
    options?: { renderImages?: boolean; className?: string },
  ): Promise<void>;
}
